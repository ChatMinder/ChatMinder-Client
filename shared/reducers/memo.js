import palette from '../palette';

// 액션 타입 정의
const ADD_MEMO = 'ADD_MEMO';
const ADD_IMG_IN_MEMO = 'ADD_IMG_IN_MEMO';
const FIX_MEMO = 'FIX_MEMO';
const DELETE_MEMO = 'DELETE_MEMO';
const BOOKMARK_MEMO = 'BOOKMARK_MEMO';

//액션 생성함수 만들기
export const addMemo = (newMemo) => ({
  type: ADD_MEMO,
  newMemo,
});
export const fixMemo = (memoID, fixedMemo) => ({
  type: FIX_MEMO,
  memoID,
  fixedMemo,
});
export const deleteMemo = (memoID) => ({
  type: DELETE_MEMO,
  memoID,
});
export const addImgInMemo = (images) => ({
  type: ADD_IMG_IN_MEMO,
  images,
});
export const bookmarkMemo = (memoID, fixedMemo) => ({
  type: BOOKMARK_MEMO,
  memoID,
  fixedMemo,
});

//초기 상태 선언
// const initialState = []

//테스트용 더미 데이터
const initialState = [
  {
    created_at: '2022-01-11T04:42:42.988898',
    id: 139,
    images: [],
    is_marked: false,
    memo_text: '메모1',
    tag_color: null,
    tag_id: null,
    tag_name: null,
    timestamp: '1641876162',
    updated_at: '2022-01-11T04:42:42.988928',
    url: null,
  },
  {
    created_at: '2022-01-11T04:42:53.415138',
    id: 140,
    images: [],
    is_marked: false,
    memo_text: '메모2',
    tag_color: '#FFBE6C',
    tag_id: 9,
    tag_name: 'ㅋ',
    timestamp: '1641876172',
    updated_at: '2022-01-11T04:42:53.415167',
    url: null,
  },
  {
    created_at: '2022-01-11T04:43:02.324597',
    id: 141,
    images: [],
    is_marked: false,
    memo_text: '메모3',
    tag_color: '#FFD84E',
    tag_id: 10,
    tag_name: '태그준환',
    timestamp: '1641876181',
    updated_at: '2022-01-11T04:43:02.324627',
    url: null,
  },
  {
    created_at: '2022-01-11T04:43:11.486402',
    id: 142,
    images: [],
    is_marked: false,
    memo_text: '메모4',
    tag_color: '#FFE665',
    tag_id: 43,
    tag_name: 'ㅋㅎㅋ',
    timestamp: '1641876190',
    updated_at: '2022-01-11T04:43:11.486423',
    url: null,
  },
];

//리듀서 선언
const memo = (state = initialState, action) => {
  switch (action.type) {
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
        memo.id === action.memoID ? action.fixedMemo : memo
      );
      return newState;
    }
    default:
      return state;
  }
};

export default memo;
