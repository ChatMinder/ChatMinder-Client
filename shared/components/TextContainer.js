import React from 'react';
import {
  Text,
  TouchableHighlight,
  Alert,
  TouchableOpacity,
  View,
} from 'react-native';
import styled, { css } from 'styled-components/native';
import palette from '../palette';
import TextR from './TextR';

const empty = require('../assets/emptyBookmark.png');
const fulled = require('../assets/fulledBookmark.png');

const TextContainer = ({ memo, navigation, destination }) => {
  const handleDelete = (id) => {
    Alert.alert('삭제 확인', '정말 삭제하시겠습니까?', [
      {
        text: '취소',
        onPress: () => console.log('취소되었습니다.'),
        style: 'cancel',
      },
      {
        text: '삭제',
        onPress: () => setMemos(memos.filter((memo) => memo.memoID !== id)),
      },
    ]);
  };

  const handlePress = (memo) => {
    navigation.navigate(`${destination}`, {
      id: memo.memoID,
      memoText: memo.memoText,
      categoryName: memo.categoryName,
      isMarked: memo.isMarked,
    });
  };

  return (
    <TouchableHighlight
      onPress={() => {
        handlePress(memo);
      }}
      onLongPress={() => handleDelete(memo.memoID)}
    >
      <Container>
        <TextR>{memo.memoText}</TextR>
        <BookmarkBox>
          {memo.tagName ? (
            <CategoryBox>
              <TextR>
                <TextItem>{memo.tagName}</TextItem>
              </TextR>
            </CategoryBox>
          ) : (
            <View />
          )}

          <BookmarkButton
            onPress={() => {
              console.log('북마크');
            }}
          >
            {memo.isMarked ? (
              <BookmarkItem source={fulled} />
            ) : (
              <BookmarkItem source={empty} />
            )}
          </BookmarkButton>
        </BookmarkBox>
      </Container>
    </TouchableHighlight>
  );
};

export default TextContainer;

const Container = styled.View`
  background-color: white;
  margin-bottom: 4%;
  border-radius: 10px;
  padding: 1.5%;
`;

const BookmarkItem = styled.Image`
  width: 15px;
  height: 15px;
`;

const BookmarkBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const BookmarkButton = styled.TouchableHighlight``;

const CategoryBox = styled.View`
  background-color: ${(props) =>
    props.backgroundColor || `${palette.lightGreen}`};
  border-radius: 5px;
  padding: 0 5px;
`;

const TextItem = styled.Text`
  color: white;
`;
