import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import { TagBtn, TagBtnText } from '../styles/HomeStyle';

const MemoItem = ({ memo }) => {
  const onBookmarkTouch = () => {
    //API 통신 들어오면 API.js 파일 안에서 api 통신 로직 처리하기
    alert('북마크 누름!');
  };

  return (
    <Wrapper>
      <MemoWrapper>
        <MemoContainer>
          <MemoText>{memo.memoText}</MemoText>
        </MemoContainer>
        <MemoFooter>
          {memo.tagName ? (
            <TagBtn
            // background={tag.tagColor}
            >
              <TagBtnText>{memo.tagName}</TagBtnText>
            </TagBtn>
          ) : null}
          <Bookmark onPress={onBookmarkTouch}>
            {memo.isMarked ? (
              <BookmarkImg source={require('../assets/fulledBookmark.png')} />
            ) : (
              <BookmarkImg source={require('../assets/bookmark.png')} />
            )}
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

const MemoWrapper = styled.View`
  /* justify-content: center; */
  align-items: center;
  width: 328px;
  padding: 12px;
  margin: 12px;
  border-radius: 8px;
  background: #fcfcfc;
`;

const MemoContainer = styled.View`
  width: 100%;
  justify-content: flex-start;
`;
const MemoText = styled.Text`
  font-size: 12px;
  font-family: 'NanumSquareOTF_ac';
`;

const MemoFooter = styled.View`
  flex-direction: row;
  margin-top: 16px;
  width: 100%;
  height: 26px;
`;

const Tag = styled.TouchableOpacity``;

const Bookmark = styled.TouchableOpacity`
  position: absolute;
  right: 0px;
  bottom: 0px;
`;
const BookmarkImg = styled.Image`
  width: 16px;
  height: 18px;
`;

export default MemoItem;
