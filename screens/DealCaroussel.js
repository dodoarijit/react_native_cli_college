import React, { PureComponent } from 'react';
import { Image, StyleSheet, ScrollView, Dimensions,View } from 'react-native';
// import { Box } from 'react-native-design-utility';


const images = [
  require('../assets/food2.png'),
  require('../assets/food2.png'),
  require('../assets/food3.png'),
];
// Array [
//   "http://10.15.176.14/magento/pub/media/catalog/product/m/b/mb01-blue-0.jpg",
//   "http://10.15.176.14/magento/pub/media/catalog/product/m/b/mb01-blue-0.jpg",
//   "http://10.15.176.14/magento/pub/media/catalog/product/m/b/mb01-blue-0.jpg",
// ]

// const images = [
//   "http://10.15.176.14/magento/pub/media/catalog/product/m/b/mb01-blue-0.jpg",
//   "http://10.15.176.14/magento/pub/media/catalog/product/m/b/mb01-blue-0.jpg",
//   "http://10.15.176.14/magento/pub/media/catalog/product/m/b/mb01-blue-0.jpg",
// ];



class DealCaroussel extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
    };

 }

  

  render() {
    console.log(images)
    return (
      <View style={styles.MainContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          ref={this.scrollView}
          scrollEventThrottle={16}
          onScroll={this.onScroll}
        >
          {images.map((img, i) => (
          
              <Image source={img} 
              key={i}
              />
              
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default DealCaroussel;

const styles = StyleSheet.create({
  MainContainer: {
    height:150,
    width:null,
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
  }
});
