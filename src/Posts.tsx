import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query';


const fetchPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    // console.log('====================================');
    // console.log(response);
    // console.log('====================================');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

const Posts = () => {
      const {data,isLoading,error} = useQuery({
        queryKey:['posts'],
        queryFn: fetchPosts,
        staleTime: 2000
      })

        if(isLoading){
            return <Text
            style={{flex:1,justifyContent:"center",alignItems:"center",color:"#ffffff",textAlign:"center"}}
            >Loading...</Text>
        }
        if (error) {
            return <Text
            style={{flex:1,justifyContent:"center",alignItems:"center",color:"#ffffff",textAlign:"center"}}
            >Error: {error.message}</Text>   
        }
  return (
    <ScrollView
    style={{flex:1,backgroundColor:"#ffffff"}}
    >
      {data.map((post:any)=>(
        <Text
        key={post.id}
        >{post?.title}</Text>
      ))}
    </ScrollView>
  )
}

export default Posts

const styles = StyleSheet.create({})