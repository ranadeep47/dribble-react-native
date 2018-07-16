import React from 'react';
import { StyleSheet, View, Text, Animated, TextInput,
  ScrollView, Dimensions, FlatList, Image, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo'
import { Transition } from 'react-navigation-fluid-transitions';

import { colors, gradients, fontSizes } from '../constants/styles'

import Title from '../components/Title'
import Avatar from '../components/Avatar'
import IconButton from '../components/IconButton'

import ViewsIcon from '../assets/images/views.png'
import LikesIcon from '../assets/images/like.png'
import CommentIcon from '../assets/images/comment.png'
import DropIcon from '../assets/images/drop.png'

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export default class Shot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  static navigationOptions = {
    header: null,
    headerTransparent: true
  }

  componentDidMount() {
    
  }

  _onBack = () => {
    this.props.navigation.goBack();
  }

  _onBucket = () => {

  }

  _onShare = () => {

  }

  render() {
    let shotColors = ["4325B0","9E3DD7","632FC9","D765E5","6631EC","310A74","7AD0FD"]
    const { navigation } = this.props;

    return (
        <ScrollView style={{flex: 1}}>
          <Transition shared='shot'>
            <View style={styles.cover}>
              <Image style={styles.shot} source={{uri: navigation.getParam('image')}} />
              <View style={styles.back}>
                <IconButton name="back" onPress={this._onBack} />
              </View>
              <View style={styles.bucket}>
                <IconButton name="bucket" onPress={this._onBucket} />
              </View>
              <View style={styles.share}>
                <IconButton name="share" onPress={this._onShare} />
              </View>
            </View>
          </Transition>
          <LinearGradient
            style={styles.container}
            colors={gradients.background}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 28, paddingVertical: 16}}>
              <View style={{flexDirection: 'row'}}>
                <Avatar size={30} source={"https://cdn.dribbble.com/users/46302/avatars/small/cf95f910122c9c29efe00f199404d074.png"} />
                <View style={{paddingHorizontal: 8, width: 100}}>
                  <Text style={{color: colors.white}}>Walid Beno</Text>
                  <Text style={{color: colors.text}}>Jul 8, 2018</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View style={{flexDirection: 'row', marginHorizontal: 4, alignItems: 'center'}}>
                  <Image resizeMode="center" style={styles.icon} source={ViewsIcon} />
                  <Text style={{color: colors.white}}>1,450</Text>
                </View>
                <View style={{flexDirection: 'row', marginHorizontal: 4, alignItems: 'center'}}>
                  <Image resizeMode="center" style={styles.icon} source={LikesIcon} />
                  <Text style={{color: colors.white}}>120</Text>
                </View>
                <View style={{flexDirection: 'row', marginHorizontal: 4, alignItems: 'center'}}>
                  <Image resizeMode="center" style={styles.icon} source={CommentIcon} />
                  <Text style={{color: colors.white}}>46</Text>
                </View>
              </View>
            </View>

            <View style={styles.separator}></View>

            <View style={{paddingHorizontal: 28, paddingVertical: 16}}>
              <Title>City planning</Title>
              <Text style={{color: colors.text, width: 100}}>
                Hi guys, check x2
                Hope you like it
                Thank you! 🏀
              </Text>
              <Text style={{fontFamily: 'GTWalsheimProBold', marginVertical: 16, color: colors.white}}>Tags</Text>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                {
                  ['illustration', 'gradient', 'art', 'isometric', '3D'].map((item, i) => {
                    return (
                      <View key={i} style={styles.tag}>
                        <Text style={{color: colors.white}}>{item}</Text>
                      </View>
                    )
                  })
                }
              </View>
            </View>

            <View style={styles.separator}></View>

            <View style={{paddingHorizontal: 28, paddingVertical: 16}}>
              <Text style={{lineHeight: 16, color: colors.white}}>Attachments</Text>
              <Image style={styles.attachment} source={{uri: "https://cdn.dribbble.com/users/1786655/screenshots/4756989/fazheg-xiaotu_1x.png"}} />
            </View>

            <View style={styles.separator}></View>

            <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 28, paddingVertical: 16}}>
              <Image resizeMode="center" style={[styles.icon,styles.drop]} source={DropIcon} />
              <View style={{flexDirection: 'row', borderRadius: 6}}>
                {
                  shotColors.map((color, i) => {
                    let borderStyles = {}
                    if(i === 0) borderStyles = {borderTopLeftRadius: 6, borderBottomLeftRadius: 6}
                    if(i === shotColors.length - 1) borderStyles = {borderTopRightRadius: 6, borderBottomRightRadius: 6}
                    return (
                        <View key={i} style={[styles.color, {backgroundColor: `#${color}`}, borderStyles]}></View>
                    )
                  })
                }
              </View>
            </View>

            <View style={styles.separator}></View>

            <View style={{paddingHorizontal: 28}}>
              {
                comments.map((comment, i) => {
                  return (
                    <View key={i} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16}}>
                      <View style={{flexDirection: 'row'}}>
                        <Avatar size={30} source={comment.avatar} />
                        <View style={{marginHorizontal: 8, width: 150}}>
                          <Text style={{color: colors.white}}>{comment.name}</Text>
                          <Text style={{color: colors.text}} numberOfLines={3}>{comment.comment}</Text>
                        </View>
                      </View>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontSize: 10, color: colors.text}}>{comment.time}</Text>
                        <TouchableOpacity style={{marginHorizontal: 8}}><Text style={{color: colors.text, fontSize: 10}}>Like</Text></TouchableOpacity>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image style={{width: 8, height: 8, marginRight: 4, opacity: 0.6}} source={LikesIcon} />
                          <Text style={{fontSize: 10, color: colors.text}}>{comment.likes}</Text>
                        </View>
                      </View>
                      <View style={styles.separator}></View>
                    </View>
                  )
                })
              }
            </View>
          </LinearGradient>
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: screenHeight
  },
  cover: {

  },
  shot: {
    width: 375,
    height: 281.25
  },
  back: {
    position: 'absolute',
    left: 12,
    top: 36
  },
  bucket: {
    position: 'absolute',
    bottom: 16,
    right: 48
  },
  share: {
    position: 'absolute',
    bottom: 16,
    right: 12
  },
  icon: {
    width: 16,
    height: 16,
    marginHorizontal: 4
  },
  separator: {
    height: 1,
    opacity: 0.1,
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "#ffffff"
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: colors.iconBackground,
    borderRadius: 6
  },
  attachment: {
    width: 100,
    height: 75,
    marginVertical: 8,
    borderRadius: 6
  },
  drop: {
    marginHorizontal: 0,
    marginRight: 8
  },
  color: {
    width:42,
    height: 24
  }
})

const comments = [
  {
    name: "Uncut Corners",
    avatar: "https://cdn.dribbble.com/users/59899/avatars/normal/e6c54e16d3c6450358d25b4ffd02cd0a.png?1451941673",
    comment: "So cool!",
    time: "5 minutes ago",
    likes: 1
  },
  {
    name: "JPstyle",
    avatar: "https://cdn.dribbble.com/users/1652712/avatars/normal/a388ecd5707c9cd24f17f60e0a44a41a.png?1528645588",
    comment: "cool, i like it ",
    time: "30 hours ago",
    likes: 4
  },
  {
    name: "Al Power",
    avatar: "https://cdn.dribbble.com/users/10549/avatars/normal/dc6533ad10392aae9da1a6aba126da45.png?1522138242",
    comment: "Crazy amount of stuff you're posting, each better then the last too...it makes me sick i cant do it haha",
    time: "2 days ago",
    likes: 2
  },
]
