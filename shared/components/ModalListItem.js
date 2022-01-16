import React, { useState, useEffect } from 'react';
import {
  Button,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { PatchTag } from '../API';
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

const ModalListItem = ({ isModalVisible, toggleModal, handleEditTag }) => {
  const tagData = useSelector((state) => state.tagData);
  //console.log('tagData: ', tagData);
  const [tagId, setTagId] = useState(0);

  useEffect(() => {
    //console.log(tagId);
  }, [tagId]);

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
    //console.log(newArr);
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
        <StyledModalContainer>
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
                      console.log(tagId);
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
          <Button
            title="확인"
            onPress={() => {
              handleEditTag(tagId);
              toggleModal();
            }}
          />
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
