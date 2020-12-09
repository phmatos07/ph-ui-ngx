import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Carousel } from './carousel.interface';

@Component({
  selector: 'phu-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit, OnChanges {

  @Input()
  sliders = new Array<Carousel>();

  @Output()
  sliderEmitter = new EventEmitter<Carousel>();

  private activeBannerIndex: number | null = null;
  private setInterval: number | null = null;
  private lastBanner: number | null = null;

  ngOnInit(): void {
    this.startCarousel();
  }

  ngOnChanges(): void {
    // Verificar necessidade
    /* this.startCarousel();
    this.updateCurrentPosition(); */
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
      this.startCarouselRepeating();
    }
  }

  trackBySlider(index: number): number {
    return index;
  }

  /**
   * @description: Método responsável por retorna um banner a posição anterior.
   */
  previous(): void {

    this.disableCurrentBanner();

    if (this.activeBannerIndex === 0) {
      this.sliders[this.lastBanner].isActivated = true;
    } else {
      this.sliders[this.activeBannerIndex - 1].isActivated = true;
    }
  }

  /**
   * @description: Método responsável por avançar a posição atual de um banner.
   */
  next(): void {
    this.disableCurrentBanner();

    if (this.activeBannerIndex >= this.lastBanner) {
      this.sliders[0].isActivated = true;
    } else {
      this.sliders[this.activeBannerIndex + 1].isActivated = true;
    }
  }

  /**
   * @description: Ativa a posição de um banner conforme clicar sobe o button da paginação do Carroseul-slider.
   * @param id: número referente a lista de dados do Carroseul-slider
   */
  activateBanner(id: number): void {
    this.disableCurrentBanner();
    this.sliders[id].isActivated = true;
  }

  /**
   * @description Envia o banner para fazer a validação se tem produtos
   * @param banner: Campanha que será exibida
   */
  click(slider: Carousel): void {

    /* const isQuantidadeProdutos = slider && slider.quantidadeProdutos && slider.quantidadeProdutos > 0;

    if (isQuantidadeProdutos && slider.id) {
      this.sliderEmitter.emit(slider);
    } */
  }

  /**
   * @description: Atribui a quantidade de banners a variável ‘this.lengthBannerIndex’
   * e seta o valor boolean nos no atributo ‘isActivated’ banners do ‘carrossel-slider‘.
   */
  private startCarousel(): void {

    try {

      if (this.sliderLength > 0) {
        this.sliders[0].isActivated = true;
        this.startCarouselRepeating();
        return;
      }

      throw new Error('Por favor, respeite o modelo de dados referente ao Array do Carrossel.');

    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @description: Atualiza a posição atual do banner ativo e o ultimo ativo.
   */
  private updateCurrentPosition(): void {

    if (this.sliderLength > 0) {
      this.activeBannerIndex = this.sliders.findIndex((slider: Carousel) => slider.isActivated);
      this.lastBanner = this.sliders.length - 1;
    }
  }

  /**
   * @description: Inicia a repetição o loop do Carousel-slider.
   * @param seconds: Tempo em segundo referente ao slider que ficará exposto até o próximo ser ativado.
   */
  private startCarouselRepeating(seconds = 5): void {

    this.setInterval = Number(seconds * 1000);

    setInterval(() => {
      this.next();
    }, this.setInterval);
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
  private disableCurrentBanner(): void {

    if (this.sliderLength > 1) {
      this.updateCurrentPosition();
      this.sliders[this.activeBannerIndex].isActivated = false;
    }
  }

  get sliderLength(): number {
    return Array.isArray(this.sliders) && this.sliders.length || 0;
  }
}
