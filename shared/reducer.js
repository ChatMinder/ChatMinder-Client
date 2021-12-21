// 액션 타입 정의
const SET_CATEGORY = 'SET_CATEGORY';
const ADD_MEMO = 'ADD_MEMO';

//액션 생성함수 만들기
export const setCategory = (categoryID, categoryName) => ({
  type: SET_CATEGORY,
  categoryID,
  categoryName,
});
export const addMemo = (categoryName, memoText) => ({
  type: ADD_MEMO,
  categoryName,
  memoText,
});

// const initialState = {
//   memoID: 0,
//   categoryID: 0,
//   categoryName: '',
//   memoText: '',
// };

//초기 상태 선언
const initialState = [
  {
    memoID: 0,
    categoryID: 0,
    categoryName: '',
    memoText: '',
  },
];

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
    case ADD_MEMO: {
      return [
        ...state,
        {
          memoID: state[state.length - 1].memoID + 1,
          categoryID: action.categoryName,
        },
      ];
    }
    default:
      return state;
  }
}
