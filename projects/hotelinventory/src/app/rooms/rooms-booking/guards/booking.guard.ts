import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RoomsBookingComponent } from '../rooms-booking.component';

@Injectable({
  providedIn: 'root'
})
export class BookingGuard implements CanDeactivate<RoomsBookingComponent> {

  constructor(private _snackBar: MatSnackBar) {}

  canDeactivate(
    component: RoomsBookingComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(component.bookingForm.dirty){
        this._snackBar.open('You have unsaved changes','Dismiss');

      }
    return component.bookingForm.pristine;
  }
  
}
