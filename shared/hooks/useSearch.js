import React, { useEffect, useState } from 'react';

const useSearch = (memoObj) => {
  const [searchText, setSearchText] = useState('');
  const [renderMemos, setRenderMemos] = useState(memoObj);
  const [tempMemos, setTempMemos] = useState(memoObj.slice(1));

  // useEffect(() => {
  //   setRenderMemos([...memoObj]);
  // }, [memoObj]);

  //검색 시 renderMemos를 수정해 주는 useEffect
  useEffect(() => {
    setTempMemos(
      tempMemos.filter((item) => item.memoText.includes(searchText))
    );
    console.log(searchText);
  }, [searchText]);

  useEffect(() => {
    setRenderMemos([memoObj[0], ...tempMemos]);
    console.log(renderMemos);
  }, [tempMemos]);

  const onSearchChange = (text) => {
    setSearchText(text);
  };

  return [onSearchChange, renderMemos];
};

export default useSearch;
