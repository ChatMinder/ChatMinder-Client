import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import moment from 'moment';

import MemoDate from '../shared/components/MemoDate';
import useSearch from '../shared/hooks/useSearch';
import TextContainer from '../shared/components/TextContainer';
import HeaderButton from '../shared/components/HeaderButton';

import {
  SearchInput,
  TitleBox,
  ButtonBox,
  TagBox,
  HeaderContainer,
  HeaderIcon,
  NoVisibleBox,
  InputBox,
  ButtonBox2,
} from '../shared/styles/HeaderStyle';
import TextR from '../shared/components/TextR';
import TextB from '../shared/components/TextB';
import { TextSize } from '../shared/styles/FontStyle';
import styled from 'styled-components/native';

import GoBack from '../shared/assets/GoBack.svg';
import SearchIcon from '../shared/assets/search.svg';

const CalenderDaily = ({ route, navigation }) => {
  const memoData = useSelector((state) => state.memoData);
  const [onSearchChange, renderState] = useSearch();
  const [choice, setChoice] = useState('all');

  const [types, setTypes] = useState([
    { id: 0, category: 'all', isSelected: false },
    { id: 1, category: 'image', isSelected: false },
    { id: 2, category: 'link', isSelected: false },
    { id: 3, category: 'text', isSelected: false },
    { id: 4, category: 'bookmark', isSelected: false },
  ]);

  // const onToggle = (id) => {
  //   setTypes(
  //     types.map((type) =>
  //       type.id === id ? { ...type, isSelected: !type.isSelected } : type
  //     )
  //   );
  //   console.log(types);
  // };

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        height: 130,
      },
      headerLeft: () => null,
      headerRight: () => null,
      headerTitle: () => (
        <HeaderContainer paddingRight="5%" marginTop="3%">
          <TitleBox marginBottom="3%">
            <TouchableOpacity onPress={() => navigation.navigate('캘린더')}>
              <GoBack height="12" width="12" />
            </TouchableOpacity>
            <TextB>
              <TextSize fontSize="18">
                {moment(route.params.pickedDate).format('YYYY년 MM월 DD일')}
              </TextSize>
            </TextB>
            <NoVisibleBox />
          </TitleBox>

          <InputBox>
            <SearchIcon style={{ marginLeft: 10, marginRight: 8 }} />
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

  return (
    <Wrapper>
      {
        {
          all: (
            <Scroll>
              {route.params.planObj.length === 0 ? (
                <TextR>일정이 없습니다.</TextR>
              ) : (
                <>
                  <MemoDate memoTime={route.params.planObj[0].timestamp} />
                  {renderState
                    .filter(
                      (item) =>
                        moment.unix(item.timestamp).format('YYYY-MM-DD') ===
                        moment
                          .unix(route.params.planObj[0].timestamp)
                          .format('YYYY-MM-DD')
                    )
                    .map((plan) => (
                      <TextContainer
                        key={plan.id}
                        memo={plan}
                        navigation={navigation}
                        destination="detailText"
                        history="캘린더"
                      />
                    ))}
                </>
              )}
            </Scroll>
          ),
          image: <Text>image</Text>,
          link: <Text>link</Text>,
          text: <Text>text</Text>,
          bookmark: <Text>bookmark</Text>,
        }[choice]
      }
    </Wrapper>
  );
};

export default CalenderDaily;

const Wrapper = styled.View`
  padding: 0 2%;
  margin-top: 1%;
`;

const Scroll = styled.ScrollView`
  height: 100%;
`;
