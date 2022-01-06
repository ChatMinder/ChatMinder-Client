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

import {
  TagBox,
  BookmarkItem,
  BookmarkBox,
  TextItem,
} from '../styles/TextContainerStyle';

const empty = require('../assets/emptyBookmark.png');
const fulled = require('../assets/fulledBookmark.png');

const TextContainer = ({ memo, navigation, destination, history }) => {
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
      tagName: memo.tagName,
      tagColor: memo.tagColor,
      isMarked: memo.isMarked,
      history: history,
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
            <TagBox backgroundColor={memo.tagColor}>
              <TextR>
                <TextItem>{memo.tagName}</TextItem>
              </TextR>
            </TagBox>
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

const BookmarkButton = styled.TouchableHighlight``;
