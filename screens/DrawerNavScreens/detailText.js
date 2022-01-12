import React, { useState, useEffect } from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import TextR from '../../shared/components/TextR';
import palette from '../../shared/palette';
import { TextSize } from '../../shared/styles/FontStyle';
import { useSelector } from 'react-redux';
import { PatchMemo } from '../../shared/API';

import {
  TagBox,
  BookmarkItem,
  BookmarkBox2,
  TextItem,
} from '../../shared/styles/TextContainerStyle';

import ModalListItem from '../../shared/components/ModalListItem';

const empty = require('../../shared/assets/emptyBookmark.png');
const fulled = require('../../shared/assets/fulledBookmark.png');
const goBack = require('../../shared/assets/GoBack.png');
const goBackLight = require('../../shared/assets/goBack_light.png');
const edit = require('../../shared/assets/Edit.png');

const detailText = ({ route, navigation }) => {
  const token = useSelector((state) => state.auth.accessToken);
  //console.log(route.params);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const handleEditMemo = async () => {
    try {
      const patchMemoRes = await PatchMemo(token, id, formData);
      console.log('patchMemoRes 성공: ', patchMemoRes.data);
    } catch (error) {
      console.log(`patchMemoRes 실패: ${error}`);
    }
  };

  return (
    <Wrapper>
      <BookmarkBox2 marginBottom="15px">
        <TouchableOpacity
          onPress={() => navigation.navigate(route.params.history)}
        >
          <BookmarkItem source={goBack} />
        </TouchableOpacity>
        <Buttons>
          <TouchableOpacity>
            <BookmarkItem
              source={edit}
              width="24"
              height="24"
              marginRight="14"
            />
          </TouchableOpacity>
          {route.params.is_marked ? (
            <BookmarkItem source={fulled} />
          ) : (
            <BookmarkItem source={empty} />
          )}
        </Buttons>
      </BookmarkBox2>

      {route.params.tag_name ? (
        <TextR>
          <TagBox backgroundColor={route.params.tag_color}>
            <TouchableOpacity onPress={() => toggleModal()}>
              <TextItem>{route.params.tag_name}</TextItem>
            </TouchableOpacity>
            <View>
              <BookmarkItem source={goBackLight} />
            </View>
          </TagBox>
        </TextR>
      ) : (
        <View />
      )}

      <Margin>
        <TextR>
          <Text16px>{route.params.memo_text}</Text16px>
        </TextR>
      </Margin>
      <ModalListItem
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
      />
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

const Buttons = styled.View`
  flex-direction: row;
  align-items: center;
`;
