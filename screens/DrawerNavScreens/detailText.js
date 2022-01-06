import React, { useEffect } from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import TextR from '../../shared/components/TextR';
import palette from '../../shared/palette';

import {
  TagBox,
  BookmarkItem,
  BookmarkBox,
  TextItem,
} from '../../shared/styles/TextContainerStyle';

const empty = require('../../shared/assets/emptyBookmark.png');
const fulled = require('../../shared/assets/fulledBookmark.png');
const goBack = require('../../shared/assets/GoBack.png');
const goBackLight = require('../../shared/assets/goBack_light.png');

const detailText = ({ route, navigation }) => {
  console.log(route);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <Wrapper>
      <BookmarkBox marginBottom="15px">
        <TouchableOpacity onPress={() => navigation.navigate('gatherText')}>
          <BookmarkItem source={goBack} />
        </TouchableOpacity>
        {route.params.isMarked ? (
          <BookmarkItem source={fulled} />
        ) : (
          <BookmarkItem source={empty} />
        )}
      </BookmarkBox>

      <TextR>
        <TagBox backgroundColor={route.params.tagColor}>
          <TouchableOpacity>
            <TextItem>{route.params.tagName}</TextItem>
          </TouchableOpacity>
          <View>
            <BookmarkItem source={goBackLight} />
          </View>
        </TagBox>
      </TextR>

      <Margin>
        <TextR>
          <Text16px>{route.params.memoText}</Text16px>
        </TextR>
      </Margin>
      {/* <Button title="Go back" onPress={() => navigation.goBack('gatherText')} /> */}
    </Wrapper>
  );
};

export default detailText;

const Text16px = styled.Text`
  font-size: 16px;
`;

const Wrapper = styled.View`
  margin: 20px 15px;
`;

const Margin = styled.View`
  margin-top: 10px;
`;
