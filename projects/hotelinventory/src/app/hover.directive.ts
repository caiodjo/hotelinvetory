import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[hinvHover]',
})
export class HoverDirective { //diretivas sao helperfunctions to my components, for any dom element
  @Input() hinvHover: string = 'red'; //posso por o mesmo nome do seletor e usar no html so o nome=cor ou criar variavel e adicionar a propriedade no html

  constructor(private element: ElementRef, private renderer: Renderer2) {
    console.log(this.element.nativeElement);
  }

  ngOnInit(): void {
    //this.element.nativeElement.style.backgroundColor = this.color;
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      this.hinvHover
    );
  }

  @HostListener('mouseenter') onMouseEnter() { //ouvir eventos que acontecem no meu componente
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      'green'
    );
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      'white'
    );
  }
}
