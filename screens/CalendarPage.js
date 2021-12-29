import React from 'react';
import { Text, View } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

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
      <Text>CalendarPage</Text>
      <View>
        <Calendar
          onDayPress={(day) => {
            addDates();
          }}
          markedDates={markedDates}
        />
      </View>
    </View>
  );
};

export default CalendarPage;
