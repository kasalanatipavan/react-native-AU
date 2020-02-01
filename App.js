import React from 'react';
import { StyleSheet, Text, View,Image,ActivityIndicator,SafeAreaView, ScrollView,Linking} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isLoading:true,
      dataSource:null,
    
    }
  }

  componentDidMount(){
    fetch('https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=lgAEoKYjeo1Y9PEwsjyJZpaO3AczPGpY')
    .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
         isLoading:false,
         dataSource:responseJson.results,
       
        });
      })
    .catch((error)=>{
      console.log(error)
    });
  }
  render(){
    if (this.state.isLoading){
      return(
        <View style={styles.container}>
          <ActivityIndicator/>
        </View>
      )
    }
    else{
      let news=this.state.dataSource.map((val,key)=>{
        return <View style={styles.container}key={key} >
                <Card>
                <Card.Title title={val.section} subtitle={val.subsection} left={(props) => <Avatar.Icon {...props} icon="folder" />} />

              <Card.Content>
                
              <Card.Cover source={{ uri: val.thumbnail_standard}} />
              <Title>{val.title}</Title>
                <Paragraph>{val.abstract}</Paragraph>
              </Card.Content>
              
              <Card.Actions>
              <Button onPress={ ()=>{ Linking.openURL(val.url)}}>Read more</Button>
              </Card.Actions>
            </Card>
        </View>
      
      });
      return (

        <SafeAreaView >
      <ScrollView >
         {news}
         </ScrollView>
         </SafeAreaView>
      );
    }
 
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
    padding:10,
    flexDirection: 'column',
    borderColor:'black',
    

  },
  title:{
    flex:1,
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  }
});
