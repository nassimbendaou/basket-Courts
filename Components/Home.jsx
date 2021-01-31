
import React, { useState } from 'react';
import { View, Text, TouchableOpacity,Image,Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from "react-native-elements";

import Favorits from './Favorits'

import GroundsList from './groundsList'
import Ground from './ground'




function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row' ,backgroundColor:"white"}}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
        
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            
            style={{  flex: 1,
                flexDirection: 'column',borderRadius:50,marginBottom:20}}
          >
              <Icon
                color={ isFocused ? '#000' : '#d1cdcd' }
               
                disabledStyle={{}}
                iconProps={{}}
                iconStyle={{borderColor:"#000"}}
                name={label}
                onLongPress={() => onLongPress()}
                onPress={() => onPress()}
                size={26}
              
                type="simple-line-icon"
                />
         
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator   screenOptions={{
      headerShown: false
    }}>
       <Stack.Screen name="MainPage" component={myAppBottomBar}/>
      <Stack.Screen name="Infos" component={Ground}  />
     
    </Stack.Navigator>
  );
}
const  myAppBottomBar=()=>{
 return( <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen name="home" component={GroundsList} />
        
        <Tab.Screen name="star" component={Favorits} />
      </Tab.Navigator>)
}

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <NavigationContainer >
      
      <MyStack />
    </NavigationContainer>
  );
}
