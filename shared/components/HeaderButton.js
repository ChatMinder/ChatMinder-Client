import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import palette from '../palette';

import Link from '../assets/link.svg';
import LinkLight from '../assets/link_light.svg';
import ImageLight from '../assets/image_light.svg';

import EmptyBookmark from '../assets/emptyBookmark.svg';
import FulledBookmark from '../assets/fulledBookmark.svg';
import ImgBtn from '../assets/ImgBtn.svg';

const HeaderButton = ({
  type,
  setClickedState,
  handleFilter,
  setFilterArr,
  handleArr,
}) => {
  const { id, category, isSelected } = type;
  //console.log(type);

  const [clicked, setClicked] = useState({ isClicked: false });

  const SendData = () => {
    setClickedState(clicked.isClicked);
    //console.log(clicked.isClicked);
  };

  const SendCategory = (item) => {
    setFilterArr(() => item);
  };

  const onClick = () => {
    setClicked({ isClicked: !clicked.isClicked });
  };

  return category === 'image' ? (
    <TouchableOpacity
      onPress={() => {
        onClick();
        SendCategory(type.category);
        handleFilter(type.category);
      }}
    >
      {clicked.isClicked ? (
        <SelectedBox>
          <ImageLight height={15} />
        </SelectedBox>
      ) : (
        <CommonBox>
          <ImgBtn height={15} />
        </CommonBox>
      )}
    </TouchableOpacity>
  ) : category === 'link' ? (
    <TouchableOpacity
      onPress={() => {
        onClick();
        SendCategory(type.category);
        handleFilter(type.category);
      }}
    >
      {clicked.isClicked ? (
        <SelectedBox>
          <LinkLight />
        </SelectedBox>
      ) : (
        <CommonBox>
          <Link />
        </CommonBox>
      )}
    </TouchableOpacity>
  ) : category === 'text' ? (
    <TouchableOpacity
      onPress={() => {
        onClick();
        SendCategory(type.category);
        handleFilter(type.category);
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
        onClick();
        SendData();
      }}
    >
      {clicked.isClicked ? (
        <SelectedBox background="white">
          <FulledBookmark width="70%" height="70%" />
        </SelectedBox>
      ) : (
        <CommonBox>
          <EmptyBookmark width="80%" height="80%" />
        </CommonBox>
      )}
    </TouchableOpacity>
  );
};

export default HeaderButton;

export const CommonBox = styled.View`
  border: 1px solid ${palette.borderGray};
  border-radius: 10px;
  width: 40px;
  height: 20px;
  align-items: center;
  justify-content: center;
  padding: 0px;
`;

export const SelectedBox = styled(CommonBox)`
  border-radius: 10px;
  background-color: ${(props) => props.background || `${palette.main}`};
  border-color: ${palette.main};
`;

export const ImageItem = styled.Image`
  width: ${(props) => props.width || '15'}px;
  height: ${(props) => props.height || '15'}px;
`;

export const SelectedText = styled.Text`
  color: white;
`;
