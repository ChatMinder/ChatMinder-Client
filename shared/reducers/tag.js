// 액션 타입 정의
const SET_TAGS = 'SET_TAGS';
const ADD_TAG = 'ADD_TAG';
const FIX_TAG = 'FIX_TAG';
const DELETE_TAG = 'DELETE_TAG';

//액션 생성함수 만들기
export const setTags = (tagArr) => ({
  type: SET_TAGS,
  tagArr,
});
export const addTag = (newTag) => ({
  type: ADD_TAG,
  newTag,
});
export const fixTag = (tagID, fixedTag) => ({
  type: FIX_TAG,
  tagID,
  fixedTag,
});
export const deleteTag = (tagID) => ({
  type: DELETE_TAG,
  tagID,
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
      return [...state, action.newTag];
    }
    case FIX_TAG: {
      const newState = state.map((tag) =>
        tag.id === action.tagID ? action.fixedTag : tag
      );
      return newState;
    }
    case DELETE_TAG: {
      const newState = state.filter((tag) => tag.id !== action.tagID);
      return newState;
    }
    default:
      return state;
  }
};

export default tag;
