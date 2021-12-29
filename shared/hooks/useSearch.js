import React, { useEffect, useState } from 'react';

const useSearch = (memoObj) => {
  const [searchText, setSearchText] = useState('');
  const [memoArr, setMemoArr] = useState(memoObj);
  const [renderState, setRenderState] = useState(memoObj);
  const categoryArr = memoObj[0];

  //검색 시 memoArr를 수정해 주는 useEffect - memoObj에서 index0을 잘라내고 진행
  useEffect(() => {
    setMemoArr(
      memoObj
        .slice(1)
        .filter((item) =>
          item.memoText.toLowerCase().includes(searchText.toLowerCase())
        )
    );
  }, [searchText]);

  //memoArr이 수정될 시 index0을 다시 붙여서 renderState를 반환
  useEffect(() => {
    setRenderState([categoryArr, ...memoArr]);
  }, [memoArr]);

  const onSearchChange = (text) => {
    setSearchText(text);
  };

  return [onSearchChange, renderState];
};

export default useSearch;
