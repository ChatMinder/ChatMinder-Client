import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import styled from 'styled-components/native';
import RNUrlPreview from 'react-native-url-preview';
import TextR from '../../shared/components/TextR';
import palette from '../../shared/palette';
import { TextSize } from '../../shared/styles/FontStyle';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { PatchMemo, PostBookmark } from '../../shared/API';
import { bookmarkMemo } from '../../shared/reducers/memo';

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
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accessToken);
  //console.log(route.params);
  const [inputText, setInputText] = useState(route.params.memo_text);
  const [editable, setEditable] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(route.params.is_marked);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [isBookmarked]);

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

  const handleBookmark = async (id, is_marked) => {
    const formData = {
      memo_id: id,
      is_marked: is_marked,
    };
    try {
      const postBookmarkRes = await PostBookmark(token, formData);
      console.log('postBookmarkRes 성공: ', postBookmarkRes.data);
      setIsBookmarked(postBookmarkRes.data.is_marked);
      dispatch(bookmarkMemo(id, postBookmarkRes.data));
    } catch (error) {
      console.log(`postBookmarkRes 실패: ${error}`);
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
          <TouchableOpacity
            onPress={() => {
              handleBookmark(route.params.id, route.params.is_marked);
            }}
          >
            {isBookmarked ? (
              <BookmarkItem source={fulled} />
            ) : (
              <BookmarkItem source={empty} />
            )}
          </TouchableOpacity>
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

        {editable ? (
          <View>
            <TextInput
              autoFocus={true}
              style={styles.inputStyle}
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
          <TextR>
            <TextSize fontSize="16">{inputText}</TextSize>
          </TextR>
        )}
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

const styles = StyleSheet.create({
  inputStyle: {
    ...Platform.select({
      android: {
        fontFamily: 'NanumSquareOTF_ac',
        fontSize: 16,
      },
    }),
  },
});

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
