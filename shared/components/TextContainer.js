import React, { useState } from 'react';
import {
  Alert,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import styled from 'styled-components/native';
import { DeleteMemo, PostBookmark } from '../API';
import { bookmarkMemo, delMemo } from '../reducers/memo';
import Images from '../components/Images';
import CaptionText from './CaptionText';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { BookmarkBox2, BoxContainer } from '../styles/TextContainerStyle';

import EmptyBookmark from '../assets/emptyBookmark.svg';
import FulledBookmark from '../assets/fulledBookmark.svg';
import { TagBtn, TagBtnText } from '../styles/HomeStyle';

const TextContainer = ({
  memo,
  navigation,
  destination,
  history,
  fromTagDetail,
  setListner,
}) => {
  const token = useSelector((state) => state.auth.accessToken);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleBookmark = async (memo) => {
    const formData = {
      memo_id: memo.id,
      is_marked: memo.is_marked,
    };
    try {
      const postBookmarkRes = await PostBookmark(token, formData);
      dispatch(bookmarkMemo(memo.id));
      if (fromTagDetail) {
        setListner(true);
      }
    } catch (error) {
      if (error == 'Error: Network Error') {
        Alert.alert(
          '알림',
          `인터넷 연결이 불안정합니다.\n확인 후 다시 시도해 주세요.`,
          [
            {
              text: '네!',
              style: 'cancel',
            },
          ]
        );
      }
    }
  };

  const handlePress = (memo) => {
    navigation.navigate(`${destination}`, {
      id: memo.id,
      images: memo.images,
      memo_text: memo.memo_text,
      tag_id: memo.tag_id,
      tag_name: memo.tag_name,
      tag_color: memo.tag_color,
      is_marked: memo.is_marked,
      url: memo.url,
      history: history,
    });
  };

  const handleDelete = async (memoID) => {
    setLoading(true);
    try {
      const delMemoRes = await DeleteMemo(token, memoID);
      dispatch(delMemo(memoID));
      if (fromTagDetail) {
        setListner(true);
      }
    } catch (error) {
      if (error == 'Error: Network Error') {
        Alert.alert(
          '알림',
          `인터넷 연결이 불안정합니다.\n확인 후 다시 시도해 주세요.`,
          [
            {
              text: '네!',
              style: 'cancel',
            },
          ]
        );
      }
    }
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <SpinnerWrapper>
          <ActivityIndicator size="large" color="#ff7f6d" />
        </SpinnerWrapper>
      )}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          handlePress(memo);
        }}
        onLongPress={() => {
          Alert.alert('삭제 확인', '정말 삭제할까요?', [
            {
              text: '취소',
              style: 'cancel',
            },
            {
              text: '삭제',
              onPress: () => {
                handleDelete(memo.id);
              },
            },
          ]);
        }}
      >
        <BoxContainer>
          <Images imgCnt={memo.images.length} memo={memo} />
          <CaptionText memo={memo} />

          <BookmarkBox2>
            {memo.tag_name ? (
              <TagBtn
                hitSlop={{ top: 6, bottom: 12, left: 12, right: 12 }}
                background={memo.tag_color}
                onPress={() => {
                  navigation.navigate('CategoryDetail', {
                    id: memo.tag_id,
                    tag_name: memo.tag_name,
                    tag_color: memo.tag_color,
                  });
                }}
              >
                <TagBtnText>{memo.tag_name}</TagBtnText>
              </TagBtn>
            ) : (
              <View />
            )}

            <BookmarkButton
              hitSlop={{ top: 6, bottom: 12, left: 12, right: 12 }}
              onPress={() => {
                handleBookmark(memo);
              }}
            >
              {memo.is_marked ? <FulledBookmark /> : <EmptyBookmark />}
            </BookmarkButton>
          </BookmarkBox2>
        </BoxContainer>
      </TouchableOpacity>
    </>
  );
};

export default TextContainer;

const BookmarkButton = styled.TouchableOpacity``;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const SpinnerWrapper = styled.View`
  position: absolute;
  left: ${SCREEN_WIDTH * 0.5 - 18}px;
  bottom: ${SCREEN_HEIGHT * 0.1 + 18}px;
  z-index: 10;
`;
