//유효한 ID인지 확인
export const checkValidID = (str) => {
  let reg_id = /^[a-z0-9_-]{4,20}$/; //소문자 + 숫자 + _ + - + 4~20자리
  if (!reg_id.test(str)) return false;
  else return true;
};

export const checkValidPW = (str) => {
  let reg_pw = /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/; //특수문자 포함한 6~24자리
  if (!reg_pw.test(str)) return false;
  else return true;
};

//유효한 URL인지 확인
const validURL = (str) => {
  let pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  //str이 URL인지 아닌지를 검사하고 결과를 boolean으로 리턴
  return !!pattern.test(str);
};

export const checkIncludeURL = (str) => {
  const split_str = str.split(' ');
  let URL = null;
  split_str.forEach((element) => {
    if (validURL(element)) {
      URL = element;
    }
  });
  return URL;
};
