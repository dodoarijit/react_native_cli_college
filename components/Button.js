import React, { Component } from 'react';
import { StyleSheet, Text, Button, Alert, FlatList, TouchableOpacity, View, Image } from 'react-native';
import Card from '../../components/Card';
import CardSection from '../../components/CardSection';
import axios from 'axios';
class Button extends Component {
  constructor(props) {
    super(props)
    this.state = {
    
    }
  }
  // 
  render() {
    global.productCount = 0;
    // const { navigate } = this.props.navigation;
    return (
      <>
        
        <Text>
          order SUCCESS
          </Text>
         
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    fontSize: 37,
    textAlign: 'center'
  },
  card: {
    textAlign: 'center'
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 30,
  },
  imageThumbnail: {
    height: 50,
    width: 50,
  },
  textsecstyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  thumnellIMG: {
    margin: 5,
    height: 100,
    width: 80,
  },
  textinputstyle: {
    marginTop: 5,
   fontSize:20
  },
  b1: {
    margin: 10,
  },
  b2: {
    margin: 10,
    paddingLeft:5,
    paddingRight:5,
  },
  numberStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});
export default Button;
