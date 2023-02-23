import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Rooms } from '../rooms';

@Component({
  selector: 'hinv-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  //changeDetection:ChangeDetectionStrategy.OnPush
})
export class RoomsListComponent implements OnInit, OnChanges {
  @Input() rooms: Rooms[] | null= [];

  @Output() roomBooked = new EventEmitter<Rooms>();

  @Input() title: string = ''

  @Input() price : any

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['title'] && !changes['title'].firstChange){
      console.log(changes);
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }

  selectRoom(room: Rooms){
    this.roomBooked.emit(room);
  }
}
