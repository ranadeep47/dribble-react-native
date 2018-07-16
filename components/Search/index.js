import React from 'react';
import { StyleSheet, View, TextInput, Image } from 'react-native';
import { colors, gradients, fontSizes } from '../../constants/styles'
import SearchIcon from '../../assets/images/search.png'

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }
  }

  render() {
    return (
      <View>
        <Image style={styles.icon} source={SearchIcon}/>
        <TextInput
          style={styles.input}
          onChangeText={(search) => this.setState({search})}
          value={this.state.search}
          placeholder="Search"
          placeholderTextColor={colors.text}
          returnKeyType="search"
          underlineColorAndroid="transparent"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {

  },
  icon: {
    width: 14,
    height: 14,
    position: 'absolute',
    left: 10,
    top: 10,
  },
  input: {
    padding: 8,
    paddingLeft: 36,
    borderRadius: 8,
    width: 160,
    height: 36,
    fontSize: fontSizes.md,
    backgroundColor: colors.inputBackground
  }
})
