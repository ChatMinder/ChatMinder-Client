//모든 API 관련 통신을 수행하는 파일

import axios from 'axios';

const accessToken = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ5NDg3OTYxLCJqdGkiOiJkNmYzYzVhZmZmY2M0MDc3Yjc0ZjdlOWVlOTk4ODViOCIsInVzZXJfaWQiOjE3LCJrYWthb19pZCI6IjEyMTIxMjIiLCJrYWthb19lbWFpbCI6InNlZTJvbkBuYXZlci5jb20ifQ.iVV5L4qhSmx2c8s50LC3Xe7J4u14ZNwf0ja2EKDLeoM`;

//메모 조회
export const GetMemo = async () =>
  await axios.get('https://api.chatminder.app/memos', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

//메모 생성
export const PostMemo = async (data) =>
  await axios.post('https://api.chatminder.app/memos', data, {
    headers: {
      'Content-Type': `application/json`,
      Authorization: `Bearer ${accessToken}`,
    },
  });

//이미지 저장
export const PostImage = async (image) =>
  await axios.post('https://api.chatminder.app/images', image, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

//메모 삭제
export const DeleteMemo = async (ID) =>
  await axios.delete(`https://api.chatminder.app/memos/${ID}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

//메모 수정
export const FixMemo = async (ID, data) =>
  await axios.patch(`https://api.chatminder.app/memos/${ID}`, data, {
    headers: {
      'Content-Type': `application/json`,
      Authorization: `Bearer ${accessToken}`,
    },
  });

//북마크
export const PostBookmark = async (data) =>
  await axios.post(`https://api.chatminder.app/memos/bookmark`, data, {
    headers: {
      'Content-Type': `application/json`,
      Authorization: `Bearer ${accessToken}`,
    },
  });

//태그 조회
export const GetTags = async () =>
  await axios.get('https://api.chatminder.app/tags', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
