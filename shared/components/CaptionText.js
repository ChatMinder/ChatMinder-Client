import React from 'react';
import { Dimensions } from 'react-native';
import RNUrlPreview from 'react-native-url-preview';
import styled from 'styled-components/native';
import palette from '../palette';
import TextR from './TextR';

const CaptionText = ({ memo }) => {
  return (
    <>
      {memo.url && memo.images.length === 0 && (
        <URLContainer>
          <RNUrlPreview text={`${memo.memo_text}, ${memo.url}`} />
        </URLContainer>
      )}
      {/* 텍스트가 이미지 or 링크의 캡션일 경우 */}
      {(memo.url || memo.images.length > 0) && memo.memo_text ? (
        <>
          {memo.url && <URLText>{memo.url}</URLText>}
          <CaptionContainer>
            <TextR>
              {memo.memo_text.slice(0, SCREEN_WIDTH / 13.3)}
              {memo.memo_text.length > SCREEN_WIDTH / 13.3 && (
                <>
                  <TextR>...</TextR>
                  <SeeAll> 전체보기</SeeAll>
                </>
              )}
            </TextR>
            {/* {memo.url&&} */}
          </CaptionContainer>
        </>
      ) : null}
      {/* 텍스트가 plain 텍스트일 경우 */}
      {!memo.url && memo.images.length === 0 && memo.memo_text ? (
        <TextBox>
          <TextR>
            {memo.memo_text.slice(0, (SCREEN_WIDTH * 10) / 43)}

            {memo.memo_text.length > (SCREEN_WIDTH * 10) / 43 && (
              <>
                <TextR>...</TextR>
                <SeeAll> 전체보기</SeeAll>
              </>
            )}
          </TextR>
        </TextBox>
      ) : null}
    </>
  );
};

export default CaptionText;

const SCREEN_WIDTH = Dimensions.get('window').width;

const URLContainer = styled.View`
  border-radius: 4px;
`;
const URLText = styled.Text`
  color: ${palette.gray2};
  font-family: 'NanumSquareOTF_ac';
  font-size: 12px;
  font-weight: 400;
  padding-top: 6px;
  padding-bottom: 8px;
  letter-spacing: -0.36px;
`;

const CaptionContainer = styled.View`
  flex-direction: row;
`;

const TextBox = styled(CaptionContainer)`
  min-height: 57px;
`;

const SeeAll = styled.Text`
  font-family: 'NanumSquareOTF_ac';
  color: ${palette.gray1};
  text-decoration: underline;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: -0.36px;
`;
