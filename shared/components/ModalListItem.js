import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Alert } from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { PatchTag } from '../API';
import TextB from './TextB';
import TextR from './TextR';

import {
  StyledSafeAreaView,
  StyledModalContainer,
  CloseButton,
} from '../styles/ModalStyle';

import { ButtonBox } from '../styles/CategoryStyle';
import palette from '../palette';
import { TextSize } from '../styles/FontStyle';

import Cancel from '../assets/cancel.svg';

const ModalListItem = ({ isModalVisible, toggleModal, handleEditTag }) => {
  const tagData = useSelector((state) => state.tagData);
  const [tagId, setTagId] = useState(0);

  useEffect(() => {}, [tagId]);

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
    setClicked({
      isSelected: newArr,
    });
  };

  const handleColors = (tag_color) => {
    let borderThing;
    colorItems.map((item) => {
      if (item.colorValue === tag_color) {
        borderThing = item.borderValue;
      }
    });

    return borderThing;
  };

  const handleEdit = async (id) => {
    const formData = {
      tag_name: subTitle,
      tag_color: selectedColor,
    };
    try {
      const patchTagRes = await PatchTag(token, formData, id);
    } catch (error) {
      if (error == 'Error: Network Error') {
        Alert.alert(
          '알림',
          `인터넷 연결이 불안정합니다.\n확인 후 다시 시도해 주세요.`,
          [
            {
              text: '네!',
              style: 'cancel',
            },
          ]
        );
      }
    }
  };

  return (
    <StyledSafeAreaView>
      <Modal
        isVisible={isModalVisible}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <StyledModalContainer height="442px">
          <ButtonBox style={{ marginTop: 25, marginBottom: 22 }}>
            <View
              style={{
                marginLeft: 20,
              }}
            >
              <TextR>태그 분류 수정</TextR>
            </View>
            <TouchableOpacity
              style={{
                marginRight: 20,
              }}
              onPress={toggleModal}
            >
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
                      handleClicked(index);
                      setTagId(tag.id);
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
          <CloseButton
            marginBottom="20px"
            onPress={() => {
              handleEditTag(tagId);
              toggleModal();
            }}
          >
            <TextB>
              <TextSize fontSize="18" color={palette.white}>
                완료
              </TextSize>
            </TextB>
          </CloseButton>
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
  background-color: ${(props) => props.backgroundColor || `${palette.gray1}`};
  border: 3px solid ${(props) => props.borderColor || `${palette.white}`};
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
