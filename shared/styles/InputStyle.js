import styled from 'styled-components/native';

export const SearchInput = styled.TextInput`
  border: 1px solid red;
  width: 200px;
`;

export const TitleBox = styled.View`
  border: 1px solid red;
  width: 98%;
`;

export const ButtonBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TagBox = styled(ButtonBox)`
  border: 1px solid blue;
  width: 200px;
`;
