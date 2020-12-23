import React from 'react';
//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';

import EditCart from './EditCart';

import contact from './contact';

import CastomerShipingAddress from './CastomerShipingAddress';
import SelectPaymentMethod from './SelectPaymentMethod';
import ProsidToPlaceOrder from './ProsidToPlaceOrder';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const ServiceStack = createStackNavigator();
const CastomerShipingAddressStack = createStackNavigator();
const SelectPaymentMethodStack = createStackNavigator();
const ProsidToPlaceOrderStack = createStackNavigator();
const EditCartByUserStack = createStackNavigator();

const Tab = createStackNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={DetailsStackScreen}
        options={{
          tabBarLabel: 'Updates',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ContactStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#694fad',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
      
      {/* <Tab.Screen
        name="Explore"
        component={CastomerShipingAddressStackScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-aperture" color={color} size={26} />
          ),
        }}
      />
       <Tab.Screen
        name="Explore"
        component={SelectPaymentMethodStackScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-aperture" color={color} size={26} />
          ),
        }}
      /> */}
       <Tab.Screen
        name="Explore"
        component={ProsidToPlaceOrderStackScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-aperture" color={color} size={26} />
          ),
        }}
      />

       {/* <Tab.Screen
        name="Explore"
        component={editCartItemsStackScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-aperture" color={color} size={26} />
          ),
        }}
      /> */}
    </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
<HomeStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen} 
        options={{
        title:'Overview',
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }}
        />
</HomeStack.Navigator>
);

const DetailsStackScreen = ({navigation}) => (
<DetailsStack.Navigator screenOptions={{
        headerStyle: {
        backgroundColor: '#1f65ff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <DetailsStack.Screen name="Details" component={DetailsScreen} options={{
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
</DetailsStack.Navigator>
);
const ContactStackScreen = ({ navigation }) => (
  <ServiceStack.Navigator>
    <ServiceStack.Screen name="Contact" component={contact}
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
  </ServiceStack.Navigator>
);

// const CastomerShipingAddressStackScreen = ({ navigation }) => (
//   <CastomerShipingAddressStack.Navigator>
//     <CastomerShipingAddressStack.Screen name="ShipingAddress" component={CastomerShipingAddress}
//       options={{
//         headerStyle: {
//           backgroundColor: '#009387',
//           // drawerLockMode: 'locked-closed',
//           //gestureEnabled: false,
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: 'bold'
//         },
//         headerTitleAlign: "centeroiouy",
//         headerLeft: () => (
//           <Icon.Button name="ios-menu" size={25}
//             backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
//         )
//       }}
//     />
//   </CastomerShipingAddressStack.Navigator>
// );

// const SelectPaymentMethodStackScreen = ({ navigation }) => (
//   <SelectPaymentMethodStack.Navigator>
//     <SelectPaymentMethodStack.Screen name="PaymentMethod" component={SelectPaymentMethod}
//       options={{
//         headerStyle: {
//           backgroundColor: '#009387',
//           // drawerLockMode: 'locked-closed',
//           //gestureEnabled: false,
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: 'bold'
//         },
//         headerTitleAlign: "centerwqwqq",
//         headerLeft: () => (
//           <Icon.Button name="ios-menu" size={25}
//             backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
//         )
//       }}
//     />
//   </SelectPaymentMethodStack.Navigator>
// );

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
// const editCartItemsStackScreen = ({ navigation }) => (
//   <EditCartByUserStack.Navigator>
//     <EditCartByUserStack.Screen name="EditCartItem" component={EditCart}
//       options={{
//         headerStyle: {
//           backgroundColor: '#009387',
//           // drawerLockMode: 'locked-closed',
//           //gestureEnabled: false,
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: 'bold'
//         },
//         headerTitleAlign: "centersas",
//         headerLeft: () => (
//           <Icon.Button name="ios-menu" size={25}
//             backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
//         )
//       }}
//     />
//   </EditCartByUserStack.Navigator>
// );
  