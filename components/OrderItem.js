import React, { useState } from 'react';
import { Text, Button, StyleSheet, View, Dimensions } from 'react-native'
import CartItem from './CartItem';

const OrderItem = props => {
    const [showDetails, setshowDetails] = useState(false);
    return (
        <View style={styles.card}>
            <View style={styles.row}>
                <Text>{props.amount}</Text>
                <Text>{props.date}</Text>
            </View>
            <Button style={styles.button} title={showDetails ? 'Hide Details' : 'Show Details'}
                onPress={() => {
                    setshowDetails(prevState => !prevState)
                }}
            />
            {showDetails && (<View style={styles.detailItems}>
                {
                  props.items.map(item=>(
                      <CartItem 
                      key={item.productId}
                      amount={item.sum}
                      title={item.productTitle}
                      quantity={item.quantity}
                      sum={item.sum}
                      />
                  ))
                }
            </View>)
            }

        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: .26,
        shadowRadius: 10,
        borderRadius: 10,
        elevation: 5,
        margin: 10,
        padding: 10,
        alignItems: 'center'
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        alignItems: 'center',
    },
    button: {
        width: 55,

    },
    detailItems: {
        width: '100%',
        alignSelf:'center'
      }
})


export default OrderItem;