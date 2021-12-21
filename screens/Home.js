import React, { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import Search from '../components/Search';
import styled from 'styled-components/native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { addMemo } from '../shared/reducer';

const Home = ({ navigation: { setOptions } }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: '',
      memo: '',
    },
  });

  const dispatch = useDispatch();
  const abc = useSelector((state) => state);
  console.log(abc);

  const onSubmit = (data) => {
    dispatch(addMemo(data.category, data.memo));
  };
  //이거 disaptch

  useEffect(() => {
    setOptions({
      headerRight: () => <Search />,
    });
  });

  return (
    <View>
      <Text>Home</Text>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputCategory
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="카테고리"
          />
        )}
        name="category"
        // rules={{ required: true }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputMemo
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="메모"
          />
        )}
        name="memo"
        rules={{ required: true }}
      />
      {errors.memo && <Text>This is required.</Text>}
      <View>
        <Submit title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

const InputCategory = styled.TextInput`
  border: 1px solid red;
`;

const InputMemo = styled.TextInput`
  border: 1px solid green;
`;

const Submit = styled.Button``;

export default Home;
