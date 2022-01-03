// 작업 편의상 우선 다른 파일에 작성합니다.
// 마지막 단계 때 기능별로 고려해서 합쳐도 좋을 것 같습니다.
import styled from 'styled-components/native';
import palette from '../palette';

// Home Screen에서 사용하는 스타일
export const TagBtn = styled.TouchableOpacity`
  background: ${(props) => props.background || 'gray'};
  /* 요기 red 대신에 해당 테두리 색상 읽어와서 넣기 */
  ${(props) => props.selected && `border: 2.5px solid red`}
  ${(props) => props.margin && `margin-left: 12px`}
  padding: 0px 10px;
  border-radius: 8px;
  height: 26px;
  align-items: center;
  justify-content: center;
`;
export const TagBtnText = styled.Text`
  font-weight: bold;
  font-size: 12px;
  color: ${palette.white};
`;
