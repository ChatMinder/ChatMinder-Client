import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

const useSearch = (screen) => {
  const everyMemo = useSelector((state) => state.memoData);
  const memoData = useMemo(() => {
    if (screen === 'Main') {
      return everyMemo;
    } else if (screen === 'Img') {
      return everyMemo.filter((element) => element.images.length > 0);
    } else if (screen === 'Link') {
      return everyMemo.filter((element) => element.url !== null);
    } else if (screen === 'Text') {
      return everyMemo.filter(
        (element) => element.url === null && element.images.length === 0
      );
    }
  });

  const [searchText, setSearchText] = useState('');
  const [memoArr, setMemoArr] = useState(memoData);
  const [renderState, setRenderState] = useState(memoData);

  // 리덕스에서 메모 상태가 업데이트될 때 renderState도 업데이트하는 useEffect
  useEffect(() => {
    setRenderState(memoData);
  }, [everyMemo]);

  //검색 시 memoArr를 수정해 주는 useEffect
  useEffect(() => {
    setMemoArr(
      memoData.filter((item) =>
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

export default useSearch;
