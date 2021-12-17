// 액션 타입 정의
const SET_CATEGORY = 'SET_CATEGORY';
const SET_MEMO = 'SET_MEMO';

//액션 생성함수 만들기
export const setCategory = (categoryID, categoryName) => ({
  type: SET_CATEGORY,
  categoryID,
  categoryName,
});
export const setMemo = (memoText) => ({
  type: SET_MEMO,
  memoText,
});

//초기 상태 선언
const initialState = {
  categoryID: 0,
  categoryName: '',
  memoText: '',
};

//리듀서 선언
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORY: {
      return {
        ...state,
        categoryID: action.categoryID,
        categoryName: action.categoryName,
      };
    }
    case SET_MEMO: {
      return {
        ...state,
        memoText: action.memoText,
      };
    }
    default:
      return state;
  }
}
