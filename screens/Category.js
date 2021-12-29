import React, { useState } from 'react';
import { Text, Button, View, Input } from 'react-native';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { TextInput } from 'react-native-gesture-handler';

const ButtonBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
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

// 모달창 내에서 버튼으로 활용되지 않는 타이틀 부분은 View 만듬
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
  border: 1px solid gray;
`;

const ColorItem = styled.View`
  border-radius: 50px;
  width: 50px;
  height: 50px;
  background-color: #fa7931;
`;

const Category = () => {
  const value = useSelector((state) => state);
  //console.log('value: ', value);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <Wrapper>
      <ButtonBox>
        <Text>태그</Text>
        <Button title="+ 태그추가" onPress={toggleModal} />
      </ButtonBox>
      {value[0].map((category) => (
        <Text key={category.categoryID}>{category.categoryName}</Text>
      ))}
      <StyledSafeAreaView>
        <Modal
          isVisible={isModalVisible}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <StyledModalContainer>
            <StyledModalGradeWrapper>
              <StyledModalGradeText>제목</StyledModalGradeText>
              <InputBox placeholder="제목을 입력해주세요" />
              <StyledModalGradeText>태그 컬러</StyledModalGradeText>
              <ColorBox>
                <ColorItem />
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
