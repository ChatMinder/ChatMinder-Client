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

  const onImageUpload = () => {
    alert('이미지 업로드 버튼 누름!');
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
      <InputWrapper>
        <ImgBtnContainer onPress={onImageUpload}>
          <ImgBtn source={require('../assets/uploadImage.png')} />
        </ImgBtnContainer>
        <MemoInputContainer>
          <ShpBtnContainer onPress={() => setIsShpBtnToggled(!isShpBtnToggled)}>
            <ShpBtn source={require('../assets/ShpBtn.png')} />
          </ShpBtnContainer>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <InputMemo
                multiline={true}
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
          <SubmitBtnContainer onPress={handleSubmit(onSubmit)}>
            <SubmitBtn source={require('../assets/ShpBtn.png')} />
          </SubmitBtnContainer>
        </MemoInputContainer>
      </InputWrapper>
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

const InputWrapper = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  background: #f6f6f7;
  padding: 21px 0px;
  height: 77px;
`;

const ImgBtnContainer = styled.TouchableOpacity`
  width: 35px;
  height: 35px;
  justify-content: center;
  align-items: center;
  border-radius: 18px;
  background: #fafaff;
`;
const ImgBtn = styled.Image`
  width: 16px;
  height: 16px;
`;

const MemoInputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 291px;
  height: 35px;
  border-radius: 20px;
  background: #ffffff;
`;
const ShpBtnContainer = styled.TouchableOpacity`
  margin-left: 16px;
`;
const ShpBtn = styled.Image`
  width: 16px;
  height: 16px;
`;
const InputMemo = styled.TextInput`
  /* border: 1px solid purple; */
  height: 100%;
  margin: 0px 5px;
  width: 220px;
  background: #ffffff;
`;

const SubmitBtnContainer = styled.TouchableOpacity`
  position: absolute;
  right: 16px;
`;
const SubmitBtn = styled.Image`
  width: 16px;
  height: 16px;
`;

export default MemoInputForm;
