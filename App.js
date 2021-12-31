import * as React from 'react';
import { Button, View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import store from './store'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { addInvoice, removeInvoice, emptyInvoice } from './slice/invoices';

function HomeScreen({ navigation }) {
  const inv = useSelector((state) => state.invoice.invoice)
  const total = useSelector((state) => state.invoice.totalInvoice)
  const dispatch = useDispatch()

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', height: 48, backgroundColor: '#FFFFFF', width: '100%'}}>
        <Text style={{ color: '#000000', fontSize: 20, fontFamily: 'PSBold' }}>ALDOLY</Text>
      </View>
      <View style={{ backgroundColor: '#252525', width: '100%', padding: 20}}>
        <Text style={{ color: '#FFFFFF', fontSize: 24, fontFamily: 'PSBold'}}>DÉPENSES</Text>
        <Text style={{ color: '#FFFFFF', fontFamily: 'PSRegular'}}>à prévoir ce mois</Text>
        <View style={{ alignItems: 'flex-end', width: '100%', marginTop: 10}}>
          <Text style={{ color: '#FFFFFF', fontSize: 52, fontFamily: 'PSBold'}}>{ total }€</Text>
        </View>
      </View>
      <FlatList
        style={{width: '100%'}}
        data={inv}
        renderItem={({item, index}) => 
          <View style={{ padding: 20, marginBottom: -20, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between'}}>
            <View>
              <Text style={{color: '#A0A0A0', fontFamily: 'PSRegular'}}>{item.type}</Text>
              <Text style={{color: '#000000', fontSize: 24, marginTop: 0, fontFamily: 'PSRegular' }}>{item.name}</Text>
            </View>
            
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: '#000000', fontSize: 28, marginRight: 10, fontFamily: 'PSBold'}}>{item.price}€</Text>
              <TouchableOpacity onPress={() => dispatch(removeInvoice(index))}>
                <Text style={{ color: '#FF0000', fontSize: 24, fontFamily: 'PSBold'}}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
        }/>
        <View style={{ marginBottom: 10, marginTop: 10}}>
          <TouchableOpacity style={{ backgroundColor: '#252525', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20}} onPress={() => navigation.navigate('Add')}>
            <Text style={{ color: '#FFFFFF', fontSize: 16, fontFamily: 'PSBold'}}>Ajouter</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}

function AddScreen({ navigation }) {
  const dispatch = useDispatch()
  const [type, onChangeType] = React.useState("");
  const [name, onChangeName] = React.useState("");
  const [price, onChangePrice] = React.useState(null);

  return (
    <View style={{ flex: 1, padding: 20}}>
      <View style={{ height: 48}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ fontFamily: 'PSBold', color: '#000000', fontSize: 20}}>Retour</Text>
        </TouchableOpacity>
      </View>
      <View style={{ borderColor: '#000000', marginBottom: 10, borderWidth: 1, justifyContent: 'center', alignItems: 'center', height: 80}}>
        <Text style={{ fontFamily: 'PSBold', fontSize: 22, color: '#000000'}}>Ajouter facture</Text>
      </View>
      <Text style={{ fontFamily: 'PSBold', marginBottom: 2, fontSize: 16, color: '#000000'}}>Nom de la facture</Text>
        <TextInput
          style={{ borderColor: '#000000', fontFamily: 'PSRegular', borderWidth: 1, paddingVertical: 5, paddingHorizontal: 15}}
          onChangeText={onChangeName}
          value={name}
          placeholder="Nom"
        />
        <Text style={{ fontFamily: 'PSRegular', marginTop: 5, fontSize: 12}}>Le nom de la facture vous permet de nommer vos factures pour mieux les retrouver</Text>
        
        <Text style={{ fontFamily: 'PSBold', marginBottom: 2, marginTop: 10, fontSize: 16, color: '#000000'}}>Prix de la facture</Text>
        <TextInput
            style={{ borderColor: '#000000', fontFamily: 'PSRegular', borderWidth: 1, paddingVertical: 5, paddingHorizontal: 15}}
            onChangeText={onChangePrice}
            value={price}
            placeholder="Prix"
            keyboardType="numeric"
          />
        <Text style={{ fontFamily: 'PSRegular', marginTop: 5, marginBottom: 10, fontSize: 12}}>Donner le prix de votre facture</Text>

        { name.length > 0 && price != null 
        ? <TouchableOpacity style={{ width: '100%', alignItems: 'center', backgroundColor: '#252525', paddingVertical: 10}} onPress={() => {
            dispatch(addInvoice({type: 'Facture', name: name, price: price}));
            navigation.goBack()
          }}>
            <Text style={{ color: '#FFFFFF', fontFamily: 'PSRegular'}}>Ajouter</Text>
          </TouchableOpacity>
        : <View style={{ width: '100%', alignItems: 'center', backgroundColor: '#A5A5A5', paddingVertical: 10}}><Text style={{ color: '#FFFFFF', fontFamily: 'PSRegular'}}>Ajouter</Text></View>}
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Add" component={AddScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;