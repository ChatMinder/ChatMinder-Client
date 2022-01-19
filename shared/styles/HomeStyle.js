// Home Screen에서 사용하는 스타일
import styled from 'styled-components/native';
import palette from '../palette';

export const randomTagColor = () => {
  const randomNum = Math.floor(Math.random() * 10);
  switch (randomNum) {
    //blue
    case 0:
      return `${palette.blue}`;
    //lightBlue
    case 1:
      return `${palette.lightBlue}`;
    //lightGreen
    case 2:
      return `${palette.lightGreen}`;
    //green
    case 3:
      return `${palette.green}`;
    //blueGreen
    case 4:
      return `${palette.blueGreen}`;
    //purple
    case 5:
      return `${palette.purple}`;
    //pink
    case 6:
      return `${palette.pink}`;
    //orange
    case 7:
      return `${palette.orange}`;
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
    case `${palette.blue}`:
      return `${palette.blue_border}`;
    //lightBlue
    case `${palette.lightBlue}`:
      return `${palette.lightBlue_border}`;
    //lightGreen
    case `${palette.lightGreen}`:
      return `${palette.lightGreen_border}`;
    //green
    case `${palette.green}`:
      return `${palette.green_border}`;
    //blueGreen
    case `${palette.blueGreen}`:
      return `${palette.blueGreen_border}`;
    //purple
    case `${palette.purple}`:
      return `${palette.purple_border}`;
    //pink
    case `${palette.pink}`:
      return `${palette.pink_border}`;
    //orange
    case `${palette.orange}`:
      return `${palette.orange_border}`;
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
    props.selected && `border: 3px solid ${borderColor(props.background)}`}
  ${(props) => {
    if (props.iamNotSelected && props.somethingIsSelected) {
      return `opacity: 0.1`;
    }
  }}
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
