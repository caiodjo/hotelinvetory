import { HttpEventType } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  SkipSelf,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { catchError, map, of, Subject, Subscription } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { ConfigService } from '../services/config.service';
import { Rooms } from './rooms';
import { RoomsService } from './services/rooms.service';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit, AfterViewInit {
  numberOfRooms = 10;

  roomsVisible: boolean = false;

  roomList!: Rooms[];

  roomSelected!: Rooms;

  roomsTitle: string = 'Rooms List preloaded';

  // @ViewChild(HeaderComponent, { static: true })
  // headerComponent!: HeaderComponent; //gera uma propriedade instanciada do componente para alterarmos o que for necessario.

  //@ViewChildren(HeaderComponent) headers!: QueryList<HeaderComponent>;
  totalBytes: number = 0;

  subscription!: Subscription;

  //error handling
  error$ = new Subject<string>();

  getError$ = this.error$.asObservable();
  // nao pode escrever esse codigo pq chama modificacao, o certo é escrever no service
  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      // console.log(err);
      this.error$.next(err.message);
      return of([]);
    })
  ); //$ = stream of data, roomsStream = coming from a no subscribe method

  roomsCount$ = this.roomsService.getRooms$.pipe(map((rooms) => rooms.length));

  priceFilter = new FormControl('');

  loading: boolean = false;

  constructor(@SkipSelf() private roomsService: RoomsService,
  private configService: ConfigService) {}

  toggle() {
    this.roomsVisible = !this.roomsVisible;
    return (this.roomsTitle = 'Vasco da Gama'); //muda independente do que foi instaciado pelo viewchild do pai
  }

  ngOnInit(): void {
    // this.subscription = this.roomsService.getRooms$.subscribe({
    //   next: (res) => (this.roomList = res),
    //   error: (err) => console.log(err),
    // });

    //this.headerComponent.headerTitle = 'Title AfterViewInit Rooms View'; //mudamos uma propriedade do componente que queremos utilziar dentro do nosso componente pai
    //console.log(this.headerComponent); //Sem o static true, o console loga indefined por conta do conteudo nao ter iniciado ainda, ja que pode haver demoras na inicializacao de uma api por exemplo

    this.roomsService.getPhotos().subscribe({
      next: (event) => {
        switch (event.type) {
          case HttpEventType.Sent: {
            this.loading = true;
            console.log('Request has been made!');
            break;
          }
          case HttpEventType.ResponseHeader: {
            this.loading = false;
            console.log('Requeste success!');
            break;
          }
          case HttpEventType.DownloadProgress: {
            console.log(event.loaded);
            this.totalBytes += event.loaded;
            break;
          }
          case HttpEventType.Response: {
            console.log(event.body);
            break;
          }
          default: {
            console.log('error');
            break;
          }
        }
      },
      error: (error) => console.log(error),
    });
  }

  ngAfterViewInit(): void {}

  // selected(room: Rooms) {
  //   this.roomSelected = room;
  //   this.roomsService.putRooms(room).subscribe({
  //     next: (res) => console.log(res)
  //   })
  // }
  selected(room: Rooms) {
    console.log(room);
    return this.roomsService.deleteRooms(room).subscribe({
      next: (res) => console.log(res),
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
