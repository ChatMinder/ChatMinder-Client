import React, { useState } from 'react';
import { Button, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import {
  StyledSafeAreaView,
  StyledModalContainer,
  StyledModalGradeWrapper,
  StyledModalGradeText,
  InputBox,
  ColorBox,
  ColorItem,
  CloseButton,
} from '../styles/ModalStyle';

import { ImgItem, ButtonBox } from '../styles/CategoryStyle';

const cancel = require('../assets/cancel.png');

const ModalItem = ({ isModalVisible, title, colors, toggleModal }) => {
  return (
    <StyledSafeAreaView>
      <Modal
        isVisible={isModalVisible}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <StyledModalContainer>
          <StyledModalGradeWrapper>
            <ButtonBox>
              <StyledModalGradeText>제목</StyledModalGradeText>
              <CloseButton onPress={toggleModal}>
                <ImgItem source={cancel} />
              </CloseButton>
            </ButtonBox>
            <InputBox
              placeholder="제목을 입력해주세요"
              onChangeText={(text) => setTitle(text)}
              value={title}
            />
            <StyledModalGradeText>태그 컬러</StyledModalGradeText>
            <ColorBox>
              {colors.map((color) => (
                <TouchableOpacity
                  key={color.id}
                  onPress={() => console.log(color.colorName)}
                >
                  <ColorItem backgroundColor={color.colorValue} />
                </TouchableOpacity>
              ))}
            </ColorBox>
          </StyledModalGradeWrapper>
          <Button title="완료" onPress={toggleModal} />
        </StyledModalContainer>
      </Modal>
    </StyledSafeAreaView>
  );
};

export default ModalItem;
