import React, {Component} from 'react';
import {
  Text,
  View,
  Alert,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  ImageBackground,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {styles} from './Login';

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      secure: true,
      secure2: true,
      loading: false,
    };
  }

  register() {
    if (
      this.state.name &&
      this.state.email &&
      this.state.password &&
      this.state.password_confirmation != ''
    ) {
      this.setState({loading: true});
      console.log('mendaftar..');
      const {name, email, password, password_confirmation} = this.state;
      let kirimData = {
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
      };
      fetch('', {
        method: 'POST',
        body: JSON.stringify(kirimData),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((responseJSON) => {
          console.log(responseJSON);
          if (responseJSON.token != null) {
            AsyncStorage.setItem('token', responseJSON.token);
            this.props.navigation.replace('Dashboard');
          } else {
            this.setState({loading: false});
            this.fatal();
          }
        })
        .catch((err) => this.fatal(err));
    } else {
      this.setState({loading: false});
      ToastAndroid.show('Harap isi yang benar', ToastAndroid.SHORT);
    }
  }

  fatal(err) {
    console.log(err);
    Alert.alert(
      'Kesalahan Koneksi',
      'Harap periksa koneksi Anda',
      [
        {
          text: 'Ulangi',
          onPress: () => this.register(),
        },
        {
          text: 'Ok',
        },
      ],
      {cancelable: false},
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          blurRadius={1}
          style={styles.bg}
          source={require('../assets/bg.jpg')}>
          <View style={styles.mainView}>
            <View style={styles.subView}>
              <ScrollView>
                <View style={styles.mainSubView}>
                  <Text style={styles.text}> Register </Text>
                  <View style={{width: '95%'}}>
                    <View style={{margin: 5}}></View>
                    <Text> Nama Lengkap</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={require('../assets/user-outline.png')}
                        style={styles.imgIcon}
                      />
                      <TextInput
                        style={{flex: 1}}
                        underlineColorAndroid="orange"
                        placeholder="Masukan Nama Lengkap"
                        onChangeText={(input) => this.setState({email: input})}
                      />
                    </View>
                    <View style={{margin: 5}}></View>
                    <Text> Email</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={require('../assets/gmail-logo.png')}
                        style={styles.imgIcon}
                      />
                      <TextInput
                        style={{flex: 1}}
                        underlineColorAndroid="orange"
                        placeholder="surelanda@gmail.com"
                        onChangeText={(input) => this.setState({email: input})}
                      />
                    </View>
                    <View style={{margin: 5}}></View>
                    <Text> Kata Sandi</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={require('../assets/locked-padlock-outline.png')}
                        style={styles.imgIcon}
                      />
                      <TextInput
                        style={{flex: 1}}
                        underlineColorAndroid="orange"
                        secureTextEntry={this.state.secure}
                        placeholder="Kata Sandi"
                        onChangeText={(input) =>
                          this.setState({password: input})
                        }
                      />
                      {this.state.secure ? (
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({secure: !this.state.secure})
                          }>
                          <Image
                            source={require('../assets/locked-padlock.png')}
                            style={styles.imgIcon}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({secure: !this.state.secure})
                          }>
                          <Image
                            source={require('../assets/unlocked-padlock.png')}
                            style={styles.imgIcon}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                    <View style={{margin: 5}}></View>
                    <Text> Konfirmasi Kata Sandi</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={require('../assets/locked-padlock-outline.png')}
                        style={styles.imgIcon}
                      />
                      <TextInput
                        style={{flex: 1}}
                        underlineColorAndroid="orange"
                        secureTextEntry={this.state.secure2}
                        placeholder="Konfirmasi Kata Sandi"
                        onChangeText={(input) =>
                          this.setState({password_confirmation: input})
                        }
                      />
                      {this.state.secure2 ? (
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({secure2: !this.state.secure2})
                          }>
                          <Image
                            source={require('../assets/locked-padlock.png')}
                            style={styles.imgIcon}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() =>
                            this.setState({secure2: !this.state.secure2})
                          }>
                          <Image
                            source={require('../assets/unlocked-padlock.png')}
                            style={styles.imgIcon}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                  <View style={{margin: 2}}></View>
                  <TouchableNativeFeedback>
                    <View style={styles.button}>
                      <Text style={styles.textButton}>Daftar</Text>
                    </View>
                  </TouchableNativeFeedback>
                  <TouchableNativeFeedback
                    onPress={() => this.props.navigation.goBack()}>
                    <View style={{marginTop: 10}}>
                      <Text style={{fontWeight: 'bold'}}>Masuk</Text>
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </ScrollView>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
