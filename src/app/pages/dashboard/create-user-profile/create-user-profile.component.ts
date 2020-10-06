import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {ProfileActions} from '../../../state-management/profile/profile.actions';
import CreateUserProfile = ProfileActions.CreateUserProfile;
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngxs/store';
import {Router} from '@angular/router';
import {HelperService} from '../../../shared/services/helper.service';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {ErrorMessages} from '../../../commons/helpers/functions/error-messages';

@Component({
  selector: 'app-create-user-profile',
  templateUrl: './create-user-profile.component.html',
  styleUrls: ['./create-user-profile.component.css']
})
export class CreateUserProfileComponent implements OnInit, OnDestroy {

  @Input() state: string;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  errorMessages = new ErrorMessages();
  createProfileForm: FormGroup;
  formSubmitted = false;
  @ViewChild('errorTemplate', {static: true}) errorTemplate: TemplateRef<any>;

  constructor(private fb: FormBuilder,
              private store: Store,
              private router: Router,
              public helperService: HelperService,
              private gdService: GlobalDataService) {
  }

  get Contacts() {
    return this.createProfileForm.get('contacts') as FormArray;
  }

  get Controls() {
    return this.createProfileForm.controls;
  }


  ngOnInit() {
    this.createProfileForm = this.fb.group({
      displayName: new FormControl(null, [Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)]),
      country: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      contacts: this.fb.array([], [Validators.required])
    });

  }

  createProfile() {
    this.state = 'Updating Profile...';
    this.helperService.showSpinner();
    this.formSubmitted = true;
    this.store.dispatch(new CreateUserProfile(this.createProfileForm.value)).toPromise().then(() => {
      this.change.emit();
      this.helperService.hideSpinner();
      this.state = null;
      this.helperService.adjustData();
    }, error => {
      this.helperService.hideDialog();
      this.helperService.showErrorDialog(error, this.errorTemplate);
    });
  }

  ngOnDestroy(): void {
    this.helperService.adjustData();
    if (!this.gdService.Profile) {
      this.router.navigate(['/home']);
    }
  }

}
