import React from 'react';
import styled from 'styled-components/native';

const Images = ({ imgCnt, memo }) => {
  const baseURL = 'https://image.chatminder.app';
  if (!imgCnt) {
    return null;
  } else if (imgCnt === 1) {
    return (
      <MemoImageItem>
        <Img1
          source={{
            uri: `${baseURL}/${memo.images[0].url}`,
          }}
        />
      </MemoImageItem>
    );
  } else if (imgCnt === 2) {
    return (
      <MemoImageItem>
        <MultiImgContainer>
          <Img2
            source={{
              uri: `${baseURL}/${memo.images[0].url}`,
            }}
          />
          <Img2
            source={{
              uri: `${baseURL}/${memo.images[1].url}`,
            }}
          />
        </MultiImgContainer>
      </MemoImageItem>
    );
  } else if (imgCnt === 3) {
    return (
      <MemoImageItem>
        <MultiImgContainer>
          <Img3_1
            source={{
              uri: `${baseURL}/${memo.images[0].url}`,
            }}
          />
          <ImgMorethan3>
            <Img3_2
              source={{
                uri: `${baseURL}/${memo.images[1].url}`,
              }}
            />
            <Img3_2
              source={{
                uri: `${baseURL}/${memo.images[2].url}`,
              }}
            />
          </ImgMorethan3>
        </MultiImgContainer>
      </MemoImageItem>
    );
  } else if (imgCnt > 3) {
    return (
      <MemoImageItem>
        <MultiImgContainer>
          <Img3_1
            source={{
              uri: `${baseURL}/${memo.images[0].url}`,
            }}
          />
          <ImgMorethan3>
            <Img3_2
              source={{
                uri: `${baseURL}/${memo.images[1].url}`,
              }}
            />
            <Img3_2
              style={{ backgroundColor: '#000000', opacity: 0.5 }}
              source={{
                uri: `${baseURL}/${memo.images[2].url}`,
              }}
            />
            <ImgOverflowText>+{imgCnt - 2}</ImgOverflowText>
          </ImgMorethan3>
        </MultiImgContainer>
      </MemoImageItem>
    );
  }
};

export default Images;

const MemoImageItem = styled.View`
  width: 100%;
  height: 225px;
  margin-bottom: 8px;
`;
const Img1 = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;
const MultiImgContainer = styled.View`
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: space-between;
`;
const Img2 = styled.Image`
  width: 49%;
  height: 100%;
  border-radius: 4px;
`;
const Img3_1 = styled.Image`
  width: 60%;
  height: 100%;
  border-radius: 4px;
`;
const ImgMorethan3 = styled.View`
  width: 39%;
  height: 100%;
  justify-content: space-between;
`;
const Img3_2 = styled.Image`
  width: 100%;
  height: 49.4%;
  border-radius: 4px;
`;

const ImgOverflowText = styled.Text`
  position: absolute;
  left: 41%;
  top: 68%;
  font-family: 'Gordita';
  color: white;
  font-size: 18px;
`;
