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

const empty = require('../assets/emptyBookmark.png');
const fulled = require('../assets/fulledBookmark.png');

const TextContainer = ({ memo, handleDelete, handlePress }) => {
  return (
    <BookmarkBox>
      <TouchableHighlight
        onPress={() => {
          handlePress(memo);
        }}
        onLongPress={() => handleDelete(memo.memoID)}
      >
        <TextItem>
          <Text>{memo.memoText}</Text>
          <Text>{memo.categoryName}</Text>
        </TextItem>
      </TouchableHighlight>
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
  );
};

export default TextContainer;

const BookmarkItem = styled.Image`
  width: 10px;
  height: 10px;
`;

const BookmarkBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const BookmarkButton = styled.TouchableHighlight`
  border: 1px solid red;
`;

const CommonCenter = css`
  flex-direction: column;
`;

const TextItem = styled.View`
  ${CommonCenter}
  border: black 1px solid;
  padding: 5px;
`;
