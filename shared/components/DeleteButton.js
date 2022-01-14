import React, { useState } from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { DeleteMemo } from '../API';
import palette from '../palette';
import { delMemo } from '../reducers/memo';

const DeleteButton = ({ memoID }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.accessToken);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (memoID) => {
    setLoading(true);
    try {
      console.log(memoID);
      const delMemoRes = await DeleteMemo(token, memoID);
      console.log(`메모 삭제 성공: ${JSON.stringify(delMemoRes.data)}`);
      dispatch(delMemo(memoID));
    } catch (error) {
      console.log(`메모 삭제 실패: ${error}`);
    }
    setLoading(false);
  };

  return (
    <>
      {loading && (
        <SpinnerWrapper>
          <ActivityIndicator size="large" color="#ff7f6d" />
        </SpinnerWrapper>
      )}
      <DeleteBtn onPress={() => handleDelete(memoID)}>
        <DeleteBtnText>삭제</DeleteBtnText>
      </DeleteBtn>
    </>
  );
};

export default DeleteButton;

const SCREEN_WIDTH = Dimensions.get('window').width;

const SpinnerWrapper = styled.View`
  position: absolute;
  z-index: 10;
`;

const DeleteBtn = styled.TouchableOpacity`
  width: 59px;
  height: 32px;
  border: 1px solid #e8eaef;
  border-radius: 8px;
  background: ${palette.lightPink};
  left: ${SCREEN_WIDTH * 0.08}px;
  top: -26px;
  position: absolute;
  z-index: 1;
  justify-content: center;
  align-items: center;
`;
const DeleteBtnText = styled.Text`
  font-size: 12px;
  color: ${palette.red};
`;
