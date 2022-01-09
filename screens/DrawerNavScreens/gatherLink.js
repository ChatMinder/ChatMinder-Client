import React from 'react';
import { Text, View, Button } from 'react-native';
import axios from 'axios';

const gatherLink = () => {
  const getLinks = async () => {
    try {
      const response = await axios.get('http://172.30.1.19:8080/memos/links/', {
        headers: {
          Authorization:
            'Bearer ' +
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjQxNzkzMTg0LCJqdGkiOiJiZjUyMTFjMzUwZjc0YjEyYWQ2ZjcyOTllNzkzMGJkYSIsInVzZXJfaWQiOjExLCJrYWthb19pZCI6IjEyMzE0MTQiLCJrYWthb19lbWFpbCI6ImNoYXRtaW5kZXJAY2hhdG1pbmRlci5jb20ifQ.R1f4UUchte_krYbQL7soRbcVkIT-UFEbqNPBtiuafr4',
        },
      });
      console.log('response >>', response.data);
    } catch (error) {
      console.log('Error >>', error);
    }
  };

  return (
    <View>
      <Button title="링크 조회" onPress={() => getLinks()} />
      <Text>링크 모아보기</Text>
    </View>
  );
};

export default gatherLink;
