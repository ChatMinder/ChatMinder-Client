import React, { useEffect, useState } from 'react';
import RNUrlPreview from 'react-native-url-preview';
import { Text, Alert, TouchableOpacity, View } from 'react-native';
import styled, { css } from 'styled-components/native';
import palette from '../palette';
import TextR from './TextR';
import { TextSize } from '../styles/FontStyle';
import { PostBookmark } from '../API';
import { bookmarkMemo } from '../reducers/memo';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import {
  TagBox,
  BookmarkItem,
  BookmarkBox2,
  TextItem,
  BoxContainer,
} from '../styles/TextContainerStyle';

import EmptyBookmark from '../assets/emptyBookmark.svg';
import FulledBookmark from '../assets/fulledBookmark.svg';
import DeleteButton from './DeleteButton';

const TextContainer = ({ memo, navigation, destination, history }) => {
  const token = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const [showDelBtn, setShowDelBtn] = useState(false);

  //useEffect(() => {}, [memo]);

  const handleBookmark = async (memo) => {
    const formData = {
      memo_id: memo.id,
      is_marked: memo.is_marked,
    };
    try {
      const postBookmarkRes = await PostBookmark(token, formData);
      console.log('postBookmarkRes 성공: ', postBookmarkRes.data);
      dispatch(bookmarkMemo(memo.id));
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
    <TouchableOpacity
      onPress={() => {
        handlePress(memo);
      }}
      onLongPress={() => setShowDelBtn(!showDelBtn)}
    >
      <>
        {showDelBtn && <DeleteButton memoID={memo.id} />}
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
              {memo.is_marked ? <FulledBookmark /> : <EmptyBookmark />}
            </BookmarkButton>
          </BookmarkBox2>
        </BoxContainer>
      </>
    </TouchableOpacity>
  );
};

export default TextContainer;

const BookmarkButton = styled.TouchableOpacity``;
