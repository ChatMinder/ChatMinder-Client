// 액션 타입 정의
const SET_TOKEN = 'SET_TOKEN';

//액션 생성함수 만들기
export const setLoginState = (token) => ({
  type: SET_TOKEN,
  token,
});

//초기 상태 선언
const initialState = { isLoggedIn: false, accessToken: null };

//리듀서 선언
const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN: {
      return { isLoggedIn: true, accessToken: action.token };
    }
    default:
      return state;
  }
};

export default auth;
