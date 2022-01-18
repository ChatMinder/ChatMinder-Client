import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  StatusBar,
  Alert,
  Modal,
} from 'react-native';
import styled from 'styled-components/native';
// TODO 혼용 안되면 택1하기
import { SliderBox } from 'react-native-image-slider-box';
import ImageViewer from 'react-native-image-zoom-viewer';
import RNUrlPreview from 'react-native-url-preview';
import TextR from '../../shared/components/TextR';
import TextB from '../../shared/components/TextB';
import palette from '../../shared/palette';
import { TextSize } from '../../shared/styles/FontStyle';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { PatchMemo, PostBookmark, PostEditTag } from '../../shared/API';
import { bookmarkMemo, fixMemo } from '../../shared/reducers/memo';

import {
  TagBox,
  BookmarkItem,
  BookmarkBox2,
  TextItem,
} from '../../shared/styles/TextContainerStyle';

import ModalListItem from '../../shared/components/ModalListItem';

import EmptyBookmark from '../../shared/assets/emptyBookmark.svg';
import FulledBookmark from '../../shared/assets/fulledBookmark.svg';
import GoBack from '../../shared/assets/GoBack.svg';
import GoBackLight from '../../shared/assets/goBack_light.svg';
import Edit from '../../shared/assets/Edit.svg';
const edit = require('../../shared/assets/Edit_png.png');

const detailText = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const baseURL = 'https://image.chatminder.app';

  const [imageArr, setImageArr] = useState(
    route.params.images.map((item) => `${baseURL}/${item.url}`)
  );
  let newArr = [];
  for (let i = 0; i < imageArr.length; i++) {
    newArr.push({
      url: imageArr[i],
    });
    //console.log(newArr);
  }

  const token = useSelector((state) => state.auth.accessToken);
  //console.log(route.params);
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState(route.params.memo_text);
  const [editable, setEditable] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(route.params.is_marked);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [isBookmarked]);

  const onEdit = () => {
    setEditable(!editable);
  };

  const handleEditMemo = async (id) => {
    setLoading(true);
    const formData = {
      memo_text: inputText,
    };
    try {
      const patchMemoRes = await PatchMemo(token, id, formData);
      console.log('patchMemoRes 성공: ', patchMemoRes.data);
      dispatch(fixMemo(id, patchMemoRes.data));
    } catch (error) {
      console.log(`patchMemoRes 실패: ${error}`);
      if (error == 'Error: Network Error') {
        Alert.alert(
          '알림',
          `인터넷 연결이 불안정합니다.\n확인 후 다시 시도해 주세요.`,
          [
            {
              text: '네!',
              style: 'cancel',
            },
          ]
        );
      }
    }
    setLoading(false);
  };

  const handleBookmark = async (id, is_marked) => {
    const formData = {
      memo_id: id,
      is_marked: is_marked,
    };
    try {
      const postBookmarkRes = await PostBookmark(token, formData);
      console.log('postBookmarkRes 성공: ', postBookmarkRes.data);
      setIsBookmarked(postBookmarkRes.data.is_marked);
      dispatch(bookmarkMemo(id));
    } catch (error) {
      console.log(`postBookmarkRes 실패: ${error}`);
      if (error == 'Error: Network Error') {
        Alert.alert(
          '알림',
          `인터넷 연결이 불안정합니다.\n확인 후 다시 시도해 주세요.`,
          [
            {
              text: '네!',
              style: 'cancel',
            },
          ]
        );
      }
    }
  };

  const handleEditTag = async (tag_id) => {
    const formData = {
      memo_id: route.params.id,
      tag_id: tag_id,
    };
    try {
      const editTagRes = await PostEditTag(token, formData);
      dispatch(fixMemo(route.params.id, editTagRes.data));
      console.log('editTagRes 성공: ', editTagRes.data);
      //alert('수정되었습니다.');
      //navigation.navigate(route.params.history);
    } catch (error) {
      console.log(`editTagRes 실패: ${error}`);
      if (error == 'Error: Network Error') {
        Alert.alert(
          '알림',
          `인터넷 연결이 불안정합니다.\n확인 후 다시 시도해 주세요.`,
          [
            {
              text: '네!',
              style: 'cancel',
            },
          ]
        );
      }
    }
  };

  const [zoom, setZoom] = useState({
    index: 0,
    modalVisible: false,
  });

  const openZoom = (index) => {
    setZoom({ index: index, modalVisible: true });
    //console.log(imageArr[zoom.index]);
  };

  return (
    <Wrapper>
      <StatusBar
        backgroundColor={palette.gatherHeaderGray}
        barStyle="dark-content"
      />
      {loading && (
        <SpinnerWrapper>
          <ActivityIndicator size="large" color="#ff7f6d" />
        </SpinnerWrapper>
      )}
      <BookmarkBox2 style={{ marginBottom: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate(route.params.history)}
          hitSlop={{ top: 32, bottom: 32, left: 32, right: 32 }}
        >
          <GoBack />
        </TouchableOpacity>
        <Buttons>
          <TouchableOpacity onPress={() => onEdit()}>
            <BookmarkItem
              source={edit}
              width="25"
              height="25"
              marginRight="14"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleBookmark(route.params.id, route.params.is_marked);
            }}
          >
            {isBookmarked ? <FulledBookmark /> : <EmptyBookmark />}
          </TouchableOpacity>
        </Buttons>
      </BookmarkBox2>

      {/* 이미지인 경우 */}

      {route.params.images.length !== 0 ? (
        <>
          <ImageBox>
            <SliderBox
              images={imageArr}
              onCurrentImagePressed={(index) => {
                //console.warn(`image ${index} pressed`);
                openZoom(index);
              }}
              sliderBoxHeight="100%"
            />
          </ImageBox>

          <Modal
            visible={zoom.modalVisible}
            transparent={true}
            onRequestClose={() => setZoom({ ...zoom, modalVisible: false })}
          >
            <ImageViewer
              imageUrls={newArr}
              index={zoom.index}
              onSwipeDown={() => {
                //console.log('onSwipeDown');
                setZoom({ ...zoom, modalVisible: false });
              }}
              //onMove={(data) => console.log(data)}
              enableSwipeDown={true}
            />
          </Modal>
        </>
      ) : (
        <View />
      )}

      {/* 링크인 경우 */}
      {route.params.url && (
        <LinkView>
          <TextB>
            <TextSize color="black" fontSize="18">
              {route.params.url}
            </TextSize>
          </TextB>
          <RNUrlPreview
            text={`${route.params.memo_text}, ${route.params.url}`}
          />
        </LinkView>
      )}

      {/* 텍스트인 경우 */}
      {route.params.tag_name ? (
        <TextB>
          <TagBox
            style={{
              paddingTop: 7,
              paddingBottom: 7,
              paddingRight: 10,
            }}
            backgroundColor={route.params.tag_color}
          >
            <TouchableOpacity onPress={() => toggleModal()}>
              <TextItem>{route.params.tag_name}</TextItem>
            </TouchableOpacity>
            <View>
              <GoBackLight style={{ marginLeft: 2 }} />
            </View>
          </TagBox>
        </TextB>
      ) : (
        <View />
      )}

      <View style={{ marginTop: 10 }}>
        {editable ? (
          <View>
            <TextInput
              multiline={true}
              autoFocus={true}
              style={styles.inputStyle}
              placeholder={route.params.memo_text}
              type="text"
              onChangeText={(text) => {
                setInputText(text);
              }}
              value={inputText}
            />
          </View>
        ) : (
          <TextR>
            <TextSize fontSize="16">{inputText}</TextSize>
          </TextR>
        )}
      </View>

      {!editable ? (
        <View />
      ) : (
        <SaveButton
          onPress={() => {
            onEdit();
            handleEditMemo(route.params.id);
          }}
        >
          <TextR>
            <TextSize color="white" fontSize="18">
              저장하기
            </TextSize>
          </TextR>
        </SaveButton>
      )}

      <ModalListItem
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        handleEditTag={handleEditTag}
      />
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    ...Platform.select({
      android: {
        fontFamily: 'NanumSquareOTF_ac',
        fontSize: 16,
      },
    }),
  },
});

export default detailText;

const Wrapper = styled.View`
  margin: 20px 15px;
  height: 100%;
`;

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SpinnerWrapper = styled.View`
  position: absolute;
  left: ${SCREEN_WIDTH * 0.5 - 18}px;
  bottom: ${SCREEN_HEIGHT * 0.5 - 18}px;
  z-index: 10;
`;

const Buttons = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SaveButton = styled.TouchableOpacity`
  background-color: ${palette.main};
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  height: 48px;
  width: 100%;
  position: absolute;
  bottom: 10%;
  align-self: center;
`;

const LinkView = styled.View`
  margin-bottom: 20px;
`;

// 이미지
const ImageBox = styled.View`
  height: 50%;
  margin-bottom: 20px;
`;

const LinkBox = styled.View``;
