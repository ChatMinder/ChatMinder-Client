import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import palette from '../shared/palette';
import { useSelector } from 'react-redux';
import moment from 'moment';

import MemoDate from '../shared/components/MemoDate';
import useSearch from '../shared/hooks/useSearch';
import TextContainer from '../shared/components/TextContainer';

const CalenderDaily = ({ route, navigation }) => {
  const memoObj = useSelector((state) => state);
  const [onSearchChange, renderState] = useSearch(memoObj);
  const [choice, setChoice] = useState('');

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
                  <StyledBtn>
                    <Text>전체</Text>
                  </StyledBtn>
                  <StyledBtn>
                    <Text>이미지</Text>
                  </StyledBtn>
                  <StyledBtn>
                    <Text>링크</Text>
                  </StyledBtn>
                  <StyledBtn>
                    <Text>텍스트</Text>
                  </StyledBtn>
                </TagBox>
                <View>
                  <StyledBtn>
                    <Text>북마크</Text>
                  </StyledBtn>
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
              <Text key={plan.memoID}> {plan.memoText}</Text>
            ))}
        </>
      )}
    </View>
  );
};

export default CalenderDaily;

const TitleBox = styled.View`
  border: 1px solid red;
  width: 98%;
`;

const SearchInput = styled.TextInput`
  border: 1px solid red;
  width: 200px;
`;

const ButtonBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const StyledBtn = styled.TouchableOpacity`
  border: 1px solid ${palette.borderGray};
  border-radius: 8px;
  padding: 0 1%;
`;

const TagBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
