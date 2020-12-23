import React from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import PhoneInput from "react-native-phone-number-input";
import axios from 'axios';
const SignInScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        firstname:'',
        isValiedfirstname:true,
        lastname:'',
        isValiedlastname:true,
        phonenumber:'',
        isValiedphonenumber:'',
        email: '',
        isValiedEmail:true,
        isValiedEmailicon:null,
        password: '',
        isValiedPassword:true,
        confirm_password: '',
        isValiedConfirmpassword:true,
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });
  const registerUser= () => {
        if(data.firstname==='' && data.lastname===''&& data.phonenumber===''&& data.email === '' && data.password === ''  && data.confirm_password==='') {
            alert("Please Enter your Details!")
        } else {
      axios.defaults.baseURL = 'http://3.129.205.241/magento/index.php/rest/default/V1';
      axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
      axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
            
      axios.defaults.headers.post['Access-Control-Allow-Headers'] = '*';
            axios.post('/customers', {
                
                "customer" : {
                    "firstname" : data.firstname,
                    "lastname" : data.lastname,
                    "email" : data.email,
                    "addresses" : [
                       {
                          "defaultBilling" : true,
                          "defaultShipping" : true,
                          "firstname" : "",
                          "lastname" : "",
                          "region" : {
                             "regionCode" : "",
                             "regionId" : 0,
                             "region" : ""
                          },
                          "countryId" : "",
                          "postcode" : "",
                          "city" : "",
                          "telephone" : data.phonenumber,
                       }
                    ]
                 },
                 "password" : data.password
                    
              })
              .then((response) => {
                console.log(response);
    
                alert('Your account has been created', [
                    {text: 'Okay'}
                ]);
                 navigation.goBack()
              }, (error) => {
                alert('Enter Valid Details', [
                    {text: 'Okay'}
                ]);
                console.log(error);
              });
    
           
            
          
      }
    }
    const textFirstName= (val) => {
        if( val.length !== 0 ) {
            setData({   
                ...data,
                firstname: val,
                isValiedfirstname: true,
            });
        } else {  setData({   
            ...data,
            isValiedfirstname: false,
        }); 
        }
    }

    const textLastName= (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                lastname: val,
                isValiedlastname: true,
            });
        } else {
            setData({
                ...data,
                isValiedlastname: false,
            });
        }
    }
    const textEmail= (val) => {
        if(  val.length !== 0 ) {
            setData({
                ...data,
                email: val,
                isValiedEmailicon:true,
            });
        } else {
            setData({
                ...data,
                isValiedEmail: null,
                isValiedEmailicon:null,
            });
        }
    }
    const textnumber = (val) => {
        if(  val.length !== 0 ) {
            setData({
                ...data,
                phonenumber: val,
                isValiedphonenumber:true,
            });
        } else {
            setData({
                ...data,
                isValiedphonenumber: null,
            });
        }
    }
    const handleValiedUser = (val) => {
        axios.defaults.baseURL = 'http://3.129.205.241/magento/index.php/rest/V1';
        axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.post['Access-Control-Allow-Headers'] = '*';
    
        
              axios.post('/customers/isEmailAvailable', {
      
                "customerEmail": val
                })
                .then((response) => {
                if(response.data === true)
                {
                    alert(response.data)
                    setData({
                        ...data,
                        isValiedEmail:true,
                    });
                }  else{
                    setData({
                        ...data,
                        isValiedEmail:false,
                        isValiedEmailicon:false,
                    });
                }
                });
    }


    const handlePasswordChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                password: val,
                isValiedPassword: true,
            });
        } else {
            setData({
                ...data,
                isValiedPassword: false,
            });
        }
    }

    const handleConfirmPasswordChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                confirm_password: val,
                isValiedConfirmpassword: true,
            });
        } else {
            setData({
                ...data,
                isValiedConfirmpassword: false,
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={styles.text_footer}>First name</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your First name"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textFirstName(val)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                </Animatable.View>
                : null}
            </View>
            {data.isValiedfirstname ?false:
                <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMasg}>Please Enter Your First Name</Text>
            </Animatable.View>
             }
            <Text style={styles.text_footer}>Last Name</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Username"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textLastName(val)}
                />
            </View>
            {data.isValiedlastname ?false:
                <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMasg}>Please Enter Your Last Name</Text>
            </Animatable.View>
             }
             <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Phone Number</Text>
                <PhoneInput
            // ref={phoneInput}
            // defaultValue={value}
            // defaultCode="DM"
            // onChangeText={(text) => {
            //   setValue(text);
            // }}
            onChangeFormattedText={(number) => {textnumber(number)
            }}
          />
            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-circle-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    type="email"
                    placeholder="Your Email"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onEndEditing={(e)=>handleValiedUser(e.nativeEvent.text)}
                    onChangeText={(val) => textEmail(val)}
                />
                {data.isValiedEmailicon ?
                <Animatable.View
                    animation="bounceIn"
                > 
                <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />


                </Animatable.View>
                : true}
            </View>
            {data.isValiedEmail ?false:
                <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMasg}>Email id Already Exist</Text>
            </Animatable.View>
             }
            
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            {data.isValiedPassword ?false:
                <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMasg}>Please Enter Your Password</Text>
            </Animatable.View>
             }
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Confirm Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Confirm Your Password"
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
                >
                    {data.confirm_secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            {data. isValiedConfirmpassword ?false:
                <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMasg}>Please Enter Your Confirm Password</Text>
            </Animatable.View>
             }

       
 
            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By signing up you agree to our
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => registerUser()}
                >
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign Up</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Sign In</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    errorMasg:{
        color: 'red'
    }
  });