import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';


export default function App() {
  const [permissao, setPermissao] = useState(false);

  useEffect(() => {
  const requererAcesso = async () => {
    // A API paralisa o código e mostra a janelinha do Android!
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status === 'granted') {
      setPermissao(true);
      console.log("Uhul! O usuário deixou rastrear!");
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
