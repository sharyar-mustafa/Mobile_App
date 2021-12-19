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

import { auth, signInWithEmailAndPassword } from "../config/Firebase";
import CustomDrawer from "../components/Drawer";

const App = ({ navigation }) => {
  //   const [visibility, setVisibility] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

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
    <LinearGradient
      style={{
        flex: 1,
        margin: 0,
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
      }}
      colors={["rgba(234, 57, 56, 0.8)", "rgba(13, 43, 85, 0.8)"]}
    >
      <Animated.View
        style={[
          {
            // Bind opacity to animated value
            opacity: fadeAnim,
          },
        ]}
      >
        <CustomDrawer />

        <Text style={{ fontWeight: "700", color: "#fff" }}>Signup Now</Text>
      </Animated.View>
    </LinearGradient>
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
