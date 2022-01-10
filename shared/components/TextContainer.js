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
  BookmarkBox2,
  TextItem,
  BoxContainer,
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
        onPress: () => setMemos(memos.filter((memo) => memo.id !== id)),
      },
    ]);
  };

  const handlePress = (memo) => {
    navigation.navigate(`${destination}`, {
      id: memo.id,
      memo_text: memo.memo_text,
      tag_name: memo.tag_name,
      tag_color: memo.tag_color,
      is_marked: memo.is_marked,
      history: history,
    });
  };

  return (
    <TouchableHighlight
      onPress={() => {
        handlePress(memo);
      }}
      onLongPress={() => handleDelete(memo.is_marked)}
    >
      <BoxContainer>
        <TextR>{memo.memo_text}</TextR>
        <BookmarkBox2>
          {memo.tag_name ? (
            <TagBox backgroundColor={memo.tag_color}>
              <TextR>
                <TextItem>{memo.tag_name}</TextItem>
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
            {memo.is_marked ? (
              <BookmarkItem source={fulled} />
            ) : (
              <BookmarkItem source={empty} />
            )}
          </BookmarkButton>
        </BookmarkBox2>
      </BoxContainer>
    </TouchableHighlight>
  );
};

export default TextContainer;

const BookmarkButton = styled.TouchableHighlight``;
