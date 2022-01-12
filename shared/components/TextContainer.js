import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RNUrlPreview from 'react-native-url-preview';
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
import { TextSize } from '../styles/FontStyle';
import { DeleteMemo, PostBookmark } from '../API';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

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
  const token = useSelector((state) => state.auth.accessToken);

  //useEffect(() => {}, [memo]);

  const handleDelete = async (id) => {
    try {
      const deleteMemoRes = await DeleteMemo(token, id);
      console.log('deleteMemoRes 성공: ', deleteMemoRes.data);
    } catch (error) {
      console.log('deleteMemoRes 실패', error);
    }
  };

  const handleBookmark = async (memo) => {
    const formData = {
      memo_id: memo.id,
      is_marked: memo.is_marked,
    };
    try {
      const postBookmarkRes = await PostBookmark(token, formData);
      console.log('postBookmarkRes 성공: ', postBookmarkRes.data);
    } catch (error) {
      console.log(`postBookmarkRes 실패: ${error}`);
    }
  };

  const handlePress = (memo) => {
    navigation.navigate(`${destination}`, {
      id: memo.id,
      memo_text: memo.memo_text,
      tag_name: memo.tag_name,
      tag_color: memo.tag_color,
      is_marked: memo.is_marked,
      url: memo.url,
      history: history,
    });
  };

  return (
    <TouchableHighlight
      onPress={() => {
        handlePress(memo);
      }}
      onLongPress={() => {
        Alert.alert('삭제 확인', '정말 삭제하시겠습니까?', [
          {
            text: '취소',
            onPress: () => alert('취소되었습니다.'),
            style: 'cancel',
          },
          {
            text: '삭제',
            onPress: () => {
              alert('삭제되었습니다.');
              handleDelete(memo.id);
            },
          },
        ]);
      }}
    >
      <BoxContainer>
        {memo.url ? (
          <>
            {/* TODO onLoad 로직 추가 */}
            <RNUrlPreview text={`${memo.memo_text}, ${memo.url}`} />
            <TextR>
              <TextSize color={palette.gray2}>{memo.url}</TextSize>
            </TextR>
            <TextR>{memo.memo_text}</TextR>
          </>
        ) : (
          <TextR>{memo.memo_text}</TextR>
        )}
        {/* TODO 변수명 수정, bookmark api 로직 */}
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
              handleBookmark(memo);
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
