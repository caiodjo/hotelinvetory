import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';
import { InitService } from './init.service';
import { RoomsComponent } from './rooms/rooms.component';
import { ConfigService } from './services/config.service';

@Component({
  selector: 'hinv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'hotelinventory';

  @ViewChild('user', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  constructor(
    private initService: InitService,
    private configService: ConfigService,
    private router: Router
  ) {
    console.log(initService.config);
  }
  //   ngAfterViewInit() {
  //     const componentRef = this.vcr.createComponent(RoomsComponent); //cria o componente da instancia
  //     componentRef.instance.roomsTitle = 'teste roomsTitle'; // acessa uma propriedade do componente instanciado "filho"
  //   }

  // caso queria acessar uma tag html, ex div #elem
  // @ViewChild('elem', {static:true}) elem!: ElementRef;

  ngOnInit() {
    // this.router.events.subscribe({
    //   next: value => console.log(value),
    // })

    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe({ next: (event) => console.log('Navigation Started') });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe({ next: (event) => console.log('Navigation Completed') });
  }
}
