import React, { Component } from 'react';
import { Text, StyleSheet, View, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';

import HeadingText from '../../components/UI/HeadingText/HeadingText';
import Btn from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import validate from '../../utility/validation';

class RestoreWalletScreen extends Component {
   constructor(props) {
      super(props);
   }

   nextHandler = () => {
      this.props.navigator.push({
         screen: 'bcwallet.TransactionScreen',
         title: 'Transactions',
         // backButtonHidden: true
      });
   }

   state = {
      controls: {
         recoveryPhrase: {
            value: '',
            valid: false,
            validationRules: {
               minLength: 6
            },
            touched: false
         }
      }
   };

   updateInputState = (key, value) => {
      this.setState(prevState => {
         return {
            controls: {
               ...prevState.controls,
               recoveryPhrase: {
                  [key]: {
                     ...prevState.controls[key],
                     value: value,
                     valid: validate(value, prevState.controls[key].validationRules),
                     touched: true
                  }

               }
            }
         }
      });
   };

   render() {
      return (
         <KeyboardAvoidingView style={styles.mainContainer}
            behavior='padding'
         >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
               <View style={{ flex: 5 }}>
                  <View style={styles.headerContainer}>
                     <HeadingText>Obsnetwork</HeadingText>
                     <Text style={{ textAlign: 'center' }}>
                        Please type bellow your recovery phrase
                     </Text>
                  </View>
                  <View style={styles.inputContainer}>
                     <DefaultInput placeholder='your phrase' style={styles.input}
                        multiline={true}
                        numberOfLines={8}
                        value={this.state.controls.recoveryPhrase.value}
                        onChangeText={(val) => this.updateInputState('recoveryPhrase', val)}
                        valid={this.state.controls.recoveryPhrase.valid}
                        touched={this.state.controls.recoveryPhrase.touched}
                     />
                  </View>
               </View>
            </TouchableWithoutFeedback>
            <View style={styles.btnContainer}>
               <Btn textColor='black' color='#0cb'
                  onPress={this.nextHandler}
               >Next</Btn>
            </View>
         </KeyboardAvoidingView>
      )
   }
}

const styles = StyleSheet.create({
   mainContainer: {
      flex: 1,
      padding: 15,
   },
   headerContainer: {
      flex: 2
   },
   inputContainer: {
      flex: 3,
      marginLeft: 40,
      marginRight: 40,
   },
   btnContainer: {
      flex: 3,
      alignItems: 'center'
   },
   input: {
      backgroundColor: '#eee',
      borderColor: '#bbb',
      textAlign:'center',
   },
});

export default RestoreWalletScreen;
