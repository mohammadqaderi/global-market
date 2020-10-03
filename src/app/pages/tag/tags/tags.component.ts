import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {Router} from '@angular/router';
import {HelperService} from '../../../shared/services/helper.service';
import {GlobalDataService} from '../../../shared/services/global-data.service';
import {TagActions} from '../../../state-management/tag/tag.actions';
import FetchAllTags = TagActions.FetchAllTags;

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  constructor(public store: Store, private router: Router,
              public gdService: GlobalDataService,
              public helperService: HelperService) {
  }

  ngOnInit(): void {
    if (!this.gdService.Tags) {
      this.helperService.showSpinner();
      this.store.dispatch(new FetchAllTags()).subscribe(() => {
        this.helperService.hideSpinner();
      });
    }
  }

}
