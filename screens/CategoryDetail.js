import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  StatusBar,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { GetTagsDetail, GetFilterTags, GetDefaultTags } from '../shared/API';

import MemoDate from '../shared/components/MemoDate';
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
import TextEB from '../shared/components/TextEB';
import TextR from '../shared/components/TextR';
import { TextSize } from '../shared/styles/FontStyle';
import styled from 'styled-components/native';

import GoBack from '../shared/assets/GoBack.svg';
import palette from '../shared/palette';

const CategoryDetail = ({ route, navigation }) => {
  const token = useSelector((state) => state.auth.accessToken);
  const [clickedState, setClickedState] = useState(true);

  const [types, setTypes] = useState([
    { id: 0, category: 'image', isSelected: true },
    { id: 1, category: 'link', isSelected: true },
    { id: 2, category: 'text', isSelected: true },
    { id: 3, category: 'bookmark', isSelected: false },
  ]);

  const [loading, setLoading] = useState(false);
  const [tagsDetail, setTagsDetail] = useState([]);
  const [listner, setListner] = useState(false);

  const handleTagDetail = async () => {
    setLoading(true);
    try {
      const getTagsDetail = await GetTagsDetail(token, route.params.id);
      setTagsDetail(getTagsDetail.data);
    } catch (error) {
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

  const handleDefaultTags = async () => {
    try {
      const getDefaultTags = await GetDefaultTags(token);
      setTagsDetail(getDefaultTags.data);
    } catch (error) {}
  };

  useEffect(() => {
    {
      route.params.id === -1 ? handleDefaultTags() : handleTagDetail();
    }

    navigation.setOptions({
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: palette.gatherHeaderGray,
        height: 130,
      },
      headerLeft: () => (
        <TouchableOpacity
          hitSlop={{ top: 60, bottom: 60, left: 70, right: 70 }}
          onPress={() => navigation.navigate('태그')}
        >
          <GoBack height="12" width="12" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <HeaderButton type={types[3]} setClickedState={setClickedState} />
      ),
      headerTitleAlign: 'center',
      headerTitle: () => (
        <TitleItem>
          <TextEB>
            <TextSize fontSize="18" color={route.params.tag_color}>
              {route.params.tag_name}
            </TextSize>
          </TextEB>
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

          {tagsDetail.length === 0 ? (
            <Info>
              <TextR>
                <TextSize color={palette.gray3} fontSize="14">
                  이 태그에 작성한 메모가 없어요.
                </TextSize>
              </TextR>
            </Info>
          ) : (
            <>
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
            </>
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

const Info = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 65%;
`;
