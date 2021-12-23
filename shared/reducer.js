// 액션 타입 정의
const SET_CATEGORY = 'SET_CATEGORY';
const ADD_MEMO = 'ADD_MEMO';

//액션 생성함수 만들기
export const setCategory = (categoryName) => ({
  type: SET_CATEGORY,
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
//각 요소가 객체로 이뤄진 배열 형태의 state
const initialState = [];

//리듀서 선언
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORY: {
      const tempState = state;
      const newCategoryID =
        tempState.length > 1
          ? tempState[0][tempState[0].length - 1].categoryID + 1
          : 1;

      const index0 = tempState[0]
        ? [
            ...tempState[0],
            {
              categoryID: newCategoryID,
              categoryName: action.categoryName,
              memos: [],
              categoryColor: '',
            },
          ]
        : [
            {
              categoryID: newCategoryID,
              categoryName: action.categoryName,
              memos: [],
              categoryColor: '',
            },
          ];

      //기존에 메모가 있을 경우
      if (tempState.length > 1) {
        //기존 state의 index0을 삭제하고, 새로운 index0을 넣어 return
        tempState.shift();
        return [index0, ...tempState];
      }

      //처음 메모를 추가할 경우
      else {
        return [index0];
      }
    }
    case ADD_MEMO: {
      //새로 추가될 메모에게 ID 부여 : 첫 메모면 1, 이후면 그 전 메모의 ID+1
      const newMemoID =
        state.length === 1 ? 1 : state[state.length - 1].memoID + 1;
      return [
        ...state,
        {
          memoID: newMemoID,
          memoText: action.memoText,
          categoryID: action.categoryName,
          categoryName: action.categoryName,
        },
      ];
    }
    default:
      return state;
  }
}
