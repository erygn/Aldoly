import * as React from 'react';
import { Button, View, Text, FlatList, TextInput } from 'react-native';
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
      <Text>Home Screen</Text>
      <FlatList
        style={{backgroundColor: '#FF0000', width: '100%'}}
        data={inv}
        renderItem={({item, index}) => 
          <View style={{ backgroundColor: '#252525'}}>
            <Text style={{color: '#FFFFFF'}}>{item.type}</Text>
            <Text style={{color: '#FFFFFF'}}>{item.name}</Text>
            <Text style={{color: '#FFFFFF'}}>{item.price}</Text>
            <Button title="Remove" onPress={() => dispatch(removeInvoice(index))}/>
          </View>
        }/>
        <Text>{ total }</Text>
      <Button
        title="Go to Add"
        onPress={() => navigation.navigate('Add')}
      />
    </View>
  );
}

function AddScreen({ navigation }) {
  const dispatch = useDispatch()
  const [type, onChangeType] = React.useState("");
  const [name, onChangeName] = React.useState("");
  const [price, onChangePrice] = React.useState(null);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Add Screen</Text>
      <TextInput
        onChangeText={onChangeType}
        value={type}
        placeholder="Facture"
      />
      <TextInput
        onChangeText={onChangeName}
        value={name}
        placeholder="Nom"
      />
      <TextInput
        onChangeText={onChangePrice}
        value={price}
        placeholder="Prix"
        keyboardType="numeric"
      />
      <Button
        title="AddElement"
        onPress={() => {
          dispatch(addInvoice({type: type, name: name, price: price}));
          navigation.goBack()
        }}
      />
      <Button
        title="Go to Home"
        onPress={() => navigation.goBack()}
      />
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