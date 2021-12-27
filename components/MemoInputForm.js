import React from 'react';
import { Text, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { addCategory, addMemo, setMemoInCategory } from '../shared/reducer.js';
import { useDispatch } from 'react-redux';

import styled from 'styled-components/native';

const MemoInputForm = () => {
  const dispatch = useDispatch();

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

  const onSubmit = (data) => {
    dispatch(addCategory(data.category));
    dispatch(addMemo(data.category, data.memo));
    dispatch(setMemoInCategory(data.category));
  };

  return (
    <Wrapper>
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
    </Wrapper>
  );
};

const Wrapper = styled.View``;

const InputCategory = styled.TextInput`
  border: 1px solid red;
`;

const InputMemo = styled.TextInput`
  border: 1px solid green;
`;

const Submit = styled.Button``;

export default MemoInputForm;
