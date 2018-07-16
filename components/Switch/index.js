import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { colors, gradients, fontSizes } from '../../constants/styles'

export default class Switch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0
    }
  }

  _onToggle = () => {
    const { currentIndex } = this.state;
    this.setState({currentIndex: 1 - currentIndex}, () => {
      this.props.onChange(this.props.data[this.state.currentIndex])
    })
  }

  _getSwtichStyles = (i) => {
    let style = [styles.tab];
    if(this.state.currentIndex === i) style.push(styles.active);
    return style;
  }

  render() {
    const { data } = this.props;
    return (
      <View style={styles.container}>
        {
          data.map((item, i) => {
            return (
              <TouchableOpacity key={i} onPress={this._onToggle} style={this._getSwtichStyles(i)}>
                    <Text style={[styles.text, this.state.currentIndex === i ? styles.activeText : null]}>{item}</Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.inputBackground,
    borderRadius: 4
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 6
  },
  active: {
    backgroundColor: colors.iconBackground,
    borderRadius: 4
  },
  text: {
    color: colors.text,
    fontSize: 8
  },
  activeText: {
    fontFamily: "GTWalsheimProBold",
    color: colors.white
  }
})
