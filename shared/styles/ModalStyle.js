import React from 'react';
import { Text, View, TextInput, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import palette from '../palette';

export const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const StyledModalContainer = styled.View`
  flex-direction: column;
  align-items: center;
  width: 320px;
  height: 220px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
`;

export const StyledModalGradeWrapper = styled.View`
  flex: 1;
  width: 320px;
  justify-content: center;
`;

export const StyledModalGradeText = styled.Text`
  font-size: 15px;
`;

export const InputBox = styled.TextInput`
  border: 1px solid gray;
`;

export const ColorBox = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  padding: 1% 3%;
`;

export const ColorItem = styled.View`
  border-radius: 50px;
  width: 45px;
  height: 45px;
  background-color: ${(props) =>
    props.backgroundColor || `${palette.lightGreen}`};
  margin: 0 2% 2% 0;
`;

export const CloseButton = styled.TouchableOpacity``;
