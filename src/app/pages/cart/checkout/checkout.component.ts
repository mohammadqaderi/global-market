import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Countries} from '../../../commons/constants/countries';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  billingForm: FormGroup;
  countries = Countries;
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.billingForm = this.fb.group({
      fullName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      address1: new FormControl(null, Validators.required),
      address2: new FormControl(null),
      postalCode: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      comments: new FormControl(null, Validators.required),
    })
  }
}
