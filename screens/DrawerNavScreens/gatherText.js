import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import Search from '../../shared/components/Search';
import useSearch from '../../shared/hooks/useSearch';
import MemoDate from '../../shared/components/MemoDate';
import moment from 'moment';

import TextContainer from '../../shared/components/TextContainer';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import {
  SearchInput,
  TitleBox,
  TitleText,
  HeaderIcon,
  HeaderContainer,
  NoVisibleBox,
  InputBox,
  SearchIcon,
} from '../../shared/styles/HeaderStyle';

import {
  Container,
  TextBox,
  DateItem,
} from '../../shared/styles/TextContainerStyle';
import TextB from '../../shared/components/TextB';
import TextR from '../../shared/components/TextR';

const goBack = require('../../shared/assets/GoBack.png');
const search = require('../../shared/assets/search.png');

const gatherText = ({ navigation }) => {
  const memoObj = useSelector((state) => state);
  //console.log('memoObj: ', memoObj);
  const dispatch = useDispatch();
  const [onSearchChange, renderState] = useSearch(memoObj);
  const [memos, setMemos] = useState(
    memoObj.filter((element, index) => index > 0)
  );

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        height: 130,
      },
      headerLeft: () => null,
      headerRight: () => null,
      headerTitle: () => (
        <HeaderContainer>
          <TitleBox>
            <HeaderIcon source={goBack} />
            <TextB>
              <TitleText>텍스트 모아보기</TitleText>
            </TextB>
            <NoVisibleBox />
          </TitleBox>
          <InputBox>
            <SearchIcon source={search} />
            <SearchInput
              onChangeText={onSearchChange}
              placeholder="내용, 태그 검색"
            />
          </InputBox>
        </HeaderContainer>
      ),
    });
  });

  return (
    <View>
      <Container>
        {renderState.map(
          (memo, index) =>
            memo.timestamp && (
              <TextBox key={memo.memoID}>
                <DateItem>
                  {moment
                    .unix(renderState[index - 1].timestamp)
                    .format('YYYY-MM-DD') !==
                    moment.unix(memo.timestamp).format('YYYY-MM-DD') && (
                    <MemoDate memoTime={memo.timestamp} />
                  )}
                </DateItem>
                <TextContainer
                  memo={memo}
                  navigation={navigation}
                  destination="detailText"
                />
              </TextBox>
            )
        )}
      </Container>
    </View>
  );
};

export default gatherText;
