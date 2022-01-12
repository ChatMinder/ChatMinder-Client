import React, { useState, useEffect } from 'react';
import { Text, View, Button, TouchableOpacity, TextInput } from 'react-native';
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
  const [inputText, setInputText] = useState(route.params.memo_text);
  const [editable, setEditable] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const onEdit = () => {
    setEditable(!editable);
  };

  const handleEditMemo = async (id) => {
    const formData = {
      memo_text: inputText,
    };
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
          <TouchableOpacity onPress={() => onEdit()}>
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
          {editable ? (
            <View>
              <TextInput
                placeholder={route.params.memo_text}
                type="text"
                onChangeText={(text) => {
                  setInputText(text);
                  //console.log(inputText);
                }}
                value={inputText}
              />
            </View>
          ) : (
            <TextSize fontSize="16">{inputText}</TextSize>
          )}
        </TextR>
      </Margin>
      <SaveButton
        onPress={() => {
          onEdit();
          handleEditMemo(route.params.id);
        }}
      >
        <TextR>
          <TextSize color="white" fontSize="18">
            저장하기
          </TextSize>
        </TextR>
      </SaveButton>
      <ModalListItem
        key={route.params.id}
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
      />
    </Wrapper>
  );
};

export default detailText;

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

const SaveButton = styled.TouchableOpacity`
  background-color: ${palette.main};
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  height: 48px;
  margin-top: 50px;
`;
