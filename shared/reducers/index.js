import tag from './tag';
import memo from './memo';

import { combineReducers } from 'redux';

/*
    서브 리듀서들 하나로 합치기
    store=
    {
        tagData: [],
        memoData: []
    }
*/

const reducers = combineReducers({
  tagData: tag,
  memoData: memo,
});

export default reducers;
