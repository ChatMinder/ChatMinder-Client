import styled from 'styled-components/native';

export const HeaderContainer = styled.View`
  align-items: center;
  width: 100%;
  margin-top: ${(props) => props.marginTop || '0px'};
  padding-right: ${(props) => props.paddingRight || '0px'};
`;

export const TitleBox = styled.View`
  width: ${(props) => props.width || '100%'};
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${(props) => props.marginBottom || '0px'};
`;

export const TitleItem = styled.View``;

export const InputBox = styled.View`
  border: 1px solid #e9ebf0;
  border-radius: 15px;
  flex-direction: row;
  align-items: center;
  width: ${(props) => props.width || '95%'};
  height: 32px;
`;

export const SearchInput = styled.TextInput`
  width: 90%;
  height: 100%;
`;

export const NoVisibleBox = styled.View`
  width: ${(props) => props.width || '3%'};
  height: ${(props) => props.height || '3%'};
`;

export const ButtonBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonBox2 = styled(ButtonBox)`
  width: ${(props) => props.width || '100%'};
  margin: 2% 0;
`;

export const BookmarkBox = styled.View`
  width: 100%;
  align-items: flex-end;
  padding-top: 10px;
`;

export const TagBox = styled(ButtonBox)`
  width: 140px;
`;

export const CommonIcon = styled.Image`
  width: 16px;
  height: 16px;
`;

export const HeaderIcon = styled(CommonIcon)`
  margin: 15px;
`;
