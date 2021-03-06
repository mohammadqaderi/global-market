import {Component, OnInit} from '@angular/core';
import {HelperService} from '../../../shared/services/helper.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-no-internet',
  templateUrl: './no-internet.component.html',
  styleUrls: ['./no-internet.component.css']
})
export class NoInternetComponent implements OnInit {

  baseUrl = 'https://global-market-demo.herokuapp.com';

  constructor(private helperService: HelperService, private router: Router, private route: ActivatedRoute) {
    route.queryParamMap.subscribe((q: ParamMap) => {
      this.returnUrl = q.get('returnUrl');
      this.baseUrl = this.baseUrl + q.get('returnUrl');
    });
  }

  returnUrl: string;

  ngOnInit(): void {
    if (this.isOnline) {
      this.router.navigate([this.returnUrl]);
    }
  }


  get isOnline() {
    const isOnline = sessionStorage.getItem('isOnline');
    return isOnline === 'true';
  }

}
