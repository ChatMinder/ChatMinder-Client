import React, { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import styled from 'styled-components/native';
import ImagePicker from 'react-native-image-crop-picker';

import { randomTagColor, TagBtn, TagBtnText } from '../styles/HomeStyle';
import { checkIncludeURL } from '../checkIncludeURL';
import { Image, Keyboard } from 'react-native';
import TextR from './TextR';
import { addTag } from '../reducers/tag';
import { addMemo } from '../reducers/memo';

const MemoInputForm = () => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const memoData = useSelector((state) => state.memoData);
  const tagData = useSelector((state) => state.tagData);

  const [isShpBtnToggled, setIsShpBtnToggled] = useState(false);
  const [imgPreview, setImgPreview] = useState();
  const [inputValue, setInputValue] = useState('');
  const [selectedTagID, setSelectedTagID] = useState(0);
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
      image: null,
    },
  });

  const onSubmit = async (data) => {
    const memoURL = checkIncludeURL(data.memo);
    let memoText;
    memoURL
      ? (memoText = data.memo.replace(memoURL, ''))
      : (memoText = data.memo);
    let isNew;
    selectedNewTag ? (isNew = true) : (isNew = false);

    let sendingData;
    selectedNewTag
      ? //새 태그를 생성하는 경우
        (sendingData = {
          tag_name: data.tag,
          tag_color: newTagColor,
          memo_text: memoText,
          url: memoURL,
          timestamp: moment().unix(),
        })
      : selectedTagID
      ? //기존 태그를 사용하는 경우
        (sendingData = {
          tag_id: selectedTagID,
          memo_text: memoText,
          url: memoURL,
          timestamp: moment().unix(),
        })
      : //태그를 선택하지 않을 경우
        (sendingData = {
          memo_text: memoText,
          url: memoURL,
          timestamp: moment().unix(),
        });

    console.log('요청 보내는 데이터:', sendingData);
    //메모 생성 요청
    try {
      const addMemoRes = await axios.post(
        'https://api.chatminder.app/memos',
        sendingData,
        {
          headers: {
            'Content-Type': `application/json`,
            Authorization:
              'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ5NDg3OTYxLCJqdGkiOiJkNmYzYzVhZmZmY2M0MDc3Yjc0ZjdlOWVlOTk4ODViOCIsInVzZXJfaWQiOjE3LCJrYWthb19pZCI6IjEyMTIxMjIiLCJrYWthb19lbWFpbCI6InNlZTJvbkBuYXZlci5jb20ifQ.iVV5L4qhSmx2c8s50LC3Xe7J4u14ZNwf0ja2EKDLeoM',
          },
        }
      );
      console.log(`메모 생성 성공: ${JSON.stringify(addMemoRes.data)}`);
      //메모 생성 응답 Redux store에 저장
      let imgMemoID = 0;
      if (addMemoRes.data.tag) {
        dispatch(addTag(addMemoRes.data.tag));
        dispatch(addMemo(addMemoRes.data.memo));
        imgMemoID = addMemoRes.data.memo.id;
        console.log('imgMemoID값은 ', imgMemoID);
      } else {
        dispatch(addMemo(addMemoRes.data));
        imgMemoID = addMemoRes.data.id;
        console.log('imgMemoID값은 ', imgMemoID);
      }

      if (data.image && imgMemoID) {
        data.image.append(`memo_id`, imgMemoID);
        //이미지 저장 요청
        try {
          console.log('전송하는 이미지 formData는 ', data.image);
          const addImgRes = await axios.post(
            'https://api.chatminder.app/images',
            data.image,
            {
              headers: {
                Authorization:
                  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ5NDg3OTYxLCJqdGkiOiJkNmYzYzVhZmZmY2M0MDc3Yjc0ZjdlOWVlOTk4ODViOCIsInVzZXJfaWQiOjE3LCJrYWthb19pZCI6IjEyMTIxMjIiLCJrYWthb19lbWFpbCI6InNlZTJvbkBuYXZlci5jb20ifQ.iVV5L4qhSmx2c8s50LC3Xe7J4u14ZNwf0ja2EKDLeoM',
              },
            }
          );
          console.log(`이미지 저장 성공: ${JSON.stringify(addImgRes.data)}`);
          //TODO : 응답 url Redux store에 저장
        } catch (error) {
          console.log(`이미지 저장 실패 : ${error}`);
          alert('이미지 저장에 실패했습니다. 다시 시도해 주세요.');
        }
      }
    } catch (error) {
      console.log(`메모 생성 실패 :  ${error}`);
      alert('메모 생성에 실패했습니다. 다시 시도해 주세요.');
    }
    Keyboard.dismiss();
    setIsShpBtnToggled(false);
  };

  const onImageUpload = async () => {
    const res = await ImagePicker.openPicker({
      multiple: true,
    });
    if (res) {
      const formData = new FormData();
      formData.append(`size`, res.length);
      setImgPreview([res[0].path, res.length]);
      res.forEach((photo, index) => {
        formData.append(`image${index}`, {
          uri: photo.path,
          type: 'image/jpeg',
          name: `image${index}.jpg`,
        });
      });
      return formData;
    }
  };

  return (
    <Wrapper>
      {/* Shp Button을 눌렀을 때 펼쳐지는 내용물 */}
      {isShpBtnToggled && (
        <ShpItemContainer keyboardShouldPersistTaps="always">
          {imgPreview ? (
            <ImgPreviewContainer>
              <Image
                source={{ uri: `${imgPreview[0]}` }}
                style={{ width: 200, height: 150, borderRadius: 4 }}
              />
              {imgPreview[1] > 1 && (
                <ImgCnt>
                  <TextR>{imgPreview[1]}</TextR>
                </ImgCnt>
              )}
            </ImgPreviewContainer>
          ) : null}
          <Controller
            control={control}
            render={({ field: { onChange } }) => (
              <TagBtnContainer
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
              >
                {tagData.map((tag) =>
                  tag.tag_name ? (
                    <TagBtn
                      margin={true}
                      key={tag.id}
                      background={tag.tag_color}
                      selected={selectedTagID === tag.id}
                      onPress={() => {
                        // 선택된 태그를 다시 누를 시 선택 취소
                        if (selectedTagID === tag.id) {
                          setSelectedTagID(0);
                          setSelectedNewTag(0);
                        } else {
                          setSelectedTagID(tag.id);
                          setSelectedNewTag(0);
                        }
                        return selectedTagID === tag.id
                          ? onChange('')
                          : onChange(tag.id);
                      }}
                    >
                      <TagBtnText>{tag.tag_name}</TagBtnText>
                    </TagBtn>
                  ) : null
                )}
                {/* <태그 추가하기 버튼> 렌더링 조건
                다른 태그 버튼이 선택되지 않았을 때만 렌더링
                ---> 이 부분이 selectedTagID ===0 && 
                해당 버튼 자신이 선택된 상태거나, input값이 있다면 렌더링(or의 관계).
                ---> 이 부분이 (selectedNewTag || inputValue) ? <렌더링> : null
                */}
                {selectedTagID === 0 && (selectedNewTag || inputValue) ? (
                  <TagBtn
                    margin={true}
                    selected={selectedNewTag ? true : false}
                    background={newTagColor}
                    onPress={() => {
                      setSelectedTagID(0);
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
              </TagBtnContainer>
            )}
            name="tag"
          />
        </ShpItemContainer>
      )}
      {/* 메모 Input 부분 */}
      <InputWrapper>
        {/* 이미지 업로드 input */}
        <Controller
          control={control}
          render={({ field: { onChange } }) => (
            <ImgBtnContainer
              onPress={async () => {
                const img = await onImageUpload();
                setIsShpBtnToggled(true);
                return onChange(img);
              }}
            >
              <ImgBtn source={require('../assets/ImgBtn.png')} />
            </ImgBtnContainer>
          )}
          name="image"
        />
        <MemoInputContainer>
          <ShpBtnContainer onPress={() => setIsShpBtnToggled(!isShpBtnToggled)}>
            <ShpBtn source={require('../assets/InputShpBtn.png')} />
          </ShpBtnContainer>
          {/* 메모 텍스트 input */}
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
  background: #ececef;
`;

const ShpItemContainer = styled.View`
  /* padding-bottom을 0픽셀로 설정할 경우 View가 겹쳐서 얇은 선 1줄 생기는 버그 존재 -> 임시로 0.1픽셀로 설정 */
  padding: 16px 0px 0.1px 0px;
  background: #f6f6f7;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const ImgPreviewContainer = styled.View`
  margin-bottom: 20px;
  justify-content: center;
  align-self: center;
  width: 200px;
`;
const ImgCnt = styled.View`
  position: absolute;
  right: -12px;
  top: -12px;
  border-radius: 12px;
  width: 24px;
  height: 24px;
  background: #fff388;
  justify-content: center;
  align-items: center;
`;
const TagBtnContainer = styled.ScrollView`
  flex-direction: row;
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
