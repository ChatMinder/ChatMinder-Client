import React, { useState } from 'react';
import { Button, TouchableOpacity, View, Text, ScrollView } from 'react-native';
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
import palette from '../palette';

import Cancel from '../assets/cancel.svg';

const ModalListItem = ({ isModalVisible, toggleModal }) => {
  const tagData = useSelector((state) => state.tagData);
  //console.log('tagData: ', tagData);

  return (
    <StyledSafeAreaView>
      <Modal
        isVisible={isModalVisible}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <StyledModalContainer>
          <ButtonBox>
            <TextR>태그 분류 수정</TextR>
            <TouchableOpacity onPress={toggleModal}>
              <Cancel />
            </TouchableOpacity>
          </ButtonBox>
          <Scroll>
            {tagData.map((tag, index) =>
              tag.tag_name ? (
                <TagBox key={tag.id} backgroundColor={tag.tag_color}>
                  <TextB>
                    <TextItem>{tag.tag_name}</TextItem>
                  </TextB>
                </TagBox>
              ) : (
                <View key={tag.index} />
              )
            )}
          </Scroll>
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

const Scroll = styled.ScrollView`
  width: 100%;
  margin-left: 5%;
`;
