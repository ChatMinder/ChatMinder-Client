import moment from 'moment';
import palette from './palette';

// 액션 타입 정의
const ADD_TAG = 'ADD_TAG';
const ADD_MEMO = 'ADD_MEMO';
const SET_MEMO_IN_TAG = 'SET_MEMO_IN_TAG';

//액션 생성함수 만들기
export const addTag = (tagName) => ({
  type: ADD_TAG,
  tagName,
});
export const addMemo = (tagName, memoText) => ({
  type: ADD_MEMO,
  tagName,
  memoText,
});
export const setMemoInTag = (tagName) => ({
  type: SET_MEMO_IN_TAG,
  tagName,
});

//초기 상태 선언
//각 요소가 객체로 이뤄진 배열 형태의 state
// const initialState = [];

//테스트용 더미 데이터
const initialState = [
  [
    {
      tagColor: `${palette.blue}`,
      tagID: 1,
      tagName: '과제준비물먹을거',
      memos: [1640579001552, 1640579008194, 1640614413272],
    },
    {
      tagColor: `${palette.lightOrange}`,
      tagID: 2,
      tagName: '준비물',
      memos: [1640579010766, 1640614272078],
    },
    {
      tagColor: `${palette.green}`,
      tagID: 3,
      tagName: '먹을거',
      memos: [1640579012666],
    },
    {
      tagColor: ``,
      tagID: 4,
      tagName: '',
      memos: [1640614414223, 1640614416422],
    },
  ],
  {
    tagName: '과제준비물먹을거',
    tagColor: `${palette.blue}`,
    memoID: 1638668525,
    timestamp: 1638668525,
    memoText: '프론트엔드 과제',
    isImg: '',
    isLink: '',
    isMarked: true,
  },
  {
    tagName: '과제준비물먹을거',
    tagColor: `${palette.blue}`,
    memoID: 1638668925,
    timestamp: 1638668925,
    memoText: '교양 과제',
    isImg: '',
    isLink: '',
    isMarked: false,
  },
  {
    tagName: '준비물',
    tagColor: `${palette.lightOrange}`,
    memoID: 1638668926,
    timestamp: 1638668926,
    memoText:
      '물로켓 물로켓 물로켓 물로켓 물로켓 물로켓 물로켓 물로켓 물로켓 물로켓 ',
    isImg: '',
    isLink: '',
    isMarked: true,
  },
  {
    tagName: '먹을거',
    tagColor: `${palette.green}`,
    memoID: 1640668525,
    timestamp: 1640668525,
    memoText: 'abc',
    isImg: '',
    isLink: '',
    isMarked: false,
  },
  {
    tagName: '준비물',
    tagColor: `${palette.lightOrange}`,
    memoID: 1640668601,
    timestamp: 1640668601,
    memoText: '고무동력기',
    isImg: '',
    isLink: '',
    isMarked: false,
  },
  {
    tagName: '과제준비물먹을거',
    tagColor: `${palette.blue}`,
    memoID: 1640668658,
    timestamp: 1640668658,
    memoText: '자료구조 과제',
    isImg: '',
    isLink: 'naver.com',
    isMarked: false,
  },
  {
    tagName: '',
    tagColor: ``,
    memoID: 1640668659,
    timestamp: 1640668659,
    memoText: '빈 카테고리',
    isImg: '',
    isLink: '',
    isMarked: false,
  },
  {
    tagName: '',
    tagColor: ``,
    memoID: 1640668670,
    timestamp: 1640668670,
    memoText: '빈 카테고리 캬캬',
    isImg: '',
    isLink: '',
    isMarked: false,
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
      const newtagID =
        tempState.length > 1
          ? tempState[0][tempState[0].length - 1].tagID + 1
          : 1;

      const index0 = tempState[0]
        ? [
            ...tempState[0],
            {
              tagID: newtagID,
              tagName: action.tagName,
              memos: [],
              tagColor: '',
              setMemoInThis: true,
            },
          ]
        : [
            {
              tagID: newtagID,
              tagName: action.tagName,
              memos: [],
              tagColor: '',
              setMemoInThis: true,
            },
          ];

      //기존에 메모가 있을 경우
      if (tempState.length > 1) {
        //기존 category에서 같은 이름의 category가 있는지 검사
        tempState[0].map((element) => {
          if (element.tagName === action.tagName) {
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
          tagName: action.tagName,
          memoID: timestamp,
          memoText: action.memoText,
          isImg: '',
          isLink: '',
          isMarked: false,
        },
      ];
    }
    //카테고리 객체 내부의 memos 배열 속에 memoID 추가
    case SET_MEMO_IN_TAG: {
      // setMemoInThis가 true인 객체에서 memos에 state.length-1의 메모 id 추가해 준 거 리턴
      const tempState = state;
      tempState[0].map((element) => {
        if (element.setMemoInThis) {
          element.memos = [
            ...element.memos,
            tempState[tempState.length - 1].memoID,
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
