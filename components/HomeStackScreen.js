import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
//import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

//import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
//import { NavigationContainer  } from '@react-navigation/native';
//import{View, Text,StyleSheet} from 'react-native';



// import home from '../src/screens/home';
// import HomeAllProduct from '../src/screens/HomeAllProduct';
// import HomeSpacificProductDetails from '../src/screens/HomeSpacificProductDetails';
// import ServiceScreen from '../src/screens/ServiceScreen';
// import BookingScreen from '../src/screens/BookingScreen';

// import { Button } from 'react-native-paper';
import catagoryDetails from '../src/screens/ShopByCatagDrower/catagoryDetails';
import perticulerCatagoryProduct from '../src/screens/ShopByCatagDrower/perticulerCatagoryProduct';
import perticulerCatagoryIndivijualProduct from '../src/screens/ShopByCatagDrower/perticulerCatagoryIndivijualProduct';

const CatagoryDetailsStack = createStackNavigator();
const PerticulerCatagoryProductDetailStack = createStackNavigator();
const PerticulerCatagoryIndivijualProductDetailStack = createStackNavigator();

//const ServiceStack = createStackNavigator();
const HomeSTACK = createStackNavigator();

const HomeStackScreen =() => (
    <HomeSTACK.Navigator
     
    >
      <HomeSTACK.Screen
        name="abhijit"
        component={CatagoryDetailsStackSc}
        options={{
            tabBarColor:'#ff3679',
          tabBarLabel: 'Product',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
        }}
      />
      <HomeSTACK.Screen
        name="saha"
        component={PerticulerCatagoryProductDetailSc}
        options={{
          tabBarLabel: 'Booking',
          tabBarColor:'#365eff',

          tabBarIcon: ({ color }) => (
            <Icon name="ios-service" color={color} size={26} />
          ),
        }}
      />
       <HomeSTACK.Screen
        name="sah"
        component={PerticulerCatagoryIndivijualProductDetailSc}
        options={{
          tabBarLabel: 'Bookin',
          tabBarColor:'#365eff',

          tabBarIcon: ({ color }) => (
            <Icon name="ios-service" color={color} size={26} />
          ),
        }}
      />
     
        
    </HomeSTACK.Navigator>
);

export default HomeStackScreen;

const CatagoryDetailsStackSc = ({navigation})=>(
    <CatagoryDetailsStack.Navigator>
    <CatagoryDetailsStack.Screen name="Product" component={catagoryDetails} 
    options={{
  
      headerStyle:{
      backgroundColor:'#009387',
      },
      headerTintColor:'#fff',
      headerTitleStyle:{
       fontWeight:'bold'
      },
      headerTitleAlign:"center",
      headerLeft: ()=> (
        <Icon.Button name="ios-menu" size={25}
        backgroundColor="#009387" onPress={()=> navigation.openDrawer()}></Icon.Button>
      )
    }}
  
    />
   </CatagoryDetailsStack.Navigator>
  );
  const PerticulerCatagoryProductDetailSc = ({navigation})=>(
    <PerticulerCatagoryProductDetailStack.Navigator>
    <PerticulerCatagoryProductDetailStack.Screen name="Booking" component={perticulerCatagoryProduct} 
    options={{
    
      headerStyle:{
      backgroundColor:'#009387',
      },
      headerTintColor:'#fff',
      headerTitleStyle:{
       fontWeight:'bold'
      },
      headerTitleAlign:"center",
      headerLeft:()=>(
        <Icon.Button name="ios-menu" size={25}
        backgroundColor="#009387" onPress={()=> navigation.openDrawer()}></Icon.Button>
      ),
      
    }}
    />
  </PerticulerCatagoryProductDetailStack.Navigator>
  );
  const PerticulerCatagoryIndivijualProductDetailSc = ({navigation})=>(
    <PerticulerCatagoryIndivijualProductDetailStack.Navigator>
    <PerticulerCatagoryIndivijualProductDetailStack.Screen name="Bookin" component={perticulerCatagoryIndivijualProduct} 
    options={{
    
      headerStyle:{
      backgroundColor:'#009387',
      },
      headerTintColor:'#fff',
      headerTitleStyle:{
       fontWeight:'bold'
      },
      headerTitleAlign:"center",
      headerLeft:()=>(
        <Icon.Button name="ios-menu" size={25}
        backgroundColor="#009387" onPress={()=> navigation.openDrawer()}></Icon.Button>
      ),
      
    }}
    />
  </PerticulerCatagoryIndivijualProductDetailStack.Navigator>
  );
 
 