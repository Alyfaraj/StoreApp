import React, { useState, useEffect, useCallback, useReducer } from 'react'
import { View, StyleSheet, Button, ScrollView, KeyboardAvoidingView, ActivityIndicator, Alert } from 'react-native'
import Card from '../../components/UI/Card'
import Input from '../../components/Input'
import Colors from '../../constants/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import { useDispatch } from 'react-redux'
import * as AuthActions from '../../store/actions/Auth'



const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

const AuthScreen = props => {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: ''
        },
        inputValidities: {
            email: false,
            password: false
        },
        formIsValid: false
    });

    useEffect(() => {
        if (error) {
            Alert.alert('Error Acorred!', error, [{ text: 'Okay' }])
        }
    }, [error])

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        },
        [dispatchFormState]
    );

    const dispatch = useDispatch();

    const signUpHandeler = async () => {
        let action;
        if (isSignUp) {
            action = AuthActions.signup(formState.inputValues.email, formState.inputValues.password)
        }
        else {
            action = AuthActions.login(formState.inputValues.email, formState.inputValues.password)
        }
        setError(null)
        setIsLoading(true);
        try {
            await dispatch(action);
            props.navigation.navigate('Shop')
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
       
    }



    return (
        <KeyboardAvoidingView
            behavior='padding'
            keyboardVerticalOffset={50}
            style={styles.screen}>
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id="email"
                            label="E-Mail"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize="none"
                            errorText="Please enter a valid email address."
                            initialValue=""
                            onInputChange={inputChangeHandler}
                        />
                        <Input
                            id="password"
                            label="Password"
                            keyboardType="default"
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize="none"
                            errorText="Please enter a valid password."
                            initialValue=""
                            onInputChange={inputChangeHandler}
                        />
                        <View style={styles.buttonContainer}>
                            {isLoading ? <ActivityIndicator size='small' color={Colors.primary} />
                                : <Button
                                    title={isSignUp ? "Sign Up" : "Login"}
                                    color={Colors.primary}
                                    onPress={signUpHandeler}
                                />}
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button
                                title={`Swith to ${isSignUp ? 'Lonin' : 'Sign Up'}`}
                                color={Colors.accent}
                                onPress={() =>
                                    setIsSignUp(prvState => !prvState)
                                }
                            />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    )
}

AuthScreen.navigationOptions = {
    headerTitle: 'Authiancation'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20,
    },
    buttonContainer: {
        marginTop: 10
    },

});
export default AuthScreen;