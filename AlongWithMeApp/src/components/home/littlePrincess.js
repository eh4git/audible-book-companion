import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  Button,
  TouchableHighlight,
  ImageBackground
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { connect } from 'react-redux';
import { autoSignIn } from '../../store/actions/user_actions';
import { getTokens, setTokens } from '../../utils/misc';
import Puppy from '../../assets/Puppy.mp4';
import Highlighter from 'react-native-highlight-words';
import { rain1, fire1, fire2, fire3 } from "../../utils/sounds"
import background from "../../assets/images/littlePrincessBackground.jpg"

let story = `Whatsoever she meant, Ermengarde was sure it was something delightfully exciting. So, quite thrilled with expectation, she followed her on tiptoe along the passage. They made not the least noise until they reached the door. Then Sara suddenly turned the handle, and threw it wide open. Its opening revealed the room quite neat and quiet, a fire gently burning in the grate, and a wonderful doll sitting in a chair by it, apparently reading a book. 

    “Oh, she got back to her seat before we could see her!” Sara explained. 
  
    “Of course they always do. They are as quick as lightning.” Ermengarde looked from her to the doll and back again. 
  
    “Can she—walk?” she asked breathlessly. 
  
    “Yes,” answered Sara. “At least I believe she can. At least I pretend I believe she can. And that makes it seem as if it were true. Have you never pretended things?” 
  
    “No,” said Ermengarde. “Never. I—tell me about it.” She was so bewitched by this odd, new companion that she actually stared at Sara instead of at Emily—notwithstanding that Emily was the most attractive doll person she had ever seen. 
  
    “Let us sit down,” said Sara, “and I will tell you. It’s so easy that when you begin you can’t stop. You just go on and on doing it always. Emily, you must listen. This is Ermengarde St. John, Emily. Ermengarde, this is Emily. Would you like to hold her?” 
  
    “Oh, may I?” said Ermengarde. “May I, really? She is beautiful!” And Emily was put into her arms. Never in her dull, short life had Miss St. John dreamed of such an hour as the one she spent with the queer new pupil before they heard the lunch-bell ring and were obliged to go downstairs. Sara sat upon the hearth-rug and told her strange things. She sat rather huddled up, and her green eyes shone and her cheeks flushed. She told stories of the voyage, and stories of India; but what fascinated Ermengarde the most was her fancy about the dolls who walked and talked, and who could do anything they chose when the human beings were out of the room, but who must keep their powers a secret and so flew back to their places “like lightning” when people returned to the room`;

let keyword = "fire";
let backgroundColorHighlight;

class PrincessComponent extends Component {

  state = {
    loading: false,
    isAuth: false
  }

  manageState(loading, isAuth) {
    this.setState({
      loading,
      isAuth
    })
  }

  componentDidMount() {
    const User = this.props.User;

    getTokens((value) => {
      if (value[0][1] === null) {
        this.manageState(false, false)
      } else {
        this.props.dispatch(autoSignIn(value[0][1]))
          .then(() => {
            !User.auth.token ?
              this.manageState(false, false)
              :
              setTokens(User.auth, () => {
                this.manageState(false, true)
              })
          })
      }
    })
  }


  // constructor() {
  //   super();
  //   this.state = {
  //     TextHolder: `Whatsoever she meant, Ermengarde was sure it was something delightfully exciting. So, quite thrilled with expectation, she followed her on tiptoe along the passage. They made not the least noise until they reached the door. Then Sara suddenly turned the handle, and threw it wide open. Its opening revealed the room quite neat and quiet, a fire gently burning in the grate, and a wonderful doll sitting in a chair by it, apparently reading a book. “Oh, she got back to her seat before we could see her!” Sara explained. “Of course they always do. They are as quick as lightning.” Ermengarde looked from her to the doll and back again. “Can she—walk?” she asked breathlessly. “Yes,” answered Sara. “At least I believe she can. At least I pretend I believe she can. And that makes it seem as if it were true. Have you never pretended things?” “No,” said Ermengarde. “Never. I—tell me about it.” She was so bewitched by this odd, new companion that she actually stared at Sara instead of at Emily—notwithstanding that Emily was the most attractive doll person she had ever seen. “Let us sit down,” said Sara, “and I will tell you. It’s so easy that when you begin you can’t stop. You just go on and on doing it always. And it’s A Little Princess: Chapter 3 by Frances Hodgson Burnett 6 Created for Lit2Go on the web at etc.usf.edu beautiful. Emily, you must listen. This is Ermengarde St. John, Emily. Ermengarde, this is Emily. Would you like to hold her?” “Oh, may I?” said Ermengarde. “May I, really? She is beautiful!” And Emily was put into her arms. Never in her dull, short life had Miss St. John dreamed of such an hour as the one she spent with the queer new pupil before they heard the lunch-bell ring and were obliged to go downstairs. Sara sat upon the hearth-rug and told her strange things. She sat rather huddled up, and her green eyes shone and her cheeks flushed. She told stories of the voyage, and stories of India; but what fascinated Ermengarde the most was her fancy about the dolls who walked and talked, and who could do anything they chose when the human beings were out of the room, but who must keep their powers a secret and so flew back to their places “like lightning” when people returned to the room`
  //   }
  // }

  playSound() {
    console.warn(this);
    // console.warn(this.children)
    if (this.children === 'fire') {
      console.warn("ITS A FIRE");
      fire1.play();
    }
    else if (this.children === 'grate') {
      console.warn("ITS A GRATE")
    }
  }

  stopSound() {
    fire1.stop()
  }

  render() {
    const params = this.props.navigation.state.params;

    return (
      <View style={styles.main}>
        <ImageBackground source={background} style={styles.background} >
          <ScrollView style={styles.scroll} >

            {/* <Button
            title="Find Keywords"
            onPress={this.replaceTextFunction}
          /> */}
            <Text style={styles.textContainer}>

              <Highlighter
                highlightStyle={{ backgroundColor: 'yellow' }}
                searchWords={[/\b\Fire\b/gi, /\b\Rain\b/gi, /\b\Forest\b/gi]}
                textToHighlight={story}
                onPressHighlightedText={this.playSound}
                onPressNormalText={this.stopSound}
              />

            </Text>

          </ScrollView>
        </ImageBackground>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  background: {
    resizeMode: "cover",
    position: "absolute",
    height: 560,
    flex: 1,
    // margin: 5,
    
  },
  scroll: {
    marginTop: 100,
    marginBottom: 70
  },
  textContainer: {
    marginLeft: 25,
    marginRight: 25
  //  marginTop: 75,
  //  marginBottom: 70
  }
});

function mapStateToProps(state) {
  return {
    User: state.User
  }
}

export default connect(mapStateToProps)(PrincessComponent);