import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel from 'react-native-snap-carousel';


const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SLIDER_WIDTH * 0.50;

const carouselItems = [
  {imgUrl: 'https://love.doghero.com.br/wp-content/uploads/2018/12/golden-retriever-1.png'},
  {imgUrl: 'https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=90&strip=info&w=1024&h=682&crop=1'},
  {imgUrl: 'https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2023/12/17/866513462-gato.jpg'}
];



function carouselCardItem({ item, index }) {
  return (
    <View style={styles.cardCarousel} key={index}>
      <Image style={styles.image} source={{ uri: item.imgUrl }} />
    </View>
  );
}


export default function Home() {
    return (
    <View style={styles.container}>
      <Image source={require('./../../assets/logo.jpg')} style={styles.logo} />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>ENCONTREI UM PET</Text>
        <Icon name="paw" size={20} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>PROCURO MEU PET</Text>
        <Icon name="search" size={20} color="#000" />
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>ÚLTIMOS PETS ENCONTRADOS</Text>
      <Carousel
        data={carouselItems}
        renderItem={carouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        useScrollView={true}
      
      />


    </View>

    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 50,
      backgroundColor: '#f3ecdc',
    },
    logo: {
      width: 200,
      height: 150,
      marginBottom: 20,
    },
    formTitle: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'blueviolet',
      margin: 10,
  },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#9d6964',
      padding: 15,
      marginVertical: 10,
      borderRadius: 10,
      width: '80%',
      justifyContent: 'space-between',
    },
    buttonText: {
      color: '#000',
      fontWeight: 'bold',
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 10,
    },
    petImage: {
      width: 100,
      height: 100,
      borderRadius: 10,
      marginHorizontal: 5,
    },
    cardCarousel:{
      width: ITEM_WIDTH,
    },
    image: {
      height: 250,
      borderRadius: 8
    }
  });


