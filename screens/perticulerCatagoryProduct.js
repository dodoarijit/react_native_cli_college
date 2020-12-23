import React, { Component } from 'react';
import { StyleSheet, Text,Button,FlatList, View, TouchableOpacity, Image } from 'react-native';
//import {Image } from 'react-native'
import axios from 'axios';

//import { AntDesign } from '@expo/vector-icons';
//import { Card } from 'react-native-elements'


class perticulerCatagoryProduct extends Component{
  constructor(props) {
    super(props);
    this.state = {
      catagoryArray: [],
      catagoryNameWithImg: [],
      subCatagoryNameWithImg:[]
    }
  }
  
  openSection(item,subCAtArray) {
    // alert('hiiii>>>>' + JSON.stringify(item))

    const _this = this;
    axios.defaults.baseURL = 'http://13.129.205.241/magento/index.php/rest/V1';
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
        //  alert('custTocken>>>>>>>'+JSON.stringify(item))
        var subCatagoryNameWithImg = [];
        console.log('cubcatagory>>>>>>>'+JSON.stringify(subCAtArray))

        subCAtArray.map((val, index) => {
          if(val.id===item.id){
            // alert('val++++++>>>>>>>'+JSON.stringify(val))
            
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

           _this.props.navigation.navigate('perticulerCatagoryIndivijualProduct', { subCatagoryInput:data})
          // alert('nextpage>>>>>>>')
        })
          .catch(function (error) {
            console.log(error);
          });
        console.log(response);
      }, (error) => {
        Alert.alert('Invalid User!', 'Username or password iii====' + JSON.stringify(error), [
          { text: 'Okay' }
        ]);
        console.log(error);
      });
  }
  render(){
    const { subCatagoryInput,subCAtArray } = this.props.route.params
    //this.setState({catagoryArray:subCatagoryInput})
    // alert('setstateabhijit>>>>>'+  JSON.stringify(subCatagoryInput))
    const { navigate } = this.props.navigation;

  return (
    <>
   <View style={styles.container}>
          <Text style={styles.title}>Shop By Catagory</Text>
        </View>
<FlatList
          data={subCatagoryInput}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1, borderRadius: 25 }}>
              <View style={{ justifyContent: 'center', alignItems: 'center', padding: 3 }}>
                {/* <Text> {item.label} </Text> */}
                <TouchableOpacity onPress={() => this.openSection(item,subCAtArray)}>
                  <Image style={styles.imageThumbnail} source={{ uri: 'http://3.129.205.241/magento' + item.custom_attributes[0].value }} />
                </TouchableOpacity>
                <Text> {item.name} </Text>

              </View>
            </View>
          )}
          numColumns={2}
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
    borderRadius:10,
  }
  ,
      title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 5,
      },
});

export default perticulerCatagoryProduct;
