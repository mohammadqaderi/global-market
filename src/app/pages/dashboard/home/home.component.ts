import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {HelperService} from '../../../shared/services/helper.service';
import {Store} from '@ngxs/store';
import {ProductActions} from '../../../state-management/product/product.actions';
import FetchMostSalesProducts = ProductActions.FetchMostSalesProducts;
import FetchMixLatestProducts = ProductActions.FetchMixLatestProducts;
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmailPattern} from '../../../commons/constants';
import {CustomValidators} from 'ngx-custom-validators';
import {ContactService} from '../../../services/contact/contact.service';
import {SwPush} from '@angular/service-worker';
import {ApiEndpoints} from '../../../commons/api-endpoints';
import {NotificationsService} from '../../../services/notification/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  contactMessageDto: FormGroup;
  state: string;
  @ViewChild('errorTemplate', {static: true}) errorTemplate: TemplateRef<any>;
  subscriber: PushSubscription;
  subscriptionForm: FormGroup;

  constructor(public gdService: GlobalDataService, public helperService: HelperService,
              private contactService: ContactService,
              private notifyService: NotificationsService,
              private fb: FormBuilder,
              private swPush: SwPush,
              private store: Store) {
  }

  ngOnInit(): void {
    if (!this.gdService.MostSalesProducts) {
      this.helperService.showSpinner();
      this.store.dispatch(new FetchMostSalesProducts()).subscribe(() => {
      });
    }
    if (!this.gdService.MonthProducts) {
      this.helperService.showSpinner();
      this.store.dispatch(new FetchMixLatestProducts()).subscribe(() => {
        this.helperService.hideSpinner();
      });
    }
    this.contactMessageDto = this.fb.group({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(EmailPattern),
        CustomValidators.email,
      ]),
      subject: new FormControl(null, [Validators.required]),
      message: new FormControl(null, [Validators.required]),
    });
    this.subscriptionForm = this.fb.group({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(EmailPattern),
        CustomValidators.email,
      ]),
    });
  }

  get ContactControls() {
    return this.contactMessageDto.controls;
  }

  sendContactMessage() {
    this.state = 'Sending Message...';
    this.helperService.showSpinner();
    this.contactService.sendContactMessage(this.contactMessageDto.value).subscribe(() => {
      this.clearContactForm();
      this.helperService.openSnackbar('Message sent successfully', 'Close');
    }, error => {
      this.helperService.showErrorDialog(error, this.errorTemplate);
    });
  }


  clearContactForm() {
    this.helperService.hideSpinner();
    this.contactMessageDto.reset();
    this.state = null;
  }

  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: ApiEndpoints.VapidKeys.publicKey
    }).then(subscriber => {
      this.subscriber = subscriber;
      this.notifyService.addPushSubscriber(subscriber, this.subscriptionForm.value.email).subscribe(() => {
        this.helperService.openSnackbar(
          'Now, you are a new subscriber, and you will get our newsletter',
          'Okay'
        );
      }, error => {
        error.error = 'Error';
        error.message = 'Could not send subscription object to server';
        this.helperService.showErrorDialog(error, this.errorTemplate);
      });
    }).catch(err => {
      err.error = 'Could not send subscription object to server';
      err.message = 'Could not send subscription object to server';
      this.helperService.showErrorDialog(err, this.errorTemplate);
    });
  }

}
