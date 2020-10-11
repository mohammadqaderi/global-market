import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ProfileActions} from '../../../state-management/profile/profile.actions';
import {Login} from '../../../state-management/auth/auth-actions';
import {CustomValidators} from 'ngx-custom-validators';
import {EmailPattern} from '../../../commons/constants';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HelperService} from '../../../shared/services/helper.service';
import {Router} from '@angular/router';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {Store} from '@ngxs/store';
import {AuthService} from '../../../services/auth/auth.service';
import {OrderActions} from '../../../state-management/order/order.actions';
import FetchUserOrders = OrderActions.FetchUserOrders;
import {PaymentActions} from '../../../state-management/payment/payment.actions';
import FetchUserPayments = PaymentActions.FetchUserPayments;
import {InvoiceActions} from '../../../state-management/invoice/invoice.actions';
import FetchUserInvoices = InvoiceActions.FetchUserInvoices;
import {CartActions} from '../../../state-management/cart/cart.actions';
import FetchUserCart = CartActions.FetchUserCart;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailLoginDto: FormGroup;
  emailRequestForm: FormGroup;
  // special Case
  isSent = false;
  message: string = null;
  @ViewChild('errorTemplate', {static: true}) errorTemplate: TemplateRef<any>;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private store: Store,
              private gdService: GlobalDataService,
              private router: Router,
              public helperService: HelperService) {
    if (gdService.IsAuthenticated()) {
      router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {
    this.emailLoginDto = this.fb.group({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(EmailPattern),
        CustomValidators.email,
      ]),
      password: new FormControl(null, Validators.required)
    });
    this.emailRequestForm = this.fb.group({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(EmailPattern),
        CustomValidators.email,
      ])
    });
  }

  get Email() {
    return this.emailLoginDto.get('email');
  }

  get ForgotRequestEmail() {
    return this.emailRequestForm.get('email');

  }

  submitLogin() {
    this.helperService.showSpinner();
    this.store.dispatch(new Login(this.emailLoginDto.value)).subscribe(() => {
      this.helperService.openSnackbar(`Welcome ${this.gdService.Username}`, 'Close');
      this.store.dispatch(new FetchUserCart());
      this.store.dispatch(new FetchUserOrders());
      this.store.dispatch(new FetchUserPayments());
      this.store.dispatch(new FetchUserInvoices());
      this.router.navigate(['/home']);
      this.helperService.hideSpinner();
    }, error => {
      this.helperService.showErrorDialog(error, this.errorTemplate);
    });
  }

  sendEmailForgotPassword() {
    this.helperService.showSpinner();
    this.authService.forgotPassword(this.emailRequestForm.value.email)
      .subscribe(result => {
        this.message = `Your Request has been sent successfully, please checkout
         your email inbox to confirm your request and reset your password`;
        this.isSent = true;
        this.helperService.hideSpinner();
      }, error => {
        this.helperService.showErrorDialog(error, this.errorTemplate);
      });
  }

}
