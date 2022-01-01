import React, { useState, useEffect } from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableHighlight,
  Alert,
} from 'react-native';
import styled, { css } from 'styled-components/native';
import palette from '../../shared/palette';
import Search from '../../shared/components/Search';
import useSearch from '../../shared/hooks/useSearch';
import MemoDate from '../../shared/components/MemoDate';
import moment from 'moment';

import TextContainer from '../../shared/components/TextContainer';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const empty = require('../../shared/assets/emptyBookmark.png');
const fulled = require('../../shared/assets/fulledBookmark.png');

const gatherText = ({ navigation }) => {
  const memoObj = useSelector((state) => state);
  //console.log('memoObj: ', memoObj);
  const dispatch = useDispatch();
  const [onSearchChange, renderState] = useSearch(memoObj);
  const [memos, setMemos] = useState(
    memoObj.filter((element, index) => index > 0)
  );

  const handleDelete = (id) => {
    Alert.alert('삭제 확인', '정말 삭제하시겠습니까?', [
      {
        text: '취소',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: '삭제',
        onPress: () => setMemos(memos.filter((memo) => memo.memoID !== id)),
      },
    ]);
  };

  const handlePress = (memo) => {
    navigation.navigate('detailText', {
      id: memo.memoID,
      memoText: memo.memoText,
      categoryName: memo.categoryName,
      isMarked: memo.isMarked,
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View>
          <Text>텍스트 모아보기</Text>
          <SearchInput
            onChangeText={onSearchChange}
            placeholder="내용, 태그 검색"
          />
        </View>
      ),
    });
  });

  return (
    <View>
      <Container>
        {renderState.map(
          (memo, index) =>
            memo.memoID && (
              <TextBox key={memo.memoID}>
                <DateItem>
                  {moment
                    .unix(renderState[index - 1].memoID)
                    .format('YYYY-MM-DD') !==
                    moment.unix(memo.memoID).format('YYYY-MM-DD') && (
                    <MemoDate memoID={memo.memoID} />
                  )}
                </DateItem>
                <TextContainer
                  memo={memo}
                  handleDelete={handleDelete}
                  handlePress={handlePress}
                />
              </TextBox>
            )
        )}
      </Container>
    </View>
  );
};

export default gatherText;

const Container = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: blue 1px solid;
`;

const TextBox = styled.View`
  border: blue 1px solid;
  width: 40%;
`;

const DateItem = styled.View`
  width: 100%;
`;

const SearchInput = styled.TextInput`
  border: 1px solid red;
  width: 200px;
`;
