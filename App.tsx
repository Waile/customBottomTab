/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
  Button,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View
} from 'react-native';

import {
  Colors,
  Header
} from 'react-native/Libraries/NewAppScreen';
import Posts from './src/Posts';
import PostById from './src/PostById';
import CreatePost from './src/CreatePost';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/screens/Home';
import Search from './src/screens/Search';
import Analytics from './src/screens/Analytics';
import Profile from './src/screens/Profile';
import Wallet from './src/screens/Wallet';
import CustomTab from './src/components/CustomTab';



const client = new QueryClient()

const Tab = createBottomTabNavigator()



function App(): React.JSX.Element {

  const isDarkMode = useColorScheme() === 'dark';
  const [showPosts, setShowPosts] = useState(false)

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const safePadding = '5%';
      // CREATING A CUSTOM NAVIGATION THEME TO OVERRIDE THE DEFAULT BACKGROUND COLOR.
    const navigationTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            // SETTING THE BACKGROUND OF THE NAVIGATION CONTAINER.
            background: "#ffffff",
        },
    };

  return (
    <NavigationContainer
    theme={navigationTheme}
    >
    <QueryClientProvider
    client={client}
    >
      {/* <Button
      title='Toggle Posts'
      onPress={() => setShowPosts(!showPosts)}
      /> */}
          {/* {showPosts && */}
      {/* <CreatePost/> */}
           {/* <Posts/>  */}
           {/* }  */}
          {/* <PostById
          id={4}
          />  */}
          <Tab.Navigator
          tabBar={(props)=> <CustomTab {...props} />}
          >
            <Tab.Screen name='Home' component={Home} />
            <Tab.Screen name='Doctor' component={Search}/>
            <Tab.Screen name='Lab' component={Analytics}/>
            <Tab.Screen name='Pharmacy' component={Profile}/>
            <Tab.Screen name='Appointment' component={Wallet}/>
          </Tab.Navigator>

    </QueryClientProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
