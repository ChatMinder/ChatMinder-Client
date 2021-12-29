import React from 'react';
import { TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const Search = () => (
  <Container>
    <Ionicons name="search" color="black" size={20} />
    <SearchInput />
  </Container>
);

const Container = styled.TouchableOpacity`
  margin: 15px;
`;

const SearchInput = styled.TextInput`
  border: 1px solid red;
`;

export default Search;
