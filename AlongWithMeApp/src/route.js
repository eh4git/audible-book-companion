import React from 'react';
import {Platform} from  'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'


import { 
    createAppContainer,
    createSwitchNavigator
} from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';


// SCREENS

import SignIn from './components/auth';
import News from './components/news';
import Article from "./components/news/article"
import Games from './components/games'
import GamesArticle from "./components/games/article"
import Home from "./components/home/index"
import Settings from "./components/settings/index"

import Logo from "./utils/logo"

const headerConf= {
    headerLayoutPreset: "center",
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor: "#A25B2C",
        },
        headerTintColor: 'white',
        headerTitle: Logo
    }
}

Ionicons.loadFont()

// const NewsStack = createStackNavigator({
//     News: News,
//     Article: Article
// }, headerConf)

const HomeStack = createStackNavigator({
    Home: Home
}, headerConf)

const SettingStack = createStackNavigator({
    Settings: Settings
}, headerConf)

// const GamesStack = createStackNavigator({
//     Games: Games,
//     Article: GamesArticle
// }, headerConf)

const AppStack = createBottomTabNavigator({
    // News: NewsStack,
    Home: HomeStack,
    Settings: SettingStack
},{
    tabBarOptions:{
        activeTintColor: "#fff",
        showLabel: false,
        activeBackgroundColor: "#A36F4C",
        inactiveBackgroundColor: "#D9C0AB",
        style:{
            backgroundColor: "#A25B2C"
        }
    },
    initialRouteName: "Home",
    defaultNavigationOptions:({navigation})=>({
        tabBarIcon:({focused, horizontal, tintColor})=>{
           const {routeName}= navigation.state;
            let iconName;
            routeName === 'Home' ? iconName = 'home' : iconName = 'settings'
           return <Ionicons name={iconName} size={25} color={tintColor}/>
       }
   })
});

const AuthStack = createStackNavigator({
    SignIn:SignIn
}, 
{
    headerMode: 'none'
})

export const RootNavigator = () =>{
    return createAppContainer(createSwitchNavigator({
        App:AppStack,
        Auth:AuthStack
    }, 
    {
        initialRouteName: 'Auth'
    }))
}