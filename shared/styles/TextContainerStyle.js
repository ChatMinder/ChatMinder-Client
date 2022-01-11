import styled from 'styled-components/native';
import palette from '../palette';

export const Container = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 2%;
  margin-top: 1%;
`;

export const TextBox = styled.View`
  width: 100%;
`;

export const DateItem = styled.View`
  width: 100%;
  margin-bottom: 1%;
`;

export const TagBox = styled.View`
  background-color: ${(props) =>
    props.backgroundColor || `${palette.lightGreen}`};
  border-radius: 5px;
  padding: 0 5px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const BookmarkItem = styled.Image`
  width: 15px;
  height: 15px;
`;

export const BookmarkBox2 = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: ${(props) => props.marginBottom || '0px'};
`;

export const TextItem = styled.Text`
  color: white;
`;

export const BoxContainer = styled.View`
  background-color: white;
  margin-bottom: 4%;
  border-radius: 10px;
  padding: 1.5%;
`;
