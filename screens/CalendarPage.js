import React from 'react';
import { Text, View } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';

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

const CalendarPage = () => {
  const [markedDates, setMarkedDates] = React.useState(null);
  const [dates, setDates] = React.useState(['2021-12-05', '2021-12-20']);

  function addDates() {
    let obj = dates.reduce(
      (c, v) =>
        Object.assign(c, {
          [v]: { marked: true, dotColor: 'red' },
        }),
      {}
    );
    console.log(obj);
    setMarkedDates(obj);
  }

  return (
    <View>
      <Text>캘린더</Text>
      <View>
        <Calendar
          onDayPress={(day) => {
            addDates();
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
      </View>
    </View>
  );
};

export default CalendarPage;
