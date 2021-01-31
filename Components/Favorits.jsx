import React, { useEffect,useState} from 'react';
import { View, Text, FlatList,SafeAreaView ,Dimensions,TouchableOpacity} from 'react-native';
import { useFonts, LobsterTwo_700Bold } from '@expo-google-fonts/lobster-two';
import DataFetcher from '../Utils/DataFetcher';
import { Icon,Divider } from "react-native-elements";

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function Favorite ({ route, navigation }) {
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
      setData(DataFetcher.shared.getFavorit());
        
          
       
      }, [])
      handleData=()=>{
          setData(DataFetcher.shared.getFavorit());
      }
 
    return (
        <SafeAreaView style={{backgroundColor:"white",flex:1}}>
                  <View style={{alignItems:"center"}}>
        <View style={{flexDirection:"row",alignItems:"center"}}>
                      <Icon
              color={'#000' }
              name={"basketball"}
              size={30}
              type="material-community"
              />
               <Text style={{fontFamily:"LobsterTwo_700Bold",fontSize:22,fontWeight: 'bold',
                 textAlign: 'center'}}>Uballers</Text> 
              </View>
              </View>
      <FlatList
        onRefresh={() => setData(DataFetcher.shared.getFavorit())}
      refreshing={refresh}
        extraData={refresh}
        data={data}
        style={{marginTop:15}}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              
              paddingLeft: 10,
              paddingRight:10
            }}
            onPress={()=>{navigation.navigate("Infos",{
              groundid:item.idGround
               })}}>
                 <Divider style={{backgroundColor:"#DFDFDF",height:1,width:SCREEN_WIDTH-50,alignSelf:"center"}}/>
            <View style={{justifyContent: 'space-between',flexDirection:"row",marginTop:15,marginBottom:15}}>
              <Text style={{fontSize: 20,fontFamily:"LobsterTwo_700Bold"}}>{item.groundName}</Text>
              <Icon
                name={"star"}
                type='font-awesome'
                size={25}
                style={{}}
                color={'#f1f500'} />
            </View>
          </TouchableOpacity>

        )}
      />
      </SafeAreaView>
    );
  
}
