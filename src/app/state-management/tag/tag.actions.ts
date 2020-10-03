import {TagModel} from '../../models/Tag/tag.model';

export interface TagStateModel {
  tags: TagModel[];
}

export namespace TagActions {
  export class FetchAllTags {
    static readonly type = '[Tag] Fetch All Tags';

    constructor() {
    }
  }

  export class FetchTagById {
    static readonly type = '[Tag] Fetch Tag By Id';

    constructor(public id: number) {
    }
  }


  export class ClearTags {
    static readonly type = '[Tag] Clear Tags';

    constructor() {
    }
  }

}
