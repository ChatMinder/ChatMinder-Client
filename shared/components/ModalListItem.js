import React, { useState } from 'react';
import { Button, TouchableOpacity, View, Text } from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import TextB from './TextB';
import TextR from './TextR';

import {
  StyledSafeAreaView,
  StyledModalContainer,
  StyledModalGradeWrapper,
  CloseButton,
} from '../styles/ModalStyle';

import { ImgItem, ButtonBox } from '../styles/CategoryStyle';
import palette from '../../shared/palette';

const cancel = require('../assets/cancel.png');

const ModalListItem = ({ isModalVisible, toggleModal }) => {
  const memoObj = useSelector((state) => state);
  //console.log('memoObj: ', memoObj);

  return (
    <StyledSafeAreaView>
      <Modal
        isVisible={isModalVisible}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <StyledModalContainer>
          <ButtonBox>
            <TextR>태그 분류 수정</TextR>
            <CloseButton onPress={toggleModal}>
              <ImgItem source={cancel} />
            </CloseButton>
          </ButtonBox>

          {memoObj[0].map((tag, index) =>
            tag.tagName ? (
              <TagBox key={tag.tagID} backgroundColor={tag.tagColor}>
                <TextB>
                  <TextItem>{tag.tagName}</TextItem>
                </TextB>
              </TagBox>
            ) : (
              <View key={tag.tagID} />
            )
          )}
        </StyledModalContainer>
      </Modal>
    </StyledSafeAreaView>
  );
};

export default ModalListItem;

const TagBox = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  margin: 0 2% 1%;
  background-color: ${(props) =>
    props.backgroundColor || `${palette.lightGreen}`};
  border-radius: 10px;
  height: 50px;
  width: 90%;
  align-items: center;
  padding: 0 15px;
  margin-bottom: 10px;
`;

const TextItem = styled.Text`
  color: white;
  font-size: 14px;
`;
