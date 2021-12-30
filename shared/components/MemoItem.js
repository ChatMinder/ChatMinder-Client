import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';

const MemoItem = ({ memo }) => {
  const onBookmarkTouch = () => {
    //API 통신 들어오면 API.js 파일 안에서 api 통신 로직 처리하기
    alert('북마크 누름!');
  };

  return (
    <Wrapper>
      <MemoWrapper>
        <MemoContainer>
          <Text>{memo.memoText}</Text>
        </MemoContainer>
        <MemoFooter>
          <Category>
            <Text>{memo.categoryName}</Text>
          </Category>
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
  margin: 16px;
  border: 1px dashed gray;
`;

const MemoContainer = styled.TextInput`
  background: skyblue;
`;

const MemoFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const Category = styled.TouchableOpacity``;

const Bookmark = styled.TouchableOpacity``;
const BookmarkImg = styled.Image`
  width: 16px;
  height: 18px;
`;

export default MemoItem;
