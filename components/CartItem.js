import React from 'react';
import { Text,View,StyleSheet, Platform,TouchableOpacity } from 'react-native';
import {Ionicons} from '@expo/vector-icons'



const CartItem = props => {

    return (
      <View style={styles.continer}>
      <View style={styles.insiderow}>
      <Text style={styles.quantity}>{props.quantity}</Text>
      <Text style={styles.title} >{props.title}</Text>
      </View>
      <View style={styles.insiderow}>
      <Text style={styles.quantity}>${props.sum}</Text>
      {props.deletable&& <TouchableOpacity onPress={props.onRemove} >
      <Ionicons 
      name={Platform.OS==='android'?'md-trash':'ios-trash'}
      size={23}
      color='red'      
      />
       </TouchableOpacity>}
      </View>
      </View>
    )
}


const styles=StyleSheet.create({
continer:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:10,
    alignItems:'center',
    marginHorizontal:20

},
insiderow:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignContent:'space-between',
    alignItems:'center',

},
quantity:{
marginEnd:5,
color:'#888',
fontSize:16,
fontFamily:'open-sans-bold'
},
title:{
    fontSize:16,
    fontFamily:'open-sans-bold'
}
});

export default CartItem;
