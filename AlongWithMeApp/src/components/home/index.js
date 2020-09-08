
import React, { Component } from 'react';
import Works from "../HomeModals/works"
import Faq from '../HomeModals/faq'
import Contact from '../HomeModals/contact';

import {

  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Button,
  Modal,
  TouchableHighlight
} from 'react-native';

import { connect } from 'react-redux';


class HomeComponent extends Component {
 


  render() {
    return (

      <View style={styles.centeredView}>
                <Faq />
                <Works />
                <Contact />

      <TouchableHighlight
          style={styles.openButton}
          onPress={()=> this.props.navigation.navigate('Story')}
        >
          <Text style={styles.textStyle}>A Little Princess</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    width: '35%',
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#A25B2C",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
   
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

function mapStateToProps(state) {
  // console.log(state)
  return {
    Home: state.Home
  }
}

export default connect(mapStateToProps)(HomeComponent)