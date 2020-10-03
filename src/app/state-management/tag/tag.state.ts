import {Action, Selector, State, StateContext} from '@ngxs/store';
import {TagActions, TagStateModel} from './tag.actions';
import {Injectable} from '@angular/core';
import {TagService} from '../../services/tag/tag.service';
import FetchAllTags = TagActions.FetchAllTags;
import {tap} from 'rxjs/operators';
import {TagModel} from '../../models/Tag/tag.model';
import ClearTags = TagActions.ClearTags;


@State<TagStateModel>({
  name: 'tags',
  defaults: {
    tags: null
  }
})
@Injectable()
export class TagState {
  constructor(private tagService: TagService) {
  }

  @Selector()
  static Tags(state: TagStateModel) {
    return state.tags;
  }

  @Action(FetchAllTags)
  fetchAllTags(ctx: StateContext<TagStateModel>, action: FetchAllTags) {
    return this.tagService.getAllTags().pipe(
      tap((tags: TagModel[]) => {
        ctx.setState({
          tags
        });
      })
    );
  }


  @Action(ClearTags)
  clearTags(ctx: StateContext<TagStateModel>, action: ClearTags) {
    ctx.setState({
      tags: null
    });
  }


}
