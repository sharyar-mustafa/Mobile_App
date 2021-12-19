import React, { useRef, useEffect, } from "react";
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

import {
  createUserWithEmailAndPassword,
  auth,
  db,
  doc,
  setDoc,
  getDocs,
  collection,
  where,
  query
 
} from "../config/Firebase";

const App = ({ navigation }) => {
  const [passwordVisibility, setpasswordVisibility] = useState(true);
  const [confirmPasswordVisibility, setconfirmPasswordVisibility] =
    useState(true);
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

  const loginValidationSchema = yup.object().shape({
    userName: yup
      .string()
      .max(15, "Must be 15 characters or less")
      .required("User Name is Required"),
    // .email("Please enter valid User Name")
    // .required("User Name is Required"),
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
    confirmPassword: yup.string().when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref("password")], "Both password need to be the same"),
    }),
  });

  const register = ({ email, password, userName }) => {
    // console.log(email)
    
      createUserWithEmailAndPassword(auth, email, password)
        .then(async (res) => {
          // console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$',res.user.uid)
          let dbRef = doc(db, "users", res.user.uid);
          await setDoc(dbRef, {
            uid: res.user.uid,
            username: userName,
            email: email,
            password: password,
          })
          .then(() => {
            navigation.push("Profile")
            console.log("fire store p gya");
          });
        })
        .catch((err) => {
          // setLoading(false)
          console.log("masla agaya==>", err);
        });
    
 
  };

//   const abc = async () =>{
//     console.log("ABCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC")

//     const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//   console.log(doc.id, " => ", doc.data());
// });

//   } 

//   abc();
  
const abc = async () =>{
  console.log("fffffffffffffffffffffffffffffffff");
  // const querySnapshot = await getDocs(collection(db, "users") where('email' , '==', 'test@g.com'));
  // querySnapshot.forEach((doc) => {
  // console.log(doc.id, " => ", doc.data());

// });

  const q = query(collection(db, "users"), where('email' , '==', 'test@g.com'));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });



} 

abc();

  return (
    <>
      <StatusBar barStyle="default" />

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
            initialValues={{ userName: "", email: "", password: "" }}
            onSubmit={(values) => register(values)}
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
                      name="userName"
                      placeholder="User Name"
                      placeholderTextColor={"#fff"}
                      style={styles.input}
                      onChangeText={handleChange("userName")}
                      onBlur={handleBlur("userName")}
                      value={values.userName}
                      keyboardType="default"
                    />
                  </View>
                  <View style={{ alignItems: "center" }}>
                    {errors.userName && (
                      <Text style={{ fontSize: 12, color: "#fff" }}>
                        {errors.userName}
                      </Text>
                    )}
                  </View>
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
                  <View style={{ alignItems: "center" }}>
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
                        secureTextEntry={passwordVisibility}
                      />
                    </View>

                    <View style={{ flex: 0.2, alignItems: "center" }}>
                      <TouchableOpacity
                        onPress={() =>
                          setpasswordVisibility(!passwordVisibility)
                        }
                      >
                        {passwordVisibility ? (
                          <Ionicons name="eye-off" size={24} color="white" />
                        ) : (
                          <Ionicons name="eye" size={22} color="white" />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    {errors.password && (
                      <Text style={{ fontSize: 12, color: "#fff" }}>
                        {errors.password}
                      </Text>
                    )}
                  </View>
                  <View style={styles.inputView}>
                    <View style={{ flex: 0.8 }}>
                      <TextInput
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        placeholderTextColor={"#fff"}
                        style={styles.input}
                        onChangeText={handleChange("confirmPassword")}
                        onBlur={handleBlur("confirmPassword")}
                        value={values.confirmPassword}
                        secureTextEntry={confirmPasswordVisibility}
                      />
                    </View>

                    <View style={{ flex: 0.2, alignItems: "center" }}>
                      <TouchableOpacity
                        onPress={() =>
                          setconfirmPasswordVisibility(
                            !confirmPasswordVisibility
                          )
                        }
                      >
                        {confirmPasswordVisibility ? (
                          <Ionicons name="eye-off" size={24} color="white" />
                        ) : (
                          <Ionicons name="eye" size={22} color="white" />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ alignItems: "center" }}>
                    {errors.confirmPassword && (
                      <Text style={{ fontSize: 12, color: "#fff" }}>
                        {errors.confirmPassword}
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
                      Signup
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
          <Text >Already a member ? </Text>
          <TouchableOpacity onPress={() => navigation.push("Login")}>
            <Text style={{ fontWeight: "700", color: "#42b72a" }}>Login Now</Text>
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
    borderRadius: 10,
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
