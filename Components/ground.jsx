
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Animated,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import GradientButton from 'react-native-gradient-buttons';

import { Icon  ,Divider}from  "react-native-elements"
import DataFetcher from '../Utils/DataFetcher';


function Ground ({ route, navigation }) {
 const [scrollY, SetScrollY] = useState( new Animated.Value(0));
 const { groundid } = route.params;


 const [data, setData] = useState(DataFetcher.shared.getGround(groundid));
 const [isFav, setIsFav] = useState(data.favorit)
 
   const _handleData=(key,value)=>{
      return(
        <View>
      <View style={{flexDirection:"row",marginTop:15,justifyContent: 'space-between'}}>
      <Text style={{fontFamily:"LobsterTwo_700Bold", fontWeight: 'bold', fontSize: 18, marginLeft:30,marginTop:10}}>
      {key}
      </Text>
        <TouchableOpacity
          style={{marginLeft:100,
         alignItems:"flex-end",
        marginRight:10
        }} 
        ><Text style={{ width:120,fontWeight: '300',color:"#696969", fontSize: 15, marginTop:10}}>
        {value+" "}
        </Text>
      </TouchableOpacity>
    </View>
    <Divider style={{backgroundColor:"#DFDFDF",width:SCREEN_WIDTH-50,alignSelf:"center",marginTop:20,marginBottom:10}}/>
     </View>
    )
    }
  
 
 
    const SCREEN_WIDTH = Dimensions.get('window').width;
    const HEADER_MAX_HEIGHT = 120;
    const HEADER_MIN_HEIGHT = 70;
    const PROFILE_IMAGE_MAX_HEIGHT = 80;
    const PROFILE_IMAGE_MIN_HEIGHT = 40;
 const headerHeight = scrollY.interpolate({
  inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
  outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
  extrapolate: 'clamp'
});
const profileImageHeight = scrollY.interpolate({
  inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
  outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
  extrapolate: 'clamp'
});

const profileImageMarginTop = scrollY.interpolate({
  inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
  outputRange: [
    HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2,
    HEADER_MAX_HEIGHT + 5
  ],
  extrapolate: 'clamp'
});
const headerZindex = scrollY.interpolate({
  inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT, 120],
  outputRange: [0, 0, 1000],
  extrapolate: 'clamp'
});

const headerTitleBottom =scrollY.interpolate({
  inputRange: [
    0,
    HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
    HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT,
    HEADER_MAX_HEIGHT -
      HEADER_MIN_HEIGHT +
      5 +
      PROFILE_IMAGE_MIN_HEIGHT +
      26
  ],
  outputRange: [-20, -20, -20, 0],
  extrapolate: 'clamp'
});
 
    return (
      <View style={{ flex: 1,backgroundColor:"white" }}>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: 'black',
            height: headerHeight,
            zIndex: headerZindex,
            elevation: headerZindex, //required for android
            alignItems: 'center',
            
          }}
        >
          <Animated.View
            style={{ position: 'absolute', bottom: headerTitleBottom }}
          >
            <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}>
            {data.groundName}
            </Text>
          </Animated.View>
        </Animated.View>

        <ScrollView
          style={{ flex: 1 }}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: scrollY } } }
          ])}
        >
          <Animated.View
            style={{
              width:300,
              height:200,
              alignSelf:"center",
              borderColor: 'white',
              borderWidth: 3,
              overflow: 'hidden',
              marginTop: 20,
              borderRadius:20
              
            }}
          >
            <Image
              source={{uri:data.groundPhoto}}
            
              style={{ flex: 1,  width:300,
                height:378 }}
            />
          </Animated.View>
          <View style={{flexDirection:"row",marginTop:15,justifyContent: 'space-between'}}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, paddingLeft: 10 ,marginLeft:30,marginTop:10}}>
            {data.groundName}
            </Text>
           
           
            <TouchableOpacity
      style={{backgroundColor:"#000",marginRight:50,width:50,height:50,
      borderRadius:25,alignItems:"center"  }}
     onPress={()=>{
       if(data.favorit==undefined){
        DataFetcher.shared.setFavorit(data.idGround,true)
          data.favorit=true;
        setData(data);
        setIsFav(isFav)
    
      }
       else{ 
        DataFetcher.shared.setFavorit(data.idGround,!data.favorit)
         data.favorit=!isFav;
        setIsFav(!isFav);
        setData(data);}
      
     }}><Icon
    name={"star"}
     type='font-awesome'
     size={25}
     style={{marginTop:12}}
     color={isFav ? '#f1f500':'#fff'} /></TouchableOpacity>
          </View>
         
          <Text style={{   color:"#808080",
    marginBottom: 10,
    fontSize: 15,
   width:200,
    marginLeft:40,
    alignItems:"center"}}>
           {data.address}
            </Text>
          <Divider style={{backgroundColor:"#DFDFDF",height:1,width:SCREEN_WIDTH-50,alignSelf:"center",marginTop:20,marginBottom:10}}/>
          {_handleData('Coutry',data.country)}
          {_handleData('City',data.city)}
          {_handleData('Description',data.groundDescription)}
          {_handleData('Basket Number',data.basketNumber)}
          {_handleData('Limit',data.limit)}
          {_handleData('Localisation:','Latitude:'+data.latitude+' \nLongitude :'+data.longitude)}
          {_handleData('Transport',data.transport)}

          
        </ScrollView>
       
      </View>
    );
  }

export default Ground;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});