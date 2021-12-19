import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import React from "react";
import { View, Text, ImageBackground, Image, StyleSheet, StatusBar, ScrollView } from "react-native";

export default function CustomDrawer(props) {
  return (
    <>
      <StatusBar backgroundColor={'#ECF1FA'} />
      <View style={{ flex: 1 }}>
        <ScrollView>
          <DrawerContentScrollView
            {...props}
            contentContainerStyle={{ backgroundColor: '#ECF1FA' }}
          >
            <ImageBackground style={{ backgroundColor: '#ECF1FA' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', height: 150 }}>
                <Image source={require("../../assets/splash.png")} style={{ height: 80, width: 80, marginBottom: 10, borderRadius: 100 }} />
                <View style={styles.info}>
                  <Text style={styles.username}>Sophie Garnier</Text>
                  <Text style={styles.city}>Luxembourg</Text>
                  <Text onPress={() => props.navigation.closeDrawer()} style={{ color: '#2A2AC0', fontFamily: 'LatoBold', fontSize: 16, position: 'relative', bottom: 50, left: 150 }}>X</Text>
                </View>
              </View>
            </ImageBackground>
            <View style={{ backgroundColor: '#FFFFFF', flex: 1, paddingTop: 10 }}>
              <DrawerItemList {...props} />
            </View>
          </DrawerContentScrollView>
        </ScrollView>
        <View>
          <Text>Our Custom Text</Text>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  info: {
    marginHorizontal: 10
  },
  username: {
    fontFamily: 'LatoBold',
    fontSize: 16,
    color: '#2A2AC0'
  },
  city: {
    color: '#181461',
    fontFamily: 'Lato',
    fontSize: 14
  }
})