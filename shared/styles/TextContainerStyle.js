import styled from 'styled-components/native';
import palette from '../palette';

export const Container = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 91%;
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
  border-radius: 8px;
  padding: 3px 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const BookmarkItem = styled.Image`
  width: ${(props) => props.width || '15'}px;
  height: ${(props) => props.height || '15'}px;
  margin-right: ${(props) => props.marginRight || '0'}px;
`;

export const BookmarkBox2 = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.marginBottom || '0px'};
  margin-top: 1.5%;
`;

export const TextItem = styled.Text`
  color: white;
`;

export const BoxContainer = styled.View`
  background-color: white;
  margin-bottom: 4%;
  border-radius: 10px;
  padding: 2.7%;
`;

export const Wrapper = styled.View`
  align-items: center;
`;

export const Scroll = styled.ScrollView`
  height: 90%;
`;
