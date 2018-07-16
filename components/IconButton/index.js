import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity
} from 'react-native';

import { colors, gradients, fontSizes } from '../../constants/styles'

import CommentIcon from '../../assets/images/comment.png'
import LikeIcon from '../../assets/images/like.png'
import BucketIcon from '../../assets/images/bucket.png'
import ShareIcon from '../../assets/images/share.png'
import BackIcon from '../../assets/images/left.png'

const icons = {
  'like': LikeIcon,
  'comment': CommentIcon,
  'bucket': BucketIcon,
  'share': ShareIcon,
  'back': BackIcon
}

const IconButton = (props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Image resizeMode="center" style={styles.icon} source={icons[props.name]}/>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.iconBackground,
    width: 24,
    height: 24,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4
  },
  icon: {
    width: 12,
    height: 12
  }
})

export default IconButton
