import React, { useState, useEffect } from 'react';
import { Button, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';

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
  //handleNewTag,
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

  // useEffect(() => {
  //   () => {};
  // }, [subTitle]);

  const handleNewTag = async () => {
    const formData = {
      tag_name: subTitle,
      tag_color: '#B282CC',
    };
    try {
      const response = await axios.post(
        'https://api.chatminder.app/tags',
        formData,
        {
          headers: {
            Authorization:
              'Bearer ' +
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ5NDg3OTYxLCJqdGkiOiJkNmYzYzVhZmZmY2M0MDc3Yjc0ZjdlOWVlOTk4ODViOCIsInVzZXJfaWQiOjE3LCJrYWthb19pZCI6IjEyMTIxMjIiLCJrYWthb19lbWFpbCI6InNlZTJvbkBuYXZlci5jb20ifQ.iVV5L4qhSmx2c8s50LC3Xe7J4u14ZNwf0ja2EKDLeoM',
          },
        }
      );
      console.log('response >>', response.data);
    } catch (error) {
      console.log('Error >>', error);
    }
  };

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
              handleNewTag();
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
