import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import styled from 'styled-components/native';
import RNUrlPreview from 'react-native-url-preview';
import TextR from '../../shared/components/TextR';
import palette from '../../shared/palette';
import { TextSize } from '../../shared/styles/FontStyle';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { PatchMemo, PostBookmark, PostEditTag } from '../../shared/API';
import { bookmarkMemo, fixMemo } from '../../shared/reducers/memo';

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
const edit = require('../../shared/assets/Edit_png.png');

const detailText = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.accessToken);
  //console.log(route.params);
  const [loading, setLoading] = useState(true);
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
    setLoading(true);
    const formData = {
      memo_text: inputText,
    };
    try {
      const patchMemoRes = await PatchMemo(token, id, formData);
      console.log('patchMemoRes 성공: ', patchMemoRes.data);
      dispatch(fixMemo(id, patchMemoRes.data));
    } catch (error) {
      console.log(`patchMemoRes 실패: ${error}`);
    }
    setLoading(false);
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
      dispatch(bookmarkMemo(id));
    } catch (error) {
      console.log(`postBookmarkRes 실패: ${error}`);
    }
  };

  const handleEditTag = async (tag_id) => {
    const formData = {
      memo_id: route.params.id,
      tag_id: tag_id,
    };
    try {
      const editTagRes = await PostEditTag(token, formData);
      console.log('editTagRes 성공: ', editTagRes.data);
    } catch (error) {
      console.log(`editTagRes 실패: ${error}`);
    }
  };

  return (
    <Wrapper>
      {/* {loading && (
        <SpinnerWrapper>
          <ActivityIndicator size="large" color="#ff7f6d" />
        </SpinnerWrapper>
      )} */}
      <BookmarkBox2 marginBottom="15px">
        <TouchableOpacity
          onPress={() => navigation.navigate(route.params.history)}
        >
          <GoBack />
        </TouchableOpacity>
        <Buttons>
          <TouchableOpacity onPress={() => onEdit()}>
            {/* <Edit style={{ marginRight: 10 }} /> */}
            <BookmarkItem
              source={edit}
              width="25"
              height="25"
              marginRight="14"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleBookmark(route.params.id, route.params.is_marked);
            }}
          >
            {isBookmarked ? <FulledBookmark /> : <EmptyBookmark />}
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
              <GoBackLight style={{ marginLeft: 2 }} />
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

      {!editable ? (
        <View />
      ) : (
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
      )}

      <ModalListItem
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        handleEditTag={handleEditTag}
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
  height: 100%;
`;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SpinnerWrapper = styled.View`
  position: absolute;
  left: ${SCREEN_WIDTH * 0.5 - 18}px;
  bottom: ${SCREEN_HEIGHT * 0.5 - 18}px;
  z-index: 10;
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
  width: 100%;
  position: absolute;
  bottom: 10%;
  align-self: center;
`;

const LinkView = styled.View`
  margin: 5px;
`;
