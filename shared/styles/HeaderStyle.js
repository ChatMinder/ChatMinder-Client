import styled from 'styled-components/native';
import palette from '../palette';

export const SearchInput = styled.TextInput``;

export const InputBox = styled.View`
  border: 1px solid ${palette.blackGray};
  border-radius: 15px;
  flex-direction: row;
  align-items: center;
  width: 95%;
`;

export const TitleBox = styled.View`
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const HeaderContainer = styled.View`
  align-items: center;
`;

export const TitleText = styled.Text`
  font-size: 18px;
`;

export const NoVisibleBox = styled.View`
  width: 8%;
  height: 8%;
`;

export const ButtonBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BookmarkBox = styled.View`
  width: 100%;
  align-items: flex-end;
  padding-top: 10px;
`;

export const TagBox = styled(ButtonBox)`
  border: 1px solid blue;
  width: 200px;
`;

export const CommonIcon = styled.Image`
  width: 16px;
  height: 16px;
`;

export const SearchIcon = styled(CommonIcon)`
  margin: 0px 8px;
`;

export const HeaderIcon = styled(CommonIcon)`
  margin: 15px;
`;
