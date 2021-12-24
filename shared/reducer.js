// 액션 타입 정의
const ADD_CATEGORY = 'ADD_CATEGORY';
const ADD_MEMO = 'ADD_MEMO';
const SET_MEMO_IN_CATEGORY = 'SET_MEMO_IN_CATEGORY';

//액션 생성함수 만들기
export const addCategory = (categoryName) => ({
  type: ADD_CATEGORY,
  categoryName,
});
export const addMemo = (categoryName, memoText) => ({
  type: ADD_MEMO,
  categoryName,
  memoText,
});
export const setMemoInCategory = (categoryName) => ({
  type: SET_MEMO_IN_CATEGORY,
  categoryName,
});

//초기 상태 선언
//각 요소가 객체로 이뤄진 배열 형태의 state
const initialState = [];

//새 메모의 category가 기존의 것과 중복되는지의 여부를 담는 변수
let categoryExist = false;

//리듀서 선언
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CATEGORY: {
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
              setMemoInThis: false,
            },
          ]
        : [
            {
              categoryID: newCategoryID,
              categoryName: action.categoryName,
              memos: [],
              categoryColor: '',
              setMemoInThis: false,
            },
          ];

      //기존에 메모가 있을 경우
      if (tempState.length > 1) {
        //기존 category에서 같은 이름의 category가 있는지 검사
        tempState[0].map((element) => {
          if (element.categoryName === action.categoryName) {
            categoryExist = true;
            element.setMemoInThis = true;
          }
        });
        //기존과 같은 카테고리가 있으면 state에서 그대로 리턴
        if (categoryExist) {
          categoryExist = false;
          return [...tempState];
        }

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
    case SET_MEMO_IN_CATEGORY: {
      // categoryIDToSetMemo로 해당 카테고리에 가서 memos에 state.length-1의 메모 id 추가해 준 거 리턴
      return [...state];
    }
    default:
      return state;
  }
}
