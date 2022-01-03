import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import Search from '../../shared/components/Search';
import useSearch from '../../shared/hooks/useSearch';
import MemoDate from '../../shared/components/MemoDate';
import moment from 'moment';

import TextContainer from '../../shared/components/TextContainer';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { SearchInput, TitleBox } from '../../shared/styles/InputStyle';

import {
  Container,
  TextBox,
  DateItem,
} from '../../shared/styles/TextContainerStyle';

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
        <TitleBox>
          <Text>텍스트 모아보기</Text>
          <SearchInput
            onChangeText={onSearchChange}
            placeholder="내용, 태그 검색"
          />
        </TitleBox>
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
