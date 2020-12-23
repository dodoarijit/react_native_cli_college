/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useEffect} from 'react';
import {View, ActivityIndicator, Text} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';

import {DrawerContent} from './screens/DrawerContent';
//import MainTabScreen from './screens/MainTabScreen';
//import MainStackScreen from './components/MainStackScreen';
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import EditCart from './screens/EditCart';
import contact from './screens/contact';
import CastomerShipingAddress from './screens/CastomerShipingAddress';
import SelectPaymentMethod from './screens/SelectPaymentMethod';
import ProsidToPlaceOrder from './screens/ProsidToPlaceOrder';

import BookmarkScreen from './screens/BookmarkScreen';

import catagoryDetails from './screens/catagoryDetails';
import perticulerCatagoryProduct from './screens/perticulerCatagoryProduct';
import perticulerCatagoryIndivijualProduct from './screens/perticulerCatagoryIndivijualProduct';
//import SupportScreen from './screens/SupportScreen';

import SettingsScreen from './screens/SettingsScreen';
import SupportScreen from './screens/SupportScreen';

import {AuthContext} from './components/context';
import RootStackScreen from './screens/RootStackScreen';
import AsyncStorage from '@react-native-community/async-storage';

const Drawer = createDrawerNavigator();
const Shop = createStackNavigator();

function HOMEDROWER({navigation}) {
  return (
    <>
      <Shop.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#00a799',
          },
          headerTintColor: '#ffffff',
          headerTitle: 'E-Shopping',

          //  headerLeft: ()=> < NavBarImage/>,
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#00a799"
              color="#ffffff"
              onPress={() => navigation.openDrawer()}
            />
          ),
          headerRight: () => (
            <Icon.Button
              name="ios-cart"
              size={25}
              backgroundColor="#00a799"
              color="#ffffff"
              onPress={() => navigation.navigate('ProsidToPlaceOrder')}>
              <Text>{global.productCount}</Text>
            </Icon.Button>
          ),
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: 'bold',
          },
        }}>
        {/* <Shop.Screen name="Shop By Catagory" component={MainStackScreen} /> */}
        <Shop.Screen name="HomeScreen" component={HomeScreen} />
        <Shop.Screen name="DetailsScreen" component={DetailsScreen} />
        <Shop.Screen name="contact" component={contact} />
        <Shop.Screen
          name="CastomerShipingAddress"
          component={CastomerShipingAddress}
        />
        <Shop.Screen
          name="SelectPaymentMethod"
          component={SelectPaymentMethod}
        />
        <Shop.Screen name="ProsidToPlaceOrder" component={ProsidToPlaceOrder} />
        <Shop.Screen name="EditCart" component={EditCart} />
        <Shop.Screen name="catagoryDetails" component={catagoryDetails} />
        <Shop.Screen
          name="perticulerCatagoryProduct"
          component={perticulerCatagoryProduct}
        />
        <Shop.Screen
          name="perticulerCatagoryIndivijualProduct"
          component={perticulerCatagoryIndivijualProduct}
        />
        <Shop.Screen name="BookmarkScreen" component={BookmarkScreen} />
      </Shop.Navigator>
    </>
  );
}
function SHOPBYCATAGORY({navigation}) {
  return (
    <Shop.Navigator
      initialRouteName="catagoryDetails"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#00a799',
        },
        headerTintColor: '#ffffff',
        headerTitle: 'E-Shopping',

        //  headerLeft: ()=> < NavBarImage/>,
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#00a799"
            color="#ffffff"
            onPress={() => navigation.openDrawer()}
          />
        ),
        headerRight: () => (
          <Icon.Button
            name="ios-cart"
            size={25}
            backgroundColor="#00a799"
            color="#ffffff"
            onPress={() => navigation.navigate('ProsidToPlaceOrder')}>
            <Text>{global.productCount}</Text>
          </Icon.Button>
        ),
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 30,
          fontWeight: 'bold',
        },
      }}>
      {/* <Shop.Screen name="HomeStackScreen" component={HomeStackScreen} /> */}
      <Shop.Screen name="catagoryDetails" component={catagoryDetails} />
      <Shop.Screen
        name="perticulerCatagoryProduct"
        component={perticulerCatagoryProduct}
      />
      <Shop.Screen
        name="perticulerCatagoryIndivijualProduct"
        component={perticulerCatagoryIndivijualProduct}
      />
    </Shop.Navigator>
  );
}
function PROFILE({navigation}) {
  return (
    <Shop.Navigator
      initialRouteName="BookmarkScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#00a799',
        },
        headerTintColor: '#ffffff',
        headerTitle: 'E-Shopping',

        //  headerLeft: ()=> < NavBarImage/>,
        headerLeft: () => (
          <Icon.Button
            name="ios-menu"
            size={25}
            backgroundColor="#00a799"
            color="#ffffff"
            onPress={() => navigation.openDrawer()}
          />
        ),
        headerRight: () => (
          <Icon.Button
            name="ios-cart"
            size={25}
            backgroundColor="#00a799"
            color="#ffffff"
            onPress={() => navigation.navigate('ProsidToPlaceOrder')}>
            <Text>{global.productCount}</Text>
          </Icon.Button>
        ),
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 30,
          fontWeight: 'bold',
        },
      }}>
      <Shop.Screen name="BookmarkScreen" component={BookmarkScreen} />
    </Shop.Navigator>
  );
}
const App = () => {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333',
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff',
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async () => {
        const userToken = global.userToken;
        const userName = global.email;
        try {
          await AsyncStorage.setItem('userToken', global.userToken);
        } catch (e) {
          console.log(e);
        }
        // console.log('user token: ', userToken);
        dispatch({type: 'LOGIN', id: global.email, token: global.userToken});
      },
      signOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: () => {
        // setUserToken('fgkj');
        // setIsLoading(false);
      },
      toggleTheme: () => {
        setIsDarkTheme(isDarkTheme => !isDarkTheme);
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);
  ///////////
  // useEffect(() => {
  //   axios.defaults.baseURL = 'http://3.129.205.241/magento/index.php/rest/V1';
  //   axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
  //   axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  //   axios.defaults.headers.post['Access-Control-Allow-Headers'] = '*';
  //   axios.post('/integration/customer/token', {
  //     "username": global.email,
  //     "password": global.password
  //   })
  //     .then((response) => {
  //       // console.log("token" + response.data);
  //       // alert('token success>>>'+response.data)
  //       const config = {
  //         headers: { Authorization: `Bearer ${response.data}` }
  //       };
  //       axios.get(
  //         'http://3.129.205.241/magento/index.php/rest/V1/carts/mine/',
  //         config
  //       ).then((res) => {
  //         // alert('token successssssssss>>>'+JSON.stringify (res.data.items_count))
  //         // console.log(res.data)
  //         global.productCount = res.data.items_count;
  //         // this.props.navigation.navigate('booking')
  //       })
  //         .catch((error) => {
  //           // console.error(error)
  //           Alert.alert('product error!', JSON.stringify(error), [
  //             { text: 'Okay' }
  //           ]);
  //         })
  //     }, (error) => {
  //       Alert.alert('Invalid User!', 'Username or password iii====' + (error), [
  //         { text: 'Okay' }
  //       ]);
  //       // console.log(error);

  //   }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  //global.productCount = 0;

  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          {loginState.userToken !== null ? (
            <Drawer.Navigator
              drawerContent={props => <DrawerContent {...props} />}>
              <Drawer.Screen name="HomeDrawer" component={HOMEDROWER} />
              <Drawer.Screen
                name="Shop by catagory"
                component={SHOPBYCATAGORY}
              />
              <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />

              <Drawer.Screen name="SettingsProfile" component={PROFILE} />
              <Drawer.Screen name="SupportScreen" component={SupportScreen} />
            </Drawer.Navigator>
          ) : (
            <RootStackScreen />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

export default App;
