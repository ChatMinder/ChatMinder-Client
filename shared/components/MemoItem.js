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

  const Images = ({ imgCnt }) => {
    const baseURL = 'https://image.chatminder.app';
    if (!imgCnt) {
      return null;
    } else if (imgCnt === 1) {
      return (
        <MemoImageItem>
          <Img1
            source={{
              uri: `${baseURL}/${memo.images[0].url}`,
            }}
          />
        </MemoImageItem>
      );
    } else if (imgCnt === 2) {
      return (
        <MemoImageItem>
          <MultiImgContainer>
            <Img2
              source={{
                uri: `${baseURL}/${memo.images[0].url}`,
              }}
            />
            <Img2
              source={{
                uri: `${baseURL}/${memo.images[1].url}`,
              }}
            />
          </MultiImgContainer>
        </MemoImageItem>
      );
    } else if (imgCnt === 3) {
      return (
        <MemoImageItem>
          <MultiImgContainer>
            <Img3_1
              source={{
                uri: `${baseURL}/${memo.images[0].url}`,
              }}
            />
            <ImgMorethan3>
              <Img3_2
                source={{
                  uri: `${baseURL}/${memo.images[1].url}`,
                }}
              />
              <Img3_2
                source={{
                  uri: `${baseURL}/${memo.images[2].url}`,
                }}
              />
            </ImgMorethan3>
          </MultiImgContainer>
        </MemoImageItem>
      );
    } else if (imgCnt > 3) {
      return (
        <MemoImageItem>
          <MultiImgContainer>
            <Img3_1
              source={{
                uri: `${baseURL}/${memo.images[0].url}`,
              }}
            />
            <ImgMorethan3>
              <Img3_2
                source={{
                  uri: `${baseURL}/${memo.images[1].url}`,
                }}
              />
              <Img3_2
                style={{ backgroundColor: '#000000', opacity: 0.5 }}
                source={{
                  uri: `${baseURL}/${memo.images[2].url}`,
                }}
              />
              <ImgOverflowText>+{imgCnt - 2}</ImgOverflowText>
            </ImgMorethan3>
          </MultiImgContainer>
        </MemoImageItem>
      );
    }
  };

  return (
    <Wrapper onLongPress={() => handleDelete(memo.id)}>
      <MemoWrapper>
        <MemoContainer>
          <Images imgCnt={memo.images.length} />
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
const MemoImageItem = styled.View`
  width: 100%;
  height: 225px;
  margin-bottom: 8px;
`;
const Img1 = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;
const MultiImgContainer = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: space-between;
`;
const Img2 = styled.Image`
  width: 49%;
  height: 100%;
  border-radius: 4px;
`;
const Img3_1 = styled.Image`
  width: 60%;
  height: 100%;
  border-radius: 4px;
`;
const ImgMorethan3 = styled.View`
  width: 39%;
  height: 100%;
  justify-content: space-between;
`;
const Img3_2 = styled.Image`
  width: 100%;
  height: 49.4%;
  border-radius: 4px;
`;
const ImgOverflowText = styled.Text`
  position: absolute;
  left: 41%;
  top: 68%;
  font-family: 'Gordita';
  color: white;
  font-size: 18px;
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
