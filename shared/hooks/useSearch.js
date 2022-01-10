import React, { useEffect, useState } from 'react';

const useSearch = (memoData) => {
  const [searchText, setSearchText] = useState('');
  const [memoArr, setMemoArr] = useState(memoData);
  const [renderState, setRenderState] = useState(memoData);

  //검색 시 memoArr를 수정해 주는 useEffect - memoObj에서 index0을 잘라내고 진행
  useEffect(() => {
    setMemoArr(
      memoData.filter(
        (item) =>
          item.memo_text.toLowerCase().includes(searchText.toLowerCase()) ||
          item.tag_name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText]);

  //memoArr이 수정될 시 index0을 다시 붙여서 renderState를 반환
  useEffect(() => {
    setRenderState(memoArr);
  }, [memoArr]);

  const onSearchChange = (text) => {
    setSearchText(text);
  };

  return [onSearchChange, renderState];
};

export default useSearch;
