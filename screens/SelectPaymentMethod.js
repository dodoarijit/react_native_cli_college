import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, Image, ScrollView, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
// import { CheckBox } from 'react-native';
//import { Button } from 'react-native-paper';
import CheckBox from 'react-native-check-box'


//import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';

import { TextInput } from 'react-native-paper';

import axios from 'axios';
//import SearchBar from '../../components/SearchBar'
//import { Card,Checkbox } from 'react-native-paper';
export default class SelectPaymentMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      LastName: '',
      streetAddress: '',
      city: '',
      stateProvince: '',
      zipCode: '',
      country: '',
      mobileNo: '',
      paymentObject: '',
      token: '',
      product: '',
      customer: '',
      customerAddr: '',
      shipping_address: '',
      billing_address: '',
      productArray: [],
      checked: 'false',
      toggleCheckBox:'',
      isLoading: true

    }
  }

  onScreenLoad = () => {
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
        // console.log(response);
        this.setState({ token: response.data })
        axios.get('http://3.129.205.241/magento/index.php/rest/V1/carts/mine/', {
          headers: {
            'Authorization': `Bearer ${response.data}`
          }
        })
          .then((res) => {
            // alert(JSON.stringify(res.data.items))
            // this.setState({ product: res.data});
            // this.setState({ customer: res.data.customer});
            this.setState({ customerAddr: res.data.customer.addresses });
            this.setState({ productArray: res.data.items });
            this.setState({
              isLoading: false,

            })
          })
        axios.get('http://3.129.205.241/magento/index.php/rest/V1/customers/me/billingAddress', {
          headers: {
            'Authorization': `Bearer ${response.data}`
          }
        })
          .then((res) => {
            // this.setState({ product: res.data});
            // this.setState({ customer: res.data.customer});
            this.setState({ billing_address: res.data });
          })
        axios.get('http://3.129.205.241/magento/index.php/rest/V1/customers/me/shippingAddress', {
          headers: {
            'Authorization': `Bearer ${response.data}`
          }
        })
          .then((res) => {
            // this.setState({ product: res.data});
            // this.setState({ customer: res.data.customer});
            this.setState({ shipping_address: res.data });
          })
      }, (error) => {
        // Alert.alert('Invalid tocken!', JSON.stringify(error), [
        //   { text: 'Okay' }
        // ]);
        // console.log(error);
      });
  }
  setToggleCheckBox=(newValue)=>{
    alert(newValue)

  }

  prosidAddress = () => {
    if (this.state.firstName === '') {
      Alert.alert('firstname mandetory')
    } else if (this.state.LastName === '') {
      Alert.alert('lastname  mandetory')
    } else if (this.state.streetAddress === '') {
      Alert.alert('* streetAddress mandetory*')
    } else if (this.state.city === '') {
      Alert.alert('city mandetory')
    } else if (this.state.zipCode === '') {
      Alert.alert('zip Code name mandetory')
    } else if (this.state.mobileNo === '') {
      Alert.alert('mobile No mandetory')
    } else
      this.setState({
        isLoading: true,
      })

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
        // Alert.alert('TOKENNNNNN address success')

        const config = {
          headers: { Authorization: `Bearer ${response.data}` }
        };
        const bodyParameters =
        {
          "addressInformation": {
            "shipping_address": {
              "region": "New York",
              "region_id": 43,
              "region_code": "NY",
              "country_id": "US",
              "street": [
                this.state.streetAddress
              ],
              "postcode": this.state.zipCode,
              "city": this.state.city,
              "firstname": this.state.firstName,
              "lastname": this.state.LastName,
              "email": "jdoe@example.com",
              "telephone": this.state.mobileNo,
              "save_in_address_book": "1"
            },
            "billing_address": {
              "region": "New York",
              "region_id": 43,
              "region_code": "NY",
              "country_id": "US",
              "street": [
                this.state.streetAddress
              ],
              "postcode": this.state.zipCode,
              "city": this.state.city,
              "firstname": this.state.firstName,
              "lastname": this.state.LastName,
              "email": "jdoe@example.com",
              "telephone": this.state.mobileNo,
              "save_in_address_book": "1"
            },
            "shipping_carrier_code": "freeshipping",
            "shipping_method_code": "freeshipping"
          }
        };

        // Alert.alert('config!', JSON.stringify(config), [
        //   { text: 'Okay' }
        // ]);
        // axios.get(
        //   'http://3.129.205.241/magento/index.php/rest/V1/carts/mine',
        axios.post(
          'http://3.129.205.241/magento/index.php/rest/V1/carts/mine/shipping-information',
          bodyParameters,
          config


        ).then((res) => {
          // console.log('>>>>>>>>RES DATA address success' + JSON.stringify(res.data))
          // console.log(res.data)
          // alert('>>>>>>>>RES DATA address success' + JSON.stringify(res.data))

          this.props.navigation.navigate('CastomerShipingAddress', { shippingInfo: res.data })
        })
          .catch((error) => {
            // console.error(error)
            // Alert.alert('address error!', JSON.stringify(error), [
            //   { text: 'Okay' }
            // ]);
          })
      }, (error) => {
        // Alert.alert('Invalid User!', 'Username or password iii====' + (error), [
        //   { text: 'Okay' }
        // ]);
        // console.log(error);
      });
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  render() {
    const { navigate } = this.props.navigation;
    var radio_props = [
      { label: 'Defult Address', value: 0 },
      { label: 'Add new address', value: 1 }
    ];
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#0b774d" />
        </View>
      )

    }
    // alert(JSON.stringify(this.state.billing_address))
    // alert(JSON.stringify(this.state.shipping_address))
    return (
      <>
        {/* <Checkbox
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => {
        this.setChecked(!checked);
      }}
    /> */}
        <ScrollView>
          <FlatList
            data={this.state.customerAddr}
            //           renderItem={({ item }) => (
            //             <View style={styles.mainout}>
            //             <View style={styles.mainout}>
            //               <Card style={styles.radio}>
            //             <Card.Content>
            //         <Text> {this.state.shipping_address.firstname} {this.state.shipping_address.lastname}</Text>
            //         <Text>Postcode: {this.state.shipping_address.postcode}</Text>
            //         <Text>City: {this.state.shipping_address.city}</Text>
            //         <Text>Street: {this.state.shipping_address.street}</Text>
            // </Card.Content>
            // </Card>
            //  <Button mode="contained" onPress={() => navigate("SelectPaymentMethod")}       style={styles.buttonstyle}>


            //  Change or Add address


            //      </Button>
            //               </View>
            //               </View>
            //           )}
            //Setting the number of column
            numColumns={1}
          // keyExtractor={(item, index) => index.toString()}
          />
          {/* <Text style={styles.text} >Shipping Address</Text> */}
          <View style={styles.text}>
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: 5 }}>

              <Text style={{ fontSize: 20, fontWeight: 'bold', alignItems: 'center', justifyContent: 'center' }}> NEW ADDRESS</Text>
            </View >


            <TextInput style={styles.textinputstyle} label="ENTER FIRST NAME"
              placeholderTextColor="#010203"
              value={this.state.firstName}
              onChangeText={(val) => this.updateInputVal(val, 'firstName')}
            />
            <TextInput style={styles.textinputstyle} label='ENTER LAST NAME' placeholderTextColor="#010203"
              value={this.state.LastName}
              onChangeText={(val) => this.updateInputVal(val, 'LastName')}
            />
            <TextInput style={styles.textinputstyle} label='ENTER STREET ADDRESS' placeholderTextColor="#010203"
              value={this.state.streetAddress}
              onChangeText={(val) => this.updateInputVal(val, 'streetAddress')}
            />
            <TextInput style={styles.textinputstyle} label='CITY' placeholderTextColor="#010203"
              value={this.state.city}
              onChangeText={(val) => this.updateInputVal(val, 'city')}
            />
            <TextInput style={styles.textinputstyle} label='State/Province' placeholderTextColor="#010203"
              value={this.state.stateProvince}
              onChangeText={(val) => this.updateInputVal(val, 'stateProvince')} />
            <TextInput style={styles.textinputstyle} label='ENTER PIN CODE' placeholderTextColor="#010203"
              value={this.state.zipCode}
              onChangeText={(val) => this.updateInputVal(val, 'zipCode')}
            />
            <TextInput style={styles.textinputstyle} label='country' placeholderTextColor="#010203"
              value={this.state.country}
              onChangeText={(val) => this.updateInputVal(val, 'country')}
            />

            <TextInput style={styles.textinputstyle} label='ENTER MOBILE NUMBER' placeholderTextColor="#010203"
              value={this.state.mobileNo}
              onChangeText={(val) => this.updateInputVal(val, 'mobileNo')}
            />
            <CheckBox
    style={{flex: 1, padding: 10}}
    onClick={()=>{
      this.setState({
          isChecked:!this.state.isChecked
      })
    }}
    isChecked={this.state.isChecked}
    leftText={"CheckBox"}
/>
            <View>

             {/* <CheckBox
    disabled={false}
    value={this.state.toggleCheckBox}
    //onValueChange={(newValue) =>  { this.setState({ toggleCheckBox: newValue }) }}
  /> */}
  </View>
          </View>
          {/* <Checkbox
              //value="checkedA"
             // inputProps={{ 'aria-label': 'Checkbox A' }}
            /> */}
          {/* <Button mode="contained" onPress={() => this.prosidAddress()}      style={styles.buttonstyle}>
     

          CONTINUE
         
          
          </Button> */}
          <Animatable.View>
            <View style={styles.button}>
              <TouchableOpacity onPress={() => this.prosidAddress()}>
                <LinearGradient
                  colors={['#30f7e8', '#01ab9d']}
                  style={styles.signIn}
                >
                  <Text style={styles.textSign} >CONTINUE</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animatable.View>

          {/* onPress={() => navigate('CastomerShipingAddress')}
           onPress={() =>this.props.navigation.navigate("CastomerShipingAddress",{ data:item})} */}
          <FlatList
            data={this.state.customerAddr}
            renderI={({ ite }) => (
              <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>

                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 3 }}>

                  <Text> {ite.id} </Text>
                  <Text>₹ {ite.telephone} </Text>
                  <Text>₹ {ite.postcode} </Text>

                </View>
              </View>
            )}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
          />
          {/* </View> */}

        </ScrollView>

      </>
    );
  }
}

const { width } = Dimensions.get("screen");
const paddhori = width * 0.28;

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    padding: 5,
    backgroundColor: '#b1dbf6',
  },
  MainContainerfooter: {
    justifyContent: 'center',
    flex: 1,
    padding: 5,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  b1: {
    paddingBottom: 15,
  },
  container: {
    flex: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  imageStyle: {
    height: 400,
    flex: 1,
    width: 400,
  },
  buttonstyle: {
    margin: 20,
    backgroundColor: '#358ef6'
  },
  // textinputstyle:{
  //   marginRight:10,
  //   marginRight:10
  // }
  text: {
    margin: 10,
  },
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