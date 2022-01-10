import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';
import Search from '../../shared/components/Search';
import useSearch from '../../shared/hooks/useSearch';
import MemoDate from '../../shared/components/MemoDate';
import moment from 'moment';
import axios from 'axios';

import TextContainer from '../../shared/components/TextContainer';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import {
  SearchInput,
  TitleBox,
  HeaderIcon,
  HeaderContainer,
  NoVisibleBox,
  InputBox,
  SearchIcon,
  BookmarkBox,
} from '../../shared/styles/HeaderStyle';

import {
  Container,
  TextBox,
  DateItem,
} from '../../shared/styles/TextContainerStyle';
import TextB from '../../shared/components/TextB';
import TextR from '../../shared/components/TextR';
import { TextSize } from '../../shared/styles/FontStyle';
import HeaderButton from '../../shared/components/HeaderButton';

const goBack = require('../../shared/assets/GoBack.png');
const search = require('../../shared/assets/search.png');

const gatherText = ({ navigation }) => {
  const memoData = useSelector((state) => state.memoData);
  //console.log('memoData: ', memoData);
  const dispatch = useDispatch();
  const [onSearchChange, renderState] = useSearch(memoData);

  const [choice, setChoice] = useState('all');

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
              <HeaderIcon source={goBack} />
            </TouchableOpacity>
            <TextB>
              <TextSize fontSize="18">텍스트 모아보기</TextSize>
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
          <BookmarkBox>
            <HeaderButton type="bookmark" setChoice={setChoice} />
          </BookmarkBox>
        </HeaderContainer>
      ),
    });
  });

  const handleTab = {
    all: <Text>all</Text>,
    bookmark: <Text>bookmark</Text>,
  };

  const handleTest = async () => {
    try {
      const response = await axios.get('http://172.30.1.19:8080/memos/texts/', {
        headers: {
          Authorization:
            'Bearer ' +
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQxNzkzMTg0LCJqdGkiOiJiZjUyMTFjMzUwZjc0YjEyYWQ2ZjcyOTllNzkzMGJkYSIsInVzZXJfaWQiOjExLCJrYWthb19pZCI6IjEyMzE0MTQiLCJrYWthb19lbWFpbCI6ImNoYXRtaW5kZXJAY2hhdG1pbmRlci5jb20ifQ.R1f4UUchte_krYbQL7soRbcVkIT-UFEbqNPBtiuafr4',
        },
      });
      console.log('response >>', response.data);
    } catch (error) {
      console.log('Error >>', error);
    }
  };

  return (
    <View>
      {/* <TouchableOpacity onPress={() => handleTest()}>
        <Text>조회하기</Text>
      </TouchableOpacity> */}

      <Container>
        {renderState.map(
          (memo, index) =>
            memo.timestamp && (
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
                  memo={memo}
                  navigation={navigation}
                  destination="detailText"
                  history="gatherText"
                />
              </TextBox>
            )
        )}
      </Container>
    </View>
  );
};

export default gatherText;
