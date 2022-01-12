import React, { useState, useEffect } from 'react';
import { Text, View, Button, TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components/native';
import RNUrlPreview from 'react-native-url-preview';
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

import EmptyBookmark from '../../shared/assets/emptyBookmark.svg';
import FulledBookmark from '../../shared/assets/fulledBookmark.svg';
import GoBack from '../../shared/assets/GoBack.svg';
import GoBackLight from '../../shared/assets/goBack_light.svg';
import Edit from '../../shared/assets/Edit.svg';

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
          <GoBack />
        </TouchableOpacity>
        <Buttons>
          <TouchableOpacity onPress={() => onEdit()}>
            <Edit />
          </TouchableOpacity>
          {route.params.is_marked ? <FulledBookmark /> : <EmptyBookmark />}
        </Buttons>
      </BookmarkBox2>

      {route.params.tag_name ? (
        <TextR>
          <TagBox backgroundColor={route.params.tag_color}>
            <TouchableOpacity onPress={() => toggleModal()}>
              <TextItem>{route.params.tag_name}</TextItem>
            </TouchableOpacity>
            <View>
              <GoBackLight />
            </View>
          </TagBox>
        </TextR>
      ) : (
        <View />
      )}

      <Margin>
        {route.params.url && (
          <LinkView>
            <RNUrlPreview
              text={`${route.params.memo_text}, ${route.params.url}`}
            />
            <TextR>
              <TextSize color={palette.gray2}>{route.params.url}</TextSize>
            </TextR>
          </LinkView>
        )}
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

const LinkView = styled.View`
  margin: 5px;
`;
