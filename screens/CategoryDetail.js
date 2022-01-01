import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import palette from '../shared/palette';
import { useSelector } from 'react-redux';
import moment from 'moment';

import MemoDate from '../shared/components/MemoDate';

const CategoryDetail = ({ route, navigation }) => {
  return <Text>{route.params.categoryID}</Text>;
};

export default CategoryDetail;
