import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View
} from 'react-native';

const Avatar = (props) => {
  let size = props.size;
  if(!size) size = 36;

  return (
    <View>
      <Image style={[{width: size, height: size, borderRadius: size/2}, props.style]} source={{uri: props.source}}/>
    </View>
    )
}

const styles = StyleSheet.create({
  
})

export default Avatar
