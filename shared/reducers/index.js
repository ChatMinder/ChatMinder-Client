import tag from './tag';
import memo from './memo';
import auth from './auth';

import { combineReducers } from 'redux';

/*
    서브 리듀서들 하나로 합치기
    store=
    {
      auth: {},
      memoData: [],
      tagData: [],
    }
*/

const reducers = combineReducers({
  tagData: tag,
  memoData: memo,
  auth: auth,
});

export default reducers;
