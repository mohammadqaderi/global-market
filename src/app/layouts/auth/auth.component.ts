import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalDataService} from '../../shared/services/global-data.service';
import {Router} from '@angular/router';
import {HelperService} from '../../shared/services/helper.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public isCollapsed = true;

  constructor(private router: Router, public gdService: GlobalDataService,
              public helperService: HelperService) {
  }

  ngOnInit() {


  }


}
