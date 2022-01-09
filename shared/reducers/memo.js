import palette from '../palette';

// 액션 타입 정의
const ADD_MEMO = 'ADD_MEMO';
const SET_MEMO_IN_TAG = 'SET_MEMO_IN_TAG';

//액션 생성함수 만들기

export const addMemo = (tag_name, memo_text) => ({
  type: ADD_MEMO,
  tag_name,
  memo_text,
});
export const setMemoInTag = (tag_name) => ({
  type: SET_MEMO_IN_TAG,
  tag_name,
});

//초기 상태 선언
// const initialState = []

//테스트용 더미 데이터
const initialState = [
  {
    tag: 1,
    tag_name: '과제준비물먹을거',
    tag_color: `${palette.blue}`,
    id: 1,
    timestamp: 1638668525,
    memo_text: '프론트엔드 과제',
    images: '',
    url: '',
    is_marked: true,
  },
  {
    tag: 1,
    tag_name: '과제준비물먹을거',
    tag_color: `${palette.blue}`,
    id: 2,
    timestamp: 1638668925,
    memo_text: '교양 과제',
    images: '',
    url: '',
    is_marked: false,
  },
  {
    tag: 2,
    tag_name: '준비물',
    tag_color: `${palette.lightOrange}`,
    id: 3,
    timestamp: 1638668926,
    memo_text:
      '물로켓 물로켓 물로켓 물로켓 물로켓 물로켓 물로켓 물로켓 물로켓 물로켓 ',
    images: '',
    url: '',
    is_marked: true,
  },
  {
    tag: 3,
    tag_name: '먹을거',
    tag_color: `${palette.green}`,
    id: 4,
    timestamp: 1640668525,
    memo_text: 'abc',
    images: '',
    url: '',
    is_marked: false,
  },
  {
    tag: 2,
    tag_name: '준비물',
    tag_color: `${palette.lightOrange}`,
    id: 5,
    timestamp: 1640668601,
    memo_text: '고무동력기',
    images: '',
    url: '',
    is_marked: false,
  },
  {
    tag: 1,
    tag_name: '과제준비물먹을거',
    tag_color: `${palette.blue}`,
    id: 6,
    timestamp: 1640668658,
    memo_text: '자료구조 과제',
    images: '',
    url: 'naver.com',
    is_marked: false,
  },
  {
    tag: 4,
    tag_name: '',
    tag_color: ``,
    id: 7,
    timestamp: 1640668659,
    memo_text: '빈 카테고리',
    images: '',
    url: '',
    is_marked: false,
  },
  {
    tag: 4,
    tag_name: '',
    tag_color: ``,
    id: 8,
    timestamp: 1640668670,
    memo_text: '빈 카테고리 캬캬',
    images: '',
    url: '',
    is_marked: false,
  },
];

//리듀서 선언
const memo = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MEMO: {
      return [...state];
    }
    case SET_MEMO_IN_TAG: {
      return [...state];
    }
    default:
      return state;
  }
};

export default memo;
