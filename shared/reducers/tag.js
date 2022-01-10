import palette from '../palette';

// 액션 타입 정의
const ADD_TAG = 'ADD_TAG';
const FIX_TAG = 'FIX_TAG';

//액션 생성함수 만들기
export const addTag = () => ({
  type: ADD_TAG,
});
export const fixTag = () => ({
  type: FIX_TAG,
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
    case FIX_TAG: {
      return [...state];
    }
    default:
      return state;
  }
};

export default tag;
