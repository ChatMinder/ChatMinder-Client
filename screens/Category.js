import React, { useState } from 'react';
import { Text, Button, View } from 'react-native';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

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
  /* 모달창 크기 조절 */
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
  align-self: center;
  font-size: 15px;
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
              <StyledModalGradeText>Hello!</StyledModalGradeText>
            </StyledModalGradeWrapper>
            <Button title="Hide modal" onPress={toggleModal} />
          </StyledModalContainer>
        </Modal>
      </StyledSafeAreaView>
    </Wrapper>
  );
};

const Wrapper = styled.View``;

export default Category;
