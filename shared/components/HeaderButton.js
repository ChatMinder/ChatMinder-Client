import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import palette from '../palette';

const image = require('../assets/uploadImage.png');
const imageLight = require('../assets/image_light.png');
const link = require('../assets/link.png');
const linkLight = require('../assets/link_light.png');
const emptyBookmark = require('../assets/emptyBookmark.png');
const fulledBookmark = require('../assets/fulledBookmark.png');

const HeaderButton = ({ type, setChoice }) => {
  const { id, category, isSelected } = type;
  //console.log(type);

  const [clicked, setClicked] = useState({ isClicked: false });

  const onClick = () => {
    setClicked({ isClicked: !clicked.isClicked });
  };

  return category === 'all' ? (
    <TouchableOpacity
      onPress={() => {
        setChoice(category);
        onClick();
      }}
    >
      {clicked.isClicked ? (
        <SelectedBox>
          <SelectedText>전체</SelectedText>
        </SelectedBox>
      ) : (
        <CommonBox>
          <Text>전체</Text>
        </CommonBox>
      )}
    </TouchableOpacity>
  ) : category === 'image' ? (
    <TouchableOpacity
      onPress={() => {
        setChoice(category);
        onClick();
      }}
    >
      {clicked.isClicked ? (
        <SelectedBox>
          <ImageItem source={imageLight} />
        </SelectedBox>
      ) : (
        <CommonBox>
          <ImageItem source={image} />
        </CommonBox>
      )}
    </TouchableOpacity>
  ) : category === 'link' ? (
    <TouchableOpacity
      onPress={() => {
        setChoice(category);
        onClick();
      }}
    >
      {clicked.isClicked ? (
        <SelectedBox>
          <ImageItem source={linkLight} width={20} />
        </SelectedBox>
      ) : (
        <CommonBox>
          <ImageItem source={link} width={20} />
        </CommonBox>
      )}
    </TouchableOpacity>
  ) : category === 'text' ? (
    <TouchableOpacity
      onPress={() => {
        setChoice(category);
        onClick();
      }}
    >
      {clicked.isClicked ? (
        <SelectedBox>
          <SelectedText>가</SelectedText>
        </SelectedBox>
      ) : (
        <CommonBox>
          <Text>가</Text>
        </CommonBox>
      )}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={() => {
        setChoice(category);
        onClick();
      }}
    >
      {clicked.isClicked ? (
        <CommonBox>
          <ImageItem source={fulledBookmark} />
        </CommonBox>
      ) : (
        <CommonBox>
          <ImageItem source={emptyBookmark} />
        </CommonBox>
      )}
    </TouchableOpacity>
  );
};

export default HeaderButton;

const CommonBox = styled.View`
  border: 1px solid ${palette.borderGray};
  border-radius: 8px;
  width: 40px;
  height: 20px;
  align-items: center;
  justify-content: center;
`;

const SelectedBox = styled(CommonBox)`
  background-color: ${palette.main};
`;

const ImageItem = styled.Image`
  width: ${(props) => props.width || '15'}px;
  height: ${(props) => props.height || '15'}px;
`;

const SelectedText = styled.Text`
  color: white;
`;
