//모든 API 관련 통신을 수행하는 파일

import axios from 'axios';

const accessToken = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ5NDg3OTYxLCJqdGkiOiJkNmYzYzVhZmZmY2M0MDc3Yjc0ZjdlOWVlOTk4ODViOCIsInVzZXJfaWQiOjE3LCJrYWthb19pZCI6IjEyMTIxMjIiLCJrYWthb19lbWFpbCI6InNlZTJvbkBuYXZlci5jb20ifQ.iVV5L4qhSmx2c8s50LC3Xe7J4u14ZNwf0ja2EKDLeoM`;

const token2 = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ5NjY1NDU3LCJqdGkiOiI2NmRjZDQ5ZWEzMjc0NjI4YTBjMzI1MWZlMzg1MmNlYiIsInVzZXJfaWQiOjE4LCJrYWthb19pZCI6IjIwNTgyODM0NjYiLCJrYWthb19lbWFpbCI6ImFuZHlhYWE3OEBnbWFpbC5jb20ifQ.ClcvAg-F7TT1ABh47n5K20p51QgrUSnVLny6qx9qoTY`;

//회원가입 및 로그인
export const PostLogIn = async (data) =>
  await axios.post('https://api.chatminder.app/auth/kakao', data);

//메모 조회
export const GetMemo = async (token) =>
  await axios.get('https://api.chatminder.app/memos', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

//메모 생성
export const PostMemo = async (token, data) =>
  await axios.post('https://api.chatminder.app/memos', data, {
    headers: {
      'Content-Type': `application/json`,
      Authorization: `Bearer ${accessToken}`,
    },
  });

//이미지 저장
export const PostImage = async (token, image) =>
  await axios.post('https://api.chatminder.app/images', image, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

//메모 삭제
export const DeleteMemo = async (token, ID) =>
  await axios.delete(`https://api.chatminder.app/memos/${ID}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

//메모 수정
export const PatchMemo = async (token, ID, data) =>
  await axios.patch(`https://api.chatminder.app/memos/${ID}`, data, {
    headers: {
      'Content-Type': `application/json`,
      Authorization: `Bearer ${accessToken}`,
    },
  });

//북마크
export const PostBookmark = async (token, data) =>
  await axios.post(`https://api.chatminder.app/memos/bookmark`, data, {
    headers: {
      'Content-Type': `application/json`,
      Authorization: `Bearer ${accessToken}`,
    },
  });

//이미지 모아보기
export const GetImages = async (token) =>
  await axios.get('https://api.chatminder.app/memos/images', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

//링크 모아보기
export const GetLinks = async (token) =>
  await axios.get('https://api.chatminder.app/memos/links', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

//텍스트 모아보기
export const GetTexts = async (token) =>
  await axios.get('https://api.chatminder.app/memos/texts', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

//태그 조회
export const GetTags = async (token) =>
  await axios.get('https://api.chatminder.app/tags', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

//태그 삭제
export const DeleteTag = async (token, id) =>
  await axios.delete(`https://api.chatminder.app/tags/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

//태그 생성
export const PostTag = async (token, data) =>
  await axios.post('https://api.chatminder.app/tags', data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

//태그 수정
export const PatchTag = async (token, data, id) =>
  await axios.patch(`https://api.chatminder.app/tags/${id}`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

//태그별 메모조회
export const GetTagsDetail = async (token, id) =>
  await axios.get(`https://api.chatminder.app/tags/${id}/memos`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
