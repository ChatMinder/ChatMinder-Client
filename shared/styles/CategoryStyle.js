import styled from 'styled-components/native';
import palette from '../palette';

export const CategoryItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 2% 2%;
  padding: 0 3%;
  background-color: ${(props) => props.backgroundColor || `${palette.gray1}`};
  height: 60px;
  border-radius: 5px;
`;

export const TextBox = styled.TouchableOpacity`
  width: 80%;
`;

export const ImgBox = styled.View`
  flex-direction: row;
  width: 10%;
  justify-content: space-around;
`;

export const ImgItem = styled.Image`
  width: 16px;
  height: 16px;
`;

export const ButtonBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5% 2%;
  width: ${(props) => props.width || '90%'};
`;
