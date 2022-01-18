import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Dimensions,
  StatusBar,
} from 'react-native';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import palette from '../shared/palette';

import { deleteTag, setTags } from '../shared/reducers/tag';
import { setMemos } from '../shared/reducers/memo';
import { GetTags, DeleteTag, GetMemo } from '../shared/API';
import {
  CategoryItem,
  TextBox,
  ImgBox,
  ImgItem,
  ButtonBox,
} from '../shared/styles/CategoryStyle';
import { Wrapper } from '../shared/styles/TextContainerStyle';
import TextB from '../shared/components/TextB';
import { TextSize } from '../shared/styles/FontStyle';
import ModalItem from '../shared/components/Modaltem';
import Trashcan from '../shared/assets/trashcan.svg';
import Settings from '../shared/assets/settings.svg';

const Category = ({ navigation }) => {
  const dispatch = useDispatch();
  const tagData = useSelector((state) => state.tagData);
  const token = useSelector((state) => state.auth.accessToken);

  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState({
    id: 0,
    title: '',
    color: '',
  });
  const [stateValue, setStateValue] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const deleteTagRes = await DeleteTag(token, id);
      console.log('deleteTag 성공: ', deleteTagRes.data);
      dispatch(deleteTag(id));
      const getMemoRes = await GetMemo(token);
      dispatch(setMemos(getMemoRes.data));
      const getTagRes = await GetTags(token);
      dispatch(setTags(getTagRes.data));
    } catch (error) {
      console.log('deleteTag 실패', error);
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
    setLoading(false);
  };

  //console.log(tagData);

  return (
    <Background>
      <Wrapper>
        <StatusBar backgroundColor={palette.tagGray} barStyle="dark-content" />
        {loading && (
          <SpinnerWrapper>
            <ActivityIndicator size="large" color="#ff7f6d" />
          </SpinnerWrapper>
        )}
        <ButtonBox width="91%" style={{ paddingTop: 36, paddingBottom: 46 }}>
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
          {tagData.map((tag) => (
            <CategoryItem
              key={tag.id}
              backgroundColor={tag.tag_color ? tag.tag_color : palette.gray1}
            >
              <TextBox
                style={{ marginLeft: 19 }}
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
                    setTitle({
                      id: tag.id,
                      title: tag.tag_name,
                      color: tag.tag_color,
                    });
                  }}
                >
                  <Settings style={{ marginRight: 16 }} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert('삭제 확인', '정말 삭제할까요?', [
                      {
                        text: '취소',
                        style: 'cancel',
                      },
                      {
                        text: '삭제',
                        onPress: () => {
                          handleDelete(tag.id);
                        },
                      },
                    ]);
                  }}
                >
                  <Trashcan style={{ marginRight: 19 }} />
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
    </Background>
  );
};

export default Category;

const Background = styled.View`
  background: ${palette.tagGray};
`;

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
  border-radius: 8px;
  padding: 4px 10px;
`;

const TagScroll = styled.ScrollView`
  height: 90%;
  width: 91%;
`;
