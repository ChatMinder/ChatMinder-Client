import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import palette from '../shared/palette';
import { useSelector } from 'react-redux';
import moment from 'moment';

import MemoDate from '../shared/components/MemoDate';
import useSearch from '../shared/hooks/useSearch';
import HeaderButton from '../shared/components/HeaderButton';
import TextContainer from '../shared/components/TextContainer';
import ModalItem from '../shared/components/Modaltem';

import {
  SearchInput,
  TitleBox,
  ButtonBox,
  TagBox,
} from '../shared/styles/InputStyle';
import {
  Container,
  TextBox,
  DateItem,
} from '../shared/styles/TextContainerStyle';

const CategoryDetail = ({ route, navigation }) => {
  const memoObj = useSelector((state) => state);
  const [onSearchChange, renderState] = useSearch(memoObj);
  const [memos, setMemos] = useState(
    renderState.filter(
      (item) => item.categoryName === route.params.categoryName
    )
  );

  const [types, setTypes] = useState([
    { id: 0, category: 'all', isSelected: false },
    { id: 1, category: 'image', isSelected: false },
    { id: 2, category: 'link', isSelected: false },
    { id: 3, category: 'text', isSelected: false },
    { id: 4, category: 'bookmark', isSelected: false },
  ]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <TitleBox>
          <Text>{route.params.categoryName}</Text>
          <SearchInput
            onChangeText={onSearchChange}
            placeholder="내용, 태그 검색"
          />
          <ButtonBox>
            <TagBox>
              {types.map(
                (type, index) =>
                  index < 4 && <HeaderButton type={type} key={type.id} />
              )}
            </TagBox>
            <View>
              <HeaderButton type={types[4]} />
            </View>
          </ButtonBox>
        </TitleBox>
      ),
    });
  }, []);

  console.log(memos);

  return (
    <Container>
      {renderState
        .filter(
          (item, index) => item.categoryName === route.params.categoryName
        )
        .map(
          (memo, index) =>
            memo.memoID && (
              <TextBox key={memo.memoID}>
                <DateItem>
                  {index === 0 ? (
                    <MemoDate memoID={memo.memoID} />
                  ) : (
                    <>
                      {moment
                        .unix(memos[index - 1].memoID)
                        .format('YYYY-MM-DD') !==
                        moment.unix(memo.memoID).format('YYYY-MM-DD') && (
                        <MemoDate memoID={memo.memoID} />
                      )}
                    </>
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
  );
};

export default CategoryDetail;
