import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query';

const createPost = async newPost => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({newPost}),
  });
  console.log('Response : ', response.status);

  return response.json();
};

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const queryClient = useQueryClient();
  const {mutate} = useMutation({
    mutationFn: createPost,
    // onSuccess:() => queryClient.invalidateQueries(["posts"]),
    onMutate: async newPost => 
    {
      await queryClient.cancelQueries(['posts']);
      const previousPosts = queryClient.getQueryData(['posts']);
      queryClient.setQueryData(['posts'], oldPosts => [
        ...oldPosts,
        {id: Date.now(), ...newPost},
      ]);
      return {previousPosts};
    },
    onError:(error,newPost,context) => {
      queryClient.setQueriesData(["posts"],context.previousPosts)
    }
  });

  const handleSubmit = () => {
    mutate({
      title,
      body: 'This is a new post',
    });
  };
  return (
    <View style={{backgroundColor: '#ffffff'}}>
      {/* <Text>CreatePost</Text> */}
      <TextInput
        placeholder="New Post"
        placeholderTextColor={'#000000'}
        onChangeText={text => setTitle(text)}
        onEndEditing={handleSubmit}
        style={{
          backgroundColor: '#ffffff',
          borderColor: 'red',
          borderWidth: 5,
          borderTopRightRadius: 10,
          borderBottomLeftRadius: 10,
          color: '#000000',
        }}
      />
    </View>
  );
};

export default CreatePost;

const styles = StyleSheet.create({});
