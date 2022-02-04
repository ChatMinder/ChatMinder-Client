# 내게 쓰는 더 빠른 메모, 챗마인더

![Logo](https://user-images.githubusercontent.com/50395394/150471967-b4ee8d49-fb64-4ca2-b1e7-32891fd9c59e.png)
Chatminder는 메모, 이미지, 링크를 통합적으로 저장하고 관리하도록 지원하는 정보관리 어플리케이션입니다. <br>
[구글 플레이 스토어 링크](https://play.google.com/store/apps/details?id=com.chatminderclient)

## ❓︎ About Chatminder

메모 작성 작업이 귀찮다고 느껴보신 적 있나요? Chatminder와 함께라면 더 이상 메모 작성은 번거로운 일이 아닙니다. 하나의 텍스트바에서 메모 입력, 태그 선택, 사진 및 링크 첨부 기능을 사용할 수 있고 기존의 메모 앱보다 훨씬 빠르고 체계적으로 정보를 입력할 수 있습니다.

언젠가 저장해 둔 메모나 링크를 찾기 어려웠던 적이 있나요? Chatminder에서는 정보 입력 과정에서 간편하게 태그를 생성하고 선택할 수 있습니다. 기록된 정보는 태그 별로, 혹은 파일 형식별, 날짜 별로 분류해서 찾아 볼 수 있습니다. 더 이상 저장해 둔 정보를 찾기 위해 많은 시간을 사용할 필요가 없습니다!

더 이상 정보를 관리하기 위해 여러 개의 서비스를 사용하지 마세요! 모든 종류의 메모와 링크를 Chatminder에서 관리하실 수 있습니다!

## 👫 Contributors

|                                                                                                     🙋‍♂️유시원(Front)                                                                                                     |                                                             🙋‍♀️이로움(Front)                                                             |                           🙋‍♀️김채리 (Back)                            |                                     🙋‍♂️유준환(Back)                                     |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------: | :------------------------------------------------------------------------------------: |
|                                                                                         🚗[@SEEWON](https://github.com/SEEWON)                                                                                          |                                                 🚗[@ROUM02](https://github.com/ROUM02)                                                  |              🚗[@chaeri93](https://github.com/chaeri93)              |                       🚗[@ujunhwan](https://github.com/ujunhwan)                       |
| Authentication Process <br> 메모 입력 관리(Tag, Text, Link, Image) <br> 메모 Data 상태 관리(Redux) <br> 검색 및 렌더링 로직(Custom Hooks) <br> API Fetching <br> 메인, 모아보기,  Page <br> Build & Store Production <br> | Overall Publishing <br> Base UI Components <br> API Fetching <br> 태그, 캘린더, 모아보기 Page <br> 메모, 태그, 캘린더, Detail Page <br> | [ChatMinder-Server](https://github.com/ChatMinder/ChatMinder-Server) | 카카오 로그인<br> [ChatMinder-Server](https://github.com/ChatMinder/ChatMinder-Server) |

## 🛠️ Stacks (Client)

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)

![Android](https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)
![Play Store](https://img.shields.io/badge/Google_Play-414141?style=for-the-badge&logo=google-play&logoColor=white)

![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)
![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)
![KakaoTalk](https://img.shields.io/badge/kakaotalk-ffcd00.svg?style=for-the-badge&logo=kakaotalk&logoColor=000000)

## 📚 Libraries (Client)

위 Stacks에 기술된 라이브러리는 제외했습니다.

- [React navigation](https://reactnavigation.org/) - 네비게이션
- [Async Storage](https://react-native-async-storage.github.io/async-storage/) - 디바이스에 토큰 저장
- [Axios](https://github.com/axios/axios) - API Fetching
- [Moment.js](https://momentjs.com/) - Timestamp를 활용한 메모 작성 날짜 관리
- [React Hook Form](https://react-hook-form.com/) - 태그, 이미지, 메모 입력 관리
- [React Native Image Crop Picker](https://github.com/ivpusic/react-native-image-crop-picker) - 멀티 이미지 업로드
- [React Native Image Slider Box](https://github.com/intellidev1991/react-native-image-slider-box) - 이미지 열람
- [React Native Image Zoom Viewer](https://github.com/ascoders/react-native-image-viewer) - 이미지 열람
- [React Native Calendars](https://github.com/wix/react-native-calendars) - 캘린더
- [React Native Config](https://github.com/luggit/react-native-config) - env, 폰트 설정
- [React Native Modal](https://github.com/react-native-modal/react-native-modal) - 모달 구현
- [React Native SVG](https://github.com/react-native-svg/react-native-svg) - svg 아이콘 사용
- [React Native URL Preview](https://github.com/maherzaidoune/react-native-url-preview) - 링크 프리뷰 구현
- [React Native Seoul / Kakao Login](https://github.com/react-native-seoul/react-native-kakao-login) - 카카오 로그인

## 🚀 How to execute

```
> git clone https://github.com/ChatMinder/ChatMinder-Client.git
> cd ChatMinder-Client
> npx react-native start
> npx react-native run-android
```

or [Download our Application](https://play.google.com/store/apps/details?id=com.chatminderclient)

## 📲 Demos

### 로그인 화면

<p>
<img src="https://user-images.githubusercontent.com/50395394/152343361-7368a3a1-60ef-4ee8-8f41-08c5d47c89ba.png"  width="200">
<img src="https://user-images.githubusercontent.com/50395394/152343373-018ca99c-d50b-44d4-8a9b-ef57e335d8a6.png"  width="200">
<img src="https://user-images.githubusercontent.com/50395394/152343381-668fa64b-5167-4b44-8733-d3ba25df49e0.png"  width="200">
</p>
챗마인더 계정을 만들거나, 카카오 계정을 이용해 로그인할 수 있습니다.

### 메인 화면

<p>
<img src="https://user-images.githubusercontent.com/50395394/152346019-f11cdaaf-e52f-41c1-b186-fb4c00425f8b.png" width="200">
<img src="https://user-images.githubusercontent.com/50395394/152345854-6deef65c-75f8-44aa-a689-790517f5699d.gif" height="400">
<img src="https://user-images.githubusercontent.com/50395394/152347090-6b792338-1358-4edb-a980-22d47dcf505c.png" width="200">
<img src="https://user-images.githubusercontent.com/50395394/152346703-2ff481c8-ff38-40d6-b1fe-8ff042932384.png" width="200">
</p>
메인 화면에서 태그와 이미지, 링크, 그리고 텍스트가 포함된 메모를 작성할 수 있습니다.
<br><br>
<p>
<img src="https://user-images.githubusercontent.com/50395394/152347302-2c7b698c-6699-466e-906f-6248d46ec50a.png" width="200">
<img src="https://user-images.githubusercontent.com/50395394/152347411-4995abe4-1edf-4b14-b213-4f7ec3c126e8.png" height="400">
<img src="https://user-images.githubusercontent.com/50395394/152347505-6eeed730-df8e-4eb7-84a8-12ae9e7b0889.png" width="200">
<img src="https://user-images.githubusercontent.com/50395394/152347639-3c80ad5f-75d9-47cf-862b-07877544ae67.png" width="200">
</p>
태그 상세 페이지 혹은 메모 상세 페이지로 이동할 수 있고, 메모 북마크 및 삭제 등의 조작도 가능합니다.
<br>

### 모아보기(이미지/링크/텍스트) 창

<p>
<img src="https://user-images.githubusercontent.com/50395394/152347889-8e547f90-637c-458e-b5c1-70715605512b.png" width="200">
<img src="https://user-images.githubusercontent.com/50395394/152347992-cb8a26ba-cf2d-43f6-945d-447cc8a2d322.png" width="200">
<img src="https://user-images.githubusercontent.com/50395394/152348006-a5b26047-d0a7-499a-b2fd-78eaaab60a2f.png" width="200">
<img src="https://user-images.githubusercontent.com/50395394/152348007-93c2d21f-db8f-460f-9e1f-19e4e4299b1a.png" width="200">
</p>
모아보기 페이지에서 해당하는 형식의 메모들을 모아 보고, 태그 및 텍스트로 검색할 수 있습니다. <br>
메인 페이지에서와 마찬가지로 상세 페이지로 이동할 수 있고, 북마크하거나 삭제할 수 있습니다.

### 태그 화면, 태그 상세보기 창

<p>
<img src="https://user-images.githubusercontent.com/50395394/152349365-1d57ca26-7db2-4a2c-b09e-fd024ffa3e7d.png" width="200">
<img src="https://user-images.githubusercontent.com/50395394/152349387-baa53955-2fe2-4248-8cf7-5536e8f299cc.png" width="200">
<img src="https://user-images.githubusercontent.com/50395394/152349560-8cb2551f-4f02-40b7-a2d0-8d966d8a28b3.png" width="200">
</p>
태그와 태그별 메모를 보아 볼 수 있습니다. <br>
모달을 통해 태그의 이름 또는 색의 수정, 삭제가 가능하고 새 태그를 추가할 수 있습니다. <br>
태그가 없는 메모들 또한 한 곳에서 모아볼 수 있습니다.

### 캘린더 화면, 날짜별 메모 보기 창

<p>
<img src="https://user-images.githubusercontent.com/50395394/152349989-eecb215f-2446-4384-b58a-fdcac9929db5.png" width="200">
<img src="https://user-images.githubusercontent.com/50395394/152350026-38f420c7-f07f-459f-af08-c76e66a84602.png" width="200">
<img src="https://user-images.githubusercontent.com/50395394/152350210-6d7b3050-d96e-4a53-898d-a83f4ac98bfb.png" width="200">
</p>
오늘 날짜가 기본으로 체크되어 있으며, 메모가 형성된 날짜를 한 눈에 볼 수 있습니다. <br>
날짜별로 작성한 메모를 모아 볼 수도 있습니다. <br>
메모가 없는 날인 경우 작성한 메모가 없다는 안내문구가 뜨게 됩니다.

### 메모 상세보기 창

<p>
<img src="https://user-images.githubusercontent.com/78200124/152516244-1dcb8ebc-81f7-4d4b-baf2-cfcfb46f2fdf.gif" width="220">
<img src="https://user-images.githubusercontent.com/50395394/152347411-4995abe4-1edf-4b14-b213-4f7ec3c126e8.png" width="200">
</p>

메모가 이미지, 링크를 포함하고 있을 경우에 따라 상세보기 페이지가 다르게 보입니다.

<p>
<img src="https://media.vlpt.us/images/roum02/post/4da48962-cfe4-4cf3-8623-104d02fb83fc/20220204_000749-_online-video-cutter.com_.gif" width="220">
<img src="https://media.vlpt.us/images/roum02/post/5fa6895c-349b-4f3d-a829-56e2827756f2/20220204_000749-_online-video-cutter.com_-_1_.gif" width="220">
</p>
상세보기 페이지 내부에서 이미지의 태그 변경, 내용의 수정 및 북마크가 가능합니다.
