import React, { useState, useEffect } from 'react';
import { Button, TouchableOpacity, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { PostTag, PatchTag } from '../API';

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

import Cancel from '../assets/cancel.svg';

const ModalItem = ({ isModalVisible, title, toggleModal, setStateValue }) => {
  const token = useSelector((state) => state.auth.accessToken);
  const [subTitle, setSubTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const SendData = () => {
    setStateValue(subTitle);
  };

  // useEffect(() => {
  //   {
  //     title.title ? setSubTitle(title.title) : setSubTitle('');
  //   }
  //   console.log('title: ', title);
  //   console.log('subTitle:', subTitle)
  //   () => {};
  // }, [subTitle, title.title]);

  const [colors, setColors] = useState([
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

  const [clicked, setClicked] = useState({
    isSelected: Array(colors.length).fill(false),
  });

  const handleClicked = (idx) => {
    const newArr = Array(colors.length).fill(false);
    newArr[idx] = true;
    console.log(newArr);
    setClicked({
      isSelected: newArr,
    });
    console.log(clicked.isSelected);
  };

  const handleColors = (tag_color) => {
    let borderThing;
    colors.map((item) => {
      if (item.colorValue === tag_color) {
        borderThing = item.borderValue;
      }
    });
    return borderThing;
  };

  // const handleColor = (idx) => {
  //   setColors(
  //     colors.map((color) =>
  //       color.id === idx ? { ...color, isSelected: !color.isSelected } : color
  //     )
  //   );
  //   console.log(colors);
  // };

  const handleNewTag = async () => {
    const formData = {
      tag_name: subTitle,
      tag_color: selectedColor,
    };
    try {
      const postTagRes = await PostTag(token, formData);
      console.log('postTagRes 성공: ', postTagRes.data);
    } catch (error) {
      console.log('postTagRes 실패: ', error);
    }
  };

  const handleEdit = async (id) => {
    const formData = {
      tag_name: subTitle,
      tag_color: selectedColor,
    };
    try {
      const patchTagRes = await PatchTag(token, formData, id);
      console.log('patchTag 성공: ', patchTagRes.data);
    } catch (error) {
      console.log('patchTag 실패: ', error);
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
              <Cancel />
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
              //value={subTitle}
            />

            <InputBox />
          </TitleBox>
          <TitleBox>
            <TextR>
              <TextSize color={palette.gray2}>태그 컬러</TextSize>
            </TextR>
          </TitleBox>
          <ColorBox>
            {colors.map((color, index) =>
              clicked.isSelected[index] ? (
                <TouchableOpacity
                  key={color.id}
                  onPress={() => {
                    setSelectedColor(color.colorValue);
                    handleClicked(index);
                    console.log(color.colorName);
                  }}
                >
                  <ColorItem
                    backgroundColor={color.colorValue}
                    borderColor={handleColors(color.colorValue)}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  key={color.id}
                  onPress={() => {
                    setSelectedColor(color.colorValue);
                    handleClicked(index);
                    console.log(color.colorName);
                  }}
                >
                  <ColorItem backgroundColor={color.colorValue} />
                </TouchableOpacity>
              )
            )}
          </ColorBox>

          <CloseButton
            onPress={() => {
              SendData();
              //handleNewTag();
              toggleModal();
              {
                title.id ? handleEdit(title.id) : handleNewTag();
              }
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
