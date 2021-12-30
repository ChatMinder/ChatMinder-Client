import React, { useState } from 'react';
import {
  Text,
  Button,
  View,
  Input,
  Image,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { TextInput } from 'react-native-gesture-handler';
import palette from '../shared/palette';
import useSearch from '../shared/hooks/useSearch';
import {
  CategoryItem,
  TextBox,
  ImgBox,
  ImgItem,
} from '../shared/styles/CategoryStyle';

const trashcan = require('../shared/assets/trashcan.png');
const settings = require('../shared/assets/settings.png');
const cancel = require('../shared/assets/cancel.png');

const ButtonBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2%;
`;

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const StyledModalContainer = styled.View`
  flex-direction: column;
  align-items: center;
  width: 320px;
  height: 220px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
`;

const StyledModalGradeWrapper = styled.View`
  flex: 1;
  width: 320px;
  justify-content: center;
`;

const StyledModalGradeText = styled.Text`
  font-size: 15px;
`;

const InputBox = styled.TextInput`
  border: 1px solid gray;
`;

const ColorBox = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  padding: 1% 3%;
`;

const ColorItem = styled.View`
  border-radius: 50px;
  width: 45px;
  height: 45px;
  background-color: ${(props) =>
    props.backgroundColor || `${palette.lightGreen}`};
  margin: 0 2% 2% 0;
`;

const CloseButton = styled.TouchableOpacity``;

const Category = () => {
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

  const toggleModal = ({ navigation }) => {
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
      {memoObj[0].map((category, index) => (
        <CategoryItem
          key={category.categoryID}
          backgroundColor={colors[index].colorValue}
        >
          <TextBox>
            <Text>{category.categoryName}</Text>
          </TextBox>
          <ImgBox>
            <TouchableOpacity
              onPress={() => {
                toggleModal();
                setTitle(category.categoryName);
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
      <StyledSafeAreaView>
        <Modal
          isVisible={isModalVisible}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <StyledModalContainer>
            <StyledModalGradeWrapper>
              <ButtonBox>
                <StyledModalGradeText>제목</StyledModalGradeText>
                <CloseButton onPress={toggleModal}>
                  <ImgItem source={cancel} />
                </CloseButton>
              </ButtonBox>
              <InputBox
                placeholder="제목을 입력해주세요"
                onChangeText={(text) => setTitle(text)}
                value={title}
              />
              <StyledModalGradeText>태그 컬러</StyledModalGradeText>
              <ColorBox>
                {colors.map((color) => (
                  <TouchableOpacity
                    key={color.id}
                    onPress={() => console.log(color.colorName)}
                  >
                    <ColorItem backgroundColor={color.colorValue} />
                  </TouchableOpacity>
                ))}
              </ColorBox>
            </StyledModalGradeWrapper>
            <Button title="완료" onPress={toggleModal} />
          </StyledModalContainer>
        </Modal>
      </StyledSafeAreaView>
    </Wrapper>
  );
};

const Wrapper = styled.View``;

export default Category;
