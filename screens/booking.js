import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, TextInput, Alert,ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
// import DealCarousselBooking from '../../components/DealCarousselBooking'
// import ValidationComponent from 'react-native-form-validator';
import Icon from 'react-native-vector-icons/Ionicons';
import { IconButton, Colors } from 'react-native-paper';
import NumericInput from 'react-native-numeric-input'

import axios from 'axios';
class booking extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgArr: [],
      sku: '',
      qty: '',
      buttonFlag:global.productCount,
     // isLoading: true

    }
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  addCartProduct(sku) {
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
        this.setState({
          isLoading: false,
    
        })
        const bodyParameters = {
         
        };
        axios.post(
          'http://3.129.205.241/magento/index.php/rest/V1/carts/mine',
          bodyParameters,
          config
        ).then((res) => {
          // console.log(res.data)
          const config = {
            headers: { Authorization: `Bearer ${response.data}` }
          };
          // this.setState({
          //   isLoading: false,
      
          // })
          const bodyParameters = {
            "cartItem": {
              "sku": sku,
              "qty": this.state.qty,
              "quote_id": res.data
            }
          };
          
          axios.post(
            'http://3.129.205.241/magento/index.php/rest/V1/carts/mine/items',
            bodyParameters,
            config
          ).then((res) => {
            //start
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
                // alert('token success>>>'+response.data)
                const config = {
                  headers: { Authorization: `Bearer ${response.data}` }
                };
                axios.get(
                  'http://3.129.205.241/magento/index.php/rest/V1/carts/mine/',
                  config
                ).then((res) => {
                  // alert('token successssssssss>>>'+JSON.stringify (res.data.items_count))
                  // console.log(res.data)
                  global.productCount = res.data.items_count;
                  this.setState({buttonFlag:global.productCount})
                  this.setState({qty:''})
                 
                   this.props.navigation.navigate('booking')
                })
                  .catch((error) => {
                    // console.error(error)
                    Alert.alert('product error!', JSON.stringify(error), [
                      { text: 'Okay' }
                    ]);
                  })
              }, (error) => {
                Alert.alert('Invalid User!', 'Username or password iii====' + (error), [
                  { text: 'Okay' }
                ]);
                // console.log(error);
              });
            //end
           // global.productCount = global.productCount + 1;
           //  this.props.navigation.navigate('booking')
          })
            .catch((error) => {
              // console.error(error)
              Alert.alert('product error!', JSON.stringify(error), [
                { text: 'Okay' }
              ]);
            })
        })
          .catch((error) => {
            // console.error(error)
            Alert.alert('product error!', JSON.stringify(error), [
              { text: 'Okay' }
            ]);
          })
      }, (error) => {
        Alert.alert('Invalid User!', 'Username or password iii====' + (error), [
          { text: 'Okay' }
        ]);
        // console.log(error);
      });
  }
  render() {
    const { data } = this.props.route.params
     console.log("data>>>>>>>>" + JSON.stringify(data.custom_attributes))
    let tmtArr = [];
    {
      data.custom_attributes.map((item) => {
        if (item.attribute_code == 'image' || item.attribute_code == 'thumbnail' || item.attribute_code == 'small_image') {
          let imgPath = 'http://3.129.205.241/magento/pub/media/catalog/product' + item.value;
          tmtArr.push(imgPath);
        }
      }
      )
    }
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#0b774d" />
        </View>
      )

    }
    // console.log(tmtArr)
    const { navigate } = this.props.navigation;
    let disableFlag=false;
    if (global.productCount>0) {
      disableFlag = false;
    } else {
      disableFlag =true;
    }
    return (
      <View style={styles.mainout}>
        <ScrollView>
          {/* <DealCarousselBooking/> */}
          <View style={styles.MainContainer}>
            <Image style={styles.imageThumbnail} source={{ uri: tmtArr[0] }} />
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.text1}>{data.name}</Text>
              <Text style={styles.text2}>₹ {data.price}</Text>
              <Text style={styles.text2}>Product Id: {data.sku}</Text>

              <View style={{ marginBottom: 1,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                {/* <TextInput style={styles.textinputstyle}
		              	isRequired={true}
                  onChangeText={(val) => this.updateInputVal(val, 'qty')}
                  value={this.state.qty}
                /> */}
                              <Text>Qty  </Text>

                <NumericInput 
            type='up-down' 
            onChange={(val) => this.updateInputVal(val, 'qty')}
            value={this.state.qty} 
            onLimitReached={(isMax,msg) => console.log(isMax,msg)}
            minValue={1}
            maxValue={50}
            totalWidth={150} 
            totalHeight={50} 
            iconSize={25}
            step={1}
            valueType='real'
            rounded 
            textColor='red' 
            iconStyle={{ color: '#B0228C' }} 
            rightButtonBackgroundColor='#EA3788' 
            leftButtonBackgroundColor='#E56B70'/>
             <IconButton
                icon="heart"
                color={Colors.red500}
                size={35}
                onPress={() => console.log('Pressed')}
              />
              </View>
            </View>
          </View>
          <View >
            <Button mode="contained"  onPress={() => this.addCartProduct(data.sku)}  style={styles.buttonstyle}>
              Add To Cart
              </Button>
             
          </View>
         
          <View style={{ marginBottom: 0, padding: 2 }}>
            <Button mode="contained" style={styles.b2} onPress={() => navigate("contact")}  disabled={disableFlag}>
              
              Buy Now
             

              </Button>
            
          </View>
          
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainout: {
    flex: 1,
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
    //backgroundColor:"#e5c21a",
    marginBottom: 5,
    marginTop: 5,
  },
  Qty: {
    position: 'relative',
    flexDirection: 'row',
  },
  buttonstyle:{
    margin:20,
   backgroundColor:'#39adf5',
   marginBottom:10,
  },
  b2:{
    backgroundColor:'#358ef6',
    
    marginLeft:20,
    marginRight:20
  },
});
export default booking;
