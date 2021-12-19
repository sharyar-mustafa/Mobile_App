import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Profile from "../screens/Profile";
import Map from "../screens/Map"
import Account from "../screens/Account";
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="Account" component={Account} />
        {/* <Stack.Screen name="FoodReq" component={Foodreqs} /> */}
        
        {/* <Stack.Screen name="Test" component={} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
