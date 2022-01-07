import React, { useState, useRef } from 'react';
import { Text, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { addTag, addMemo, setMemoInTag } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components/native';
import { randomTagColor, TagBtn, TagBtnText } from '../styles/HomeStyle';
import { launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';

const MemoInputForm = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const memoObj = useSelector((state) => state);

  const [isShpBtnToggled, setIsShpBtnToggled] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [selectedTag, setSelectedTag] = useState(0);
  const [selectedNewTag, setSelectedNewTag] = useState(0);
  const [newTagColor, setNewTagColor] = useState(randomTagColor());

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
    // 서버에 newTagColor값도 같이 보내기
    console.log(`Submit- 태그: ${data.tag} 메모: ${data.memo}`);
    console.log(newTagColor);
  };

  // const onImageUpload = async () => {
  //   const res = await launchImageLibrary({ mediaType: 'photo' });
  //   if (res.assets) {
  //     const photoURI = res.assets[0].uri;
  //     console.log(photoURI);
  //     const formData = new FormData();
  //     formData.append('memo_id', '4');
  //     formData.append('image', {
  //       uri: photoURI,
  //       name: 'image.jpg',
  //       type: 'image/jpeg',
  //     });
  //     try {
  //       const response = await axios.post(
  //         'https://api.chatminder.app/images',
  //         formData,
  //         {
  //           headers: {
  //             Authorization:
  //               'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQxNTY2NTU4LCJqdGkiOiIyMjBkMWQ1NTEwMjA0NWViOTgwNjFiMjg5NWE0YTc3MSIsInVzZXJfaWQiOjcsImtha2FvX2lkIjoiMTIzNDU2Iiwia2FrYW9fZW1haWwiOiJ0ZXMzM3QyMTIzQG5hdmVyLmNvbSJ9.ibNy_F6JOPootvaK2hTf_oiXiZpmhazNW0k5-NCNoJE',
  //           },
  //         }
  //       );
  //       console.log(`image uploaded success response: ${response}`);
  //     } catch (error) {
  //       console.log(`image uploaded error response : ${error}`);
  //     }
  //   } else if (res.errorCode) {
  //     console.log(
  //       `에러코드 : ${res.errorCode} 에러메시지 : ${res.errorMessage}`
  //     );
  //   } else if (res.didCancel) {
  //     console.log(res.didCancel);
  //   }
  // };

  const onImageUpload = async () => {
    const res = await ImagePicker.openPicker({
      multiple: true,
    });
    if (res) {
      const photoURI = res[0].path;
      console.log(photoURI);
      const formData = new FormData();
      console.log(res.length);
      res.forEach((photo, index) => {
        formData.append(`사진${index + 1}`, {
          uri: photo.path,
          type: 'image/jpeg',
          name: `filename ${index}.jpg`,
        });
      });

      console.log(formData);
      // try {
      //   const response = await axios.post(
      //     'https://api.chatminder.app/images',
      //     formData,
      //     {
      //       headers: {
      //         Authorization:
      //           'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQxNTY2NTU4LCJqdGkiOiIyMjBkMWQ1NTEwMjA0NWViOTgwNjFiMjg5NWE0YTc3MSIsInVzZXJfaWQiOjcsImtha2FvX2lkIjoiMTIzNDU2Iiwia2FrYW9fZW1haWwiOiJ0ZXMzM3QyMTIzQG5hdmVyLmNvbSJ9.ibNy_F6JOPootvaK2hTf_oiXiZpmhazNW0k5-NCNoJE',
      //       },
      //     }
      //   );
      //   console.log(`image upload success response: ${response}`);
      // } catch (error) {
      //   console.log(`image upload error response : ${error}`);
      // }
    }
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
                    background={newTagColor}
                    onPress={() => {
                      // 선택된 태그를 다시 누를 시 선택 취소
                      if (selectedNewTag) {
                        setSelectedNewTag(0);
                        setNewTagColor(randomTagColor());
                      } else {
                        setNewTagColor(newTagColor);
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
          <ImgBtn source={require('../assets/ImgBtn.png')} />
        </ImgBtnContainer>
        <MemoInputContainer>
          <ShpBtnContainer onPress={() => setIsShpBtnToggled(!isShpBtnToggled)}>
            <ShpBtn source={require('../assets/InputShpBtn.png')} />
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
            <SubmitBtn source={require('../assets/SubmitBtn.png')} />
          </SubmitBtnContainer>
        </MemoInputContainer>
      </InputWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  width: 100%;
  background: #e5e5e5;
`;

const ShpItemContainer = styled.ScrollView`
  flex-direction: row;
  /* padding-bottom을 0픽셀로 설정할 경우 View가 겹쳐서 얇은 선 1줄 생기는 버그 존재 -> 임시로 0.1픽셀로 설정 */
  padding: 16px 0px 0.1px 0px;
  background: #f6f6f7;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
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
  /* margin-left: 16px; */
  padding: 16px 0px 16px 16px;
`;
const ShpBtn = styled.Image`
  width: 16px;
  height: 16px;
`;
const InputMemo = styled.TextInput`
  height: 100%;
  margin: 0px 5px;
  width: 220px;
  background: #ffffff;
`;

const SubmitBtnContainer = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  padding: 16px;
`;
const SubmitBtn = styled.Image`
  width: 16px;
  height: 16px;
`;

export default MemoInputForm;
