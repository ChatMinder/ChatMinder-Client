import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Search from '../components/Search';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import MemoInputForm from '../components/MemoInputForm';
import MemoItem from '../components/MemoItem';

const Home = ({ navigation: { setOptions } }) => {
  const memoObj = useSelector((state) => state);
  console.log(memoObj);

  const onDeletePress = () => {
    alert('delete');
    //API 삭제 로직 넣기
  };

  useEffect(() => {
    setOptions({
      headerRight: () => <Search />,
    });
  });

  return (
    <View>
      <Text>Home</Text>
      {memoObj.map(
        (memo) => memo.memoText && <MemoItem memo={memo} key={memo.momoID} />
      )}

      <MemoInputForm />
    </View>
  );
};

export default Home;
