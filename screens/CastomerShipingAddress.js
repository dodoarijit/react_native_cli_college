import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, TextInput, Alert, TouchableOpacity, FlatList, ActivityIndicator,Dimensions } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

import axios from 'axios';
class SelectPaymentMethod extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgArr: [],
      sku: '',
      qty: '',
      shipping_address: '',
      paymentCode: 'cashondelivery',
      // isLoading: true

    }
  }
  // updateInputVal = (val, prop) => {
  //   const state = this.state;
  //   state[prop] = val;
  //   this.setState(state);
  // }
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
        axios.get('http://3.129.205.241/magento/index.php/rest/V1/customers/me/shippingAddress', {
          headers: {
            'Authorization': `Bearer ${response.data}`
          }
        })
          .then((res) => {
            // alert(JSON.stringify(res.data))
            // this.setState({ product: res.data});
            // this.setState({ customer: res.data.customer});
            this.setState({ shipping_address: res.data });
          })
      })
  }
  placeOrder() {
    // alert('place order>>>>>')
    axios.defaults.baseURL = 'http://3.129.205.241/magento/index.php/rest/V1';
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.post['Access-Control-Allow-Headers'] = '*';
    axios.post('/integration/customer/token', {
      "username": global.email,
      "password": global.password
    })
      .then((response) => {

        // console.log("token" + response.data);
        const config = {
          headers: { Authorization: `Bearer ${response.data}` }
        };

        const bodyParameters = {
          "paymentMethod": {
            "method": this.state.paymentCode
          }

        };

        // alert("body param " +  JSON.stringify(bodyParameters))
        axios.post(
          'http://3.129.205.241/magento/index.php/rest/V1/carts/mine/payment-information',
          bodyParameters,
          config
        ).then((res) => {
          this.setState({
            isLoading: false,

          })
          // console.log(res.data)
          // alert('DATA>>>' + res.data)
          alert("Order placed. Order Id:" +JSON.stringify(res.data))
          global.productCount = 0;

          this.props.navigation.navigate('HomeScreen')
        })
          .catch((error) => {
            console.error(error)
            // Alert.alert('product error!', JSON.stringify(error), [
            //   { text: 'Okay' }
            // ]);
          })
      }, (error) => {
        // Alert.alert('Invalid User!', 'Username or password iii====' + (error), [
        //   { text: 'Okay' }
        // ]);
        console.log(error);
      });
  }

  render() {
    const { shippingInfo } = this.props.route.params
    // console.log("data>>>>>>>>" + JSON.stringify(shippingInfo))
    // alert("data>>>>>>>>" + JSON.stringify(shippingInfo))
    var radio_props = []
    var itemArray = shippingInfo.totals.items
    // alert('ITEMARRAY' + JSON.stringify(shippingInfo.total_segments))
    shippingInfo.payment_methods.map((val, index) => {
      radio_props.push({ label: val.title, value: val.code })
    })
    // alert('radio>>>'+JSON.stringify(radio_props))
    const { navigate } = this.props.navigation;
    // var initialVal = ''
    // if (radio_props.length>0 ){
    //   initialVal = radio_props[0].value
    //   this.setState({ paymentCode: initialVal })
    // }
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#0b774d" />
        </View>
      )

    }
    return (
      <>
        <View style={styles.mainout}>
          <Card style={styles.radio}>
            <Card.Content>
            <Text style={{padding: 10,fontSize:18,fontWeight:'bold',textAlign:'center'}}>Your Defult Shipping Address</Text>
              <Text style={{fontWeight:'bold',fontSize:16}}> {this.state.shipping_address.firstname} {this.state.shipping_address.lastname}</Text>
              <Text>Postcode: {this.state.shipping_address.postcode}</Text>
              <Text>City: {this.state.shipping_address.city}</Text>
              <Text>Street: {this.state.shipping_address.street}</Text>
            </Card.Content>
          </Card>
          <View style={styles.radio}>
            <Card>
              <Card.Content>
                <RadioForm
                  radio_props={radio_props}
                  initial={0}
                  onPress={(value) => { this.setState({ paymentCode: value }) }}
                />
              </Card.Content>
            </Card>
          </View>
          <FlatList
          style={{ paddingBottom: 5,marginBottom:10 }}
            data={itemArray}
            renderItem={({ item }) => (
              <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>

                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 3 }}>
                  <Card>
                    <Card.Content>
                      <Text> Base price   {item.base_price} </Text>
                      <Text>No of items  ×  {item.qty} </Text>
                    </Card.Content>
                  </Card>
                </View>
              </View>
            )}
            // numColumns={2}
            keyExtractor={(item, index) => index.toString()}
          />
          {/* <Button onPress={() => this.placeOrder()} style={styles.b2} mode="contained">

            Place Order
            
            </Button> */}


          <Animatable.View>
            <View style={styles.button}>
              <TouchableOpacity onPress={() => this.placeOrder()}>
                <LinearGradient
                  colors={['#30f7e8', '#01ab9d']}
                  style={styles.signIn}
                >
                  <Text style={styles.textSign} >   Place Order</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View>
      </>
    );
  }
}

const { width } = Dimensions.get("screen");
const paddhori = width * 0.28;

const styles = StyleSheet.create({
  mainout: {
    flex: 1,
  },
  radio: {
    backgroundColor: '#f7f8fb',
    margin: 10
  },
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    padding: 5,
  },
  imageThumbnail: {
    height: 400,
    width: 400
  },
  textinputstyle: {
    marginTop: 20,
    height: 40,
    borderColor: '#2140de',
    borderWidth: 1,
    backgroundColor: '#f7f8fb',
    paddingLeft: 15
  },
  Main: {
    height: 50,
    width: 50,
  },
  text1: {
    padding: 5,
    fontSize: 22,
  },
  text2: {
    paddingLeft: 20,
    paddingBottom: 10,
    fontSize: 18,
  },
  b1: {
    padding: 10,
    marginBottom: 5,
  },
  b2: {
    backgroundColor: '#358ef6',
    margin: 10

  },
  Qty: {
    position: 'relative',
    flexDirection: 'row',
  }
  ,
  button: {
    alignItems: 'center',
    marginBottom: 25
  },
  signIn: {
    //width: 150,
    //height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: paddhori,
    paddingVertical: 10,

  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    // paddingHorizontal:100,
    // paddingVertical:10,

  }
});
export default SelectPaymentMethod;