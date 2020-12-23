import React from 'react';
import  { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
//import { Fontisto } from '@expo/vector-icons';
import axios from 'axios';
import { Card, Title, Paragraph,Button } from 'react-native-paper';

//import Constants from 'expo-constants';
//import { FlatList } from 'react-native-gesture-handler';
class YourAccountFirstScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
          token: '',
          productArray: [],
          prodaddress:[]
        }
      }
      componentWillMount = () => {
        axios.defaults.baseURL = 'http://3.129.205.241/magento/index.php/rest/V1';
        axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post['Access-Control-Allow-Headers'] = '*';
        axios.post('/integration/customer/token', {
          "username": global.email,
          "password": global.password
        })
          .then((response) => {
             console.log(response);
            this.setState({ token: response.data })
            axios.get('http://3.129.205.241/magento/index.php/rest/default/V1/customers/me', {
              headers: {
                'Authorization': `Bearer ${response.data}`
              }
            })
              .then((res) => {
                this.setState({ productArray: res.data});
              })
              .catch((error) => {
                // console.error(error)
                // Alert.alert('product error!', JSON.stringify(error), [
                //   { text: 'Okay' }
                // ]);
              })

              axios.get('http://3.129.205.241/magento/index.php/rest/V1/customers/me/shippingAddress', {
                headers: {
                  'Authorization': `Bearer ${response.data}`
                }
              })
                .then((ras) => {
                  this.setState({ prodaddress: ras.data});
                })
                // alert(this.state.prodaddress)
                .catch((error) => {
                  // console.error(error)
                  // Alert.alert('product error!', JSON.stringify(error), [
                  //   { text: 'Okay' }
                  // ]);
                })
          }, (error) => {
            // Alert.alert('Invalid tocken!', JSON.stringify(error), [
            //   { text: 'Okay' }
            // ]);
            // console.log(error);
          });
      }
      
    render() {
        return (
         <>
<View style={styles.container}>
<Text style={styles.title}>My Account</Text>
<Card  >
            <Card.Content >
        <Text style={styles.paragraph} > {this.state.productArray.firstname} {this.state.productArray.lastname}</Text>
        <Text style={styles.paragraph}>Email Id: {this.state.productArray.email}</Text>
        <Text style={styles.paragraph}>Telephone: {this.state.prodaddress.telephone}</Text>
        {/* <Text style={styles.paragraph}>Telephone: {this.state.productArray.addresses.telephone}</Text>
        <Text>Street: {this.state.productArray.street}</Text> */}
</Card.Content>
</Card> 
<Text style={styles.title}>My Addresses</Text>
<Card  >
            <Card.Content >
        <Text style={styles.paragraph} >Name: {this.state.prodaddress.firstname} {this.state.prodaddress.lastname}</Text>
        <Text style={styles.paragraph}>street: {this.state.prodaddress.street}</Text>
        <Text style={styles.paragraph}>city: {this.state.prodaddress.city}</Text>
        <Text style={styles.paragraph}>postcode: {this.state.prodaddress.postcode}</Text>
        <Text style={styles.paragraph}>Telephone: {this.state.prodaddress.telephone}</Text>
        {/* <Text style={styles.paragraph}>Telephone: {this.state.productArray.addresses.telephone}</Text>
        <Text>Street: {this.state.productArray.street}</Text> */}
</Card.Content>
</Card>
</View>
</>

        )
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: Constants.statusBarHeight,
    //backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    color: 'green',
    textDecorationColor: 'yellow',
   textShadowColor: 'red',
    textShadowRadius: 1,
    fontWeight: 'bold',
    fontSize: 18,
    margin: 5,
  },
  wrapperHorizontal: {
    height: 54,
    justifyContent: 'center',
    color: 'black',
    marginBottom: 12,
  },
  itemStyleHorizontal: {
    marginRight: 10,
    height: 50,
    padding: 8,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 25,
    textAlign: 'center',
    justifyContent: 'center',
  },
  itemSelectedStyleHorizontal: {
    borderWidth: 2,
    //borderColor: '#DAA520',
  },
  platformContainer: {
    marginTop: 8,
    borderTopWidth: 1,
  },
  platformContainerTitle: {
    marginTop: 8,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 5,
  },
});

export default YourAccountFirstScreen;