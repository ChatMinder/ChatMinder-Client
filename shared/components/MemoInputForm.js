import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { addCategory, addMemo, setMemoInCategory } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components/native';
import palette from '../palette';

const MemoInputForm = () => {
  const dispatch = useDispatch();
  const memoObj = useSelector((state) => state);

  const [isShpBtnToggled, setIsShpBtnToggled] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedTag, setSelectedTag] = useState(-1);

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

  const selectTag = (categoryID) => {
    setSelectedTag(categoryID);
    //Form에서 카테고리 선택한 것으로 만들기
  };

  return (
    <Wrapper>
      {isShpBtnToggled && (
        <ShpItemContainer horizontal={true}>
          {memoObj[0].map((category) => (
            <EachCategoryBtn
              key={category.categoryID}
              background={category.categoryColor}
              selected={selectedTag === category.categoryID}
              onPress={() => selectTag(category.categoryID)}
            >
              <Text>{category.categoryName}</Text>
            </EachCategoryBtn>
          ))}
          {inputValue ? (
            <EachCategoryBtn
              selected={selectedTag === 0}
              onPress={() => selectTag(0)}
            >
              <Text>{inputValue} 태그 추가하기</Text>
            </EachCategoryBtn>
          ) : null}
          {/* <Controller
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
          /> */}
        </ShpItemContainer>
      )}
      <MemoInputContainer>
        <ShpBtn onPress={() => setIsShpBtnToggled(!isShpBtnToggled)} />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputMemo
              onBlur={onBlur}
              onChangeText={(value) => {
                setInputValue(value);
                return onChange(value);
              }}
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
      </MemoInputContainer>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  width: 100%;
  background: #f6f6f7;
`;

const ShpItemContainer = styled.ScrollView`
  flex-direction: row;
  border: 1px solid black;
  padding: 16px 0px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background: #f6f6f7;
`;
const EachCategoryBtn = styled.TouchableOpacity`
  background: ${(props) => props.background || 'gray'};
  /* 요기 red 대신에 해당 테두리 색상 읽어와서 넣기 */
  ${(props) => props.selected && `border: 2.5px solid red`}
  padding: 8px;
  margin-left: 12px;
`;
const InputCategory = styled.TextInput`
  border: 1px solid red;
`;

const MemoInputContainer = styled.View`
  flex-direction: row;
  background: #f6f6f7;
  margin-bottom: 22px;
`;
const ShpBtn = styled.TouchableOpacity`
  width: 16px;
  height: 16px;
  background: purple;
`;
const InputMemo = styled.TextInput`
  border: 1px solid green;
  width: 80%;
  background: #ffffff;
`;
const Submit = styled.TouchableOpacity`
  width: 16px;
  height: 16px;
  background: brown;
`;

export default MemoInputForm;
