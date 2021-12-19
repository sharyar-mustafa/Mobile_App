import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Form  from "../screens/Foodreqs"
import  Account from "../screens/Account"
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

function MyTabs({branch,navigation}) {
  console.log("tabssssssssssssssssssssssssss",branch)
  console.log("tabssssssssssssssssssssssssss",navigation.navigate)
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
      }}
    >
  
     
      <Tab.Screen
        name="Request Form"
        // component={Form}
        children={()=><Form branch={branch} navigation={navigation}/>}
        options={{
          tabBarLabel: 'Req Form',
          branch:branch,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="food"  color={color} size={size} />
          ),
        }}
      />
         {/* <Tab.Screen
        name="Profile"
        component={Account}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="account-circle" size={size} color={color} />
          ),
          // tabBarBadge: 3,
        }}
      /> */}
     
    </Tab.Navigator>
  );
}

export default MyTabs;
