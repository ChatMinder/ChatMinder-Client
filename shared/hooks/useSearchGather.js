import React, { useEffect, useState } from 'react';

const useSearchGather = (memos) => {
  const [searchText, setSearchText] = useState('');
  const [memoArr, setMemoArr] = useState(memos);
  const [renderState, setRenderState] = useState(memos);

  //memos값이 업데이트될 때 renderState도 업데이트되도록 useEffect 구현
  useEffect(() => {
    setRenderState(memos);
  }, [memos]);

  //검색 시 memoArr를 수정해 주는 useEffect
  useEffect(() => {
    setMemoArr(
      memos.filter((item) =>
        item.tag_name
          ? item.tag_name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.memo_text.toLowerCase().includes(searchText.toLowerCase())
          : item.memo_text.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText]);

  //memoArr이 수정될 시 renderState를 반환
  useEffect(() => {
    setRenderState(memoArr);
  }, [memoArr]);

  const onSearchChange = (text) => {
    setSearchText(text);
  };

  return [onSearchChange, renderState];
};

export default useSearchGather;
