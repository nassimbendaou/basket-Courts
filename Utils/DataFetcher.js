


class DataFetcher {

    constructor(){
        this.customData = require('../assets/Test Uballers - groundsData.json');
       
        this.data=[this.customData.ground1,this.customData.ground2]

    }

    getFavorit=()=>{
        let myfav=[];
        this.data.forEach(element => {
            if(element.favorit===true){
                 myfav.push(element);
            }
        });
        return myfav;
    }

    setFavorit=(id,action)=>{
     
        this.data.forEach(element => {
            if(element.idGround===id){
                 element.favorit=action;
                 console.log(element)
            }
        });
        if(this.customData.ground1.idGround===id){
            this.customData.ground1.favorit=action;
        }
        else{
            this.customData.ground2.favorit=action;
        }
      
       
    // this.fs.writeFileSync('../assets/Test Uballers - groundsData.json', JSON.stringify(this.customData));
        
    }
    getGround=(id)=>{
     let ground={}
  
        this.data.forEach(element => {
        
            if(element.idGround===id){
               ground=element;
                
            }
        });
     
        return ground;
     //   this.customData.writeFileSync('../assets/Test Uballers - groundsData.json', JSON.stringify(this.customData));
        
    }

    
  getData= ()=>{
      return   this.data;
  }

  
}
DataFetcher.shared=new DataFetcher();

export default DataFetcher;