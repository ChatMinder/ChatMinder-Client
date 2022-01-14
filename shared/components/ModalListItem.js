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

  const [clicked, setClicked] = useState({
    isSelected: Array(tagData.length).fill(false),
  });

  const [colorItems, setColorItems] = useState([
    {
      id: 0,
      colorValue: `${palette.blue}`,
      colorName: 'blue',
      borderValue: `${palette.blue_border}`,
    },
    {
      id: 1,
      colorValue: `${palette.lightBlue}`,
      colorName: 'lightBlue',
      borderValue: `${palette.lightBlue_border}`,
    },
    {
      id: 2,
      colorValue: `${palette.lightGreen}`,
      colorName: 'lightGreen',
      borderValue: `${palette.lightGreen_border}`,
    },
    {
      id: 3,
      colorValue: `${palette.green}`,
      colorName: 'green',
      borderValue: `${palette.green_border}`,
    },
    {
      id: 4,
      colorValue: `${palette.blueGreen}`,
      colorName: 'blueGreen',
      borderValue: `${palette.blueGreen_border}`,
    },
    {
      id: 5,
      colorValue: `${palette.purple}`,
      colorName: 'purple',
      borderValue: `${palette.purple_border}`,
    },
    {
      id: 6,
      colorValue: `${palette.pink}`,
      colorName: 'pink',
      borderValue: `${palette.pink_border}`,
    },
    {
      id: 7,
      colorValue: `${palette.orange}`,
      colorName: 'orange',
      borderValue: `${palette.orange_border}`,
    },
    {
      id: 8,
      colorValue: `${palette.lightOrange}`,
      colorName: 'lightOrange',
      borderValue: `${palette.lightOrange_border}`,
    },
    {
      id: 9,
      colorValue: `${palette.yellow}`,
      colorName: 'yellow',
      borderValue: `${palette.yellow_border}`,
    },
  ]);

  const handleClicked = (idx) => {
    const newArr = Array(tagData.length).fill(false);
    newArr[idx] = true;
    console.log(newArr);
    setClicked({
      isSelected: newArr,
    });
    //console.log(clicked.isSelected);
  };

  // console.log(Array(colorItems.length).fill(false));

  const handleColors = (tag_color) => {
    let borderThing;
    colorItems.map((item) => {
      if (item.colorValue === tag_color) {
        borderThing = item.borderValue;
      }
    });
    return borderThing;
  };

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
                clicked.isSelected[index] ? (
                  <TagBox
                    key={tag.id}
                    backgroundColor={tag.tag_color}
                    borderColor={handleColors(tag.tag_color)}
                    onPress={() => {
                      //setClicked(!clicked)
                      handleClicked(index);
                    }}
                  >
                    <TextB>
                      <TextItem>{tag.tag_name}</TextItem>
                    </TextB>
                  </TagBox>
                ) : (
                  <TagBox
                    key={tag.id}
                    backgroundColor={tag.tag_color}
                    onPress={() => {
                      //setClicked(!clicked)
                      handleClicked(index);
                    }}
                  >
                    <TextB>
                      <TextItem>{tag.tag_name}</TextItem>
                    </TextB>
                  </TagBox>
                )
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
  border: 2.5px solid ${(props) => props.borderColor || `${palette.white}`};
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
