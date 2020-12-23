import React, { PureComponent } from 'react';
import { Image, StyleSheet, ScrollView, Dimensions, View } from 'react-native';
import Slideshow from 'react-native-image-slider-show';
class DealCarousselBooking extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      position: 1,
      interval: null,
      dataSource: [
        {
          title: 'Title 1',
          caption: 'Caption 1',
          url: 'http://3.129.205.241/magento/pub/media/catalog/product/m/b/mb01-blue-0.jpg',
        }, {
          title: 'Title 2',
          caption: 'Caption 2',
          url: 'http://3.129.205.241/magento/pub/media/catalog/product/cache/b94bf7b1839ae4d1f44c11582651b8de//w/s/ws02-green_main_1.jpg',
        }, {
          title: 'Title 3',
          caption: 'Caption 3',
          url: 'http://3.129.205.241/magento/pub/media/catalog/product/m/b/mb01-blue-0.jpg',
        },
      ],
    };
  }
  componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position: this.state.position === this.state.dataSource.length ? 0 : this.state.position + 1
        });
      }, 2000)
    });
  }
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }
  render() {
    return (
      <Slideshow
        dataSource={this.state.dataSource}
        position={this.state.position}
        onPositionChanged={position => this.setState({ position })} />
    );
  }
}
export default DealCarousselBooking;
const styles = StyleSheet.create({
  MainContainer: {
    height: 150,
    width: null,
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
