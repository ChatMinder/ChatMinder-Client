import palette from '../palette';

// 액션 타입 정의
const SET_TAGS = 'SET_TAGS';
const ADD_TAG = 'ADD_TAG';
const FIX_TAG = 'FIX_TAG';

//액션 생성함수 만들기
export const setTags = (tagArr) => ({
  type: SET_TAGS,
  tagArr,
});
export const addTag = (tagObj) => ({
  type: ADD_TAG,
  tagObj,
});
export const fixTag = () => ({
  type: FIX_TAG,
});

//초기 상태 선언
// const initialState = []

//테스트용 더미 데이터
const initialState = [];

//리듀서 선언
const tag = (state = initialState, action) => {
  switch (action.type) {
    case SET_TAGS: {
      return action.tagArr;
    }
    case ADD_TAG: {
      return [...state, action.tagObj];
    }
    case FIX_TAG: {
      return [...state];
    }
    default:
      return state;
  }
};

export default tag;
