import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions,Image } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = '';

import { FontAwesome } from '@expo/vector-icons';   
import { NavigationContainer } from '@react-navigation/native';

function Map({navigation}) {
  const [location, setLocation] = useState(null);
  const [currentLatitude , setCurrentLatitude] = useState("");
  const [currentLongitude , setCurrentLongitude] = useState("");

  const branches = [
    {
        "branch_name": "Aliabad",
        "latitude": 24.9200172,
        "longitude": 67.0612345
    },
    {
        "branch_name": "Numaish chowrangi",
        "latitude": 24.8732834,
        "longitude": 67.0337457
    },
    {
        "branch_name": "Saylani house phase 2",
        "latitude": 24.8278999,
        "longitude": 67.0688257
    },
    {
        "branch_name": "Touheed commercial",
        "latitude": 24.8073692,
        "longitude": 67.0357446
    },
    {
        "branch_name": "Sehar Commercial",
        "latitude": 24.8138924,
        "longitude": 67.0677652
    },
    {
        "branch_name": "Jinnah avenue",
        "latitude": 24.8949528,
        "longitude": 67.1767206
    },
    {
        "branch_name": "Johar chowrangi",
        "latitude": 24.9132328,
        "longitude": 67.1246195
    },
    {
        "branch_name": "Johar chowrangi 2",
        "latitude": 24.9100704,
        "longitude": 67.1208811
    },
    {
        "branch_name": "Hill park",
        "latitude": 24.8673515,
        "longitude": 67.0724497
    }
]







  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      Location.watchPositionAsync({
        timeInterval: 2000,
        distanceInterval: 1
      }, (position) => {
        setLocation(position)
      });
    })();
  }, []);

//  const  prevlat = 24.8607
//  let  prevLong = 67.0011;

//   let curLatitude = ;
//   let curLongitude = 74.3587;


  // function computeDistance( ) {
  //   const prevLatInRad = toRad(24.8607);
  //   const prevLongInRad = toRad(67.0011);
  //   const latInRad = toRad(31.5204);
  //   const longInRad = toRad(74.3587);
  
  //   return (
  //     // In kilometers
  //     6377.830272 *
  //     Math.acos(
  //       Math.sin(prevLatInRad) * Math.sin(latInRad) +
  //         Math.cos(prevLatInRad) * Math.cos(latInRad) * Math.cos(longInRad - prevLongInRad),
  //     )
  //   );
  // }
  
  function toRad(angle) {
    return (angle * Math.PI) / 180;
  }

  // console.log("************************************************",computeDistance);
  return (
    <View style={styles.container}>
      <MapView region={{
        latitude: location && location.coords.latitude,
        longitude: location && location.coords.longitude,
        latitudeDelta: 0.0000005,
        longitudeDelta: 0.0000005
      }} style={styles.map}>
        {location &&
          (<MapView.Marker       
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            }}
        

          >
              <Image 
                source={require('../../assets/marker.png')}
                style={{width: 20, height: 22}}
                resizeMode="contain"
              />
          </MapView.Marker>    
          )
}

{branches.map((v,i)=>
<MapView.Marker
 coordinate={{
  latitude: v.latitude,
  longitude: v.longitude
}}
onPress={() => navigation.navigate('Profile', {
  branch: v.branch_name,
  // otherParam: 'anything you want here',
})}
title={v.branch_name}
>
<Image 
  source={require('../../assets/marker.png')}
  style={{width: 20, height: 22}}
  resizeMode="contain"
/>
</MapView.Marker>
)
}
          

        {/* <MapViewDirections
          strokeColor="pink"
          strokeWidth={4}
          lineDashPattern={[1]}
          origin={{
            latitude: location && location.coords.latitude,
            longitude: location && location.coords.longitude,
          }}
          destination={{
            latitude: 24.9175697,
            longitude: 67.0970104
          }}
          // apikey={GOOGLE_MAPS_APIKEY}
          lineCap={"square"}
        /> */}
      </MapView>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});



export default Map;