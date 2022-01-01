import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import palette from '../shared/palette';
import { useSelector } from 'react-redux';
import moment from 'moment';

import MemoDate from '../shared/components/MemoDate';
import useSearch from '../shared/hooks/useSearch';
import HeaderButton from '../shared/components/HeaderButton';

import {
  SearchInput,
  TitleBox,
  ButtonBox,
  TagBox,
} from '../shared/styles/InputStyle';

const CategoryDetail = ({ route, navigation }) => {
  const memoObj = useSelector((state) => state);
  const [onSearchChange, renderState] = useSearch(memoObj);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <TitleBox>
          <Text>
            {route.params.categoryName
              ? route.params.categoryName
              : '분류 안 한 메모'}
          </Text>
          <SearchInput
            onChangeText={onSearchChange}
            placeholder="내용, 태그 검색"
          />
          <ButtonBox>
            <TagBox>
              <HeaderButton type="all" />
              <HeaderButton type="image" />
              <HeaderButton type="link" />
              <HeaderButton type="text" />
            </TagBox>
            <View>
              <HeaderButton type="bookmark" />
            </View>
          </ButtonBox>
        </TitleBox>
      ),
    });
  }, []);

  return <Text>{route.params.categoryID}</Text>;
};

export default CategoryDetail;
