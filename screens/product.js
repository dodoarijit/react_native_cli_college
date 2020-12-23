import React, { Component } from 'react';
import {
  StyleSheet, Text, View, FlatList, Alert, TouchableOpacity, Image, ActivityIndicator, Dimensions
} from 'react-native';
import axios from 'axios';
// import DealCaroussel from '../../components/DealCaroussel'
import CustomCarasole from '../../components/CustomCarasole'
import { Avatar } from 'react-native-paper';
import SearchBar from '../../components/SearchBar'
import { ScrollView } from 'react-native-gesture-handler';
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // token: '',
      productArray: [],
      isLoading: true

    }
  }
  onScreenLoad = () => {
  }
  componentWillMount = () => {

    // axios.defaults.baseURL = 'http://10.15.176.14/magento/index.php/rest/V1';
    // axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    // axios.defaults.headers.post['Access-Control-Allow-Headers'] = '*';
    // axios.post('/integration/admin/token', {
    //   "username": "arijit",
    //   "password": "wb 25 0105"
    // })
    //   .then((response) => {
    //     // console.log(response);
    //     this.setState({ token: response.data })
    //     axios.get('http://10.15.176.14/magento/index.php/rest/V1/products/?searchCriteria[page_size]=30', {
    //       headers: {
    //         'Authorization': `Bearer ${response.data}`
    //       }
    //     })
    //       .then((res) => {
    //         this.setState({ productArray: res.data.items });
    //         this.setState({
    //           isLoading: false,

    //         })
    //       })
    //       .catch((error) => {
    //         // console.error(error)
    //         Alert.alert('product error!', JSON.stringify(error), [
    //           { text: 'Okay' }
    //         ]);
    //       })
    //     // Alert.alert('valid tocken!', JSON.stringify(token), [
    //     //   { text: 'Okay' }
    //     // ]);
    //   }, (error) => {
    //     Alert.alert('Invalid tocken!', JSON.stringify(error), [
    //       { text: 'Okay' }
    //     ]);
    //     // console.log(error);
    //   });
    axios.get('http://10.15.176.14/magento/index.php/rest/V1/products?searchCriteria[page_size]=40')
      .then((res) => {
        this.setState({ productArray: res.data.items });
        this.setState({
          isLoading: false,

        })
      })
      .catch((error) => {
        // console.error(error)
        Alert.alert('product error!', JSON.stringify(error), [
          { text: 'Okay' }
        ]);
      })
  }


render() {
  if (this.state.isLoading) {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#0b774d" />
      </View>
    )

  }
  return (
    <View style={styles.MainContainer}>
      <SearchBar />
      <ScrollView>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}

        >
          <View style={{ justifyContent: 'center', alignItems: 'center', padding: 3, flexDirection: 'row', }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("catagoryDetails")}>

              <View style={{ justifyContent: 'center', alignItems: 'center', padding: 3, flexDirection: 'column', }}>

                <Avatar.Image size={50} source={require('../../assets/shirt2.jpg')} />
                {/* <Avatar.Text size={80} label="Aplinces" /> */}

                <Text style={{ justifyContent: 'center', alignItems: 'center', fontSize: 13 }}>Men</Text>
              </View>
            </TouchableOpacity>
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 3, flexDirection: 'column', }}>
              <Avatar.Image size={50} source={require('../../assets/woman.png')} />
              <Text style={{ justifyContent: 'center', alignItems: 'center' }}>Women</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 3, flexDirection: 'column', }}>

              <Avatar.Image size={50} source={require('../../assets/35.png')} />
              <Text style={{ justifyContent: 'center', alignItems: 'center' }}>appliances</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 3, flexDirection: 'column', }}>
              <Avatar.Image size={50} source={require('../../assets/avata1.jpg')} />
              <Text style={{ justifyContent: 'center', alignItems: 'center' }}>Men</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 3, flexDirection: 'column', }}>

              <Avatar.Image size={50} source={require('../../assets/security3.jpg')} />
              <Text style={{ justifyContent: 'center', alignItems: 'center' }}>Women</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 3, flexDirection: 'column', }}>
              <Avatar.Image size={50} source={require('../../assets/security2.jpg')} />
              <Text style={{ justifyContent: 'center', alignItems: 'center' }}>Women</Text>

            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 3, flexDirection: 'column', }}>
              <Avatar.Image size={50} source={require('../../assets/avata1.jpg')} />
              <Text style={{ justifyContent: 'center', alignItems: 'center' }}>Women</Text>

            </View>
          </View>
        </ScrollView>
        {/* <DealCaroussel /> */}
        <CustomCarasole />

        {/* <Image style={styles.singleimg} source={require('../../assets/amazon-product-pictures.jpg')} /> */}

        <FlatList
          data={this.state.productArray}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1, backgroundColor: '#61bbef', borderRadius: 25 }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("booking", { data: item })}>
                <Image style={styles.imageThumbnail} source={{ uri: 'http://10.15.176.14/magento/pub/media/catalog/product' + item.media_gallery_entries[0].file }} />
              </TouchableOpacity>
              <View style={{ justifyContent: 'center', alignItems: 'center', padding: 3 }}>
                <Text> {item.name} </Text>
                <Text>₹ {item.price} </Text>
              </View>
            </View>
          )}
          //Setting the number of column
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
        />
        {/* <ScrollView
          >
           <FlatList
            data={this.state.productArray}
            renderItem={({ item }) => (
              <View style={{ flex: 1, flexDirection: 'column', margin: 1, backgroundColor: '#61bbef', borderRadius: 25 }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("booking", { data: item })}>
                  <Image style={styles.imageThumbnail} source={{ uri: 'http://10.15.176.14/magento/pub/media/catalog/product' + item.media_gallery_entries[0].file }} />
                </TouchableOpacity>
                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 3 }}>
                  <Text> {item.name} </Text>
                  <Text>₹ {item.price} </Text>
                </View>
              </View>
            )}
            //Setting the number of column
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
          />
          </ScrollView> */}
      </ScrollView>

    </View>
  );
}
}
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    padding: 5,
    backgroundColor: '#fdfeff',
  },
  MainContainerfooter: {
    justifyContent: 'center',
    flex: 1,
    padding: 5,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    // height: 260,
    height: Dimensions.get('window').height * 0.20, // 25% window
    //width: Dimensions.get('window').width * 0.25,


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
  singleimg: {
    height: 100,
    width: null,
  }
});