import React from 'react';
import { Component } from 'react';
import Card from '../components/Card';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Image, Button } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import CardSection from '../components/CardSection';
//import { Fontisto } from '@expo/vector-icons';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient'; 
import { ScrollView } from 'react-native-gesture-handler';
class SupportScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: '',
      wishArray: [],
      img: '',
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
        // console.log(response);
        this.setState({ token: response.data })
        axios.get('http://3.129.205.241/magento/index.php/rest/V1/ipwishlist/items', {
          headers: {
            'Authorization': `Bearer ${response.data}`
          }
        })
          .then((res) => {
            this.setState({ wishArray: res.data });
          })
          .catch((error) => {
            // console.error(error)
            Alert.alert('product error!', JSON.stringify(error), [
              { text: 'Okay' }
            ]);
          })
        axios.get('http://3.129.205.241/magento/index.php/rest/V1/ipwishlist/info', {
          headers: {
            'Authorization': `Bearer ${response.data}`
          }
        })
          .then((ras) => {
            this.setState({ count: ras.data[0].total_items });
          })
          .catch((error) => {
            // console.error(error)
            Alert.alert('product error!', JSON.stringify(error), [
              { text: 'Okay' }
            ]);
          })
      }, (error) => {
        Alert.alert('Invalid tocken!', JSON.stringify(error), [
          { text: 'Okay' }
        ]);
      });
  }
  reload = () => {
    //RELOAD COMPONENT
    // alert('RELODE>>>>')
    this.componentWillMount();
  };
  deleteItems(item_id) {
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
        axios.delete('http://3.129.205.241/magento/index.php/rest/V1/ipwishlist/delete/' + item_id,
          config
        )
          .then((res) => {
            //start
            // axios.defaults.baseURL = 'http://3.129.205.241/magento/index.php/rest/V1';
            // axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
            // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
            // axios.defaults.headers.post['Access-Control-Allow-Headers'] = '*';
            // axios.post('/integration/customer/token', {
            //   "username": "roni_cost@example.com",
            //   "password": "roni_cost3@example.com"
            // })
            //   .then((response) => {

            //     const config = {
            //       headers: { Authorization: `Bearer ${response.data}` }
            //     };
            //     axios.get(
            //       'http://3.129.205.241/magento/index.php/rest/V1/carts/mine/',
            //       config
            //     ).then((res) => {
            //        alert('token successssssssss>>>'+JSON.stringify (res.data.items_count))

            //       global.productCount = res.data.items_count;
            //       alert('GLOBAL VERIABLE>>>'+JSON.stringify (global.productCount))

            //     })
            //       .catch((error) => {
            //         Alert.alert('product error!', JSON.stringify(error), [
            //           { text: 'Okay' }
            //         ]);
            //       })
            //   }, (error) => {
            //     Alert.alert('Invalid User!', 'Username or password iii====' + (error), [
            //       { text: 'Okay' }
            //     ]);
            //   });
            //end
            // console.log(response);
            this.reload()
            alert("Item Deleted.")

          }, (error) => {
            Alert.alert('not Deleted', JSON.stringify(error), [
              { text: 'Okay' }
            ]);
            // console.log(error);
          });
      }, (error) => {
        Alert.alert('Invalid User!', 'Username or password iii====' + JSON.stringify(error), [
          { text: 'Okay' }
        ]);
        // console.log(error);
      });
  }
  render() {
    return (
      <>
       <Text style={styles.container}>My Wish List</Text>
          <Text style={styles.card}>Total Items: {this.state.count}</Text>
        <ScrollView>
          <FlatList
            data={this.state.wishArray}
            renderItem={({ item, index }) => (
              <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                <View style={{ padding: 20 }}>
                  <Card >
                    <CardSection>
                      <View style={styles.cardsecstyle}>
                        <Image style={styles.thumnellIMG} source={{ uri: 'http://3.129.205.241/magento/pub/media/catalog/product' + item.product.thumbnail }} />
                      </View>
                      <TouchableOpacity onPress={() => this.props.navigation.navigate("booking", { data: item })}>
                        <View style={styles.textsecstyle, { padding: 2 }}>
                          <Text style={styles.container, { padding: 5 }}> {item.product.name} </Text>
                          <Text style={styles.container, { padding: 5 }}>₹ {item.product.price} </Text>
                        </View>
                      </TouchableOpacity>
                    </CardSection>
                  
                      {/* <Button
                        style={styles.b1}
                        title="Delete"
                        onPress={() => this.deleteItems(item.wishlist_item_id)}
                      /> */}
                      <View style={{alignItems:'center',justifyContent:'center',marginTop:10}} >
                      <Animatable.View>
                            <View style={styles.button}>
                                <TouchableOpacity onPress={() => this.deleteItems(item.wishlist_item_id)}>
                                    <LinearGradient
                                        colors={['#30f7e8', '#01ab9d']}
                                        style={styles.signIn}
                                    >
                                      <MaterialIcons
                                name="delete"
                                color="#ff000e"
                                size={20}
                            />
                                        <Text style={styles.textSign} > Delete</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </Animatable.View>
                        </View>
                    
                  </Card>
                </View>
                <View>
                </View>
              </View>
            )}
            //Setting the number of column
            numColumns={1}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      </>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  card: {
    textAlign: 'center',
    fontSize: 20
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
    height: 75,
    width: 75,
  },
  textinputstyle: {
    marginTop: 5,
    fontSize: 20
  },
  b1: {
    marginTop: 5,
  },
  b2: {
    margin: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  numberStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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
      paddingHorizontal: 50,
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

export default SupportScreen;