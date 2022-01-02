import React, { useState, useRef } from 'react';
import { Text, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { addCategory, addMemo, setMemoInCategory } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components/native';
import palette from '../palette';

const MemoInputForm = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const memoObj = useSelector((state) => state);

  const [isShpBtnToggled, setIsShpBtnToggled] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedTag, setSelectedTag] = useState(0);
  const [selectedNewTag, setSelectedNewTag] = useState(0);

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
    // dispatch(addCategory(data.category));
    // dispatch(addMemo(data.category, data.memo));
    // dispatch(setMemoInCategory(data.category));
    console.log(`Submit- 태그: ${data.tag} 메모: ${data.memo}`);
  };

  return (
    <Wrapper>
      {/* Shp Button을 눌렀을 때 펼쳐지는 내용물 */}
      {isShpBtnToggled && (
        <ShpItemContainer
          horizontal={true}
          keyboardShouldPersistTaps="always"
          showsHorizontalScrollIndicator={false}
        >
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                {memoObj[0].map((category) => (
                  <EachCategoryBtn
                    key={category.categoryID}
                    background={category.categoryColor}
                    selected={selectedTag === category.categoryName}
                    onPress={() => {
                      // 선택된 태그를 다시 누를 시 선택 취소
                      if (selectedTag === category.categoryName) {
                        setSelectedTag(0);
                        setSelectedNewTag(0);
                      } else setSelectedTag(category.categoryName);
                      return selectedTag === category.categoryName
                        ? onChange('')
                        : onChange(category.categoryName);
                    }}
                  >
                    <TagBtnText>{category.categoryName}</TagBtnText>
                  </EachCategoryBtn>
                ))}
                {/* <태그 추가하기 버튼> 렌더링 조건
                다른 태그 버튼이 선택되지 않았을 때만 렌더링
                ---> 이 부분이 selectedTag ===0 && 
                해당 버튼 자신이 선택된 상태거나, input값이 있다면 렌더링(or의 관계).
                ---> 이 부분이 (selectedNewTag || inputValue) ? <렌더링> : null
                */}
                {selectedTag === 0 && (selectedNewTag || inputValue) ? (
                  <EachCategoryBtn
                    selected={selectedNewTag ? true : false}
                    onPress={() => {
                      // 선택된 태그를 다시 누를 시 선택 취소
                      selectedNewTag
                        ? setSelectedNewTag(0)
                        : setSelectedNewTag(inputValue);
                      inputRef.current.setNativeProps({ text: '' });
                      setInputValue('');
                      return selectedNewTag
                        ? onChange('')
                        : onChange(inputValue);
                    }}
                  >
                    <TagBtnText>
                      {selectedNewTag ? selectedNewTag : inputValue} 태그
                      추가하기
                    </TagBtnText>
                  </EachCategoryBtn>
                ) : null}
              </>
            )}
            name="tag"
          />
        </ShpItemContainer>
      )}
      {/* 메모 Input 부분 */}
      <MemoInputContainer>
        <ShpBtn onPress={() => setIsShpBtnToggled(!isShpBtnToggled)} />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputMemo
              onBlur={onBlur}
              ref={inputRef}
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
  padding: 0px 10px;
  margin-left: 12px;
  border-radius: 8px;
  height: 26px;
  font-weight: bold;
  font-size: 16px;
  line-height: 26px;
  align-items: center;
  justify-content: center;
`;
const TagBtnText = styled.Text`
  color: ${palette.white};
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
