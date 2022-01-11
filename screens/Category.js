import React, { useState, useEffect } from 'react';
import {
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';

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
import TextB from '../shared/components/TextB';
import TextR from '../shared/components/TextR';
import { TextSize } from '../shared/styles/FontStyle';

import ModalItem from '../shared/components/Modaltem';

const trashcan = require('../shared/assets/trashcan.png');
const settings = require('../shared/assets/settings.png');

const Category = ({ navigation }) => {
  const tagData = useSelector((state) => state.tagData);
  //console.log('tagData: ', tagData);

  const [title, setTitle] = useState('');
  const [stateValue, setStateValue] = useState('');
  const [tags, setTags] = useState([]);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    handleTags();
  }, [tags, isModalVisible]);

  const handleTags = async () => {
    try {
      const response = await axios.get('https://api.chatminder.app/tags', {
        headers: {
          Authorization:
            'Bearer ' +
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ5NDg3OTYxLCJqdGkiOiJkNmYzYzVhZmZmY2M0MDc3Yjc0ZjdlOWVlOTk4ODViOCIsInVzZXJfaWQiOjE3LCJrYWthb19pZCI6IjEyMTIxMjIiLCJrYWthb19lbWFpbCI6InNlZTJvbkBuYXZlci5jb20ifQ.iVV5L4qhSmx2c8s50LC3Xe7J4u14ZNwf0ja2EKDLeoM',
        },
      });
      //console.log('response >>', response.data);
      setTags(response.data);
    } catch (error) {
      console.log('Error >>', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://api.chatminder.app/tags/${id}`,
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
    <Wrapper>
      <ButtonBox width="100%">
        <TextB>
          <TextSize fontSize="20">태그</TextSize>
        </TextB>
        <ButtonItem
          onPress={() => {
            setTitle('');
            toggleModal();
          }}
        >
          <TextB>
            <TextSize fontSize="14" color="white">
              + 태그추가
            </TextSize>
          </TextB>
        </ButtonItem>
      </ButtonBox>
      <TagScroll>
        {tags.map((tag, index) => (
          <CategoryItem key={tag.id} backgroundColor={tag.tag_color}>
            <TextBox
              onPress={() => {
                navigation.navigate('CategoryDetail', {
                  id: tag.id,
                  tag_name: tag.tag_name,
                  tag_color: tag.tag_color,
                });
              }}
            >
              <TextB>
                <TextSize fontSize="16" color="white">
                  {tag.tag_name ? tag.tag_name : '분류 안한 메모'}
                </TextSize>
              </TextB>
            </TextBox>
            <ImgBox>
              <TouchableOpacity
                onPress={() => {
                  toggleModal();
                  setTitle(tag.tag_name);
                }}
              >
                <ImgItem source={settings} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert('삭제 확인', '정말 삭제하시겠습니까?', [
                    {
                      text: '취소',
                      onPress: () => alert('취소되었습니다.'),
                      style: 'cancel',
                    },
                    {
                      text: '삭제',
                      onPress: () => {
                        handleDelete(tag.id);
                        alert('삭제되었습니다.');
                      },
                    },
                  ]);
                }}
              >
                <ImgItem source={trashcan} />
              </TouchableOpacity>
            </ImgBox>
          </CategoryItem>
        ))}
      </TagScroll>
      <ModalItem
        //handleNewTag={handleNewTag}
        isModalVisible={isModalVisible}
        title={title}
        //colors={colors}
        toggleModal={toggleModal}
        setStateValue={setStateValue}
      />
    </Wrapper>
  );
};

export default Category;

const Wrapper = styled.View``;

const ButtonItem = styled.TouchableOpacity`
  background-color: ${palette.main};
  border-radius: 5px;
  padding: 3px 7px;
`;

const TagScroll = styled.ScrollView`
  height: 90%;
`;
