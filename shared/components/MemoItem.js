import React, { useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { DeleteMemo, PostBookmark } from '../API';
import { bookmarkMemo, delMemo } from '../reducers/memo';
import { TagBtn, TagBtnText } from '../styles/HomeStyle';
import ChatBubblePoint from '../assets/ChatBubblePoint.svg';
import EmptyBookmark from '../assets/emptyBookmark.svg';
import FulledBookmark from '../assets/fulledBookmark.svg';
import CaptionText from './CaptionText';
import Images from './Images';

const MemoItem = ({ memo, point }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accessToken);
  const [loading, setLoading] = useState(false);

  const onBookmarkTouch = async (memo) => {
    let data = {
      memo_id: memo.id,
      is_marked: memo.is_marked,
    };
    try {
      const bookmarkRes = await PostBookmark(token, data);
    } catch (error) {
      dispatch(bookmarkMemo(memo.id));
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
    navigation.navigate(`detailText`, {
      id: memo.id,
      images: memo.images,
      memo_text: memo.memo_text,
      tag_id: memo.tag_id,
      tag_name: memo.tag_name,
      tag_color: memo.tag_color,
      is_marked: memo.is_marked,
      url: memo.url,
      history: 'Home',
    });
  };

  const handleDelete = async (memoID) => {
    setLoading(true);
    try {
      const delMemoRes = await DeleteMemo(token, memoID);
      dispatch(delMemo(memoID));
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
    <Wrapper>
      {loading && (
        <SpinnerWrapper>
          <ActivityIndicator size="large" color="#ff7f6d" />
        </SpinnerWrapper>
      )}
      <MemoWrapper
        activeOpacity={0.8}
        onPress={() => handlePress(memo)}
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
        {point && (
          <PointContainer>
            <ChatBubblePoint />
          </PointContainer>
        )}
        <MemoContainer onPress={() => handlePress(memo)}>
          <Images imgCnt={memo.images.length} memo={memo} />

          <CaptionText memo={memo} />
        </MemoContainer>
        <MemoFooter>
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
          ) : null}
          <Bookmark
            hitSlop={{ top: 6, bottom: 12, left: 12, right: 12 }}
            onPress={() => {
              dispatch(bookmarkMemo(memo.id));
              onBookmarkTouch(memo);
            }}
          >
            {memo.is_marked ? <FulledBookmark /> : <EmptyBookmark />}
          </Bookmark>
        </MemoFooter>
      </MemoWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const SpinnerWrapper = styled.View`
  position: absolute;
  z-index: 10;
`;

const MemoWrapper = styled.TouchableOpacity`
  /* justify-content: center; */
  align-items: center;
  width: 90%;
  padding: 12px;
  margin: 6px;
  border-radius: 8px;
  background: #fcfcfc;
`;
const PointContainer = styled.View`
  position: absolute;
  top: 2px;
  right: -4.3px;
`;

const MemoContainer = styled.View`
  width: 100%;
  justify-content: flex-start;
`;

const MemoFooter = styled.View`
  flex-direction: row;
  margin-top: 12px;
  width: 100%;
  height: 26px;
`;

const Bookmark = styled.TouchableOpacity`
  position: absolute;
  right: 0px;
  bottom: 0px;
`;

export default MemoItem;
