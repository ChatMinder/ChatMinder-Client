import React, { useState, useEffect } from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableHighlight,
} from 'react-native';
import styled, { css } from 'styled-components/native';
import palette from '../../palette/palette';
import Search from '../../components/Search';
// import InputBox from '../../components/InputBox';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const empty = require('../../assets/emptyBookmark.png');
const fulled = require('../../assets/fulledBookmark.png');

const InputItem = styled.TextInput`
  background-color: ${palette.gray};
  width: 90%;
  padding-left: 10px;
`;

const ButtonBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const CommonCenter = css`
  flex-direction: column;
`;

const TextBox = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TextItem = styled.View`
  ${CommonCenter}
  border: black 1px solid;
  width: 90%;
  margin: 0 3% 3%;
  padding: 5px;
`;

const BookmarkItem = styled.Image`
  width: 10px;
  height: 10px;
`;

const CategoryBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const gatherText = ({ navigation }) => {
  const value = useSelector((state) => state);
  console.log('value: ', value);

  const [memos, setMemos] = useState([]);

  // useEffect(() => {
  //   setMemos(value.slice(1));
  //   console.log(memos);
  // }, [memos]);

  const handleDelete = () => {
    console.log('삭제');
  };

  return (
    <View>
      <Text>텍스트 모아보기</Text>
      <ButtonBox>
        <InputItem placeholder="검색어를 입력해주세요" />
        <Search />
      </ButtonBox>
      <TextBox>
        {value.slice(1).map((memo) => (
          <TouchableHighlight
            key={memo.memoID}
            onPress={() => {
              navigation.navigate('detailText', {
                id: memo.memoID,
                memoText: memo.memoText,
                categoryName: memo.categoryName,
                isMarked: memo.isMarked,
              });
            }}
            onLongPress={() => handleDelete()}
          >
            <TextItem>
              <Text>{memo.memoText}</Text>
              <CategoryBox>
                <Text>{memo.categoryName}</Text>
                {memo.isMarked ? (
                  <BookmarkItem source={fulled} />
                ) : (
                  <BookmarkItem source={empty} />
                )}
              </CategoryBox>
            </TextItem>
          </TouchableHighlight>
        ))}
      </TextBox>
    </View>
  );
};

export default gatherText;
