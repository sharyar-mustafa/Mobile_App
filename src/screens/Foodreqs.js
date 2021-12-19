import React,{useState,useEffect} from "react";
import {Picker} from '@react-native-picker/picker';
import { Formik } from "formik";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Touchable,
  TouchableOpacity,
  Text,
  ScrollView,
  View,
  Alert
} from "react-native";
import Datepiker from "./Datepiker";
import {auth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
onAuthStateChanged,
signOut,
db,
doc,
setDoc,
getDoc,
getDocs,
collection,
query,
where,
onSnapshot,
addDoc,
orderBy
} from '../config/Firebase'



const UselessTextInput = ({branch,navigation}) => {
  // const [name, setName] = useState("");
  // const [fatherName, setFatherName] = useState("");
  // const [cnic, setCnic] = useState("");
  // const [member, setMember] = useState("");
  // const [income, setIncome] = useState("");

  // console.log("sssssssssssssssssssssssssssssssssssssssssss",navigation.navigate("Account"))
   

//   const sendrequest = async () =>{
// let dbRef = doc(db, "requests", serialno);
//   await setDoc(dbRef, {
//     SerialNo: serialno,
//     // Customerid: auth().currentUser.uid,
//     Name: name,
//     FatherName:   fatherName,
//     CnicNo : cnic,
//     // DOB: DOB,
//     noOffamily : member,
//     // helpCategory: helpCategory,
//     // profilePic:     profilePic,
//     // cnicFront: cnicFront,
//     // cnicBack: cnicBack,
//     monthlyIncome: income,
//     requestStatus: 'pending'
   
//   }).then(()=>{console.log("data gya")})
//   .catch(()=>console.log("Error agya "))
//   }

const [selectedLanguage, setSelectedLanguage] = useState();

  useEffect(()=>{
    let serialno =  Math.round(Math.random() * 1222312312312);  
  },[])

  const abc = async (values) => {
    
    // console.log("valuessssssssssssssssss",values)
    
    // let dbRef = doc(db, "requests", 3434343434);
    
    let dbRef = doc(db, "requests", values.CNICnumber);
    await setDoc(dbRef,  {
      name: values.userName,
      fathername: values.fatherName,
      CNICnumber:values.CNICnumber,
      Familymembers:values.Familymembers,
      Monthlyincome:values.Monthlyincome,
      branch:branch,
      status:'pending'

    })
    .then(() => {
      Alert.alert('Alert Title', 'Food Request Submitted', [
        // {
        //   text: 'Cancel',
        //   onPress: () => console.log('Cancel Pressed'),
        //   style: 'cancel',
        // },
        { text: 'OK', onPress: () =>  navigation.navigate('Account', {
          name: values.userName,
          fathername: values.fatherName,
          CNICnumber:values.CNICnumber,
          Familymembers:values.Familymembers,
          Monthlyincome:values.Monthlyincome,
          branch:branch,
          status:'pending'  })
          
         },
      ]);
    })
    .catch((e)=>console.log("Error ara h",e))
  }




  return (
    <Formik
    // validationSchema={loginValidationSchema}
    initialValues={{ userName: "",fatherName: "",CNICnumber:"",Familymembers:"",Monthlyincome:"", }}
    onSubmit={(values) => abc(values)}
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
      <Text>{branch}</Text>
          <View style={styles.inputView}>
            <TextInput
              name="userName"
              placeholder="User Name"
              // placeholderTextColor={"#fff"}
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
              name="fatherName"
              placeholder="Enter Father Name"
              // placeholderTextColor={"#fff"}
              style={styles.input}
              onChangeText={handleChange("fatherName")}
              onBlur={handleBlur("fatherName")}
              value={values.fatherName}
              // keyboardType="email-address"
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              name="CNICnumber"
              placeholder="Enter CNIC number"
              // placeholderTextColor={"#fff"}
              style={styles.input}
              onChangeText={handleChange("CNICnumber")}
              onBlur={handleBlur("CNICnumber")}
              value={values.CNICnumber}
              // keyboardType="email-address"
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              name="Familymembers"
              placeholder="Enter Family members"
              // placeholderTextColor={"#fff"}
              style={styles.input}
              onChangeText={handleChange("Familymembers")}
              onBlur={handleBlur("Familymembers")}
              value={values.Familymembers}
              // keyboardType="email-address"
            />
          </View>

           <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }>
            <Picker.Item label="Monthly Ration" value="Monthly Ration" />
            <Picker.Item label=" 1 times food" value=" 1 times food" />
            <Picker.Item label=" 2 times food" value=" 2 times food" />
            <Picker.Item label=" 3 times food" value=" 3 times food" />
          </Picker>
        

          <View style={styles.inputView}>
            <TextInput
              name="Monthlyincome"
              placeholder="Enter Monthly income"
              // placeholderTextColor={"#fff"}
              style={styles.input}
              onChangeText={handleChange("Monthlyincome")}
              onBlur={handleBlur("Monthlyincome")}
              value={values.Monthlyincome}
              // keyboardType="email-address"
            />
          </View>
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
              Send Food Request
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

  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#42b72a",
    padding: 10,
  },
  countContainer: {
    alignItems: "center",
    padding: 10,
  },
});

export default UselessTextInput;
