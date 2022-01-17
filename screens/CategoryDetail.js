import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  StatusBar,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import { GetTagsDetail, GetFilterTags } from '../shared/API';

import MemoDate from '../shared/components/MemoDate';
import useSearch from '../shared/hooks/useSearch';
import HeaderButton from '../shared/components/HeaderButton';
import TextContainer from '../shared/components/TextContainer';

import { TitleItem } from '../shared/styles/HeaderStyle';
import {
  Container,
  TextBox,
  DateItem,
  Wrapper,
  Scroll,
} from '../shared/styles/TextContainerStyle';
import TextB from '../shared/components/TextB';
import TextR from '../shared/components/TextR';
import { TextSize } from '../shared/styles/FontStyle';
import styled from 'styled-components/native';

import GoBack from '../shared/assets/GoBack.svg';
import SearchIcon from '../shared/assets/search.svg';
import palette from '../shared/palette';

const CategoryDetail = ({ route, navigation }) => {
  const memoData = useSelector((state) => state.memoData);
  const token = useSelector((state) => state.auth.accessToken);
  const [onSearchChange, renderState] = useSearch('Main');
  // const [memos, setMemos] = useState(
  //   renderState.filter((item) => item.tag_name === route.params.tag_name)
  // );
  const [clickedState, setClickedState] = useState(true);

  const [types, setTypes] = useState([
    { id: 0, category: 'image', isSelected: true },
    { id: 1, category: 'link', isSelected: true },
    { id: 2, category: 'text', isSelected: true },
    { id: 3, category: 'bookmark', isSelected: false },
  ]);

  const [loading, setLoading] = useState(false);
  const [tagsDetail, setTagsDetail] = useState([]);
  const [filterArr, setFilterArr] = useState([]);
  const [concatArr, setConcatArr] = useState([]);
  const [listner, setListner] = useState(false);

  const handleTagDetail = async () => {
    setLoading(true);
    try {
      const getTagsDetail = await GetTagsDetail(token, route.params.id);
      //console.log('getTagsDetail 성공: ', getTagsDetail.data);
      setTagsDetail(getTagsDetail.data);
    } catch (error) {
      console.log('getTagsDetail 실패', error);
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

  const handleFilter = async (link, image, text) => {
    try {
      const getFilterTags = await GetFilterTags(
        token,
        route.params.id,
        link,
        image,
        text
      );
      console.log('getFilterTags 성공: ', getFilterTags.data.data);
      setTagsDetail(getFilterTags.data.data);
    } catch (error) {
      console.log('getFilterTags 실패', error);
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

  // const handleArr = (item) => {
  //   let newArr = [];
  //   concatArr.includes(item)
  //     ? (newArr = concatArr.filter((element) => element !== item))
  //     : (newArr = concatArr.concat(item));
  //   setConcatArr((concatArr) => newArr);
  //   console.log(concatArr);
  // };

  useEffect(() => {
    handleTagDetail();
    // handleArr(filterArr);
    // handleFilter(concatArr);
    navigation.setOptions({
      headerStyle: {
        backgroundColor: palette.gatherHeaderGray,
        height: 130,
      },
      headerLeft: () => (
        <TouchableOpacity
          hitSlop={{ top: 32, bottom: 32, left: 32, right: 32 }}
          onPress={() => navigation.navigate('태그')}
        >
          <GoBack />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <HeaderButton type={types[3]} setClickedState={setClickedState} />
      ),
      headerTitle: () => (
        <TitleItem>
          <TextB>
            <TextSize
              style={{ marginTop: 16, marginBottom: 12 }}
              fontSize="18"
              color={route.params.tag_color}
            >
              {route.params.tag_name}
            </TextSize>
          </TextB>
        </TitleItem>
      ),
    });
  }, []);

  useEffect(async () => {
    if (listner) {
      await handleTagDetail();
      setListner(false);
    }
  }, [listner]);

  //console.log(memos);

  return (
    <Background>
      <Scroll>
        <StatusBar
          backgroundColor={palette.gatherHeaderGray}
          barStyle="dark-content"
        />
        <Wrapper>
          {loading && (
            <SpinnerWrapper>
              <ActivityIndicator size="large" color="#ff7f6d" />
            </SpinnerWrapper>
          )}
          {clickedState ? (
            <Container>
              {tagsDetail.map(
                (memo, index) =>
                  memo.timestamp && (
                    <TextBox key={memo.id}>
                      <DateItem>
                        {index === 0 ? (
                          <MemoDate memoTime={memo.timestamp} />
                        ) : (
                          moment
                            .unix(tagsDetail[index - 1].timestamp)
                            .format('YYYY-MM-DD') !==
                            moment
                              .unix(memo.timestamp)
                              .format('YYYY-MM-DD') && (
                            <MemoDate memoTime={memo.timestamp} />
                          )
                        )}
                      </DateItem>

                      <TextContainer
                        memo={memo}
                        navigation={navigation}
                        destination="detailText"
                        history="태그"
                        fromTagDetail={true}
                        setListner={setListner}
                      />
                    </TextBox>
                  )
              )}
            </Container>
          ) : (
            <Container>
              {tagsDetail
                .filter((elemnet) => elemnet.is_marked === true)
                .map(
                  (memo, index) =>
                    memo.timestamp && (
                      <TextBox key={memo.id}>
                        <DateItem>
                          {index === 0 ? (
                            <MemoDate memoTime={memo.timestamp} />
                          ) : (
                            moment
                              .unix(tagsDetail[index - 1].timestamp)
                              .format('YYYY-MM-DD') !==
                              moment
                                .unix(memo.timestamp)
                                .format('YYYY-MM-DD') && (
                              <MemoDate memoTime={memo.timestamp} />
                            )
                          )}
                        </DateItem>

                        <TextContainer
                          memo={memo}
                          navigation={navigation}
                          destination="detailText"
                          history="태그"
                        />
                      </TextBox>
                    )
                )}
            </Container>
          )}
        </Wrapper>
      </Scroll>
    </Background>
  );
};

export default CategoryDetail;

const Background = styled.View`
  background: ${palette.tagGray};
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
