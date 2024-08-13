import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, ImageBackground, ScrollView } from 'react-native';

const request = async (callback) => {
  const response = await fetch('https://swapi.dev/api/starships/');
  const parsed = await response.json();
  callback(parsed.results);
};

export default function App() {

  // useState Verificar o Estado do Componente  
  const [registros, setRegistros] = useState([]);


  // trabalha em conjunto com o Use state renderizando algo especifico
  useEffect(() => {
    request(setRegistros);
  }, []);


  const image = { uri: 'https://wallpapers.com/images/hd/star-wars-space-background-1595-x-1162-e178irn8bim5vake.jpg' };
  return (

    <View style={styles.container}>
        <View style={styles.viewText}>
          <Text style={styles.text}>Usando API do Star Wars</Text>
        </View>

        <ScrollView style={styles.scroll}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <FlatList
            data={registros}
            keyExtractor={(item) => item.name.toString()}
            renderItem={({ item }) =>
              <View style={styles.dados}>
                <Text style={styles.dadosText}>  {item.name}</Text>
                <Text style={styles.dadosText}>{item.model}</Text>
                <Text style={styles.dadosText}>{item.manufacturer}</Text>
              </View>
            }
          />

          <StatusBar style="auto" />
      </ImageBackground>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:"auto",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  scroll:{
    width:'100%',
  },

  image: {
    width:'100%',
    paddingBottom:40,
    paddingTop:40,
    zIndex:-1,
  },

  dados: {
    top: -10,
    margin: 0,
    height: 100,
    bottom: '20%',
    borderRadius:50,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginTop: 10,
    padding: 10,
    justifyContent: 'center',
    textAlign: 'center',

  },

  dadosText: {
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
    color:'rgb(255,255,255)',
    textShadowColor: 'black 0.1em 0.1em 0.2em',
  },

  text: {
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize:18
  },

  viewText: {
    backgroundColor: 'rgba(0,0,0,5)',
    textAlign: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 60,
    top: 23,
    zIndex: 1,
  }
});
