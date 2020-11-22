import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngxs/store';
import {HelperService} from '../../../shared/services/helper.service';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {ProfileActions} from '../../../state-management/profile/profile.actions';
import FetchUserProfile = ProfileActions.FetchUserProfile;
import {FileUploader} from 'ng2-file-upload';
import {ErrorMessages} from '../../../commons/helpers/functions/error-messages';
import {Contact} from '../../../commons/classes/contact';
import EditProfile = ProfileActions.EditProfile;
import ChangeProfileImage = ProfileActions.ChangeProfileImage;
import SetProfileImage = ProfileActions.SetProfileImage;
import {OrderActions} from '../../../state-management/order/order.actions';
import FetchUserOrders = OrderActions.FetchUserOrders;
import {ApiEndpoints} from '../../../commons/api-endpoints';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('createUserProfile', {static: true}) createUserProfile: TemplateRef<any>;
  state: string;
  formChanged: boolean;
  updateProfileForm: FormGroup;
  errorMessages = new ErrorMessages();
  public uploader: FileUploader = new FileUploader({});
  startUploadingImage = false;
  @ViewChild('errorTemplate', {static: true}) errorTemplate: TemplateRef<any>;

  constructor(private fb: FormBuilder,
              private store: Store,
              public helperService: HelperService,
              public gdService: GlobalDataService) {
  }

  get Controls() {
    return this.updateProfileForm.controls;
  }

  get DisplayName() {
    return this.updateProfileForm.get('displayName');
  }


  onImageSelect(event) {
    this.helperService.onImageSelect(event);
  }

  afterCreateUserProfile() {
    if (this.Profile) {
      this.initializeProfile();
    }
  }


  get Contacts() {
    return this.updateProfileForm.get('contacts') as FormArray;
  }


  ngOnInit(): void {
    if (!this.gdService.User.profileId) {
      this.helperService.openModal(this.createUserProfile);
    } else if (!this.Profile) {
      this.state = 'Loading Profile...';
      this.helperService.showSpinner();
      this.store.dispatch(new FetchUserProfile()).subscribe(() => {
        this.initializeProfile();
        this.state = null;
        this.helperService.hideSpinner();
      }, error => {
        this.helperService.showErrorDialog(error, this.errorTemplate);
      });
    } else {
      this.initializeProfile();
    }
  }

  initializeProfile() {
    this.updateProfileForm = this.fb.group({
      displayName: new FormControl(this.Profile.displayName, [Validators.required]),
      city: new FormControl(this.Profile.city, [Validators.required]),
      country: new FormControl(this.Profile.country, [Validators.required]),
      gender: new FormControl(this.Profile.gender, [Validators.required]),
      email: new FormControl({
        value: this.gdService.User.email,
        disabled: true
      }),
      contacts: this.fb.array([], [Validators.required])
    });
    for (let i = 0; i < this.Profile.contacts.length; i++) {
      this.addContact(this.Profile.contacts[i]);
    }
    this.updateProfileForm.valueChanges.subscribe(() => {
      this.formChanged = true;
    });
    if (!this.gdService.Orders) {
      this.store.dispatch(new FetchUserOrders()).subscribe(() => {

      });
    }
  }

  addContact(contact: Contact) {
    this.Contacts.push(this.fb.group({
      address: new FormControl(contact.address, [Validators.required]),
      phone: new FormControl(contact.phone, [Validators.required]),
    }));
  }

  get Profile() {
    return this.gdService.Profile;
  }

  updateProfile() {
    this.state = 'Updating Profile...';
    this.helperService.showSpinner();
    this.store.dispatch(new EditProfile(this.updateProfileForm.value)).subscribe(() => {
      this.helperService.hideSpinner();
      this.state = null;
      this.helperService.openSnackbar('Profile Updated Successfully', 'Okay');
    }, error => {
      this.helperService.hideDialog();
      this.helperService.showErrorDialog(error, this.errorTemplate);
    });
  }

  updateImage() {
    this.startUploadingImage = true;
    this.store.dispatch(new ChangeProfileImage(this.helperService.imageFormData, this.gdService.Username)).subscribe(() => {
      this.helperService.openSnackbar('Image changed successfully', 'Okay');
      this.helperService.adjustData();
      this.startUploadingImage = false;
    }, error => {
      this.helperService.hideDialog();
      this.helperService.showErrorDialog(error, this.errorTemplate);

    });
  }

  uploadImage() {
    this.startUploadingImage = true;
    this.store.dispatch(new SetProfileImage(this.helperService.imageFormData, this.gdService.Username)).subscribe(() => {
      this.helperService.openSnackbar('Image uploaded successfully', 'Okay');
      this.helperService.adjustData();
      this.startUploadingImage = false;
    }, error => {
      this.helperService.hideDialog();
      this.helperService.showErrorDialog(error, this.errorTemplate);
    });
  }

}
