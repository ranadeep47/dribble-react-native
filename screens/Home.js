import React from 'react';
import { StyleSheet, View, Text, Animated, TextInput,
  ScrollView, Dimensions, FlatList, Image, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo'
import { colors, gradients, fontSizes } from '../constants/styles'

import Title from '../components/Title'
import Swipedeck from '../components/Swipedeck'
import Avatar from '../components/Avatar'
import Search from '../components/Search'
import Switch from '../components/Switch'

import TrendingIcon from '../assets/images/stats.png'
import PlusIcon from '../assets/images/plus.png'

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      dribbbles,
      trending
    }
  }

  static navigationOptions = {
    header: null,
    headerTransparent: true
  }

  _renderDribbble = ({item}) => {
    return (
      <View style={{marginRight: 16}}>
        <Image style={styles.dribbble} source={{uri: item.image}} />
      </View>
    )
  }

  _onFollow = (item) => {

  }

  _renderDesigner = ({item}) => {
    let followerCount = item.followers / 1000 + "k"
    return (
      <View style={styles.chartItem}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Avatar size={30} source={item.avatar}/>
          <View style={{marginHorizontal: 8, width: 100}}>
            <Text style={styles.designer}>{item.name}</Text>
            <Text style={styles.followers}>{followerCount} followers</Text>
          </View>
          <Image style={styles.trending} source={TrendingIcon}/>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: colors.text, marginRight: 12}}>Follow</Text>
          <LinearGradient colors={gradients.button} style={{borderRadius: 6}}>
            <TouchableOpacity style={styles.follow} onPress={this._onFollow.bind(this, item)}>
              <Image style={styles.plus} source={PlusIcon}/>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    )
  }

  _onLocationSwitch = (location) => {

  }

  _onShotClick = (shot) => {    
    this.props.navigation.navigate('Shot', shot)
  }

  render() {
    return (
        <ScrollView style={{flex: 1}} ref={(c) => { this.scrollView = c; }}>
          <LinearGradient
            style={styles.container}
            colors={gradients.background}>

            <View style={[styles.header, {marginVertical: 16}]}>
              <Avatar size={36} source={'https://randomuser.me/api/portraits/men/29.jpg'} />
              <Search />
            </View>

            <View>
              <View style={[styles.header, {marginBottom: 8}]}>
                <Title>Popular</Title>
                <Text style={{color: colors.text}}>See all</Text>
              </View>
              <Swipedeck
                onPress={this._onShotClick}
                style={styles.deck}
                onSwipe={(isBeingSwiped) => this.scrollView.setNativeProps({ scrollEnabled: !isBeingSwiped })}/>
            </View>

            <View>
              <View style={styles.header}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Title>Recent</Title>
                  <Text style={{color: colors.text, paddingHorizontal: 8}}>Based on your following</Text>
                </View>
                <Text style={{color: colors.text}}>See all</Text>
              </View>
              <FlatList
                style={styles.dribbbleList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => 'item-'+index}
                renderItem={this._renderDribbble}
                data={this.state.dribbbles} />
            </View>

            <View>
              <View style={styles.header}>
                <Title>Charts</Title>
                <Switch data={["Global", "USA"]} onChange={this._onLocationSwitch} />
              </View>
              <FlatList
                keyExtractor={(item, index) => 'item'+index}
                renderItem={this._renderDesigner}
                data={this.state.trending}
                ItemSeparatorComponent={() => <View style={styles.separator}></View>}
                style={styles.charts}/>
            </View>

          </LinearGradient>
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 28,
    // marginTop: 32,
    minHeight: screenHeight
  },
  deck: {
    marginVertical: 32,
    height: screenWidth * 0.85 * 0.75
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dribbbleList: {
    marginVertical: 16
  },
  dribbble: {
    width: 100,
    height: 75,
    borderRadius: 4
  },
  charts: {

  },
  chartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16
  },
  trending: {
    width: 24,
    height: 24,
    marginLeft: 8
  },
  designer: {
    color: colors.white
  },
  followers: {
    fontFamily: 'GTWalsheimProBold',
    color: colors.pink
  },
  follow: {
    padding: 8,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  plus: {
    width: 8,
    height: 8
  },
  separator: {
    height: 1,
    opacity: 0.1,
    borderStyle: "solid",
    borderWidth: 0.5,
    borderColor: "#ffffff"
  }
})

const dribbbles = [
  {
    image: "https://cdn.dribbble.com/users/1511842/screenshots/4787016/____1x.png",
    link: "https://dribbble.com/shots/4787016-Sensuous-music"
  },
  {
    image: "https://cdn.dribbble.com/users/674925/screenshots/4787075/111734028978788705_1x.png",
    link: "https://dribbble.com/shots/4787075-Game-center2"
  },
  {
    image: "https://cdn.dribbble.com/users/1434028/screenshots/4810786/artboard_10_copy_0.5x_1x.png",
    link: "https://dribbble.com/shots/4810786-App-for-food-and-health"
  },
  {
    image: "https://cdn.dribbble.com/users/1786655/screenshots/4756989/fazheg-xiaotu_1x.png",
    link: "https://dribbble.com/shots/4756989-scenery"
  },
  {
    image: "https://cdn.dribbble.com/users/1169141/screenshots/4731836/02_1x.png",
    link: "https://dribbble.com/shots/4731836-Virtual-traffic-card-applications"
  },
  {
    image: "https://cdn.dribbble.com/users/1841113/screenshots/4787686/____1__1x.jpg",
    link: "https://dribbble.com/shots/4787686-Partner"
  }
];

const trending = [
  {
    name: "Paolo Spazzini",
    followers: 6000,
    avatar: "https://cdn.dribbble.com/users/1002086/avatars/small/38fdb709f4f841a732896232a92b3fbc.jpg"
  },
  {
    name: "Eddie Lobanovskiy",
    followers: 130998,
    avatar: "https://cdn.dribbble.com/users/14268/avatars/normal/5b1b8427c9b8559dead85f3c6d25dfbe.jpg"
  },
  {
    name: "Zhenya Rynzhuk",
    followers: 80407,
    avatar: "https://cdn.dribbble.com/users/501822/avatars/normal/7ce826e27de30a8399175a9eb0284f5a.jpg"
  },
  {
    name: "Gleb Kuznetsov",
    followers: 67640,
    avatar: "https://cdn.dribbble.com/users/32512/avatars/normal/88dd19a39ce813da9a287e3f5b98a728.png"
  },
  {
    name: "Johny vino",
    followers: 83233,
    avatar: "https://cdn.dribbble.com/users/997070/avatars/normal/47ba30f02d62b4c5a565f4e0fd99b94a.jpg"
  },
  {
    name: "Giga Tamarashvili",
    followers: 35352,
    avatar: "https://cdn.dribbble.com/users/952958/avatars/normal/0101aa0aecfb782643de2075265cf6ac.png"
  }
]
