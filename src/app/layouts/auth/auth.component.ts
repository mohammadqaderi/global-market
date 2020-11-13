import {Component, OnInit} from '@angular/core';
import {GlobalDataService} from '../../shared/services/global-data.service';
import {HelperService} from '../../shared/services/helper.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(public gdService: GlobalDataService,
              public helperService: HelperService) {
  }

  ngOnInit() {


  }


}
