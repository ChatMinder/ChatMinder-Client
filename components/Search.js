import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const Search = () => (
  <Container>
    <Ionicons name="search" color="black" size={20} />
  </Container>
);

const Container = styled.TouchableOpacity`
  margin: 15px;
`;

export default Search;
