import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Carousel } from './model/carousel.interface';
import { Target } from './model/target.enum';

@Component({
  selector: 'phu-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  @Input()
  sliders = new Array<Carousel>();

  @Input()
  seconds = 7;

  @Output()
  carouselEmitter = new EventEmitter<Carousel>();

  private idActiveSlider: number | null = null;
  private idLastSlider: number | null = null;
  private setInterval: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.startCarousel();
  }

  /**
   * @description: Obtém o evento mouseover e executa o método 'this.stopCarouselRepeating()'.
   */
  @HostListener('mouseover')
  onMouseOver(): void {
    if (this.sliderLength > 1) {
      this.stopCarouselRepeating();
    }
  }

  /**
   * @description: Obtém o evento mouseout e executa o método 'this.startCarouselRepeating()'.
   */
  @HostListener('mouseout')
  onMouseOut(): void {
    if (this.sliderLength > 1) {
      this.startCarouselRepeating(this.seconds);
    }
  }

  trackBySlider(index: number): number {
    return index;
  }

  getHref(href: string): string {
    return typeof href === 'string' && href || 'javascript:void(0);';
  }

  getTarget(target: Target): string {
    return typeof target === 'string' && target || Target.SELF;
  }

  /**
   * @description: Método responsável por retorna um banner a posição anterior.
   */
  previous(): void {

    this.disableCurrentSlider();

    if (this.idActiveSlider === 0) {
      this.sliders[this.idLastSlider].isActivated = true;
    } else {
      this.sliders[this.idActiveSlider - 1].isActivated = true;
    }
  }

  /**
   * @description: Método responsável por avançar a posição atual de um banner.
   */
  next(): void {
    this.disableCurrentSlider();

    if (this.idActiveSlider >= this.idLastSlider) {
      this.sliders[0].isActivated = true;
    } else {
      this.sliders[this.idActiveSlider + 1].isActivated = true;
    }
  }

  /**
   * @description: Ativa a posição de um banner conforme clicar sobe o button da paginação do Carroseul-slider.
   * @param id: número referente a lista de dados do Carroseul-slider
   */
  activateBanner(id: number): void {
    this.disableCurrentSlider();
    this.sliders[id].isActivated = true;
  }

  /**
   * @description Envia o banner para fazer a validação se tem produtos
   * @param banner: Campanha que será exibida
   */
  click(slider: Carousel): void {
    if (this.sliderLength > 0) {
      this.carouselEmitter.emit(slider);
    }
  }

  /**
   * @description: Atribui a quantidade de banners a variável ‘this.lengthBannerIndex’
   * e seta o valor boolean nos no atributo ‘isActivated’ banners do ‘carrossel-slider‘.
   */
  private startCarousel(): void {

    try {

      if (this.sliderLength > 0) {
        this.sliders[0].isActivated = true;
        this.startCarouselRepeating(this.seconds);
        return;
      }

      throw new Error('Por favor, respeite o modelo de dados referente ao Array do Carrossel.');

    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @description: Inicia a repetição o loop do Carousel-slider.
   * @param seconds: Tempo em segundo referente ao slider que ficará exposto até o próximo ser ativado.
   */
  private startCarouselRepeating(seconds: number): void {

    try {

      if (seconds && typeof seconds === 'number') {
        const time = Number(seconds * 1000);

        this.setInterval = setInterval(() => {
          this.next();
        }, time);
        return;
      }
      throw new Error('Por favor, declare valores númericos na propriedade SECONDS');
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @description: Pausa a repetição o loop do Carousel-slide.
   */
  private stopCarouselRepeating(): void {
    clearInterval(this.setInterval);
  }

  /**
   * @description: Função para desativar o banner atual.
   */
  private disableCurrentSlider(): void {

    if (this.sliderLength > 1) {
      this.idActiveSlider = this.sliders.findIndex((slider: Carousel) => slider.isActivated);
      this.idLastSlider = this.sliders.length - 1;
      this.sliders[this.idActiveSlider].isActivated = false;
    }
  }

  get sliderLength(): number {
    return Array.isArray(this.sliders) && this.sliders.length || 0;
  }


}
