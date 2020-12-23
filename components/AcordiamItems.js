import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar
} from 'react-native';
import CollapsibleList from 'react-native-collapsible-list';
import { TouchableOpacity } from 'react-native-gesture-handler';
//import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
//import IconIcon from 'react-native-vector-icons/Ionicons';

const AcordiamItems = ({navigation}) => {
  const [buttonText, setButtonText] = useState('Teacher navigation');

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ScrollView style={{flex: 1, padding: 10}}>
          <CollapsibleList
            numberOfVisibleItems={0}
            wrapperStyle={styles.wrapperCollapsibleList}
            onToggle={collapsed => collapsed ? setButtonText('Teacher navigation') && setButtonText('<Icon name="lock" size={50} color="#ffffff" />'): setButtonText('Teacher navigation') && <Icon name="lock" size={50} color="#ffffff" />}
            buttonContent={
              <View style={styles.button}>
                <Text style={styles.buttonText}>{buttonText}</Text>
              </View>
            }>
            
            
            
            <View style={styles.collapsibleItem}>
              <TouchableOpacity >
              <View style={{flexDirection:'row'}}> 
               <Icon name="ediaccusoftt" size={21} color="#ff00a0" style={{paddingHorizontal:20}}/>
               <Text>Dashbord</Text>
               </View>
               </TouchableOpacity>
            </View>
            
            <View style={styles.collapsibleItem}>
              <TouchableOpacity onPress={() =>navigation.navigate('contact')}>
              <View style={{flexDirection:'row'}}> 
               <Icon name="edit" size={21} color="#ff00a0" style={{paddingHorizontal:20}}/>
               <Text>Edit Profile</Text>
               </View>
               </TouchableOpacity>
            </View>
            <View style={styles.collapsibleItem}>
            <View style={{flexDirection:'row'}}> 
               <Icon name="plus" size={21} color="#ff00a0" style={{paddingHorizontal:20}}/>
              <Text>Membership</Text>
              </View>
            </View>
            <View style={styles.collapsibleItem}>
            <View style={{flexDirection:'row'}}> 
               <Icon name="bell" size={21} color="#ff00a0" style={{paddingHorizontal:20}}/>
              <Text>Creat Training</Text>
              </View>
            </View>
            <View style={styles.collapsibleItem}>
            <View style={{flexDirection:'row'}}> 
               <Icon name="500px" size={21} color="#ff00a0" style={{paddingHorizontal:20}}/>
              <Text>My Training</Text>
            </View>
            </View>
            <View style={styles.collapsibleItem}>
            <View style={{flexDirection:'row'}}> 
               <Icon name="adn" size={21} color="#ff00a0" style={{paddingHorizontal:20}}/>
              <Text>My Eatning</Text>
            </View>
            </View>
          </CollapsibleList>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  wrapperCollapsibleList: {
    flex: 1,
    marginTop: 20,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
  button: {
    paddingHorizontal:50,
    paddingVertical:13,
    backgroundColor: '#2a0555',
  },
  collapsibleItem: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#CCC',
    padding: 13,
  },
  buttonText: {
    color: '#FFF',
  },
});

export default AcordiamItems;