import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';
import {GlobalDataService} from '../../shared/services/global-data.service';
import {MatSidenav} from '@angular/material/sidenav';
import {HelperService} from '../../shared/services/helper.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;
  @ViewChild('enableCookies', {static: false}) enableCookies: TemplateRef<any>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public router: Router,
    public helperService: HelperService,
    public gdService: GlobalDataService) {
  }


  ngOnInit(): void {
  }


}
