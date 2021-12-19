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

const App = ({ navigation}) => {
  const [visibility, setVisibility] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;



  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true, // Add This line
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true, // Add This line
    }).start();
  };

  useEffect(() => {
    fadeIn();
  }, []);

  // input validation
  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
  });

  // firebase login method

   const login =({email,password})=>{
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // console.log(user)
      navigation.push('Map')
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
   }


  return (
    <>
      <StatusBar barStyle="dark-content" />

      <LinearGradient
        style={{
          flex: 1,
          margin: 0,
          padding: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
        colors={["rgba(58, 236, 21, 0.22)","rgba(251, 251, 251, 0.8)"]}
      >
        <View style={styles.loginContainer}>
          <Image
            style={styles.tinyLogo}
            source={require("../../assets/LogoKhanaSabkliye-01.png")}
          />
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => login(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
            }) => (
              <>
                <Animated.View
                  style={[
                    {
                      // Bind opacity to animated value
                      opacity: fadeAnim,
                    },
                  ]}
                >
                  <View style={styles.inputView}>
                    <TextInput
                      name="email"
                      placeholder="Email Address"
                      placeholderTextColor={"#fff"}
                      style={styles.input}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      keyboardType="email-address"
                    />
                  </View>
                 <View style={{alignItems:'center'}}>
                 {errors.email && (
                    <Text style={{ fontSize: 12, color: "#fff" }}>
                      {errors.email}
                    </Text>
                  )}

                 </View>
                  
                  <View style={styles.inputView}>
                    <View style={{ flex: 0.8 }}>
                      <TextInput
                        name="password"
                        placeholder="Password"
                        placeholderTextColor={"#fff"}
                        style={styles.input}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                        secureTextEntry={visibility}
                      />
                    </View>

                    <View style={{ flex: 0.2, alignItems: "center" }}>
                      <TouchableOpacity
                        onPress={() => setVisibility(!visibility)}
                      
                        // onPress={() => console.log('pressed')}
      >
                        {visibility ? (
                          <Ionicons name="eye-off" size={24} color="white" />
                        ) : (
                          <Ionicons name="eye" size={22} color="white" />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{alignItems:'center'}}>
                  {errors.password && (
                    <Text style={{ fontSize: 12, color: "#fff" }}>
                      {errors.password}
                    </Text>
                   
                  )} 
                  </View>
                </Animated.View>

                <View style={{ alignItems: "center", width: "100%" }}>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    // onPress={() => console.log('email test', email)}
                    style={styles.button}
                    disabled={!isValid}
                  >
                    <Text
                      style={{ padding: 10, fontSize: 20, color: "#fff" }}
                      textAlign="center"
                    >
                      Login
                    </Text>
                  </TouchableOpacity>
                </View>
                {/* <Button
                style={styles.button}
                  onPress={handleSubmit}
                  title="LOGIN"
                  disabled={!isValid}
                /> */}
              </>
            )}
          </Formik>
        
        </View>
        <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            <Text>Not a member ? </Text>
            <TouchableOpacity onPress={() => navigation.push("Signup")}>
              <Text style={{ fontWeight: "700", color: "#42b72a" }}>
                Signup Now
              </Text>
            </TouchableOpacity>
          </View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainer: {
    width: "80%",
    alignItems: "center",
  },
  textInput: {
    height: 40,
    width: "100%",
    margin: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#fff",
    // backgroundColor:'red',
    width: "100%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#42b72a",
    marginTop: 40,
    borderRadius: 100,
    width: "100%",
  },
  inputView: {
    // width: "90%",
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "rgba(13, 43, 85, 0.6)",
    borderRadius: 100,
  },
  fadingContainer: {
    // padding: 20,
    // backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 28,
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: "space-evenly",
    marginVertical: 16,
  },
  tinyLogo: {
    height: 80,
    width: 80,
    //   backgroundColor:'red'
    resizeMode: "contain",
    borderRadius: 400,
  },
});

export default App;
