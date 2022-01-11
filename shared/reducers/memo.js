import palette from '../palette';

// 액션 타입 정의
const ADD_MEMO = 'ADD_MEMO';
const ADD_IMG_IN_MEMO = 'ADD_IMG_IN_MEMO';
const FIX_MEMO = 'FIX_MEMO';
const DELETE_MEMO = 'DELETE_MEMO';
const BOOKMARK_MEMO = 'BOOKMARK_MEMO';

//액션 생성함수 만들기
export const addMemo = (memoObj) => ({
  type: ADD_MEMO,
  memoObj,
});
export const fixMemo = () => ({
  type: FIX_MEMO,
});
export const deleteMemo = (memoID) => ({
  type: DELETE_MEMO,
  memoID,
});
export const addImgInMemo = (memoID, images) => ({
  type: ADD_IMG_IN_MEMO,
  memoID,
  images,
});
export const bookmarkMemo = (memoID) => ({
  type: BOOKMARK_MEMO,
  memoID,
});

//초기 상태 선언
// const initialState = []

//테스트용 더미 데이터
const initialState = [
  {
    id: 132,
    memo_text: 'ㅋ',
    url: null,
    tag_id: 9,
    tag_name: 'ㅋ',
    tag_color: '#FFBE6C',
    is_marked: false,
    timestamp: '1641872112',
    created_at: '2022-01-11T03:35:12.882634',
    updated_at: '2022-01-11T03:35:12.882664',
    images: [
      {
        id: 49,
        memo_id: 132,
        user_id: 17,
        created_at: '2022-01-11T03:35:13.731807',
        updated_at: '2022-01-11T03:35:13.731832',
        url: '1212122/Md3JFr5unhjwwrsuHw41Oiz7opEoy4.jpg',
        name: 'Md3JFr5unhjwwrsuHw41Oiz7opEoy4.jpg',
      },
    ],
  },
  {
    id: 133,
    memo_text: '준환태그에 글!',
    url: null,
    tag_id: 10,
    tag_name: '태그준환',
    tag_color: '#FFD84E',
    images: [],
    is_marked: false,
    timestamp: '1641872242',
    created_at: '2022-01-11T03:37:23.060038',
    updated_at: '2022-01-11T03:37:23.060068',
  },
  {
    id: 134,
    memo_text: '태그 없이 글!',
    url: null,
    tag_id: null,
    tag_name: null,
    tag_color: null,
    images: [],
    is_marked: false,
    timestamp: '1641872253',
    created_at: '2022-01-11T03:37:33.931343',
    updated_at: '2022-01-11T03:37:33.931372',
  },
  {
    id: 135,
    memo_text: '새 태그에 링크 ',
    url: 'www.naver.com',
    tag_id: 42,
    tag_name: '새 태그',
    tag_color: '#5DA7EF',
    images: [],
    is_marked: false,
    timestamp: '1641872270',
    created_at: '2022-01-11T03:37:51.744546',
    updated_at: '2022-01-11T03:37:51.744566',
  },
  {
    id: 136,
    memo_text: '태그는 없는데 이미지는 3개임',
    url: null,
    tag_id: null,
    tag_name: null,
    tag_color: null,
    is_marked: false,
    timestamp: '1641872294',
    created_at: '2022-01-11T03:38:15.419141',
    updated_at: '2022-01-11T03:38:15.419171',
    images: [
      {
        id: 50,
        memo_id: 136,
        user_id: 17,
        created_at: '2022-01-11T03:38:16.519473',
        updated_at: '2022-01-11T03:38:16.519493',
        url: '1212122/qK7LPrmtIuAkHF38UmsQesZtiAFcUl.jpg',
        name: 'qK7LPrmtIuAkHF38UmsQesZtiAFcUl.jpg',
      },
      {
        id: 51,
        memo_id: 136,
        user_id: 17,
        created_at: '2022-01-11T03:38:16.681504',
        updated_at: '2022-01-11T03:38:16.681529',
        url: '1212122/lZEspPKNFFz2zUNXp340c6TcbwR44j.jpg',
        name: 'lZEspPKNFFz2zUNXp340c6TcbwR44j.jpg',
      },
      {
        id: 52,
        memo_id: 136,
        user_id: 17,
        created_at: '2022-01-11T03:38:16.811975',
        updated_at: '2022-01-11T03:38:16.812002',
        url: '1212122/CuoyJdf792g1fGV1XbTGy0sjNN5IYG.jpg',
        name: 'CuoyJdf792g1fGV1XbTGy0sjNN5IYG.jpg',
      },
    ],
  },
  {
    id: 137,
    memo_text: 'ㅎㅎ그냥 텍스트',
    url: null,
    tag_id: 9,
    tag_name: 'ㅋ',
    tag_color: '#FFBE6C',
    images: [],
    is_marked: false,
    timestamp: '1641872318',
    created_at: '2022-01-11T03:38:38.967629',
    updated_at: '2022-01-11T03:38:38.967663',
  },
  {
    id: 138,
    memo_text: '',
    url: 'www.naver.com',
    tag_id: 9,
    tag_name: 'ㅋ',
    tag_color: '#FFBE6C',
    images: [],
    is_marked: false,
    timestamp: '1641872327',
    created_at: '2022-01-11T03:38:47.784560',
    updated_at: '2022-01-11T03:38:47.784588',
  },
];

//리듀서 선언
const memo = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MEMO: {
      return [...state, action.memoObj];
    }
    case FIX_MEMO: {
      return [...state];
    }
    case DELETE_MEMO: {
      //action.memoID로 전체 메모 배열에서 해당 메모 객체 삭제
      return [...state];
    }
    case ADD_IMG_IN_MEMO: {
      //응답으로 오는 배열 전체 메모 배열에서 해당 메모 객체 안에 images라는 변수에 넣기
      const newState = state.map((memo, index) =>
        index === state.length - 1 ? { ...memo, images: action.images } : memo
      );
      return newState;
    }
    case BOOKMARK_MEMO: {
      //action.id로 전체 메모 배열에서 해당 메모 객체로 replace(바꾸기)
      return [...state];
    }
    default:
      return state;
  }
};

export default memo;
