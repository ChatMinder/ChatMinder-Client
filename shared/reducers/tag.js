import palette from '../palette';

// 액션 타입 정의
const ADD_TAG = 'ADD_TAG';
const ADD_MEMO = 'ADD_MEMO';

//액션 생성함수 만들기
export const addTag = (tag_name) => ({
  type: ADD_TAG,
  tag_name,
});
export const addMemo = (tag_name, memo_text) => ({
  type: ADD_MEMO,
  tag_name,
  memo_text,
});

//초기 상태 선언
// const initialState = []

//테스트용 더미 데이터
const initialState = [
  {
    tag: 1,
    tag_color: `${palette.blue}`,
    tag_name: '과제준비물먹을거',
  },
  {
    tag: 2,
    tag_color: `${palette.lightOrange}`,
    tag_name: '준비물',
  },
  {
    tag: 3,
    tag_color: `${palette.green}`,
    tag_name: '먹을거',
  },
  {
    tag: 4,
    tag_color: ``,
    tag_name: '',
  },
];

//리듀서 선언
const tag = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TAG: {
      return [...state];
    }
    case ADD_MEMO: {
      return [...state];
    }
    default:
      return state;
  }
};

export default tag;
