import React, { useState,useRef,useEffect } from 'react';
import { Text, View, Dimensions, StyleSheet,Image ,TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel'; 

import { Icon } from "react-native-elements";
import DataFetcher from '../Utils/DataFetcher'
import AppLoading from 'expo-app-loading';
import { scrollInterpolator, animatedStyles } from '../Utils/animation';
import { useFonts, LobsterTwo_700Bold } from '@expo-google-fonts/lobster-two';


const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);



const HomeScreen = (props) => {
  const { navigation } = props;
    const carouselRef = useRef(null);
    const [data, setData] = useState([]);

  
    useEffect(() => {

        setData(  DataFetcher.shared.getData());
    
      
  
     
    }, [])
    let [fontsLoaded] =useFonts({
      LobsterTwo_700Bold,
    });

  const _renderItem=({item})=>{
    return (
      <TouchableOpacity onPress={()=>{
    
        navigation.navigate("Infos",{
       groundid:item.idGround
      })}}>
        <View style={styles.itemContainer}>
         
        <Image    source={{uri:item.groundPhoto}} style={styles.itemLabel}/>
        
      </View>
      <TouchableOpacity style={styles.TextContainor}>
      <Text style={styles.counter}
      >
       {item.groundName}
      </Text>
      <Text style={styles.subText}
      >
       {item.address}
      </Text></TouchableOpacity>
      </TouchableOpacity>
    )
}

 if (!fontsLoaded) {
  return <AppLoading />;
}
    return (

      <View style={{backgroundColor:"#fff",flex:1}}>
        <View style={{alignItems:"center",marginTop:15}}>
        <View style={{flexDirection:"row",alignItems:"center"}}>
                      <Icon
              color={'#000' }
                            
              disabledStyle={{}}
              iconProps={{}}
              iconStyle={{}}
              name={"basketball"}
              onLongPress={() => onLongPress()}
              onPress={() => onPress()}
              size={30}

              type="material-community"
              />
               <Text style={{fontFamily:"LobsterTwo_700Bold",fontSize:22,fontWeight: 'bold',
                 textAlign: 'center'}}>Uballers</Text> 
              </View>
              </View>
              <Carousel
                ref={carouselRef}
                data={data}
                renderItem={ _renderItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                containerCustomStyle={styles.carouselContainer}
                inactiveSlideShift={0}
              
                scrollInterpolator={scrollInterpolator}
                slideInterpolatedStyle={animatedStyles}
                useScrollView={true}          
              />
        
        
      </View>
    );
  }

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 50
  },
  itemContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',

  },
  itemLabel: {
    borderRadius:20,
   width:300,
   height:378,
    
  },
  itemTop: {
    borderRadius:20,
  height:70,

  },
  counter: {
    color:"#000",
    marginBottom: 10,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft:10,
    alignItems:"center"
  
  }
  ,TextContainor:
  {
    height:50,
    
   marginTop:25,
  
    borderTopEndRadius:20,

  },
  subText:{
    color:"#808080",
    marginBottom: 10,
    fontSize: 15,
   
    marginLeft:10,
    alignItems:"center"
  }
});
export default HomeScreen;