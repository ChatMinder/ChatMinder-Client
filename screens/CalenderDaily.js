import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import moment from 'moment';

import MemoDate from '../shared/components/MemoDate';
import TextContainer from '../shared/components/TextContainer';
import HeaderButton from '../shared/components/HeaderButton';

import {
  Container,
  TextBox,
  Wrapper,
  Scroll,
} from '../shared/styles/TextContainerStyle';
import { TitleItem } from '../shared/styles/HeaderStyle';
import TextR from '../shared/components/TextR';
import TextB from '../shared/components/TextB';
import { TextSize } from '../shared/styles/FontStyle';

import GoBack from '../shared/assets/GoBack.svg';
import palette from '../shared/palette';

const CalenderDaily = ({ route, navigation }) => {
  const memoData = useSelector((state) => state.memoData);
  const [clickedState, setClickedState] = useState(true);

  const [types, setTypes] = useState([
    { id: 0, category: 'image', isSelected: false },
    { id: 1, category: 'link', isSelected: false },
    { id: 2, category: 'text', isSelected: false },
    { id: 3, category: 'bookmark', isSelected: false },
  ]);

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
      headerTitleAlign: 'center',
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
      <StatusBar backgroundColor={palette.white} barStyle="dark-content" />
      <Wrapper>
        {clickedState ? (
          <Container>
            <TextBox>
              {route.params.planObj.length === 0 ? (
                <Info>
                  <TextR>
                    <TextSize color={palette.gray3} fontSize="14">
                      이 날 작성한 메모가 없어요.
                    </TextSize>
                  </TextR>
                </Info>
              ) : (
                <>
                  <MemoDate memoTime={route.params.planObj[0].timestamp} />
                  {memoData
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
                <Info>
                  <TextR>
                    <TextSize color={palette.gray3} fontSize="14">
                      이 날 작성한 메모가 없어요.
                    </TextSize>
                  </TextR>
                </Info>
              ) : (
                <>
                  <MemoDate memoTime={route.params.planObj[0].timestamp} />
                  {memoData
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

const Info = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 65%;
`;
