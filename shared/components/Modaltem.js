import React, { useState, useEffect } from 'react';
import { Button, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import { useForm, Controller } from 'react-hook-form';

import {
  StyledSafeAreaView,
  StyledModalContainer2,
  StyledModalGradeWrapper,
  StyledModalGradeText,
  InputBox,
  ColorBox,
  ColorItem,
  CloseButton,
  ClosedBox,
  TitleBox,
} from '../styles/ModalStyle';
import { TextSize } from '../styles/FontStyle';
import TextR from './TextR';
import TextB from './TextB';
import palette from '../palette';

import { ImgItem, ButtonBox } from '../styles/CategoryStyle';
import { FontStyle } from '../styles/FontStyle';

const cancel = require('../assets/cancel.png');

const ModalItem = ({
  handleNewTag,
  isModalVisible,
  title,
  colors,
  toggleModal,
  setStateValue,
}) => {
  const [subTitle, setSubTitle] = useState('');

  const SendData = () => {
    setStateValue(subTitle);
  };

  useEffect(() => {
    // console.log('title', title, 'sub', subTitle);
  }, []);

  return (
    <StyledSafeAreaView>
      <Modal
        isVisible={isModalVisible}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <StyledModalContainer2>
          <ClosedBox>
            <TouchableOpacity
              onPress={() => {
                toggleModal();
              }}
            >
              <ImgItem source={cancel} />
            </TouchableOpacity>
          </ClosedBox>
          <TitleBox>
            <TextR>
              <TextSize color={palette.gray2}>제목</TextSize>
            </TextR>
          </TitleBox>

          <TitleBox marginBottom="30">
            <TextInput
              placeholder="태그를 입력해주세요"
              type="text"
              onChangeText={(text) => {
                setSubTitle(text);
              }}
            />

            <InputBox />
          </TitleBox>
          <TitleBox>
            <TextR>
              <TextSize color={palette.gray2}>태그 컬러</TextSize>
            </TextR>
          </TitleBox>
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

          <CloseButton
            onPress={() => {
              SendData();
              toggleModal();
            }}
          >
            <TextB>
              <TextSize fontSize="18" color={palette.white}>
                완료
              </TextSize>
            </TextB>
          </CloseButton>
        </StyledModalContainer2>
      </Modal>
    </StyledSafeAreaView>
  );
};

export default ModalItem;
