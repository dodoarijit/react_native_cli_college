import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  ScrollView,
  Image,
  TextInput,
  alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import NumericInput from 'react-native-numeric-input';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

class EditCart extends Component {
  constructor(props) {
    const {data} = props.route.params;
    super(props);
    this.state = {
      imgArr: '',
      img: '',
      quote_id: data.quote_id,
      sku: data.sku,
      qty: data.qty,
      item_id: data.item_id,
      // isLoading: true
    };
    //alert(JSON.stringify(data))
  }

  componentWillMount = () => {
    axios
      .get(
        'http://3.129.205.241/magento/index.php/rest/V1/products/' +
          this.state.sku +
          '/media',
      )
      .then(res => {
        this.setState({img: res.data[0].file});
      });
  };
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  addUpdayeProduct() {
    axios.defaults.baseURL = 'http://3.129.205.241/magento/index.php/rest/V1';
    axios.defaults.headers.post['Content-Type'] =
      'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.post['Access-Control-Allow-Headers'] = '*';
    axios
      .post('/integration/customer/token', {
        username: global.email,
        password: global.password,
      })
      .then(
        response => {
          console.log('token' + response.data);
          //alert("token" + response.data + ">>>>" + item_id)
          const config = {
            headers: {Authorization: `Bearer ${response.data}`},
          };

          const bodyParameters = {
            cartItem: {
              sku: this.state.sku,
              qty: this.state.qty,
              quote_id: this.state.quote_id,
              //   "quote_id": res.data
            },
          };
          //alert("ITEMID>>>"+this.state.item_id)
          axios
            .put(
              'http://3.129.205.241/magento/index.php/rest/V1/carts/mine/items/' +
                this.state.item_id,
              bodyParameters,
              config,
            )
            .then(response => {
              this.setState({
                isLoading: false,
              });
              console.log(response);
              //  global.productCount = res.data.items_count;

              //alert("deleted")
              // const config = {
              //     headers: { Authorization: `Bearer ${response.data}` }
              // };
              this.props.navigation.navigate('ProsidToPlaceOrder');
              // }, (error) => {
              //     Alert.alert('not Deleted', JSON.stringify(error), [
              //         { text: 'Okay' }
              //     ]);
              console.log(error);
            });
        },
        error => {
          // Alert.alert('Invalid User!', 'Username or password iii====' + JSON.stringify(error), [
          //     { text: 'Okay' }
          // ]);
          console.log(error);
        },
      );
  }
  render() {
    const {data} = this.props.route.params;
    // alert(JSON.stringify(data.custom_attributes))
    let tmtArr = [];
    {
      axios
        .get(
          'http://3.129.205.241/magento/index.php/rest/V1/products/' +
            data.sku +
            '/media',
          {
            headers: {
              Authorization: 'Bearer $no auth',
            },
          },
        )
        .then(res => {
          imgPath =
            'http://3.129.205.241/magento/pub/media/catalog/product' +
            res.data[0].file;
          tmtArr.push(imgPath);
          // alert(res.data.custom_attributes[2].value)
        });
    }
    // {
    //     data.custom_attributes.map((item) => {
    //       if (item.attribute_code == 'image' || item.attribute_code == 'thumbnail' || item.attribute_code == 'small_image') {
    //         let imgPath = 'http://3.129.205.241/magento/pub/media/catalog/product' + item.value;
    //         tmtArr.push(imgPath);
    //       }
    //     }
    //     )
    //   }
    const {navigate} = this.props.navigation;
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#0b774d" />
        </View>
      );
    }
    return (
      <View style={styles.mainout}>
        <ScrollView>
          <View style={styles.MainContainer}>
            {/* image */}

            <Image
              style={styles.imageThumbnail}
              source={{
                uri:
                  'http://3.129.205.241/magento/pub/media/catalog/product' +
                  this.state.img,
              }}
            />

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.text1}>{data.name}</Text>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                ₹ {data.price}
              </Text>
              <Text style={styles.text2}>Product Id: {data.sku}</Text>
              <View
                style={{
                  marginBottom: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}>
                <Text style={{fontSize: 17}}>Qty </Text>

                {/* <TextInput style={styles.textinputstyle}
                                    onChangeText={(val) => this.updateInputVal(val, 'qty')}
                                    value={this.state.qty.toString()}
                                /> */}
                <NumericInput
                  type="up-down"
                  onChange={val => this.updateInputVal(val, 'qty')}
                  value={this.state.qty}
                  onLimitReached={(isMax, msg) => console.log(isMax, msg)}
                  minValue={1}
                  maxValue={50}
                  totalWidth={150}
                  totalHeight={50}
                  iconSize={25}
                  step={1}
                  valueType="real"
                  rounded
                  textColor="red"
                  iconStyle={{color: '#B0228C'}}
                  rightButtonBackgroundColor="#EA3788"
                  leftButtonBackgroundColor="#E56B70"
                />
              </View>
            </View>
          </View>
          <View style={{marginBottom: 5, padding: 5}}>
            {/* <Button
                            title="Update"
                            onPress={() => this.addUpdayeProduct(data.sku)}
                        /> */}
            <Animatable.View>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => this.addUpdayeProduct(data.sku)}>
                  <LinearGradient
                    colors={['#30f7e8', '#01ab9d']}
                    style={styles.signIn}>
                    <Text style={styles.textSign}>Update</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </Animatable.View>
          </View>
          <View style={{marginBottom: 5, padding: 5}}>
            {/* <Button
                            style={styles.b2}
                            title="Buy Now"
                            onPress={() => navigate("contact")}
                        /> */}
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
    width: 400,
  },
  textinputstyle: {
    marginTop: 20,
    height: 40,
    borderColor: '#2140de',
    borderWidth: 1,
    backgroundColor: '#f7f8fb',
    paddingLeft: 15,
  },
  Main: {
    height: 50,
    width: 50,
  },
  text1: {
    padding: 5,
    fontSize: 20,
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
    marginBottom: 5,
    marginTop: 5,
  },
  Qty: {
    position: 'relative',
    flexDirection: 'row',
  },

  button: {
    alignItems: 'center',
    marginBottom: 25,
  },
  signIn: {
    //width: 150,
    //height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 140,
    paddingVertical: 10,
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
    // paddingHorizontal:100,
    // paddingVertical:10,
  },
});
export default EditCart;