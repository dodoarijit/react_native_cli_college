import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableOpacity, Image, ScrollView, ActivityIndicator,Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
//import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
'react-native-simple-radio-button';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
//import { TextInput } from 'react-native-paper';
import axios from 'axios';
//import SearchBar from '../../components/SearchBar'
import { Card, Checkbox } from 'react-native-paper';
export default class contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      LastName: '',
      streetAddress: '',
      city: '',
      stateProvince: '',
      zipCode: '',
      country_id: '',
      mobileNo: '',
      region_code: '',
      region: '',
      region_id: '',
      paymentObject: '',
      token: '',
      product: '',
      customer: '',
      customerAddr: '',
      shipping_address: [],
      billing_address: '',
      productArray: [],
      checked: 'false',
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
            this.setState({
              firstName: res.data.firstname,
              LastName: res.data.lastname,
              city: res.data.city,
              zipCode: res.data.postcode,
              mobileNo: res.data.telephone,
              streetAddress: res.data.street,
              region_code: res.data.region.region_code,
              region: res.data.region.region,
              region_id: res.data.region.region_id,
              country_id: res.data.country_id,
            });
            // alert( this.state.region_id)
          })
      }, (error) => {
        //  Alert .alert('Invalid tocken!', JSON.stringify(error), [
        //     { text: 'Okay' }
        //   ]);
        // console.log(error);
      });
  }
  prosidAddress = () => {
    // alert( this.state.streetAddress)
    if (this.state.shipping_address.firstname === '') {
      Alert.alert('firstname mandetory')
    } else if (this.state.shipping_address.lastname === '') {
      Alert.alert('lastname  mandetory')
    } else if (this.state.shipping_address.street === '') {
      Alert.alert('* streetAddress mandetory*')
    } else if (this.state.shipping_address.city === '') {
      Alert.alert('city mandetory')
    } else if (this.state.shipping_address.postcode === '') {
      Alert.alert('zip Code name mandetory')
    } else if (this.state.shipping_address.telephone === '') {
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

        const config = {
          headers: { Authorization: `Bearer ${response.data}` }
        };
        const bodyParameters =
        {
          "addressInformation": {
            "shipping_address": {
              "region": this.state.region,
              "region_id": this.state.region_id,
              "region_code": this.state.region_code,
              "country_id": this.state.country_id,
              "street":
                this.state.streetAddress
              ,
              "postcode": this.state.zipCode,
              "city": this.state.city,
              "firstname": this.state.firstName,
              "lastname": this.state.LastName,
              "email": "",
              "telephone": this.state.mobileNo
            },
            "billing_address": {
              "region": this.state.region,
              "region_id": this.state.region_id,
              "region_code": this.state.region_code,
              "country_id": this.state.country_id,
              "street":
                this.state.streetAddress
              ,
              "postcode": this.state.zipCode,
              "city": this.state.city,
              "firstname": this.state.Firstname,
              "lastname": this.state.LastName,
              "email": "",
              "telephone": this.state.mobileNo
            },
            "shipping_carrier_code": "freeshipping",
            "shipping_method_code": "freeshipping"
          }
        };
        axios.post('http://3.129.205.241/magento/index.php/rest/V1/carts/mine/shipping-information',
          bodyParameters,
          config
        ).then((res) => {
          this.props.navigation.navigate('CastomerShipingAddress', { shippingInfo: res.data })
        })
          .catch((error) => {
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
         <View>
         <Card style={styles.radio}>
                    <Card.Content>
                        <Text style={{padding: 10,fontSize:18,fontWeight:'bold',textAlign:'center'}}>Your Defult Address</Text>

                      <Text style={{fontSize:15,fontWeight:'bold'}}> {this.state.shipping_address.firstname} {this.state.shipping_address.lastname}</Text>
                      <Text>Postcode: {this.state.shipping_address.postcode}</Text>
                      <Text>City: {this.state.shipping_address.city}</Text>
                      <Text>Street: {this.state.shipping_address.street}</Text>
                    </Card.Content>
                   </Card>
           </View>
          {/* <Button mode="contained" onPress={() => navigate("SelectPaymentMethod")}       style={styles.buttonstyle}>
     

     Change or Add address
        
         
         </Button> */}
         <View style={{marginTop:10}}>
          <Animatable.View>
            <View style={styles.button}>
              <TouchableOpacity onPress={() => navigate("SelectPaymentMethod")}>
                <LinearGradient
                  colors={['#30f7e8', '#01ab9d']}
                  style={styles.signIn2}
                >
                  <Text style={styles.textSign} >Change or Add address</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animatable.View>
          </View>
          {/* <Text style={styles.text} >Shipping Address</Text> */}
          {/* <View style={styles.text}>
         <Text style={{ fontSize: 17 }}> ADD NEW ADDRESS</Text>

        <TextInput style={styles.textinputstyle}       label="ENTER FIRST NAME"
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
         </View> */}
          {/* <Button mode="contained" onPress={() => navigate("SelectPaymentMethod")}       style={styles.buttonstyle}>
     

          Continue
         
          
          </Button> */}

          {/* onPress={() => navigate('CastomerShipingAddress')}
           onPress={() =>this.props.navigation.navigate("CastomerShipingAddress",{ data:item})} */}
          {/* <FlatList
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
          /> */}
          {/* </View> */}
          <Animatable.View>
            <View style={styles.button}>
              <TouchableOpacity onPress={() => this.prosidAddress()}>
                <LinearGradient
                  colors={['#30f7e8', '#01ab9d']}
                  style={styles.signIn}
                >
                  <Text style={styles.textSign} >Continue</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </Animatable.View>
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
  radio: {
    backgroundColor: '#f7f8fb',
    margin: 10
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
   // paddingTop:10,
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
  signIn2: {
    //width: 150,
    //height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 67,
    paddingVertical: 10,
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