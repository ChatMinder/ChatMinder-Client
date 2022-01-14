import React, { useState, useEffect } from 'react';
import {
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import styled from 'styled-components/native';
import { GetTags, DeleteTag } from '../shared/API';

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

import Trashcan from '../shared/assets/trashcan.svg';
import Settings from '../shared/assets/settings.svg';

const Category = ({ navigation }) => {
  const tagData = useSelector((state) => state.tagData);
  //console.log('tagData: ', tagData);
  const token = useSelector((state) => state.auth.accessToken);

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState({
    id: 0,
    title: '',
  });
  const [stateValue, setStateValue] = useState('');
  const [tags, setTags] = useState([]);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(async () => {
    setLoading(true);
    await handleTags();
    //console.log(title);
    setLoading(false);
  }, [tags]);

  const handleTags = async () => {
    setLoading(true);
    try {
      const getTagsRes = await GetTags(token);
      setTags(getTagsRes.data);
    } catch (error) {
      console.log(`getTags 실패: ${error}`);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const deleteTagRes = await DeleteTag(token, id);
      console.log('deleteTag 성공: ', deleteTagRes.data);
    } catch (error) {
      console.log('deleteTag 실패', error);
    }
    setLoading(false);
  };

  return (
    <Wrapper>
      {loading && (
        <SpinnerWrapper>
          <ActivityIndicator size="large" color="#ff7f6d" />
        </SpinnerWrapper>
      )}
      <ButtonBox width="100%">
        <TextB>
          <TextSize fontSize="20">태그</TextSize>
        </TextB>
        <ButtonItem
          onPress={() => {
            setTitle({ title: '' });
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
                  setTitle({ id: tag.id, title: tag.tag_name });
                }}
              >
                <Settings />
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
                <Trashcan />
              </TouchableOpacity>
            </ImgBox>
          </CategoryItem>
        ))}
      </TagScroll>
      <ModalItem
        isModalVisible={isModalVisible}
        title={title}
        toggleModal={toggleModal}
        setStateValue={setStateValue}
      />
    </Wrapper>
  );
};

export default Category;

const Wrapper = styled.View``;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const SpinnerWrapper = styled.View`
  position: absolute;
  left: ${SCREEN_WIDTH * 0.5 - 18}px;
  bottom: ${SCREEN_HEIGHT * 0.5 - 18}px;
  z-index: 10;
`;

const ButtonItem = styled.TouchableOpacity`
  background-color: ${palette.main};
  border-radius: 5px;
  padding: 3px 7px;
`;

const TagScroll = styled.ScrollView`
  height: 90%;
`;
