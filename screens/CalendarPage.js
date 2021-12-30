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

const settings = require('../shared/assets/settings.png');
const trashcan = require('../shared/assets/trashcan.png');

const CalenderBox = styled.View`
  border: 1px solid black;
`;

const PlanBox = styled.View`
  border: 1px solid red;
  width: 100%;
`;

const CalendarPage = () => {
  const memoObj = useSelector((state) => state);
  const [markedDates, setMarkedDates] = useState(null);
  const [dates, setDates] = useState({
    markedDates: memoObj
      .map((memo, index) => moment.unix(memo.memoID).format('YYYY-MM-DD'))
      .filter((element, index) => index > 0),
    marked: null,
  });

  const [planObj, setPlanObj] = useState([]);

  useEffect(() => {
    dotDates();
    console.log('plan:', planObj);
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
  }

  const handlePlan = (day) => {
    const dotDate = memoObj
      .filter((element, index) => index > 0)
      .filter(
        (e) => moment.unix(e.memoID).format('YYYY-MM-DD') === day.dateString
      );
    setPlanObj(dotDate);
  };

  return (
    <View>
      <Text>캘린더</Text>
      <CalenderBox>
        <Calendar
          onDayPress={(day) => {
            handlePlan(day);
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
          style={{
            alignItems: 'flex-end',
          }}
        >
          <Text>이 날 메모 모아보기</Text>
        </TouchableOpacity>
      </PlanBox>
    </View>
  );
};

export default CalendarPage;

LocaleConfig.locales['fr'] = {
  monthNames: [
    'Janvier',
    'Fevrier',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Decembre',
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
