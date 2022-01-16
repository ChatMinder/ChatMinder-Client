import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import moment from 'moment';

import MemoDate from '../shared/components/MemoDate';
import useSearch from '../shared/hooks/useSearch';
import TextContainer from '../shared/components/TextContainer';
import HeaderButton from '../shared/components/HeaderButton';

import {
  Container,
  TextBox,
  DateItem,
} from '../shared/styles/TextContainerStyle';
import { TitleItem } from '../shared/styles/HeaderStyle';
import TextR from '../shared/components/TextR';
import TextB from '../shared/components/TextB';
import { TextSize } from '../shared/styles/FontStyle';
import styled from 'styled-components/native';

import GoBack from '../shared/assets/GoBack.svg';
import SearchIcon from '../shared/assets/search.svg';

const CalenderDaily = ({ route, navigation }) => {
  const memoData = useSelector((state) => state.memoData);
  const [onSearchChange, renderState] = useSearch('Main');
  const [clickedState, setClickedState] = useState(true);

  const [types, setTypes] = useState([
    { id: 0, category: 'image', isSelected: false },
    { id: 1, category: 'link', isSelected: false },
    { id: 2, category: 'text', isSelected: false },
    { id: 3, category: 'bookmark', isSelected: false },
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
      headerLeft: () => (
        <TouchableOpacity
          hitSlop={{ top: 32, bottom: 32, left: 32, right: 32 }}
          onPress={() => navigation.navigate('캘린더')}
        >
          <GoBack height="12" width="12" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <HeaderButton type={types[3]} setClickedState={setClickedState} />
      ),
      headerTitle: () => (
        <TitleItem>
          <TextB>
            <TextSize style={{ marginTop: 16, marginBottom: 12 }} fontSize="18">
              {moment(route.params.pickedDate).format('YYYY년 MM월 DD일')}
            </TextSize>
          </TextB>
        </TitleItem>
      ),
    });
  }, []);

  return (
    <Scroll>
      <Wrapper>
        {clickedState ? (
          <Container>
            <TextBox>
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
            </TextBox>
          </Container>
        ) : (
          <Container>
            <TextBox>
              {route.params.planObj.length === 0 ? (
                <TextR>일정이 없습니다.</TextR>
              ) : (
                <>
                  <MemoDate memoTime={route.params.planObj[0].timestamp} />
                  {renderState
                    .filter((elemnet) => elemnet.is_marked === true)
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
            </TextBox>
          </Container>
        )}
      </Wrapper>
    </Scroll>
  );
};

export default CalenderDaily;

const Wrapper = styled.View`
  align-items: center;
`;

const Scroll = styled.ScrollView`
  width: 100%;
  height: 100%;
`;
