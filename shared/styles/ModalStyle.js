import styled from 'styled-components/native';
import palette from '../palette';

export const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const StyledModalContainer = styled.View`
  flex-direction: column;
  align-items: center;
  width: 328px;
  height: 371px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;
`;

export const StyledModalContainer2 = styled(StyledModalContainer)`
  padding: 20px 20px 0 16px;
`;

//없앨까
export const StyledModalGradeWrapper = styled.View`
  flex: 1;
  width: 90%;
  justify-content: center;
`;

export const StyledModalGradeText = styled.Text`
  font-size: 15px;
`;

export const InputBox = styled.View`
  border: 0.6px solid ${palette.gray4};
`;

export const ColorBox = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin-left: 6px;
`;

export const ColorItem = styled.View`
  border-radius: 50px;
  width: 46px;
  height: 46px;
  background-color: ${(props) =>
    props.backgroundColor || `${palette.lightGreen}`};
  border: 3.5px solid ${(props) => props.borderColor || `${palette.white}`};
  margin: 0 12px 8px 0;
`;

export const CloseButton = styled.TouchableOpacity`
  background-color: ${palette.gray3};
  width: 116px;
  height: 48px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  margin-top: 18px;
`;

export const ClosedBox = styled.View`
  align-items: flex-end;
  width: 100%;
`;

export const TitleBox = styled.View`
  justify-content: flex-start;
  width: 100%;
  margin-bottom: ${(props) => props.marginBottom || '16'}px;
`;
