import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Rooms } from '../rooms';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'hinv-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.scss'],
})
export class RoomsAddComponent {
  room: Rooms = {
    roomType: '',
    ameneties: '',
    price: 0,
    checkIn: new Date(),
    checkOut: new Date(),
    rating: 0,
  };

  successMessage: string = '';

  constructor(private roomsService: RoomsService) {}


  AddRoom(form:NgForm) { //o form foi passado pelo html atraves da referencia por # e resetado pelo reset e podia ser resetFomr (template)
    this.roomsService.addRooms(this.room).subscribe({
      next: (data) => {
        this.successMessage = 'Room Added Successfuly';
        form.reset();
      },
    });
    // return this.roomsService.addRooms(room4).subscribe({
    //   next: (res) => (this.rooms$ = this.roomsService.getRooms()),
    // });
  }
}
