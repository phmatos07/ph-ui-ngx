import { Component, DoCheck, EventEmitter, Input, Output } from '@angular/core';

/**
 * AUTOCOMPLETE
 * Por ser um componente genérico as Array's (lista e listaCompare)
 * estão tipadas como ANY, pois o componente precisa tratar qualquer tipo de Array
 * para renderizar a listaView no HTML.
 */
@Component({
  selector: 'phu-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements DoCheck {

  @Input()
  lista: any[] | null = [];

  @Input()
  propriedadeView: string | null = null;

  @Input()
  agruparValores = false;

  @Output()
  registroEmitter = new EventEmitter<any>();

  listaView = new Array<string | number>();
  private listaCompare = new Array<any>();
  private readonly PRIMEIRO_REGISTRO = 0;

  ngDoCheck(): void {
    this.verificarLista();
  }

  private verificarLista(): void {

    if (this.lista && this.lista.length >= 1 && this.lista !== this.listaCompare) {

      this.listaCompare = this.lista;
      this.listaView = [];

      if (this.propriedadeView === null) {
        this.listaView = this.agruparValores ? this.agruparListaView(this.lista) : this.lista;
        return;
      }

      if (this.propriedadeView) {
        this.listaView = this.setListaView(this.lista);
        return;
      }
    }

    if (!this.lista && this.listaCompare) {
      this.listaView = [];
    }
  }

  private setListaView(listagem: any[]): string[] {
    try {
      if (listagem[0].hasOwnProperty(this.propriedadeView)) {

        const listView: string[] = [];

        listagem.forEach((dados: any) => {
          if (this.propriedadeView) {
            listView.push(dados[this.propriedadeView]);
          }
        });

        if (this.agruparValores) {
          return this.agruparListaView(listView);
        }
        return listView;
      }
      throw new Error('Propriedade informada não existe na lista de dados!');
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  private agruparListaView(listaView: string[]): string[] {
    return listaView.filter((parametro: string, index: number) => listaView.indexOf(parametro) === index);
  }

  enviarRegistro(registro: string | number): void {

    let registroSelecionado: any = null;

    if (this.propriedadeView && this.lista && this.lista[this.PRIMEIRO_REGISTRO].hasOwnProperty(this.propriedadeView)) {
      registroSelecionado = this.lista.find((dados: any) => !!(this.propriedadeView && dados[this.propriedadeView] === registro));
    } else {
      registroSelecionado = registro;
    }

    this.registroEmitter.emit(registroSelecionado);
    this.listaView = [];
  }
}
