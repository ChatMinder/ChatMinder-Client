import React, { useEffect, useState } from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import useSearch from '../../shared/hooks/useSearch';
import MemoDate from '../../shared/components/MemoDate';
import moment from 'moment';
import TextContainer from '../../shared/components/TextContainer';
import styled, { css } from 'styled-components/native';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import TextB from '../../shared/components/TextB';
import TextR from '../../shared/components/TextR';
import { TextSize } from '../../shared/styles/FontStyle';
import HeaderButton from '../../shared/components/HeaderButton';

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

const goBack = require('../../shared/assets/GoBack.png');
const search = require('../../shared/assets/search.png');

const gatherLink = ({ navigation }) => {
  const memoData = useSelector((state) => state.memoData);
  //console.log('memoData: ', memoData);
  const dispatch = useDispatch();
  const [links, setLinks] = useState([]);
  const [onSearchChange, renderState] = useSearch(memoData);
  const [choice, setChoice] = useState('all');

  useEffect(() => {
    getLinks();
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
              <TextSize fontSize="18">링크 모아보기</TextSize>
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
  }, []);

  const getLinks = async () => {
    try {
      const response = await axios.get(
        'https://api.chatminder.app/memos/links',
        {
          headers: {
            Authorization:
              'Bearer ' +
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ5NTE3ODkzLCJqdGkiOiI3NDA3OGFmNjRmMGI0MzhiYjI4NGMxMmNkNGNmYmM3MiIsInVzZXJfaWQiOjcsImtha2FvX2lkIjoiMTIzNDU2Iiwia2FrYW9fZW1haWwiOiJ0ZXMzM3QyMTIzQG5hdmVyLmNvbSJ9.MhX2wqeBrcJvrmccInomG3Z-mu1xmgaBMK464IhJ_1s',
          },
        }
      );
      console.log('response >>', response.data);
      setLinks(response.data);
    } catch (error) {
      console.log('Error >>', error);
    }
  };

  return (
    <Container>
      {links.map((memo, index) => (
        <Text>{memo.url}</Text>
      ))}
    </Container>
  );
};

export default gatherLink;
