import React, { useState, useRef } from 'react';
import { Text, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { addTag, addMemo, setMemoInTag } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components/native';
import { TagBtn, TagBtnText } from '../styles/HomeStyle';

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
      tag: '',
      memo: '',
    },
  });

  const onSubmit = (data) => {
    // dispatch(addTag(data.tag));
    // dispatch(addMemo(data.tag, data.memo));
    // dispatch(setMemoInTag(data.tag));
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
                {memoObj[0].map((tag) =>
                  tag.tagName ? (
                    <TagBtn
                      margin={true}
                      key={tag.tagID}
                      background={tag.tagColor}
                      selected={selectedTag === tag.tagName}
                      onPress={() => {
                        // 선택된 태그를 다시 누를 시 선택 취소
                        if (selectedTag === tag.tagName) {
                          setSelectedTag(0);
                          setSelectedNewTag(0);
                        } else setSelectedTag(tag.tagName);
                        return selectedTag === tag.tagName
                          ? onChange('')
                          : onChange(tag.tagName);
                      }}
                    >
                      <TagBtnText>{tag.tagName}</TagBtnText>
                    </TagBtn>
                  ) : null
                )}
                {/* <태그 추가하기 버튼> 렌더링 조건
                다른 태그 버튼이 선택되지 않았을 때만 렌더링
                ---> 이 부분이 selectedTag ===0 && 
                해당 버튼 자신이 선택된 상태거나, input값이 있다면 렌더링(or의 관계).
                ---> 이 부분이 (selectedNewTag || inputValue) ? <렌더링> : null
                */}
                {selectedTag === 0 && (selectedNewTag || inputValue) ? (
                  <TagBtn
                    margin={true}
                    selected={selectedNewTag ? true : false}
                    onPress={() => {
                      // 선택된 태그를 다시 누를 시 선택 취소
                      if (selectedNewTag) {
                        setSelectedNewTag(0);
                      } else {
                        setSelectedNewTag(inputValue);
                        //태그 추가하기 버튼 다시 눌러서 취소할 경우, Input창은 비워지나 inputValue는 초기화되지 않는 버그 있음
                        setInputValue('');
                        inputRef.current.setNativeProps({ text: '' });
                      }
                      return selectedNewTag
                        ? onChange('')
                        : onChange(inputValue);
                    }}
                  >
                    <TagBtnText>
                      {selectedNewTag ? selectedNewTag : inputValue} 태그
                      추가하기
                    </TagBtnText>
                  </TagBtn>
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
              placeholder={errors.memo && `메모를 입력해주세요.`}
            />
          )}
          name="memo"
          rules={{ required: true }}
        />
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
