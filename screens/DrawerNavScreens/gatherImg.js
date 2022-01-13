import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { GetImages } from '../../shared/API';

import {
  SearchInput,
  TitleBox,
  HeaderIcon,
  HeaderContainer,
  NoVisibleBox,
  InputBox,
  BookmarkBox,
} from '../../shared/styles/HeaderStyle';

import GoBack from '../../shared/assets/GoBack.svg';
import SearchIcon from '../../shared/assets/search.svg';
import TextB from '../../shared/components/TextB';
import HeaderButton from '../../shared/components/HeaderButton';
import { TextSize } from '../../shared/styles/FontStyle';
import useSearch from '../../shared/hooks/useSearch';

const gatherImg = ({ navigation }) => {
  const [onSearchChange, renderState] = useSearch();
  const [choice, setChoice] = useState('all');

  useEffect(() => {
    GetImages();
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
            <SearchInput onChangeText={onSearchChange} />
          </InputBox>
          <BookmarkBox>
            <HeaderButton type="bookmark" setChoice={setChoice} />
          </BookmarkBox>
        </HeaderContainer>
      ),
    });
  }, []);

  return (
    <View>
      <Text>이미지 모아보기</Text>
    </View>
  );
};

export default gatherImg;
