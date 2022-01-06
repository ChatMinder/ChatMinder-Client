import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import moment from 'moment';
import {
  CategoryItem,
  TextBox,
  ImgBox,
  ImgItem,
} from '../shared/styles/CategoryStyle';
import palette from '../shared/palette';
import TextB from '../shared/components/TextB';
import TextR from '../shared/components/TextR';
import { TextSize } from '../shared/styles/FontStyle';

const settings = require('../shared/assets/settings.png');
const trashcan = require('../shared/assets/trashcan.png');

const CalendarPage = ({ navigation }) => {
  const memoObj = useSelector((state) => state);
  const [markedDates, setMarkedDates] = useState(null);
  const [dates, setDates] = useState({
    markedDates: memoObj
      .map((memo, index) => moment.unix(memo.timestamp).format('YYYY-MM-DD'))
      .filter((element, index) => index > 0),
    marked: null,
  });
  const [pickedDate, setPickedDate] = useState('');
  //console.log(dates);

  const [planObj, setPlanObj] = useState([]);

  useEffect(() => {
    dotDates();
    //console.log('plan:', planObj);
  }, [planObj]);

  function dotDates() {
    let obj = dates.markedDates.reduce(
      (c, v) =>
        Object.assign(c, {
          [v]: { marked: true, dotColor: 'red' },
        }),
      {}
    );
    setMarkedDates(obj);
    setMarkedDates({
      ...obj,
      [pickedDate]: {
        selected: true,
        selectedColor: `${palette.lightPurple}`,
      },
    });
  }

  const handlePlan = (day) => {
    const dotDate = memoObj
      .filter((element, index) => index > 0)
      .filter(
        (e) => moment.unix(e.timestamp).format('YYYY-MM-DD') === day.dateString
      );
    setPlanObj(dotDate);
    setPickedDate(day.dateString);
    // console.log('plan', planObj);
  };

  return (
    <Wrapper>
      <Title>
        <TextB>
          <TextSize fontSize="20">캘린더</TextSize>
        </TextB>
      </Title>
      <CalenderBox>
        <Calendar
          onDayPress={(day) => {
            handlePlan(day);
            console.log(markedDates);
          }}
          markedDates={markedDates}
          theme={{
            'stylesheet.calendar.header': {
              dayTextAtIndex0: {
                color: 'red',
              },
              dayTextAtIndex6: {
                color: 'blue',
              },
              // week: {
              //   marginTop: 30,
              //   marginHorizontal: 12,
              //   flexDirection: 'row',
              //   justifyContent: 'space-between',
              // },
            },
          }}
        />
      </CalenderBox>
      <PlanBox>
        {planObj.map((plan) => (
          <CategoryItem key={plan.memoID}>
            <TextBox>
              <Text> {plan.memoText}</Text>
            </TextBox>
            <ImgBox>
              <TouchableOpacity>
                <ImgItem source={settings} />
              </TouchableOpacity>
              <TouchableOpacity>
                <ImgItem source={trashcan} />
              </TouchableOpacity>
            </ImgBox>
          </CategoryItem>
        ))}

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CalenderDaily', {
              planObj: planObj,
            })
          }
          style={{
            alignItems: 'flex-end',
          }}
        >
          <TextR>이 날 메모 모아보기 &#62;</TextR>
        </TouchableOpacity>
      </PlanBox>
    </Wrapper>
  );
};

export default CalendarPage;

const Wrapper = styled.View`
  background-color: ${palette.backgroundGray};
  height: 100%;
  padding: 16px;
`;

const Title = styled.View`
  margin: 4% 1%;
`;

const CalenderBox = styled.View``;

const PlanBox = styled.View`
  margin-top: 25px;
  width: 100%;
`;

LocaleConfig.locales['fr'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'Jun',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Janv.',
    'Fevr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Dec.',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'fr';
