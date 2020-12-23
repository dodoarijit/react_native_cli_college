import React, { Component } from 'react';
import { StyleSheet, Text, Button, FlatList, View, TouchableOpacity, Image,ActivityIndicator } from 'react-native';
//import { AntDesign } from '@expo/vector-icons';
//import { Card } from 'react-native-elements'
import axios from 'axios';
class catagoryDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      catagoryArray: [],
      catagoryNameWithImg: [],
      subCatagoryNameWithImg:[],
      subCatagoryArray:[],
      isLoading: true

    }
  }
  componentWillMount = () => {
    const _this = this;
    axios.defaults.baseURL = 'http://3.129.205.241/magento/index.php/rest/V1';
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.post['Access-Control-Allow-Headers'] = '*';
    axios.post('/integration/admin/token', {
      "username": "arijit",
      "password": "wb 25 0105"
    })
      .then((response) => {
        this.setState({ token: response.data })
        axios.get('http://3.129.205.241/magento/index.php/rest/V1/categories/', {
          headers: {
            'Authorization': `Bearer ${response.data}`
          }
        })
          .then((res) => {

            this.setState({ catagoryArray: res.data.children_data });
            const defaultOptions = {
              headers: {
                'Authorization': `Bearer ` + this.state.token
              },
            }
            var listOfCatagoryApi = [];
            var catagoryNameWithImg = [];
            this.state.catagoryArray.map((val, index) => {
              if(val.is_active){
                listOfCatagoryApi.push(fetch('http://3.129.205.241/magento/index.php/rest/V1/categories/' + val.id, defaultOptions))
              }
              
            })
            Promise.all(listOfCatagoryApi).then(function (responses) {
              return Promise.all(responses.map(function (response) {
                return response.json();
              }));
            }).then(function (data) {
              data.map((val, index) => {
                catagoryNameWithImg.push({ label: val.name, value: val.custom_attributes[0].value })

              })
              _this.setState({ catagoryNameWithImg: data })
            })
              .catch(function (error) {
                console.log(error);
              });
              this.setState({
                isLoading: false,
          
              })
          })
          .catch((error) => {
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
  openSection(item) {
    // alert('hiiii>>>>' + JSON.stringify(item))

    const _this = this;
    axios.defaults.baseURL = 'http://3.129.205.241/magento/index.php/rest/V1';
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.defaults.headers.post['Access-Control-Allow-Headers'] = '*';
    axios.post('/integration/admin/token', {
      "username": "arijit",
      "password": "wb 25 0105"
    })
      .then((response) => {

        this.setState({ token: response.data })
        const defaultOptions = {
          headers: {
            'Authorization': `Bearer ` + this.state.token
          },
        }
        var subListOfCatagoryApi = [];
        // alert('custTocken>>>>>>>'+JSON.stringify(item))
        var subCatagoryNameWithImg = [];
        this.state.catagoryArray.map((val, index) => {
          if(val.id===item.id){
            // alert('val++++++>>>>>>>'+JSON.stringify(val))
            this.setState({subCatagoryArray:val.children_data})
            val.children_data.map((v, index) => {
              if(v.is_active){
                subListOfCatagoryApi.push(fetch('http://3.129.205.241/magento/index.php/rest/V1/categories/' + v.id, defaultOptions))
              }
              
            })
          }
          // if(val.is_active){
          // subListOfCatagoryApi.push(fetch('http://10.15.176.14/magento/index.php/rest/V1/categories/' + val.id, defaultOptions))
          // }
        })

        Promise.all(subListOfCatagoryApi).then(function (responses) {

          return Promise.all(responses.map(function (response) {
            return response.json();
          }));
        }).then(function (data) {
         
          _this.setState({ subCatagoryNameWithImg: data })
          // alert('privipage>>>>>>>'+JSON.stringify(data))

           _this.props.navigation.navigate('perticulerCatagoryProduct', { subCatagoryInput:data,subCAtArray:_this.state.subCatagoryArray})
          // alert('nextpage>>>>>>>')
        })
          .catch(function (error) {
            console.log(error);
          });
        console.log(response);
        this.setState({
          isLoading: false,
    
        })
      }, (error) => {
        Alert.alert('Invalid User!', 'Username or password iii====' + JSON.stringify(error), [
          { text: 'Okay' }
        ]);
        console.log(error);
      });
  }
  render() {
    const { navigate } = this.props.navigation;
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#0b774d" />
        </View>
      )

    }
    return (
      <>
        <FlatList
          data={this.state.catagoryNameWithImg}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1, borderRadius: 25 }}>
              <View style={{ justifyContent: 'center', alignItems: 'center', padding: 3 }}>
                {/* <Text> {item.label} </Text> */}
                <TouchableOpacity onPress={() => this.openSection(item)}>
                  <Image style={styles.imageThumbnail} source={{ uri: 'http://3.129.205.241/magento' + item.custom_attributes[0].value }} />
                </TouchableOpacity>
                <Text> {item.name} </Text>

              </View>
            </View>
          )}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
        />
      </>
    );
  }
}
const styles = StyleSheet.create({
  imageThumbnail: {
    height: 120,
    width: 120,
    borderRadius:10
  }
});
export default catagoryDetails;
