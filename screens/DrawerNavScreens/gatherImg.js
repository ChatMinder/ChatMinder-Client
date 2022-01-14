import React, { useEffect, useState } from 'react';
import { RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { GetImages } from '../../shared/API';

import {
  SearchInput,
  TitleBox,
  HeaderIcon,
  HeaderContainer,
  NoVisibleBox,
  InputBox,
  BookmarkBox,
} from '../../shared/styles/HeaderStyle';
import styled from 'styled-components/native';
import useSearchGather from '../../shared/hooks/useSearchGather';
import GoBack from '../../shared/assets/GoBack.svg';
import SearchIcon from '../../shared/assets/search.svg';
import TextB from '../../shared/components/TextB';
import HeaderButton from '../../shared/components/HeaderButton';
import { TextSize } from '../../shared/styles/FontStyle';
import { useSelector } from 'react-redux';
import MemoDate from '../../shared/components/MemoDate';
import MemoItem from '../../shared/components/MemoItem';
import moment from 'moment';
import {
  Container,
  DateItem,
  TextBox,
} from '../../shared/styles/TextContainerStyle';

const gatherImg = ({ navigation }) => {
  const memoData = useSelector((state) => state.memoData);
  const token = useSelector((state) => state.auth.accessToken);

  const [imgMemos, setimgMemos] = useState([]);
  const [onSearchChange, renderState] = useSearchGather(imgMemos);
  const [choice, setChoice] = useState('all');
  const [clickedState, setClickedState] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(async () => {
    await getImages();
    navigation.setOptions({
      headerStyle: {
        height: 120,
      },
      headerLeft: () => null,
      headerRight: () => null,
      headerTitle: () => (
        <HeaderContainer>
          <TitleBox>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <GoBack style={{ marginRight: 12, marginVertical: 16 }} />
            </TouchableOpacity>
            <TextB>
              <TextSize fontSize="18">이미지 모아보기</TextSize>
            </TextB>
            <NoVisibleBox />
          </TitleBox>
          <InputBox>
            <SearchIcon style={{ marginHorizontal: 8 }} />
            <SearchInput
              onChangeText={onSearchChange}
              placeholder="내용, 태그 검색"
            />
          </InputBox>
          <BookmarkBox>
            <HeaderButton
              type="bookmark"
              setChoice={setChoice}
              setClickedState={setClickedState}
            />
          </BookmarkBox>
        </HeaderContainer>
      ),
    });
  }, []);

  const getImages = async () => {
    try {
      const getImagesRes = await GetImages(token);
      setimgMemos(getImagesRes.data);
      setRefreshing(false);
    } catch (error) {
      console.log('getImages 실패', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getImages();
  };

  return (
    <Scroll
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {clickedState ? (
        <Container>
          {renderState.map((memo, index) => (
            <TextBox key={memo.id}>
              <DateItem>
                {index === 0 ? (
                  <MemoDate memoTime={memo.timestamp} />
                ) : (
                  moment
                    .unix(renderState[index - 1].timestamp)
                    .format('YYYY-MM-DD') !==
                    moment.unix(memo.timestamp).format('YYYY-MM-DD') && (
                    <MemoDate memoTime={memo.timestamp} />
                  )
                )}
                <MemoItem memo={memo} />
              </DateItem>
            </TextBox>
          ))}
        </Container>
      ) : (
        <Container>
          {renderState
            .filter((element) => element.is_marked === true)
            .map((memo, index) => (
              <TextBox key={memo.id}>
                <DateItem>
                  {index === 0 ? (
                    <MemoDate memoTime={memo.timestamp} />
                  ) : (
                    moment
                      .unix(renderState[index - 1].timestamp)
                      .format('YYYY-MM-DD') !==
                      moment.unix(memo.timestamp).format('YYYY-MM-DD') && (
                      <MemoDate memoTime={memo.timestamp} />
                    )
                  )}
                  <MemoItem memo={memo} />
                </DateItem>
              </TextBox>
            ))}
        </Container>
      )}
    </Scroll>
  );
};

export default gatherImg;

const Scroll = styled.ScrollView`
  height: 90%;
`;
