import React, { Component } from 'react';
import { StyleSheet, Text,Button,FlatList, View, TouchableOpacity, Image } from 'react-native';
//import { AntDesign } from '@expo/vector-icons';
//import { Card } from 'react-native-elements'
class perticulerCatagoryIndivijualProduct extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true

    }
  }
  render(){
    this.setState({
      isLoading: false,

    })
    const { subCatagoryInput } = this.props.route.params
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
    <View style={styles.container}>
          <Text style={styles.title}>Shop By Catagory</Text>
        </View>
<FlatList
          data={subCatagoryInput}
          renderItem={({ item }) => (
            <View style={{ flex: 1, flexDirection: 'column', margin: 1, borderRadius: 25 }}>
              <View style={{ justifyContent: 'center', alignItems: 'center', padding: 3 }}>
                <TouchableOpacity onPress={() => this.openSection(item)}>
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
        borderRadius:10
      },
      title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 5,
      },
});
export default perticulerCatagoryIndivijualProduct;
