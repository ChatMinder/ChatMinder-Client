import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { DeleteMemo, PostBookmark } from '../API';
import { bookmarkMemo, delMemo } from '../reducers/memo';
import { TagBtn, TagBtnText } from '../styles/HomeStyle';
import TextR from './TextR';

const MemoItem = ({ memo }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accessToken);

  const onBookmarkTouch = async (memo) => {
    let data = {
      memo_id: memo.id,
      is_marked: memo.is_marked,
    };
    try {
      const bookmarkRes = await PostBookmark(token, data);
      console.log(`북마크 성공: ${JSON.stringify(bookmarkRes.data)}`);
      dispatch(bookmarkMemo(memo.id, bookmarkRes.data));
    } catch (error) {
      console.log(`북마크 실패: ${error}`);
    }
  };

  const handleDelete = async (memoID) => {
    try {
      const delMemoRes = await DeleteMemo(token, memoID);
      console.log(`메모 삭제 성공: ${JSON.stringify(delMemoRes.data)}`);
      dispatch(delMemo(memoID));
    } catch (error) {
      console.log(`메모 삭제 실패: ${error}`);
    }
  };

  const goToDetail = () => {
    alert('go to detail');
  };

  return (
    <Wrapper onLongPress={() => handleDelete(memo.id)}>
      <MemoWrapper>
        <MemoContainer>
          <TextR>{memo.memo_text}</TextR>
        </MemoContainer>
        <MemoFooter>
          {memo.tag_name ? (
            <TagBtn background={memo.tag_color} onPress={goToDetail}>
              <TagBtnText>{memo.tag_name}</TagBtnText>
            </TagBtn>
          ) : null}
          <Bookmark onPress={() => onBookmarkTouch(memo)}>
            {memo.is_marked ? (
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

const Wrapper = styled.TouchableOpacity`
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
