import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { addCategory, addMemo, setMemoInCategory } from '../shared/reducer.js';
import { useDispatch } from 'react-redux';

import styled from 'styled-components/native';

const MemoInputForm = () => {
  const dispatch = useDispatch();
  const [isShpBtnToggled, setIsShpBtnToggled] = useState(false);
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
      {isShpBtnToggled && (
        <>
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
        </>
      )}
      <MemoInputWrapper>
        <ShpBtn onPress={() => setIsShpBtnToggled(!isShpBtnToggled)} />
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
        {/* {errors.memo && <Text>This is required.</Text>} */}
        <View>
          <Submit title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
      </MemoInputWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  width: 100%;
  background: #f6f6f7;
`;

const InputCategory = styled.TextInput`
  border: 1px solid red;
`;

const MemoInputWrapper = styled.View`
  flex-direction: row;
`;
const ShpBtn = styled.TouchableOpacity`
  width: 16px;
  height: 16px;
  background: purple;
`;

const InputMemo = styled.TextInput`
  border: 1px solid green;
  width: 80%;
`;

const Submit = styled.TouchableOpacity`
  width: 16px;
  height: 16px;
  background: brown;
`;

export default MemoInputForm;
