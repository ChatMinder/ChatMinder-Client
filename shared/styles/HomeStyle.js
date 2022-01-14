// Home Screen에서 사용하는 스타일
import styled from 'styled-components/native';
import palette from '../palette';

export const randomTagColor = () => {
  const randomNum = Math.floor(Math.random() * 10);
  switch (randomNum) {
    //blue
    case 0:
      return '#5DA7EF';
    //lightBlue
    case 1:
      return '#9ECBFF';
    //lightGreen
    case 2:
      return '#C8D769';
    //green
    case 3:
      return '#50B093';
    //blueGreen
    case 4:
      return '#81C7BA';
    //purple
    case 5:
      return '#B282CC';
    //pink
    case 6:
      return '#F85C5D';
    //orange
    case 7:
      return '#FA7931';
    //lightOrange
    case 8:
      return `${palette.lightOrange}`;
    //yellow
    case 9:
      return `${palette.yellow}`;
  }
};

const borderColor = (tagColor) => {
  switch (tagColor) {
    //blue
    case '#5DA7EF':
      return '#2673BD';
    //lightBlue
    case '#9ECBFF':
      return '#6DA0DB';
    //lightGreen
    case '#C8D769':
      return '#A2B141';
    //green
    case '#50B093':
      return '#0E805D';
    //blueGreen
    case '#81C7BA':
      return '#468D80';
    //purple
    case '#B282CC':
      return '#933AC3';
    //pink
    case '#F85C5D':
      return '#DD1617';
    //orange
    case '#FA7931':
      return '#D44C00';
    //lightOrange
    case `${palette.lightOrange}`:
      return `${palette.lightOrange_border}`;
    //yellow
    case `${palette.yellow}`:
      return `${palette.yellow_border}`;
    default:
      return '#000000';
  }
};

export const TagBtn = styled.TouchableOpacity`
  background: ${(props) => props.background || randomTagColor()};
  ${(props) =>
    props.selected && `border: 2.5px solid ${borderColor(props.background)}`}
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
