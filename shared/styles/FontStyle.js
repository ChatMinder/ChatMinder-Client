import styled from 'styled-components/native';

export const TextSize = styled.Text`
  font-size: ${(props) => props.fontSize || '12'}px;
  color: ${(props) => props.color || 'black'};
`;

// font-weight: ${(props) => props.fontWeight || 'normal'};
