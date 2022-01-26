//모든 API 관련 통신을 수행하는 파일

import axios from 'axios';

const baseURL = `https://api.chatminder.app`;

//챗마인더 자체 로그인
export const CMLogIn = async (data) =>
  await axios.post(`${baseURL}/auth/signin`, data);

//챗마인더 자체 회원가입
export const CMSignUp = async (data) =>
  await axios.post(`${baseURL}/auth/signup`, data);

//아이디 중복 확인
export const CheckDuplicateID = async (ID) =>
  await axios.get(`${baseURL}/auth/duplicate?login_id=${ID}`);

//카카오 로그인
export const PostLogIn = async (data) =>
  await axios.post(`${baseURL}/auth/kakao`, data);

//AsyncStorage에 토큰 저장된 유저 올바른 refresh토큰 갖고 있는지 확인
export const CheckTokenValid = async (data) =>
  await axios.post(`${baseURL}/auth/token`, data);

//메모 조회
export const GetMemo = async (token) =>
  await axios.get(`${baseURL}/memos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

//메모 생성
export const PostMemo = async (token, data) =>
  await axios.post(`${baseURL}/memos`, data, {
    headers: {
      'Content-Type': `application/json`,
      Authorization: `Bearer ${token}`,
    },
  });

//이미지 저장
export const PostImage = async (token, image) =>
  await axios.post(`${baseURL}/images`, image, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

//메모 삭제
export const DeleteMemo = async (token, ID) =>
  await axios.delete(`${baseURL}/memos/${ID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

//메모 수정
export const PatchMemo = async (token, ID, data) =>
  await axios.patch(`${baseURL}/memos/${ID}`, data, {
    headers: {
      'Content-Type': `application/json`,
      Authorization: `Bearer ${token}`,
    },
  });

//북마크
export const PostBookmark = async (token, data) =>
  await axios.post(`${baseURL}/memos/bookmark`, data, {
    headers: {
      'Content-Type': `application/json`,
      Authorization: `Bearer ${token}`,
    },
  });

//이미지 모아보기
export const GetImages = async (token) =>
  await axios.get(`${baseURL}/memos/images`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

//링크 모아보기
export const GetLinks = async (token) =>
  await axios.get(`${baseURL}/memos/links`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

//텍스트 모아보기
export const GetTexts = async (token) =>
  await axios.get(`${baseURL}/memos/texts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

//태그 조회
export const GetTags = async (token) =>
  await axios.get(`${baseURL}/tags`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

//태그 삭제
export const DeleteTag = async (token, id) =>
  await axios.delete(`${baseURL}/tags/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

//태그 생성
export const PostTag = async (token, data) =>
  await axios.post(`${baseURL}/tags`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

//태그 수정
export const PatchTag = async (token, data, id) =>
  await axios.patch(`${baseURL}/tags/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

//태그별 메모조회
export const GetTagsDetail = async (token, id) =>
  await axios.get(`${baseURL}/tags/${id}/memos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

//태그 내에 있는 메모 필터링
export const GetFilterTags = async (token, id, link, image, text) =>
  await axios.get(`${baseURL}/tags/${id}?${link}&${image}&${text}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// 메모 내 태그 변경
export const PostEditTag = async (token, data) =>
  await axios.post(`${baseURL}/memos/tags`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// 미분류 태그 조회
export const GetDefaultTags = async (token) =>
  await axios.get(`${baseURL}/tags/default/memos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
