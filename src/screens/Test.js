




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
function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(false);
  const [visibility, setVisibility] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
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
    // fetchData();
    const willFocusSubscription = navigation.addListener("focus", () => {
      // fetchData();
      fadeIn();
    });

    return willFocusSubscription;
  }, []);

  return (
    <LinearGradient
      style={{
        flex: 1,
        margin: 0,
        padding: 0,
        justifyContent: "center",
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
          contentContainerStyle={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor:'red',
            paddingVertical: 20,
          }}
        >
          <View style={{ flex: 0.2, width: "90%" }}>
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

          <View style={{ flex: 0.2, width: "90%" }}>
            <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
              <Text style={{ fontSize: 16, color: "#fff" }}>Password</Text>
            </View>

            <View style={styles.inputView}>
              <View style={{ flex: 0.8 }}>
                <TextInput
                  secureTextEntry={visibility}
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

          <View style={{ flex: 0.2, width: "90%" }}>
            <TouchableOpacity
              // onPress={() => navigation.navigate("Signup")}
              // onPress={() => console.log('email test', email)}
              style={styles.button}
            >
              <Text
                style={{ padding: 10, fontSize: 20, color: "#fff" }}
                textAlign="center"
              >
                Login
              </Text>
            </TouchableOpacity>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <Text style={{ color: "#fff" }}>Not a member ? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text style={{ fontWeight: "700", color: "#fff" }}>
                  Signup Now
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#fff",
    // backgroundColor:'red',
    width: "100%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#0d2b55",
    marginTop: 40,
    borderRadius: 100,
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
});

export default Login;
