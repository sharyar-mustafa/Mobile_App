import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  Animated,
  RefreshControl,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useValidation } from 'react-native-form-validator';

function Signup({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [visibility, setVisibility] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;


  const { validate, isFieldInError, getErrorsInField, getErrorMessages } =
  useValidation({
    state: { name, email, newPassword, confirmPassword },
  });

const _onPressButton = () => {
  validate({
    name: { minlength: 3, maxlength: 7, required: true },
    email: { email: true },
    newPassword: {  minlength: 3, maxlength: 7, required: true },
    confirmPassword: { equalPassword: newPassword },
  });
};


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

  return (
    <LinearGradient
      style={{
        flex: 1,
        margin: 0,
        padding: 0,
        justifyContent:'center'

      }}
      colors={["rgba(234, 57, 56, 0.8)", "rgba(13, 43, 85, 0.8)"]}
    >
      <StatusBar hidden={true} />
      <Animated.View
        style={[
          {
            // Bind opacity to animated value
            opacity: fadeAnim,
            
            
          },
        ]}
      >
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{  width: "100%",
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor:'red',
            paddingVertical:20
          }}  > 
         
        <View style={{ flex: 0.17, width: "90%" }}>
          <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 16, color: "#fff" }}>User Name</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              placeholder="Enter your Name"
              placeholderTextColor="#fff"
            />
            {isFieldInError('name') &&
        getErrorsInField('name').map(errorMessage => (
          <Text>{errorMessage}</Text>
        ))}
          </View>
        </View>

        <View style={{ flex: 0.17, width: "90%" }}>
          <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 16, color: "#fff" }}>Email</Text>
          </View>
          <View style={styles.inputView}>
            <TextInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              placeholder="Enter your Email"
              placeholderTextColor="#fff"
            />
          </View>
        </View>

        <View style={{ flex: 0.17, width: "90%" }}>
          <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 16, color: "#fff" }}>Password</Text>
          </View>

          <View style={styles.inputView}>
            <View style={{ flex: 0.8 }}>
              <TextInput
                secureTextEntry={visibility}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={styles.input}
                placeholder="Enter your Password"
                placeholderTextColor="#fff"
              />
           
            </View>

            <View style={{ flex: 0.2, alignItems: "center" }}>
              <TouchableOpacity onPress={() => setVisibility(!visibility)}>
                <Ionicons name="eye" size={22} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>


{isFieldInError('newPassword') &&
        getErrorsInField('newPassword').map(errorMessage => (
         <View style={{width:'90%', alignSelf:'center', backgroundColor:'red'}}>
<Text>{errorMessage}</Text>
         </View> 
        ))}


        <View style={{ flex: 0.17, width: "90%" }}>
          <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
            <Text style={{ fontSize: 16, color: "#fff" }}>
              Confirm Password
            </Text>
          </View>

          <View style={styles.inputView}>
            <View style={{ flex: 0.8 }}>
              <TextInput
                secureTextEntry={visibility}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={styles.input}
                placeholder="Re-Enter Password"
                placeholderTextColor="#fff"
              />
              {isFieldInError('confirmPassword') &&
        getErrorsInField('confirmPassword').map(errorMessage => (
          <Text>{errorMessage}</Text>
        ))}
            </View>

            <View style={{ flex: 0.2, alignItems: "center" }}>
              <TouchableOpacity onPress={() => setVisibility(!visibility)}>
                <Ionicons name="eye" size={22} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ flex: 0.17, width: "90%" }}>
          <TouchableOpacity
            onPress={_onPressButton}
            // onPress={() => console.log('email test', email)}
            style={styles.button}
          >
            <Text
              style={{ padding: 10, fontSize: 20, color: "#fff" }}
              textAlign="center"
            >
              Sign up
            </Text>
          </TouchableOpacity>
          {/* <Text>{getErrorMessages()}</Text> */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              marginTop: 20,
            }}
          >
            <Text style={{ color: "#fff" }}>Already a member ? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={{ fontWeight: "700", color: "#fff" }}>
                Login Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        </ScrollView>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  input: {
    // backgroundColor:'red',
    width:'100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#fff",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#0d2b55",
    // backgroundColor:'red',
    marginTop: 30,
    borderRadius: 100,
  },
  inputView: {
    flexDirection: "row",
   
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

});

export default Signup;
