import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import moment from 'moment';
import styled from 'styled-components/native';

import useSearch from '../../shared/hooks/useSearch';
import TextB from '../../shared/components/TextB';
import MemoDate from '../../shared/components/MemoDate';
import MemoItem from '../../shared/components/MemoItem';
import { TextSize } from '../../shared/styles/FontStyle';
import HeaderButton from '../../shared/components/HeaderButton';
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
  DateItem,
  TextBox,
} from '../../shared/styles/TextContainerStyle';
import GoBack from '../../shared/assets/GoBack.svg';
import SearchIcon from '../../shared/assets/search.svg';

const gatherImg = ({ navigation }) => {
  const [onSearchChange, renderState] = useSearch('Img');
  const [choice, setChoice] = useState('all');
  const [clickedState, setClickedState] = useState(true);

  useEffect(() => {
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

  return (
    <Scroll>
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
