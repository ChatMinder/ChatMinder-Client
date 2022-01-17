import React, { useState } from 'react';
import { ActivityIndicator, Alert, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import RNUrlPreview from 'react-native-url-preview';
import styled from 'styled-components/native';
import { DeleteMemo, PostBookmark } from '../API';
import { bookmarkMemo, delMemo } from '../reducers/memo';
import { TagBtn, TagBtnText } from '../styles/HomeStyle';
import TextR from './TextR';
import palette from '../palette';
import ChatBubblePoint from '../assets/ChatBubblePoint.svg';
import EmptyBookmark from '../assets/emptyBookmark.svg';
import FulledBookmark from '../assets/fulledBookmark.svg';
import { TextSize } from '../styles/FontStyle';

const MemoItem = ({ memo }) => {
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
      console.log(`북마크 성공: ${JSON.stringify(bookmarkRes.data)}`);
    } catch (error) {
      dispatch(bookmarkMemo(memo.id));
      console.log(`북마크 실패: ${error}`);
    }
  };

  const handlePress = (memo) => {
    navigation.navigate(`detailText`, {
      id: memo.id,
      memo_text: memo.memo_text,
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
      console.log(memoID);
      const delMemoRes = await DeleteMemo(token, memoID);
      console.log(`메모 삭제 성공: ${JSON.stringify(delMemoRes.data)}`);
      dispatch(delMemo(memoID));
    } catch (error) {
      console.log(`메모 삭제 실패: ${error}`);
    }
    setLoading(false);
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
        <PointContainer>
          <ChatBubblePoint />
        </PointContainer>
        <MemoContainer onPress={() => handlePress(memo)}>
          <Images imgCnt={memo.images.length} />
          {memo.url && (
            <URLContainer>
              {memo.url && (
                <>
                  {/* TODO onLoad 로직 추가 */}
                  <RNUrlPreview text={`${memo.memo_text}, ${memo.url}`} />
                  <TextR>
                    <TextSize color={palette.gray2}>{memo.url}</TextSize>
                  </TextR>
                </>
              )}
            </URLContainer>
          )}
          {memo.memo_text ? <TextR>{memo.memo_text}</TextR> : null}
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

const SCREEN_WIDTH = Dimensions.get('window').width;

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
const URLContainer = styled.View`
  border-radius: 4px;
`;
const URLText = styled.Text`
  font-family: 'NanumSquareOTF_ac';
  color: ${palette.pastelBlue};
  text-decoration: underline;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.36px;
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

const Bookmark = styled.TouchableOpacity`
  position: absolute;
  right: 0px;
  bottom: 0px;
`;

export default MemoItem;
