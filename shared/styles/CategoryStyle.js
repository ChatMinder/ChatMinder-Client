import styled from 'styled-components/native';
import palette from '../palette';

export const CategoryItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 0 2% 1%;
  background-color: ${(props) =>
    props.backgroundColor || `${palette.lightGreen}`};
`;

export const TextBox = styled.TouchableOpacity`
  border: 1px red solid;
  width: 80%;
`;

export const ImgBox = styled.View`
  flex-direction: row;
  width: 10%;
  justify-content: space-around;
`;

export const ImgItem = styled.Image`
  width: 15px;
  height: 15px;
`;

export const ButtonBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2%;
`;