import React, { useState, useEffect } from 'react';
import {
  TouchableOpacity,
  TextInput,
  Dimensions,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { PostTag, PatchTag, GetTags, GetMemo } from '../API';

import {
  StyledSafeAreaView,
  StyledModalContainer2,
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

import Cancel from '../assets/cancel.svg';
import styled from 'styled-components/native';
import { fixTag, setTags, addTag } from '../reducers/tag';
import { setMemos } from '../reducers/memo';

const ModalItem = ({ isModalVisible, title, toggleModal, setStateValue }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accessToken);
  const [loading, setLoading] = useState(false);
  const [subTitle, setSubTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const SendData = () => {
    setStateValue(subTitle);
  };

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
    setClicked({
      isSelected: newArr,
    });
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

  useEffect(() => {
    setSubTitle(title.title);
    setSelectedColor(title.color);

    {
      title.color
        ? colors.map((item) => {
            if (item.colorValue === title.color) {
              handleClicked(item.id);
            }
          })
        : setClicked({
            isSelected: Array(10).fill(false),
          });
    }
  }, [title]);

  const handleNewTag = async () => {
    setLoading(true);
    const formData = {
      tag_name: subTitle,
      tag_color: selectedColor,
    };
    try {
      const postTagRes = await PostTag(token, formData);
      dispatch(addTag(postTagRes.data));
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
    setLoading(false);
  };

  const handleEdit = async (id) => {
    setLoading(true);
    const formData = {
      tag_name: subTitle,
      tag_color: selectedColor,
    };
    try {
      const patchTagRes = await PatchTag(token, formData, id);
      // dispatch(fixTag(id, patchTagRes.data));
      const getMemoRes = await GetMemo(token);
      dispatch(setMemos(getMemoRes.data));
      const getTagRes = await GetTags(token);
      dispatch(setTags(getTagRes.data));
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
    setLoading(false);
  };

  return (
    <StyledSafeAreaView>
      {loading && (
        <SpinnerWrapper>
          <ActivityIndicator size="large" color="#ff7f6d" />
        </SpinnerWrapper>
      )}

      <Modal
        isVisible={isModalVisible}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <StyledModalContainer2>
          <ClosedBox>
            <TouchableOpacity
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
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
              style={styles.inputStyle}
              placeholder={title.title ? title.title : '태그를 입력해주세요'}
              type="text"
              onChangeText={(text) => {
                setSubTitle(text);
              }}
              value={subTitle}
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

const styles = StyleSheet.create({
  inputStyle: {
    ...Platform.select({
      android: {
        fontFamily: 'NanumSquareOTF_ac',
        fontSize: 16,
      },
    }),
  },
});

export default ModalItem;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const SpinnerWrapper = styled.View`
  position: absolute;
  bottom: ${SCREEN_HEIGHT * 0.5 - 18}px;
  z-index: 10;
`;
