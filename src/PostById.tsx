import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query';


const fetchPosts = async (id:number) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    console.log('====================================');
    console.log(response);
    console.log('====================================');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

const PostById = ({id}:{id:number}) => {
      const {data,isLoading,error} = useQuery({
        queryKey:['posts',id],
        queryFn:() => fetchPosts(id),
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
      <Text>{data.title}</Text>
    </ScrollView>
  )
}

export default PostById

const styles = StyleSheet.create({})