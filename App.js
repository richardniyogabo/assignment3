import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Home from './screens/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from './context/app.context';
import { Provider } from 'react-redux';
import { store } from './redux/store';



const Stack = createNativeStackNavigator();

export default function App() {
  const [token, setToken] = React.useState(null);
  React.useEffect(() => {
    getToken();
  }, [token]);

  const getToken = async () => {
    const tkn = await AsyncStorage.getItem('token');
    setToken(tkn);
  }

  return (
    <Provider store={store}>
        <UserContext.Provider value={{ token, setToken }}>
          <NavigationContainer>
            <Stack.Navigator>
            {token ?
              <> 
                <Stack.Screen name="Home" component={Home} options={{
                  headerShown: false,
                }} />
              {/* <Stack.Screen name="Movies" component={Movies} options={{
                headerShown: true,
              }} /> */}
              </>
              :
              <Stack.Screen name="Login" component={Login} options={{
                headerShown: false,
              }} />
            }
            </Stack.Navigator>
          </NavigationContainer>
        </UserContext.Provider>
      </Provider>
  );
}
