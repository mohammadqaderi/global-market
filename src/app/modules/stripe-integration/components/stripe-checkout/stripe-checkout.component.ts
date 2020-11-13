import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {StripeService} from 'ngx-stripe';
import {
  StripeElementsOptions,
  StripeElements, Token, StripeError
} from '@stripe/stripe-js';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HelperService} from '../../../../shared/services/helper.service';
import {PaymentMethod} from '../../../../commons/enums/payment-method.enum';
import {GlobalDataService} from '../../../../shared/services/global-data.service';
import {CreatePaymentDto} from '../../../../commons/public-dto/create-payment.dto';
import {Store} from '@ngxs/store';
import {CartActions} from '../../../../state-management/cart/cart.actions';
import CheckoutOnCart = CartActions.CheckoutOnCart;
import {CartService} from '../../../../services/cart/cart.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-stripe-checkout',
  templateUrl: './stripe-checkout.component.html',
  styleUrls: ['./stripe-checkout.component.css']
})
export class StripeCheckoutComponent implements OnInit {
  @Input() createOrderDto: FormGroup;
  @ViewChild('errorTemplate', {static: true}) errorTemplate: TemplateRef<any>;
  elements: StripeElements;
  card: any;
  state: string;
  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };
  createPaymentDto: FormGroup;
  errorOnCharge = {
    message: null,
    type: null,
    code: null
  };

  constructor(private fb: FormBuilder, public helperService: HelperService,
              private cartService: CartService,
              private gdService: GlobalDataService,
              private store: Store,
              private router: Router,
              private stripeService: StripeService) {

  }

  ngOnInit(): void {
    this.createPaymentDto = this.fb.group({
      paymentMethod: new FormControl({
        value: null,
        disabled: true,
        hidden: true
      }),
      stripeData: this.fb.group({
        amount: new FormControl({
          value: `$${this.gdService.TotalPurchase}`,
          disabled: true
        }),
        description: new FormControl(null, Validators.required)
      })
    });
    this.stripeService.elements(this.elementsOptions).subscribe((elements: StripeElements) => {
      this.elements = elements;
      if (!this.card) {
        this.card = this.elements.create('card', {
          iconStyle: 'solid',
          style: {
            base: {
              iconColor: '#666EE8',
              color: '#31325F',
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              fontSize: '18px',
              '::placeholder': {
                color: '#CFD7E0'
              }
            }
          },
        });
        this.card.mount('#card-element');
      }
    });
  }

  get StripeData() {
    const stripeData = this.createPaymentDto.get('stripeData') as FormGroup;
    return stripeData.controls;
  }


  buy(): void {
    const stripeData = {
      amount: this.gdService.TotalPurchase,
      source: null,
      description: null
    };
    this.helperService.showSpinner();
    this.stripeService.createToken(this.card).subscribe((result: {
      token: Token;
      error: StripeError;
    }) => {
      const {token, error} = result;
      if (error) {
        this.helperService.hideSpinner();
        const {message, type, code} = error;
        this.errorOnCharge.message = message;
        this.errorOnCharge.code = code;
        this.errorOnCharge.type = type;
        return;
      } else {
        switch (token.card.brand) {
          case 'Visa': {
            this.createPaymentDto.patchValue({
              paymentMethod: PaymentMethod.VISA
            });
            break;
          }
          case 'MasterCard': {
            this.createPaymentDto.patchValue({
              paymentMethod: PaymentMethod.MASTERCARD
            });
            break;
          }
        }
        if (!this.createPaymentDto.get('paymentMethod').value) {
          this.createPaymentDto.patchValue({
            paymentMethod: PaymentMethod.VISA
          });
        }
        stripeData.description = this.createPaymentDto.get('stripeData').get('description').value;
        stripeData.source = token.id;
        const paymentDto: CreatePaymentDto = {
          paymentMethod: this.createPaymentDto.get('paymentMethod').value,
          stripeData
        };
        this.clearError();
        this.store.dispatch(new CheckoutOnCart({
          createPaymentDto: paymentDto,
          createOrderDto: {billingAddress: this.createOrderDto.value}
        })).subscribe(() => {
          this.helperService.hideSpinner();
          this.helperService.hideModal();
          this.helperService.openSnackbar('Process completed successfully', 'Close');
          this.router.navigate(['/orders']);
        }, error1 => {
          this.helperService.hideModal();
          this.helperService.showErrorDialog(this.errorTemplate, error1);
        });
      }
    });
  }

  clearError() {
    this.errorOnCharge = {
      type: null,
      code: null,
      message: null
    };
  }
}
