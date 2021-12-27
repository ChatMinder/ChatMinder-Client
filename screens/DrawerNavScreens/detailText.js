import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

const empty = require('../../assets/emptyBookmark.png');
const fulled = require('../../assets/fulledBookmark.png');

const BookmarkItem = styled.Image`
  width: 10px;
  height: 10px;
`;

const detailText = ({ route }) => {
  console.log(route);

  return (
    <View>
      <Text>{route.params.categoryName}</Text>
      {route.params.isMarked ? (
        <BookmarkItem source={fulled} />
      ) : (
        <BookmarkItem source={empty} />
      )}
      <Text>{route.params.memoText}</Text>
    </View>
  );
};

export default detailText;
