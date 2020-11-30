import { Component, DoCheck, EventEmitter, Input, Output } from '@angular/core';

/**
 * AUTOCOMPLETE
 * Por ser um componente genérico as Array's (lista e listaCompare)
 * estão tipadas como unknown, pois o componente precisa tratar qualquer tipo de Array
 * para renderizar a listaView no HTML.
 */
@Component({
  selector: 'phu-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements DoCheck {

  @Input()
  lista = new Array<unknown>();

  @Input()
  propriedadeView: string | null = null;

  @Input()
  agruparValores = false;

  @Output()
  registroEmitter = new EventEmitter<string>();

  listaView = new Array<string>();
  private listaCompare: string | null = null;

  ngDoCheck(): void {
    this.verificarLista();
  }

  enviarRegistro(registro: string): void {

    let registroSelecionado = null;

    if (this.isArray(this.lista) && this.isPropriedadeView(this.lista)) {
      registroSelecionado = this.lista.find((dados: string) => !!(dados[this.propriedadeView] === registro));
    } else {
      registroSelecionado = registro;
    }

    this.registroEmitter.emit(registroSelecionado);
    this.listaView = new Array();
  }

  private verificarLista(): void {

    if (!this.isArray(this.lista) && this.listaCompare) {
      this.listaView = new Array();
      this.listaCompare = null;
      return;
    }

    if (this.isArray(this.lista) && JSON.stringify(this.lista) !== this.listaCompare) {

      this.listaCompare = JSON.stringify(this.lista);
      this.listaView = new Array();

      if (this.propriedadeView === null) {
        const novaLista = this.converterArray(this.lista);
        this.listaView = this.agruparValores ? this.agruparListaView(novaLista) : novaLista;
        return;
      }

      if (this.propriedadeView && this.isPropriedadeView(this.lista)) {
        this.listaView = this.setListaView(this.lista);
      }
    }
  }

  private converterArray(lista: unknown[]): string[] {
    return this.isArray(lista) ? lista.filter((item: unknown) => typeof item === 'string') : new Array<string>();
  }

  private setListaView(lista: unknown[]): string[] {

    const listaView = Array<string>();

    lista.forEach((item: unknown) => {
      if (typeof item === 'object') {
        listaView.push(item[this.propriedadeView]);
      }
    });

    return this.agruparValores ? this.agruparListaView(listaView) : listaView;
  }

  private agruparListaView(listaView: string[]): string[] {
    return listaView.filter((parametro: string, index: number) => listaView.indexOf(parametro) === index);
  }

  private isArray(lista: unknown): lista is [] {
    return Array.isArray(lista) && lista.length > 0;
  }

  private isPropriedadeView(lista: unknown[]): boolean {
    try {

      const isArray = this.isArray(lista);
      const isPropriedade = lista.every((item: unknown) => typeof item === 'object' && item.hasOwnProperty(this.propriedadeView));

      if (isArray && isPropriedade) {
        return true;
      }
      throw new Error(`Propriedade ${this.propriedadeView} não existe na lista de dados!`);

    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
