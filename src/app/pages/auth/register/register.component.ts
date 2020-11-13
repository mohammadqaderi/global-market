import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Register} from '../../../state-management/auth/auth-actions';
import {CustomValidators} from 'ngx-custom-validators';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmailPattern} from '../../../commons/constants';
import {ErrorMessages} from '../../../commons/helpers/functions/error-messages';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {HelperService} from '../../../shared/services/helper.service';
import {Store} from '@ngxs/store';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  @ViewChild('errorTemplate', {static: true}) errorTemplate: TemplateRef<any>;
  errorMessages = new ErrorMessages();

  constructor(private fb: FormBuilder,
              private store: Store,
              private gdService: GlobalDataService,
              private router: Router,
              public helperService: HelperService) {
    if (gdService.IsAuthenticated()) {
      router.navigate(['/home']);
    }
  }

  get Username() {
    return this.registrationForm.get('username');
  }

  get Email() {
    return this.registrationForm.get('email');
  }


  get Password() {
    return this.registrationForm.get('password');
  }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      username: new FormControl(null,
        [
          Validators.required]
      ),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(EmailPattern),
        CustomValidators.email,
      ]),
      password: new FormControl(null, [
        Validators.required
      ])
    });
  }


  submitRegister() {
    this.helperService.showSpinner();
    const data = {
      username: this.registrationForm.value.username,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password
    };
    this.store.dispatch(new Register(data)).subscribe(() => {
      this.helperService.hideSpinner();
      this.router.navigate(['/home']);
    }, error => {
      this.helperService.hideDialog();
      this.helperService.showErrorDialog(error, this.errorTemplate);
    });
  }

}
