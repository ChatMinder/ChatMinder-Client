import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import moment from 'moment';

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

const CalenderBox = styled.View`
  border: 1px solid black;
`;

const PlanBox = styled.View`
  border: 1px solid red;
  width: 100%;
  height: 300px;
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
    //console.log('plan:', planObj);
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
        <Text>일정</Text>
        {planObj.map((plan) => (
          <CalenderBox key={plan.memoID}>
            <Text>{plan.memoText}</Text>
          </CalenderBox>
        ))}
      </PlanBox>
    </View>
  );
};

export default CalendarPage;
