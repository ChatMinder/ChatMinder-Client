import React, { useState } from 'react';
import { Text, Button, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import palette from '../shared/palette';

import {
  CategoryItem,
  TextBox,
  ImgBox,
  ImgItem,
  ButtonBox,
} from '../shared/styles/CategoryStyle';

import ModalItem from '../shared/components/Modaltem';

const trashcan = require('../shared/assets/trashcan.png');
const settings = require('../shared/assets/settings.png');

const Category = ({ navigation }) => {
  const memoObj = useSelector((state) => state);
  //console.log('memoObj: ', memoObj);

  const [title, setTitle] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);
  const [colors, setColors] = useState([
    { id: 0, colorValue: `${palette.blue}`, colorName: 'blue' },
    { id: 1, colorValue: `${palette.lightBlue}`, colorName: 'lightBlue' },
    { id: 2, colorValue: `${palette.lightGreen}`, colorName: 'lightGreen' },
    { id: 3, colorValue: `${palette.green}`, colorName: 'green' },
    { id: 4, colorValue: `${palette.blueGreen}`, colorName: 'blueGreen' },
    { id: 5, colorValue: `${palette.purple}`, colorName: 'purple' },
    { id: 6, colorValue: `${palette.pink}`, colorName: 'pink' },
    { id: 7, colorValue: `${palette.orange}`, colorName: 'orange' },
    { id: 8, colorValue: `${palette.lightOrange}`, colorName: 'lightOrange' },
    { id: 9, colorValue: `${palette.yellow}`, colorName: 'yellow' },
  ]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <Wrapper>
      <ButtonBox>
        <Text>태그</Text>
        <Button
          title="+ 태그추가"
          onPress={() => {
            setTitle('');
            toggleModal();
          }}
        />
      </ButtonBox>
      {memoObj[0].map((tag, index) => (
        <CategoryItem
          key={tag.tagID}
          backgroundColor={colors[index].colorValue}
        >
          <TextBox
            onPress={() => {
              navigation.navigate('CategoryDetail', {
                tagID: tag.tagID,
                tagName: tag.tagName,
              });
            }}
          >
            <Text>{tag.tagName}</Text>
          </TextBox>
          <ImgBox>
            <TouchableOpacity
              onPress={() => {
                toggleModal();
                setTitle(tag.categoryName);
              }}
            >
              <ImgItem source={settings} />
            </TouchableOpacity>
            <TouchableOpacity>
              <ImgItem source={trashcan} />
            </TouchableOpacity>
          </ImgBox>
        </CategoryItem>
      ))}
      <ModalItem
        isModalVisible={isModalVisible}
        title={title}
        colors={colors}
        toggleModal={toggleModal}
      />
    </Wrapper>
  );
};

const Wrapper = styled.View``;

export default Category;
