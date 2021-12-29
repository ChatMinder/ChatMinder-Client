import React, { useState, useEffect } from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableHighlight,
  Alert,
} from 'react-native';
import styled, { css } from 'styled-components/native';
import palette from '../../shared/palette';
import Search from '../../shared/components/Search';
// import InputBox from '../../components/InputBox';
import MemoDate from '../../shared/components/MemoDate';
import moment from 'moment';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const empty = require('../../shared/assets/emptyBookmark.png');
const fulled = require('../../shared/assets/fulledBookmark.png');

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
  flex-wrap: wrap;
`;

const TextItem = styled.View`
  ${CommonCenter}
  border: black 1px solid;
  width: 200px;
  margin: 0 3% 3%;
  padding: 5px;
`;

const TextItems = styled.View`
  flex-direction: row;
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

const DateItem = styled.View`
  width: 100%;
`;

const gatherText = ({ navigation }) => {
  const value = useSelector((state) => state);
  console.log('value: ', value);
  const dispatch = useDispatch();
  // value.slice(1)
  const [memos, setMemos] = useState(
    value.filter((element, index) => index > 0)
  );
  //console.log(moment.unix(value[1].memoID).format('YYYY-MM-DD'));

  useEffect(() => {
    setMemos(memos);
  }, [memos]);

  const handleDelete = (id) => {
    Alert.alert('삭제 확인', '정말 삭제하시겠습니까?', [
      {
        text: '취소',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: '삭제',
        onPress: () => setMemos(memos.filter((memo) => memo.memoID !== id)),
      },
    ]);
  };

  return (
    <View>
      <Text>텍스트 모아보기</Text>
      <ButtonBox>
        <InputItem placeholder="검색어를 입력해주세요" />
        <Search />
      </ButtonBox>
      <TextBox>
        {memos.map((memo, index) => (
          <>
            <DateItem>
              {index !== 0 ? (
                moment.unix(value[index - 1].memoID).format('YYYY-MM-DD') !==
                moment.unix(memo.memoID).format('YYYY-MM-DD') ? (
                  <View />
                ) : (
                  <MemoDate memoID={memo.memoID} />
                )
              ) : (
                <MemoDate memoID={memo.memoID} />
              )}
            </DateItem>
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
              onLongPress={() => handleDelete(memo.memoID)}
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
          </>
        ))}
      </TextBox>
    </View>
  );
};

export default gatherText;
