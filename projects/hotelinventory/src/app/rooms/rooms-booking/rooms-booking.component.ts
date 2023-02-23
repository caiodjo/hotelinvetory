import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { exhaustMap, map, Observable } from 'rxjs';
import { BookingService } from './booking.service';
import { CustomValidator } from './validators/custom-validator';

@Component({
  selector: 'hinv-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss'],
})
export class RoomsBookingComponent {
  id!: number;

  id$ = this.router.paramMap.pipe(map((params) => params.get('id'))); //mapear os parametros

  bookingForm!: FormGroup;

  get guestsgeted() {
    return this.bookingForm.get('guests') as FormArray;
  }

  constructor(
    private router: ActivatedRoute,
    private fb: FormBuilder,
    private bookingService: BookingService,
  ) {}

  ngOnInit() {
    this.id = this.router.snapshot.params['id'];
    //this.id$ =
    // this.router.paramMap.subscribe({
    //   next: params => params.get('id')
    // })
    console.log(this.id$, 'teste', this.id)
    this.bookingForm = this.fb.group(
      {
        //cada fb. group, control, array esta associado a ao html como formArray, formGroup e etc
        roomId: new FormControl({ value: this.id, disabled: true }),
        ownerName: new FormControl('', {
          updateOn: 'blur',
          validators: [Validators.required, Validators.minLength(4), CustomValidator.ValidateName],
        }),
        guestEmail: new FormControl('', [
          Validators.required,
          Validators.email,
          CustomValidator.ValidateSpecialChar('*'),
        ]),
        bookingAmount: new FormControl(''),
        mobileNumber: new FormControl(''),
        checkInDate: new FormControl('', {validators: [Validators.required]}),
        checkOutDate: new FormControl('', {validators: [Validators.required]}),
        adress: this.fb.group({
          adressLine1: new FormControl('', [Validators.required]),
          adressLine2: new FormControl(''),
          city: new FormControl('', [Validators.required]),
          state: new FormControl('', [Validators.required]),
          country: new FormControl(''),
          zipCode: new FormControl(''),
        }),
        guests: new FormArray([
          this.fb.group({
            guestName: ['', [Validators.required]],
            age: new FormControl(''),
          }),
        ]),
        tnc: new FormControl(false, [Validators.requiredTrue]),
      },
      { updateOn: 'blur', validators:[CustomValidator.ValidadeDate] }
    ); //blur, change(default) and submit como parametros

    this.setBooking();

    // this.bookingForm.valueChanges.subscribe({
    //   next: (value) => console.log(value),
    // });

    this.bookingForm.valueChanges.pipe(
      exhaustMap((value) => this.bookingService.bookRoom(value))
    ).subscribe((data) => console.log(data))
  }

  addRoom() {
    console.log(this.bookingForm.getRawValue());
    // this.bookingService.bookRoom(this.bookingForm.getRawValue()).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //   },
    // });
    // this.bookingForm.reset({
    //   roomId: '',
    //   guestEmail: '',
    //   guestName: '',
    //   bookingAmount: '',
    //   mobileNumber: '',
    //   checkInDate: '',
    //   checkOutDate: '',
    //   adress: {
    //     adressLine1: '',
    //     adressLine2: '',
    //     city: '',
    //     state: '',
    //     country: '',
    //     zipCode: '',
    //   },
    //   guests: [],
    //   tnc: false,
    // })
  }

  setBooking() {
    this.bookingForm.patchValue({
      //tbm tem o setValue mas precisa de todos os atributos
      guestEmail: 'test@gmail.com',
      guestName: 'test',
      bookingAmount: '400',
    });
  }

  addGuest() {
    // no Html precisa ser [formGroupName] pois é dinamico
    this.guestsgeted.push(
      this.fb.group({
        guestName: ['', [Validators.required]],
        age: new FormControl('', [Validators.required]),
      })
    );
  }

  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }

  deletePassport() {
    if (this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport');
    }
  }
  removeGuest(i: number) {
    this.guestsgeted.removeAt(i);
  }
}
