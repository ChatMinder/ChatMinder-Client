import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useSearch = () => {
  const memoData = useSelector((state) => state.memoData);

  const [searchText, setSearchText] = useState('');
  const [memoArr, setMemoArr] = useState(memoData);
  const [renderState, setRenderState] = useState(memoData);

  //memoData값이 업데이트될 때 renderState도 업데이트되도록 useEffect 구현
  useEffect(() => {
    setRenderState(memoData);
  }, [memoData]);

  //검색 시 memoArr를 수정해 주는 useEffect
  useEffect(() => {
    setMemoArr(
      memoData.filter((item) =>
        item.memo_text.toLowerCase().includes(searchText.toLowerCase())
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
