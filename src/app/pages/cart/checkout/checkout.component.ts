import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Countries} from '../../../commons/constants/countries';
import {HelperService} from '../../../shared/services/helper.service';
import {RxwebValidators} from '@rxweb/reactive-form-validators';
import {EmailPattern} from '../../../commons/constants';
import {CustomValidators} from 'ngx-custom-validators';
import {Router} from '@angular/router';
import {GlobalDataService} from '../../../shared/services/global-data.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('errorTemplate', {static: true}) errorTemplate: TemplateRef<any>;

  billingForm: FormGroup;
  countries = Countries;

  constructor(private fb: FormBuilder, public gdService: GlobalDataService,
              public helperService: HelperService, private router: Router) {
    if (gdService.Cart.totalItems === 0) {
      router.navigate(['/cart']);
    }
  }

  ngOnInit(): void {
    this.billingForm = this.fb.group({
      fullName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.pattern(EmailPattern),
        CustomValidators.email,]),
      city: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      address1: new FormControl(null, Validators.required),
      address2: new FormControl(null),
      postalCode: new FormControl(null, [Validators.required,
        Validators.maxLength(5), Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]),
      phone: new FormControl(null, [Validators.required, RxwebValidators.mask({mask: '(+999)-99 999 9999'})]),
      comments: new FormControl(null, Validators.required),
    });

    this.billingForm.valueChanges.subscribe(() => {
      const phoneValue = this.billingForm.get('phone').value as string;
      if (this.billingForm.get('phone').valid) {
        if (phoneValue.startsWith('+')) {
          return;
        } else {
          this.billingForm.patchValue({
            phone: `+${this.billingForm.get('phone').value}`
          });
        }
      }
    });
  }

  get Controls() {
    return this.billingForm.controls;
  }
}
