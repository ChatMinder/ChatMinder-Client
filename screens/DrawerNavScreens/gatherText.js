import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import Search from '../../shared/components/Search';
import useSearch from '../../shared/hooks/useSearch';
import MemoDate from '../../shared/components/MemoDate';
import moment from 'moment';

import TextContainer from '../../shared/components/TextContainer';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const gatherText = ({ navigation }) => {
  const memoObj = useSelector((state) => state);
  //console.log('memoObj: ', memoObj);
  const dispatch = useDispatch();
  const [onSearchChange, renderState] = useSearch(memoObj);
  const [memos, setMemos] = useState(
    memoObj.filter((element, index) => index > 0)
  );

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
                  navigation={navigation}
                  destination="detailText"
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
