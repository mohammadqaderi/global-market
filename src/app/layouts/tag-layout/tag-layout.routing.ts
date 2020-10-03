import {Routes} from '@angular/router';
import {TagsComponent} from '../../pages/tag/tags/tags.component';
import {TagItemsComponent} from '../../pages/tag/tag-items/tag-items.component';

export const TagLayoutRoutes: Routes = [
  {
    path: 'tags',
    component: TagsComponent
  },
  {
    path: 'tag-items/:id',
    component: TagItemsComponent
  }
];
