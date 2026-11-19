import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';


export default function App() {
  const [localizacao, setLocalizacao] = useState(null);
  
  const [permissao, setPermissao] = useState(false);

  useEffect(() => {
  const requererAcesso = async () => {
    // A API paralisa o código e mostra a janelinha do Android!
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status === 'granted') {
      setPermissao(true);
     // Espere o satélite achar o celular (pode demorar segundos)
const posicaoNativa = await Location.getCurrentPositionAsync({});

// Jogue esse emaranhado de dados matemáticos na nossa Memória limpa
setLocalizacao(posicaoNativa);

    } else {
      console.log("Fomos bloqueados. Game over.");
    }
  };

  requererAcesso();
}, []);
  return (
    
    <View style={styles.container}>
      {permissao ?(
        <Text style={styles.successText}>Antenas livres! Podemos rastrear sua localização.</Text>
      ) : (
        <Text style={styles.errorText0}>Acesso bloqueado. O app não funcionará.</Text>
      )}
      
      {localizacao ? (
    <Text style={{color: 'red'}}>
        Lat: {localizacao.coords.latitude} | Lng: {localizacao.coords.longitude}
    </Text>
) : (
    <Text>Procurando Satélites...</Text>
)}
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successText: {
    color: 'green',
    fontSize: 18,
    
  },
  errorText0: {
    color: 'red',
    fontSize: 18,
    
  },
});
