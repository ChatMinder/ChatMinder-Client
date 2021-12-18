import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import Search from '../components/Search';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Home = ({ navigation: { setOptions } }) => {
  const [memoText, setMemoText] = useState('');

  const submitMemo = () => {
    alert('submitted');
  };

  useEffect(() => {
    setOptions({
      headerRight: () => <Search />,
    });
  });

  return (
    <View>
      <Text>Home</Text>
      <InputMemo
        onChangeText={setMemoText}
        value={memoText}
        onSubmitEditing={submitMemo}
      />
    </View>
  );
};

const InputMemo = styled.TextInput`
  border: 1px solid green;
`;

export default Home;
