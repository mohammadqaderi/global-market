import {Component, OnInit} from '@angular/core';
import {GlobalDataService} from './shared/services/global-data.service';
import {Store} from '@ngxs/store';
import {HelperService} from './shared/services/helper.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public gdService: GlobalDataService, public helperService: HelperService,
              private store: Store) {
  }

  ngOnInit(): void {
  }



}
