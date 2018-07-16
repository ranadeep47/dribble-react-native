import React from 'react';
import { StyleSheet, View, Text, Animated, Image, PanResponder, Dimensions, TouchableWithoutFeedback} from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';
import { colors, gradients, fontSizes } from '../../constants/styles'
import Avatar from '../Avatar'
import IconButton from '../IconButton'

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const SWIPE_THRESHOLD = 120
const CARD_WIDTH = screenWidth * 0.85

export default class Swipedeck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: dribbbles,
      pan: new Animated.ValueXY({x: 0, y: 0}),
      anim: new Animated.Value(0)
    }

    //TODO add remove listener?
    this.state.pan.addListener((obj) => {
      this.state.anim.setValue(clamp(Math.abs(obj.x) / (screenWidth /2), 0, 1));
      // console.log(this.state.anim);
    })
  }

  _getRandomNumber() {
    return Math.floor(Math.random() * 100)
  }

  _updateDeck = () => {
    this.state.pan.setValue({x: 0, y: 0});
    this.setState({data: this.state.data.slice(1)})
  }

  _onLike = (item) => {
    console.log(item);
  }

  _onComment = (item) => {
    console.log(item);
  }

  _renderCard = (item, index) => {
    let panResponder = null;
    if(index === 0) {
      panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => {
          return true;
        },
        onMoveShouldSetPanResponder: () => {
          return true;
        },
        onPanResponderTerminationRequest: (evt, gestureState) => {
          return false;
        },
        onPanResponderGrant: (e, {dx, dy}) => {
          this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
          this.state.pan.setValue({x: 0, y: 0});
          this.props.onSwipe(true);
        },
        onPanResponderMove: Animated.event(
          [null, {dx: this.state.pan.x, dy: this.state.pan.y}],
          // {useNativeDriver: true}
        ),
        onPanResponderRelease: (e, {vx, vy}) => {
          this.state.pan.flattenOffset();
          this.props.onSwipe(false);
          var velocity;

          if (vx >= 0) {
            velocity = clamp(vx, 4, 6);
          } else if (vx < 0) {
            velocity = clamp(vx * -1, 4, 6) * -1;
          }

          if(Math.abs(this.state.pan.x._value) > SWIPE_THRESHOLD) {
            Animated.decay(this.state.pan, {
              velocity: {x: velocity, y: vy},
              deceleration: 0.98
            }).start(this._updateDeck) //TODO
          } else {
            Animated.spring(this.state.pan, {
             toValue: {x: 0, y: 0},
             friction: 5,
             // useNativeDriver: true
           }).start() //TODO
          }
        }
      })
    }

    let panHandlers = panResponder ? panResponder.panHandlers : null;

    let scale = this.state.anim.interpolate({
      inputRange: [0, 1],
      outputRange: [1 - index * 0.075, 1 - (index-1) * 0.075]
    })

    let translateY = this.state.anim.interpolate({
      inputRange: [0, 1],
      outputRange: [-1 * index * 28, -1 * (index-1) * 28]
    })

    let opacity = this.state.anim.interpolate({
      inputRange: [0, 1],
      outputRange: [1 - index * 0.4, 1 - (index - 1) * 0.4]
    })


    let zIndex = 3 - index;

    return (
        <Animated.View {...panHandlers} key={index} style={[
          styles.card,
          {transform: [{scale}, {translateY}]},
          {zIndex},
          {opacity},
          index === 0 ? {transform: [{translateX: this.state.pan.x}, {translateY: this.state.pan.y}]} : null
        ]}>
            <TouchableWithoutFeedback  onPress={() => { this.props.onPress(item) } }>
              <View>
                <Transition shared='shot'>
                  <Image style={styles.image} source={{uri: item.image}} />
                </Transition>
                <View style={styles.profile}>

                  <View style={{flexDirection: 'row'}}>
                    <Avatar size={30} source={item.avatar} />
                    <View style={{marginHorizontal: 8, width: 100}}>
                      <Text numberOfLines={1} style={{color: colors.white}}>{item.name}</Text>
                      <Text style={{color: colors.text, marginTop: 1}}>{item.date}</Text>
                    </View>
                  </View>

                  <View style={styles.actions}>
                    <IconButton name="like" onPress={() => this._onLike(item)} />
                    <IconButton name="comment" onPress={() => this._onComment(item)} />
                  </View>
                </View>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
    )
  }

  render() {
    let cards = this.state.data.slice(0,3);
    return (
      <View style={this.props.style}>
        {cards.map(this._renderCard)}
      </View>
    )
  }
}

function clamp(val, min, max) {
  if(val <= min) return min;
  if(val >= max) return max;
  return val;
}



const styles = StyleSheet.create({
  image: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 0.75, // 4:3 aspect ration
    borderRadius: 4,
  },
  card: {
    position: 'absolute'
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    paddingHorizontal: 16
  },
  actions: {
    flexDirection: 'row',
    position: 'absolute',
    right: -1 * CARD_WIDTH * 0.4
  }
})

const dribbbles = [
  {
    name: "Walid Beno",
    date: "Jul 8, 2018",
    avatar: "https://cdn.dribbble.com/users/46302/avatars/small/cf95f910122c9c29efe00f199404d074.png",
    image: "https://cdn.dribbble.com/users/46302/screenshots/4798860/new_1x.png",
    link: "https://dribbble.com/shots/4798860-STD-Testing-illustration"
  },
  {
    name: "Eddie Lobanovskiy",
    date: "May 21, 2018",
    avatar: "https://cdn.dribbble.com/users/14268/avatars/small/5b1b8427c9b8559dead85f3c6d25dfbe.jpg?1460427904",
    image: "https://cdn.dribbble.com/users/14268/screenshots/4612620/dude_1x.png",
    link: "https://dribbble.com/shots/4612620-Weekend-Painting"
  },
  {
    name: "Cuberto",
    date: "Jul 3, 2018",
    avatar: "https://cdn.dribbble.com/users/4859/avatars/small/f87f1cba59aae477687d2a53002b36e5.png?1458670017",
    image: "https://cdn.dribbble.com/users/4859/screenshots/4781041/illustration-develop-or_1x.png",
    link: "https://dribbble.com/shots/4781041-Dev-illustration"
  },
  {
    name: "Alicja Colon",
    date: "Jul 4, 2018",
    avatar: "https://cdn.dribbble.com/users/156689/avatars/small/1b8ce76ebb4a7baf8c74a5bf4b3a4e54.jpg?1452639920",
    image: "https://cdn.dribbble.com/users/156689/screenshots/4785189/ball-dribbb_1x.jpg",
    link: "https://dribbble.com/shots/4785189-Stay-on-the-ball"
  },
  {
    name: "Johar Wahyu Ngudiono",
    date: "May 30, 2018",
    avatar: "https://cdn.dribbble.com/users/487509/avatars/small/55329d8daf061bb06380baef46f1d96e.png?1530163819",
    image: "https://cdn.dribbble.com/users/487509/screenshots/4647761/bitmap_1x.png",
    link: "https://dribbble.com/shots/4647761-Event-App-Exploration"
  },
  {
    name: "Rwds",
    date: "Jul 8, 2018",
    avatar: "https://cdn.dribbble.com/users/674925/avatars/small/653922b8b5b75fca5ae33dd45115ff07.jpeg?1470820037",
    image: "https://cdn.dribbble.com/users/674925/screenshots/4799506/___3_1x.png",
    link: "https://dribbble.com/shots/4799506-Game-Center-4"
  },
  {
    name: "Backhand-kill",
    date: "Jul 5, 2018",
    avatar: "https://cdn.dribbble.com/users/1841113/avatars/small/1eea1660818ec4f0af2a076f5eb795e4.jpg?1501473224",
    image: "https://cdn.dribbble.com/users/1841113/screenshots/4787686/____1__1x.jpg",
    link: "https://dribbble.com/shots/4787686-Partner"
  },
  {
    name: "Aimm",
    date: "Jul 4, 2018",
    avatar: "https://cdn.dribbble.com/users/1511842/avatars/small/bdcb1c8116d55a7f469ef9cfe2c6bb09.jpg?1489511516",
    image: "https://cdn.dribbble.com/users/1511842/screenshots/4787016/____1x.png",
    link: "https://dribbble.com/shots/4787016-Sensuous-music"
  },
  {
    name: "Anton Fritsler (kit8)",
    date: "Jul 11, 2018",
    avatar: "https://cdn.dribbble.com/users/788099/avatars/small/d0129c5929a4cc398b19e387c3516e90.png?1445183071",
    image: "https://cdn.dribbble.com/users/788099/screenshots/4811949/girl_on_bicycle_kit8-net_1x.png",
    link: "https://dribbble.com/shots/4811949-Girl-on-bicycle"
  },
  {
    name: "febin_raj",
    date: "May 21, 2018",
    avatar: "https://cdn.dribbble.com/users/1803663/avatars/small/1771ef4d7c797804685129320dc4933f.jpg?1526534290",
    image: "https://cdn.dribbble.com/users/1803663/screenshots/4615156/lynde-point-_saybrook-inner_lighthouse-us_size-800-600px_1x.png",
    link: "https://dribbble.com/shots/4615156-Lighthouse-6"
  }
]

//https://source.unsplash.com/collection/1889046/640x480
