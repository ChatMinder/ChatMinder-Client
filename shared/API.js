//모든 API 관련 통신을 수행하는 파일
//메모 상태가 업데이트 되면, Reducer에 넣어놓고 씀(각 컴포넌트에서는 리듀서에 저장된 메모 배열을 꺼내어 씀)

import axios from 'axios';

export const PostMemo = async (data) =>
  await axios.post('https://api.chatminder.app/memos', data, {
    headers: {
      'Content-Type': `application/json`,
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ5NDg3OTYxLCJqdGkiOiJkNmYzYzVhZmZmY2M0MDc3Yjc0ZjdlOWVlOTk4ODViOCIsInVzZXJfaWQiOjE3LCJrYWthb19pZCI6IjEyMTIxMjIiLCJrYWthb19lbWFpbCI6InNlZTJvbkBuYXZlci5jb20ifQ.iVV5L4qhSmx2c8s50LC3Xe7J4u14ZNwf0ja2EKDLeoM',
    },
  });

export const PostImage = async (image) =>
  await axios.post('https://api.chatminder.app/images', image, {
    headers: {
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ5NDg3OTYxLCJqdGkiOiJkNmYzYzVhZmZmY2M0MDc3Yjc0ZjdlOWVlOTk4ODViOCIsInVzZXJfaWQiOjE3LCJrYWthb19pZCI6IjEyMTIxMjIiLCJrYWthb19lbWFpbCI6InNlZTJvbkBuYXZlci5jb20ifQ.iVV5L4qhSmx2c8s50LC3Xe7J4u14ZNwf0ja2EKDLeoM',
    },
  });

export const DeleteMemo = async (ID) =>
  await axios.delete(`https://api.chatminder.app/memos/${ID}`, {
    headers: {
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ5NDg3OTYxLCJqdGkiOiJkNmYzYzVhZmZmY2M0MDc3Yjc0ZjdlOWVlOTk4ODViOCIsInVzZXJfaWQiOjE3LCJrYWthb19pZCI6IjEyMTIxMjIiLCJrYWthb19lbWFpbCI6InNlZTJvbkBuYXZlci5jb20ifQ.iVV5L4qhSmx2c8s50LC3Xe7J4u14ZNwf0ja2EKDLeoM',
    },
  });

export const PostBookmark = async (data) =>
  await axios.post(`https://api.chatminder.app/memos/bookmark`, data, {
    headers: {
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQ5NDg3OTYxLCJqdGkiOiJkNmYzYzVhZmZmY2M0MDc3Yjc0ZjdlOWVlOTk4ODViOCIsInVzZXJfaWQiOjE3LCJrYWthb19pZCI6IjEyMTIxMjIiLCJrYWthb19lbWFpbCI6InNlZTJvbkBuYXZlci5jb20ifQ.iVV5L4qhSmx2c8s50LC3Xe7J4u14ZNwf0ja2EKDLeoM',
    },
  });
