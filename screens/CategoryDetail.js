import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import moment from 'moment';

import MemoDate from '../shared/components/MemoDate';
import useSearch from '../shared/hooks/useSearch';
import HeaderButton from '../shared/components/HeaderButton';
import TextContainer from '../shared/components/TextContainer';

import {
  SearchInput,
  TitleBox,
  ButtonBox2,
  TagBox,
  HeaderContainer,
  HeaderIcon,
  NoVisibleBox,
  InputBox,
  SearchIcon,
} from '../shared/styles/HeaderStyle';
import {
  Container,
  TextBox,
  DateItem,
} from '../shared/styles/TextContainerStyle';
import TextB from '../shared/components/TextB';
import TextR from '../shared/components/TextR';
import { TextSize } from '../shared/styles/FontStyle';
import styled from 'styled-components/native';

const goBack = require('../shared/assets/GoBack.png');
const search = require('../shared/assets/search.png');

const CategoryDetail = ({ route, navigation }) => {
  const memoData = useSelector((state) => state.memoData);
  const [onSearchChange, renderState] = useSearch(memoData);
  const [memos, setMemos] = useState(
    renderState.filter((item) => item.tag_name === route.params.tag_name)
  );

  const [types, setTypes] = useState([
    { id: 0, category: 'all', isSelected: false },
    { id: 1, category: 'image', isSelected: false },
    { id: 2, category: 'link', isSelected: false },
    { id: 3, category: 'text', isSelected: false },
    { id: 4, category: 'bookmark', isSelected: false },
  ]);

  const [choice, setChoice] = useState('all');

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        height: 130,
      },
      headerLeft: () => null,
      headerRight: () => null,
      headerTitle: () => (
        <HeaderContainer paddingRight="5%">
          <TitleBox>
            <TouchableOpacity onPress={() => navigation.navigate('태그')}>
              <HeaderIcon source={goBack} />
            </TouchableOpacity>
            <TextB>
              <TextSize fontSize="18" color={route.params.tag_color}>
                {route.params.tag_name}
              </TextSize>
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
          <ButtonBox2>
            <TagBox>
              {types.map(
                (type, index) =>
                  index < 4 && (
                    <HeaderButton
                      type={type}
                      key={type.id}
                      setChoice={setChoice}
                    />
                  )
              )}
            </TagBox>
            <View>
              <HeaderButton type={types[4]} setChoice={setChoice} />
            </View>
          </ButtonBox2>
        </HeaderContainer>
      ),
    });
  }, []);

  console.log(memos);

  return (
    <View>
      {
        {
          all: (
            <Container>
              {renderState
                .filter(
                  (item, index) => item.tag_name === route.params.tag_name
                )
                .map(
                  (memo, index) =>
                    memo.timestamp && (
                      <TextBox key={memo.id}>
                        <DateItem>
                          {index === 0 ? (
                            <MemoDate memoTime={memo.timestamp} />
                          ) : (
                            <>
                              {moment
                                .unix(memos[index - 1].timestamp)
                                .format('YYYY-MM-DD') !==
                                moment
                                  .unix(memo.timestamp)
                                  .format('YYYY-MM-DD') && (
                                <MemoDate memoTime={memo.timestamp} />
                              )}
                            </>
                          )}
                        </DateItem>

                        <TextContainer
                          memo={memo}
                          navigation={navigation}
                          destination="detailText"
                          history="태그"
                        />
                      </TextBox>
                    )
                )}
            </Container>
          ),
          image: <Text>image</Text>,
          link: <Text>link</Text>,
          text: <Text>text</Text>,
          bookmark: <Text>bookmark</Text>,
        }[choice]
      }
    </View>
  );
};

export default CategoryDetail;
