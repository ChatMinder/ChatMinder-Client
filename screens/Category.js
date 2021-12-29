import React from 'react';
import { Text, Button, View } from 'react-native';
import styled from 'styled-components/native';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Category = () => {
  const value = useSelector((state) => state);
  //console.log('value: ', value);

  return (
    <Wrapper>
      <Text>태그</Text>
      <Button title="태그추가" />
      {value[0].map((category) => (
        <Text key={category.categoryID}>{category.categoryName}</Text>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.View``;

export default Category;
