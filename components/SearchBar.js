import React, { Component } from 'react';
import { View, TextInput,
  StyleSheet,
  Text,
  FlatList,
 } from 'react-native';
//import { Feather } from '@expo/vector-icons';
//import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // searchText: "",
      loading: false,
      error: null,
      query: "",
      userList: this.props.listOfContact,
    };
  }
  state = {
    // searchText: "",
    loading: false,
    error: null,
    query: "",
    userList: [],
  };

  search = (text, state) => {

    const formattedQuery = text.toLowerCase()
    //Alert.alert(formattedQuery)
    // Alert.alert(JSON.stringify(this.props.listOfContact))
    const filterData = _.filter(this.props.listOfContact, user => {
      //const NewDate = moment(user.Time, 'DD-MM-YYYY')
      //const yourDate = new Date()
      //const NewDate = moment(yourDate, 'DD-MM-YYYY')
      // console.log("NewDate=",NewDate);

      if (user.Time.includes(formattedQuery)) {
        return true
      }

      // else if(user.Time.includes(formattedQuery)){
      //   return true
      // }
      return false
    })

    this.setState({ userList: filterData })
    //this.state.userList.push()
    //   Alert.alert(JSON.stringify(filterData))

  };
  componentDidMount() {
    // this.props.getContact()
    // this.setState({
    //   userList: this.props.listOfContact,



    // }
    // )
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    // if (this.props.userID !== prevProps.userID) {
    //   this.fetchData(this.props.userID);
    // }
    //this.fetchData(this.state.listOfContact);
  }
  render() {
    return (
      <>
        <View style={styles.backgroundStyle}>
          {/* <Feather name="search" style={styles.iconStyle} /> */}
          <Icon name="search" size={23} style={styles.iconStyle} color="#358ef6" />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.inputStyle}
            placeholder="Search"
            placeholderTextColor="#031113"
            onChangeText={this.search}

          //onChangeText={this.search}
          //value={this.state.searchText}
          // onEndEditing={onTermSubmit}
          />

        </View>
        <FlatList style={{ width: '100%' }}
          data={this.state.userList}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => {
            return (
              <View style={{ padding: 9 }}>
                <View style={{ padding: 15, elevation: 8, borderRadius: 15, marginBottom: 15, backgroundColor: '#d7e651', paddingTop: 20 }}>
                  <Text style={{ fontSize: 25, lineHeight: 30, }}>{item.name}</Text>
                  <Text style={{ fontSize: 17 }}>{item.Time}</Text>
                  {/* <Text style={{ fontSize: 17 }}>{item.mobile}</Text>
                  <Text style={{ fontSize: 17 }}>{item.email}</Text>
                  <Text style={{ fontSize: 17 }}>{item.location}</Text>
                  <Text style={{ fontSize: 17 }}>{item.query}</Text> */}
                </View>
              </View>
            )

          }}
        />
      </>
    );
  }
}
const styles = StyleSheet.create({
  backgroundStyle: {
    marginBottom: 2,
    backgroundColor: '#64fff2',
    height: 35,
    borderRadius: 5,
    flexDirection: 'row'
  },
  inputStyle: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  iconStyle: {
    fontSize: 30,
    alignSelf: 'center',
    marginHorizontal: 10
  }
});

export default SearchBar;
