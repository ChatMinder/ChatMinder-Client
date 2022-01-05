import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import moment from 'moment';

import MemoDate from '../shared/components/MemoDate';
import useSearch from '../shared/hooks/useSearch';
import HeaderButton from '../shared/components/HeaderButton';
import TextContainer from '../shared/components/TextContainer';

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
    renderState.filter((item) => item.tagName === route.params.tagName)
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
          <Text>{route.params.tagName}</Text>
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
        .filter((item, index) => item.tagName === route.params.tagName)
        .map(
          (memo, index) =>
            memo.timestamp && (
              <TextBox key={memo.memoID}>
                <DateItem>
                  {index === 0 ? (
                    <MemoDate memoTime={memo.timestamp} />
                  ) : (
                    <>
                      {moment
                        .unix(memos[index - 1].timestamp)
                        .format('YYYY-MM-DD') !==
                        moment.unix(memo.timestamp).format('YYYY-MM-DD') && (
                        <MemoDate memoTime={memo.timestamp} />
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
