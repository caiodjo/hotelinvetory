import { Pipe, PipeTransform } from '@angular/core';
import { Rooms } from './rooms';

@Pipe({
  name: 'roomsFilter'
})
export class RoomsFilterPipe implements PipeTransform {

  transform(rooms: Rooms[] | null, price: number): Rooms[] {
    if(rooms && price){
      return rooms.filter((room) => room.price <= price)
    } else if(rooms){
      return rooms
    }

    return []
  }

}
