import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import palette from '../shared/palette';
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
} from '../shared/styles/InputStyle';

const CalenderDaily = ({ route, navigation }) => {
  const memoObj = useSelector((state) => state);
  const [onSearchChange, renderState] = useSearch(memoObj);
  const [choice, setChoice] = useState('');

  const [types, setTypes] = useState([
    { id: 0, category: 'all', isSelected: false },
    { id: 1, category: 'image', isSelected: false },
    { id: 2, category: 'link', isSelected: false },
    { id: 3, category: 'text', isSelected: false },
    { id: 4, category: 'bookmark', isSelected: false },
  ]);

  useEffect(() => {
    route.params.planObj.length === 0
      ? console.log('일정이 없음')
      : navigation.setOptions({
          headerTitle: () => (
            <TitleBox>
              <Text>
                {moment.unix(route.params.planObj[0].memoID).format('ll')}
              </Text>
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

  return (
    <View>
      {route.params.planObj.length === 0 ? (
        <Text>일정이 없습니다.</Text>
      ) : (
        <>
          <MemoDate memoID={route.params.planObj[0].memoID} />

          {/* {route.params.planObj.map((plan) => (
            <Text key={plan.memoID}> {plan.memoText}</Text>
          ))} */}
          {renderState
            .filter(
              (item) =>
                moment.unix(item.memoID).format('YYYY-MM-DD') ===
                moment.unix(route.params.planObj[0].memoID).format('YYYY-MM-DD')
            )
            .map((plan) => (
              // <Text key={plan.memoID}> {plan.memoText}</Text>
              <TextContainer
                key={plan.memoID}
                memo={plan}
                navigation={navigation}
                destination="detailText"
              />
            ))}
        </>
      )}
    </View>
  );
};

export default CalenderDaily;
