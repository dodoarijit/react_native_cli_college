import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
//import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
//import{View, Text,StyleSheet} from 'react-native';



//import home from '../src/screens/home';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import EditCart from '../screens//EditCart';


import { Button } from 'react-native-paper';
import contact from '../screens/contact';
import CastomerShipingAddress from '../screens/CastomerShipingAddress';
import SelectPaymentMethod from '../screens/SelectPaymentMethod';
import ProsidToPlaceOrder from '../screens/ProsidToPlaceOrder';

const HomeStack = createStackNavigator();
const BookingStack = createStackNavigator();
const ServiceStack = createStackNavigator();
const CastomerShipingAddressStack = createStackNavigator();
const SelectPaymentMethodStack = createStackNavigator();
const ProsidToPlaceOrderStack = createStackNavigator();
const EditCartByUserStack = createStackNavigator();


const STACK = createStackNavigator();

const MainStackScreen = () => (
  <STACK.Navigator

  >
    <STACK.Screen
      name="abhijit"
      component={ProductStackSc}
      options={{
        tabBarColor: '#ff3679',
        tabBarLabel: 'Product',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-notifications" color={color} size={26} />
        ),
      }}
    />
    <STACK.Screen
      name="saha"
      component={BookingStackScreen}
      options={{
        tabBarLabel: 'Booking',
        tabBarColor: '#365eff',

        tabBarIcon: ({ color }) => (
          <Icon name="ios-service" color={color} size={26} />
        ),
      }}
    />

    <STACK.Screen
      name="shipingaddress"
      component={ContactStackScreen}

      options={{
        tabBarColor: '#38f25d',
        //drawerLockMode: 'locked-closed',
        // gestureEnabled: false,
        tabBarLabel: 'Contact',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />


    <STACK.Screen
      name="paymentmethod"
      component={CastomerShipingAddressStackScreen}

      options={{
        tabBarColor: '#38f25d',
        //drawerLockMode: 'locked-closed',
        // gestureEnabled: false,
        tabBarLabel: 'Conta',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />


    <STACK.Screen
      name="placeorder"
      component={SelectPaymentMethodStackScreen}

      options={{
        tabBarColor: '#38f25d',
        //drawerLockMode: 'locked-closed',
        // gestureEnabled: false,
        tabBarLabel: 'Contac',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />


    <STACK.Screen
      name="procid"
      component={ProsidToPlaceOrderStackScreen}

      options={{
        tabBarColor: '#38f25d',
        //drawerLockMode: 'locked-closed',
        // gestureEnabled: false,
        tabBarLabel: 'ContzZz',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
     <STACK.Screen
      name="CartEdit"
      component={editCartItemsStackScreen}

      options={{
        tabBarColor: '#38f25d',
        //drawerLockMode: 'locked-closed',
        // gestureEnabled: false,
        tabBarLabel: 'ContzZz',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
  </STACK.Navigator>

);

export default MainStackScreen;

const ProductStackSc = ({ navigation }) => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Product" component={HomeScreen}
      options={{

        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        headerTitleAlign: "center",
        headerLeft: () => (
          <Icon.Button name="ios-menu" size={25}
            backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
      }}

    />
  </HomeStack.Navigator>
);
const BookingStackScreen = ({ navigation }) => (
  <ServiceStack.Navigator>
    <ServiceStack.Screen name="Booking" component={DetailsScreen}
      options={{

        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        headerTitleAlign: "center",
        headerLeft: () => (
          <Icon.Button name="ios-menu" size={25}
            backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
        ),

      }}
    />
  </ServiceStack.Navigator>
);
const ContactStackScreen = ({ navigation }) => (
  <BookingStack.Navigator>
    <BookingStack.Screen name="Contact" component={contact}
      options={{
        headerStyle: {
          backgroundColor: '#009387',
          // drawerLockMode: 'locked-closed',
          //gestureEnabled: false,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        headerTitleAlign: "center",
        headerLeft: () => (
          <Icon.Button name="ios-menu" size={25}
            backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
      }}
    />
  </BookingStack.Navigator>
);

const CastomerShipingAddressStackScreen = ({ navigation }) => (
  <CastomerShipingAddressStack.Navigator>
    <CastomerShipingAddressStack.Screen name="ShipingAddress" component={CastomerShipingAddress}
      options={{
        headerStyle: {
          backgroundColor: '#009387',
          // drawerLockMode: 'locked-closed',
          //gestureEnabled: false,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        headerTitleAlign: "centeroiouy",
        headerLeft: () => (
          <Icon.Button name="ios-menu" size={25}
            backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
      }}
    />
  </CastomerShipingAddressStack.Navigator>
);

const SelectPaymentMethodStackScreen = ({ navigation }) => (
  <SelectPaymentMethodStack.Navigator>
    <SelectPaymentMethodStack.Screen name="PaymentMethod" component={SelectPaymentMethod}
      options={{
        headerStyle: {
          backgroundColor: '#009387',
          // drawerLockMode: 'locked-closed',
          //gestureEnabled: false,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        headerTitleAlign: "centerwqwqq",
        headerLeft: () => (
          <Icon.Button name="ios-menu" size={25}
            backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
      }}
    />
  </SelectPaymentMethodStack.Navigator>
);

const ProsidToPlaceOrderStackScreen = ({ navigation }) => (
  <ProsidToPlaceOrderStack.Navigator>
    <ProsidToPlaceOrderStack.Screen name="ToPlaceOrder" component={ProsidToPlaceOrder}
      options={{
        headerStyle: {
          backgroundColor: '#009387',
          // drawerLockMode: 'locked-closed',
          //gestureEnabled: false,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        headerTitleAlign: "centersas",
        headerLeft: () => (
          <Icon.Button name="ios-menu" size={25}
            backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
      }}
    />
  </ProsidToPlaceOrderStack.Navigator>
);
const editCartItemsStackScreen = ({ navigation }) => (
  <EditCartByUserStack.Navigator>
    <EditCartByUserStack.Screen name="EditCartItem" component={EditCart}
      options={{
        headerStyle: {
          backgroundColor: '#009387',
          // drawerLockMode: 'locked-closed',
          //gestureEnabled: false,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        headerTitleAlign: "centersas",
        headerLeft: () => (
          <Icon.Button name="ios-menu" size={25}
            backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
      }}
    />
  </EditCartByUserStack.Navigator>
);