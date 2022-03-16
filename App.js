import * as Location from 'expo-location'
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react'
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const API_KEY = 'e3d67d18387c6a74bedb076ecbb5ace4'

export default function App() {
  const [city, setCity] = useState("Loading...")
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true)
  const getWeather = async() => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false)
    }

    const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false })
    setCity(location[0].city)

    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}`)
    console.log(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}`)
    const json = await response.json()
    console.log(json)
  }
  useEffect(() => {
    getWeather();
  }, [])

  return (
    <View style={style.container}>
      <StatusBar style='dark' />
      <View style={style.city}>
        <Text style={style.cityName}>{city}</Text>
      </View>
      <View style={style.weather}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          <View style={style.day}>
            <Text style={style.temp}>27</Text>
            <Text style={style.description}>Sunny</Text>
          </View>
          <View style={style.day}>
            <Text style={style.temp}>27</Text>
            <Text style={style.description}>Sunny</Text>
          </View>
          <View style={style.day}>
            <Text style={style.temp}>27</Text>
            <Text style={style.description}>Sunny</Text>
          </View>
          <View style={style.day}>
            <Text style={style.temp}>27</Text>
            <Text style={style.description}>Sunny</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato'
  },
  city: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cityName: {
    fontSize: 68,
    fontWeight: '600'
  },
  weather: {
    flex: 3,
    backgroundColor: 'blue'
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
  temp: {
    marginTop: 50,
    fontSize: 178
  },
  description: {
    marginTop: -30,
    fontSize: 60
  }
})