import React from 'react';
import { SafeAreaView, StyleSheet, TextInput,Text ,View} from 'react-native';
import Datepiker from "./Datepiker"

const UselessTextInput = (props) => {
  const [text, onChangeText] = React.useState('');
  const [text2, onChangeText2] = React.useState('');
  const [number, onChangeNumber] = React.useState(null);

  let values = props.route.params;
  
  console.log(values)






return (
  <View style={styles.main}>
     <View style={styles.divmain}>

      <View style={styles.card}>
         <Text>KHANA SAB K LIYA</Text>
       </View>
       <Text>Name: {values.name}</Text>
       <Text>Father Name: {values.fathername}</Text>
       <Text>CNIC No: {values.CNICnumber}</Text>
       <Text>Family Member: {values.Familymembers}</Text>
       <Text>Status: {values.status} </Text>
       <Text>Branch: {values.branch}</Text>

     </View>
     </View>
 
 );
};

const styles = StyleSheet.create({
 main:{
  marginTop:"20%",
   alignItems:"center",

 },
 divmain:{
   justifyContent:"center",

   borderWidth:2,
   width:"50%"
 },
 card:{
   backgroundColor:"#96c839",
   alignItems:"center",
   justifyContent:"center",
   borderWidth:2
 }
});

export default UselessTextInput;
