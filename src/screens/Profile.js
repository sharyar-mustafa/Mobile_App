import React, { useRef, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  //   StatusBar,
  TextInput,
  Button,
  Image,
  Animated,
} from "react-native";

import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import { auth, signInWithEmailAndPassword } from '../config/Firebase'
import MyTabs from "../config/BottomNavigation";

const App = (props) => {
//   const [visibility, setVisibility] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  
  // console.log(props.navigation)

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true, // Add This line
    }).start();
  };



  useEffect(() => {
    fadeIn();
  }, []);

 
  
  return (
     <MyTabs branch={props.route.params.branch} navigation={props.navigation} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  
});

export default App;
