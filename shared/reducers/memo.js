// 액션 타입 정의
const SET_MEMOS = 'SET_MEMOS';
const ADD_MEMO = 'ADD_MEMO';
const ADD_IMG_IN_MEMO = 'ADD_IMG_IN_MEMO';
const FIX_MEMO = 'FIX_MEMO';
const DELETE_MEMO = 'DELETE_MEMO';
const BOOKMARK_MEMO = 'BOOKMARK_MEMO';

//액션 생성함수 만들기
export const setMemos = (memoArr) => ({
  type: SET_MEMOS,
  memoArr,
});
export const addMemo = (newMemo) => ({
  type: ADD_MEMO,
  newMemo,
});
export const fixMemo = (memoID, fixedMemo) => ({
  type: FIX_MEMO,
  memoID,
  fixedMemo,
});
export const delMemo = (memoID) => ({
  type: DELETE_MEMO,
  memoID,
});
export const addImgInMemo = (images) => ({
  type: ADD_IMG_IN_MEMO,
  images,
});
export const bookmarkMemo = (memoID) => ({
  type: BOOKMARK_MEMO,
  memoID,
});

//초기 상태 선언
const initialState = [];

//리듀서 선언
const memo = (state = initialState, action) => {
  switch (action.type) {
    case SET_MEMOS: {
      return action.memoArr;
    }
    case ADD_MEMO: {
      return [...state, action.newMemo];
    }
    case FIX_MEMO: {
      //memoID로 state에서 메모 객체를 찾아서 응답 받은 메모 객체로 replace
      const newState = state.map((memo) =>
        memo.id === action.memoID ? action.fixedMemo : memo
      );
      return newState;
    }
    case DELETE_MEMO: {
      //action.memoID로 전체 메모 배열에서 해당 메모 객체 삭제
      const newState = state.filter((memo) => memo.id !== action.memoID);
      return newState;
    }
    case ADD_IMG_IN_MEMO: {
      //응답으로 오는 배열 전체 메모 배열에서 해당 메모 객체 안에 images라는 변수에 넣기
      const newState = state.map((memo, index) =>
        index === state.length - 1 ? { ...memo, images: action.images } : memo
      );
      return newState;
    }
    case BOOKMARK_MEMO: {
      //memoID로 state에서 메모 객체를 찾아서 응답 받은 메모 객체로 replace
      const newState = state.map((memo) =>
        memo.id === action.memoID
          ? { ...memo, is_marked: !memo.is_marked }
          : memo
      );
      return newState;
    }
    default:
      return state;
  }
};

export default memo;
