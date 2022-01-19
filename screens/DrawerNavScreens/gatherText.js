import React, { useState, useEffect } from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';

import moment from 'moment';
import styled from 'styled-components/native';

import useSearch from '../../shared/hooks/useSearch';
import TextB from '../../shared/components/TextB';
import MemoDate from '../../shared/components/MemoDate';
import { TextSize } from '../../shared/styles/FontStyle';
import HeaderButton from '../../shared/components/HeaderButton';
import TextContainer from '../../shared/components/TextContainer';
import {
  SearchInput,
  TitleBox,
  HeaderContainer,
  NoVisibleBox,
  InputBox,
  BookmarkBox,
} from '../../shared/styles/HeaderStyle';
import {
  Container,
  TextBox,
  DateItem,
  Wrapper,
  Scroll,
} from '../../shared/styles/TextContainerStyle';
import GoBack from '../../shared/assets/GoBack.svg';
import SearchIcon from '../../shared/assets/search.svg';
import palette from '../../shared/palette';

const gatherText = ({ navigation }) => {
  const [onSearchChange, renderState] = useSearch('Text');
  const [choice, setChoice] = useState('all');
  const [clickedState, setClickedState] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: palette.gatherHeaderGray,
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
              <TextSize fontSize="18">텍스트 모아보기</TextSize>
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

  return (
    <Scroll>
      <StatusBar
        backgroundColor={palette.gatherHeaderGray}
        barStyle="dark-content"
      />
      <Wrapper>
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
                </DateItem>
                <TextContainer
                  key={memo.id}
                  memo={memo}
                  navigation={navigation}
                  destination="detailText"
                  history="텍스트 모아보기"
                />
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
                  </DateItem>
                  <TextContainer
                    key={memo.id}
                    memo={memo}
                    navigation={navigation}
                    destination="detailText"
                    history="gatherText"
                  />
                </TextBox>
              ))}
          </Container>
        )}
      </Wrapper>
    </Scroll>
  );
};

export default gatherText;
