import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StatusBar } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import moment from 'moment';

import palette from '../shared/palette';
import TextB from '../shared/components/TextB';
import TextR from '../shared/components/TextR';
import { TextSize } from '../shared/styles/FontStyle';

import CalendarLeft from '../shared/assets/calendar_left.svg';
import CalendarRight from '../shared/assets/calendar_right.svg';

const CalendarPage = ({ navigation }) => {
  const memoData = useSelector((state) => state.memoData);
  const [markedDates, setMarkedDates] = useState(null);
  const [dates, setDates] = useState({
    markedDates: memoData.map((memo, index) =>
      moment.unix(memo.timestamp).format('YYYY-MM-DD')
    ),
    marked: null,
  });
  const [pickedDate, setPickedDate] = useState(moment().format('YYYY-MM-DD'));

  const [planObj, setPlanObj] = useState(
    memoData
      .filter((element, index) => index > 0)
      .filter(
        (e) =>
          moment.unix(e.timestamp).format('YYYY-MM-DD') ===
          moment().format('YYYY-MM-DD')
      )
  );

  useEffect(() => {
    dotDates();
  }, [planObj]);

  function dotDates() {
    let obj = dates.markedDates.reduce(
      (c, v) =>
        Object.assign(c, {
          [v]: { marked: true, dotColor: `${palette.main}` },
        }),
      {}
    );
    setMarkedDates(obj);
    {
      dates.markedDates.includes(pickedDate)
        ? setMarkedDates({
            ...obj,
            [pickedDate]: {
              selected: true,
              selectedColor: `${palette.lightPurple}`,
              marked: true,
              dotColor: `${palette.main}`,
            },
          })
        : setMarkedDates({
            ...obj,
            [pickedDate]: {
              selected: true,
              selectedColor: `${palette.lightPurple}`,
            },
          });
    }
  }

  const handlePlan = (day) => {
    const dotDate = memoData
      .filter((element, index) => index > 0)
      .filter(
        (e) => moment.unix(e.timestamp).format('YYYY-MM-DD') === day.dateString
      );
    setPlanObj(dotDate);
    setPickedDate(day.dateString);
  };

  return (
    <Wrapper>
      <StatusBar
        backgroundColor={palette.backgroundGray}
        barStyle="dark-content"
      />
      <Title>
        <TextB>
          <TextSize fontSize="20">캘린더</TextSize>
        </TextB>
      </Title>
      <CalenderBox>
        <Calendar
          renderArrow={(direction) =>
            direction === 'left' ? <CalendarLeft /> : <CalendarRight />
          }
          onDayPress={(day) => {
            handlePlan(day);
          }}
          markedDates={markedDates}
          style={{
            paddingTop: 15,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 8,
            height: 420,
          }}
          theme={{
            todayTextColor: palette.lightPurple,
            todayTextFontWeight: 'bold',
            textDayFontFamily: 'NanumSquareOTF_ac',
            textMonthFontFamily: 'NanumSquareOTF_ac Bold',
            textDayHeaderFontFamily: 'NanumSquareOTF_ac',
            'stylesheet.calendar.header': {
              dayTextAtIndex0: {
                color: palette.lightPurple,
              },
              dayTextAtIndex1: {
                color: palette.lightPurple,
              },
              dayTextAtIndex2: {
                color: palette.lightPurple,
              },
              dayTextAtIndex3: {
                color: palette.lightPurple,
              },
              dayTextAtIndex4: {
                color: palette.lightPurple,
              },
              dayTextAtIndex5: {
                color: palette.lightPurple,
              },
              dayTextAtIndex6: {
                color: palette.lightPurple,
              },
              week: {
                marginTop: 30,
                flexDirection: 'row',
                justifyContent: 'space-around',
              },
            },
          }}
        />
      </CalenderBox>
      <PlanBox>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CalenderDaily', {
              planObj: planObj,
              pickedDate: pickedDate,
            })
          }
          style={{
            alignItems: 'flex-end',
          }}
        >
          <TextR>
            <TextSize fontSize="14" color={palette.gray3}>
              이 날 메모 모아보기 &#62;
            </TextSize>
          </TextR>
        </TouchableOpacity>
      </PlanBox>
    </Wrapper>
  );
};

export default CalendarPage;

const Wrapper = styled.View`
  background-color: ${palette.tagGray};
  height: 100%;
  padding: 16px;
`;

const Title = styled.View`
  margin: 4% 1% 6% 1%;
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
