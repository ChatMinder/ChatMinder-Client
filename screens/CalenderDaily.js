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
  const [choice, setChoice] = useState('all');

  const [types, setTypes] = useState([
    { id: 0, category: 'all', isSelected: false },
    { id: 1, category: 'image', isSelected: false },
    { id: 2, category: 'link', isSelected: false },
    { id: 3, category: 'text', isSelected: false },
    { id: 4, category: 'bookmark', isSelected: false },
  ]);

  const onToggle = (id) => {
    setTypes(
      types.map((type) =>
        type.id === id ? { ...type, isSelected: !type.isSelected } : type
      )
    );
    //console.log(types[0]);
  };

  const handleTab = {
    all: (
      <TotalText>
        {route.params.planObj.length === 0 ? (
          <Text>일정이 없습니다.</Text>
        ) : (
          <>
            <MemoDate memoID={route.params.planObj[0].memoID} />
            {renderState
              .filter(
                (item) =>
                  moment.unix(item.memoID).format('YYYY-MM-DD') ===
                  moment
                    .unix(route.params.planObj[0].memoID)
                    .format('YYYY-MM-DD')
              )
              .map((plan) => (
                <TextContainer
                  key={plan.memoID}
                  memo={plan}
                  navigation={navigation}
                  destination="detailText"
                />
              ))}
          </>
        )}{' '}
      </TotalText>
    ),
    image: <Text>image</Text>,
    link: <Text>link</Text>,
    text: <Text>text</Text>,
    bookmark: <Text>bookmark</Text>,
  };

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
                  {/* {types.map(
                    (type, index) =>
                      index < 4 && (
                        <HeaderButton
                          type={type}
                          key={type.id}
                          onToggle={onToggle}
                        />
                      )
                  )} */}
                  <StyledBtn
                    onPress={() => {
                      setChoice('all');
                    }}
                  >
                    <Text>전체</Text>
                  </StyledBtn>
                  <StyledBtn
                    onPress={() => {
                      setChoice('image');
                    }}
                  >
                    <ImageItem source={image} />
                  </StyledBtn>
                  <StyledBtn
                    onPress={() => {
                      setChoice('link');
                    }}
                  >
                    <ImageItem source={link} width={20} />
                  </StyledBtn>
                  <StyledBtn
                    onPress={() => {
                      setChoice('text');
                    }}
                  >
                    <Text>가</Text>
                  </StyledBtn>
                </TagBox>
                <View>
                  {/* <HeaderButton type={types[4]} /> */}
                  <StyledBtn
                    onPress={() => {
                      setChoice('bookmark');
                    }}
                  >
                    <ImageItem source={emptyBookmark} />
                  </StyledBtn>
                </View>
              </ButtonBox>
            </TitleBox>
          ),
        });
  }, []);

  return <View>{handleTab[choice]}</View>;
};

export default CalenderDaily;

const StyledBtn = styled.TouchableOpacity`
  border: 1px solid ${palette.borderGray};
  border-radius: 8px;
  width: 40px;
  height: 20px;
  align-items: center;
  justify-content: center;
`;

const ImageItem = styled.Image`
  width: ${(props) => props.width || '15'}px;
  height: ${(props) => props.height || '15'}px;
`;

const TotalText = styled.Text`
  flex-direction: column;
`;

const image = require('../shared/assets/uploadImage.png');
const link = require('../shared/assets/link.png');
const emptyBookmark = require('../shared/assets/emptyBookmark.png');
const fulledBookmark = require('../shared/assets/fulledBookmark.png');
