import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native'
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/Auth'
const StartUpScreen = props => {
    const dispatch = useDispatch();
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                props.navigation.navigate('Auth');
                return;
            }
            const transformedData = JSON.parse(userData);
            const { token, userId } = transformedData;
            if (!token || !userId) {
                props.navigation.navigate('Auth');
                return;
            }
            props.navigation.navigate('Shop');
            dispatch(authActions.authenticate(token, userId))
        }

        tryLogin();
    })

    return (
        <View style={styles.screen}>
            <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartUpScreen;