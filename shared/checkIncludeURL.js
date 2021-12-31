const validURL = (str) => {
  var pattern = new RegExp(
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
  split_str.forEach((element) => {
    if (validURL(element)) {
      console.log(element);
      return element;
    }
  });
  return false;
};
