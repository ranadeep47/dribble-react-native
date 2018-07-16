import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors, gradients, fontSizes } from '../../constants/styles'

const Title = (props) => {
  return (
    <Text style={styles.title}>{props.children}</Text>
  )
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'GTWalsheimProBold',
    fontSize: fontSizes['x-lg'],
    color: colors.white
  }
})

export default Title
