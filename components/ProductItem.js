import React from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import  Colors  from '../constants/Colors';
const ProductItem = props => {
    return (
        <TouchableOpacity onPress={props.onSelect}  >
        <View style={styles.continar}>
            <Image style={styles.Image} source={{ uri: props.Imgurl }} />
            <Text style={styles.title}>{props.Title}</Text>
            <Text style={styles.price}>${props.Price}</Text>
            <View style={styles.row}>
                {props.children}
            </View>
        </View>
        </TouchableOpacity>
        )
}

const styles = StyleSheet.create({
    continar: {
        height: 300,
        margin: 10,       
       alignItems:'center',
       elevation:5,
       shadowOpacity:.26,
       shadowRadius:8,
       shadowOffset:{width:0,height:2},
       backgroundColor:'white',
       borderRadius:10,
       shadowColor:'black',
       overflow:'hidden'

    },
    title: {
        fontSize: 20,
        fontStyle: 'italic',
        color: 'black',
        marginTop: 10
    },
    price: {
        fontSize: 18,
        color: '#ccc',
        marginTop: 5
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:10,
        alignSelf:'stretch',
        paddingHorizontal:20

    }, Image: {
        width: '100%'
        , height: '60%'
    },Button:{
        color:Colors.Primary
    }


});



export default ProductItem;
