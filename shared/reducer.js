import moment from 'moment';
import palette from './palette';

// 액션 타입 정의
const ADD_TAG = 'ADD_TAG';
const ADD_MEMO = 'ADD_MEMO';
const SET_MEMO_IN_TAG = 'SET_MEMO_IN_TAG';

//액션 생성함수 만들기
export const addTag = (tag_nam) => ({
  type: ADD_TAG,
  tag_name,
});
export const addMemo = (tag_name, memo_text) => ({
  type: ADD_MEMO,
  tag_name,
  memo_text,
});
export const setMemoInTag = (tag_nam) => ({
  type: SET_MEMO_IN_TAG,
  tag_name,
});

//초기 상태 선언
//각 요소가 객체로 이뤄진 배열 형태의 state
// const initialState = [];

//테스트용 더미 데이터
const initialState = [
  [
    {
      tag_color: `${palette.blue}`,
      tag: 1,
      tag_name: '과제준비물먹을거',
    },
    {
      tag_color: `${palette.lightOrange}`,
      tag: 2,
      tag_name: '준비물',
    },
    {
      tag_color: `${palette.green}`,
      tag: 3,
      tag_name: '먹을거',
    },
    {
      tag_color: ``,
      tag: 4,
      tag_name: '',
    },
  ],
  {
    tag: 1,
    tag_name: '과제준비물먹을거',
    tag_color: `${palette.blue}`,
    id: 1638668525,
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
    id: 1638668925,
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
    id: 1638668926,
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
    id: 1640668525,
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
    id: 1640668601,
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
    id: 1640668658,
    timestamp: 1640668658,
    memo_text: '자료구조 과제',
    images: '',
    url: 'naver.com',
    is_marked: false,
  },
  {
    tag: null,
    tag_name: '',
    tag_color: ``,
    id: 1640668659,
    timestamp: 1640668659,
    memo_text: '빈 카테고리',
    images: '',
    url: '',
    is_marked: false,
  },
  {
    tag: null,
    tag_name: '',
    tag_color: ``,
    id: 1640668670,
    timestamp: 1640668670,
    memo_text: '빈 카테고리 캬캬',
    images: '',
    url: '',
    is_marked: false,
  },
];

//새 메모의 category가 기존의 것과 중복되는지의 여부를 담는 변수
let categoryExist = false;

//리듀서 선언
export default function reducer(state = initialState, action) {
  switch (action.type) {
    //입력받은 카테고리가 중복되는 카테고리인지 판별해 index0에 카테고리 추가
    case ADD_TAG: {
      const tempState = state;
      const newtag =
        tempState.length > 1
          ? tempState[0][tempState[0].length - 1].tag + 1
          : 1;

      const index0 = tempState[0]
        ? [
            ...tempState[0],
            {
              tag: newtag,
              tag_name: action.tag_nam,
              memos: [],
              tag_color: '',
              setMemoInThis: true,
            },
          ]
        : [
            {
              tag: newtag,
              tag_name: action.tag_nam,
              memos: [],
              tag_color: '',
              setMemoInThis: true,
            },
          ];

      //기존에 메모가 있을 경우
      if (tempState.length > 1) {
        //기존 category에서 같은 이름의 category가 있는지 검사
        tempState[0].map((element) => {
          if (element.tag_name === action.tag_name) {
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
    //메모 객체 추가
    case ADD_MEMO: {
      //새로 추가될 메모에게 ID 부여 : 첫 메모면 1, 이후면 그 전 메모의 ID+1
      const timestamp = moment().unix();
      return [
        ...state,
        {
          tag_name: action.tag_nam,
          id: timestamp,
          memo_text: action.memo_text,
          images: '',
          url: '',
          is_marked: false,
        },
      ];
    }
    //카테고리 객체 내부의 memos 배열 속에 id 추가
    case SET_MEMO_IN_TAG: {
      // setMemoInThis가 true인 객체에서 memos에 state.length-1의 메모 id 추가해 준 거 리턴
      const tempState = state;
      tempState[0].map((element) => {
        if (element.setMemoInThis) {
          element.memos = [
            ...element.memos,
            tempState[tempState.length - 1].id,
          ];
        }
        element.setMemoInThis = false;
      });
      return [...state];
    }
    default:
      return state;
  }
}
