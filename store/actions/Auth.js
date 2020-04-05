import { AsyncStorage } from 'react-native'

export const LOGIN = 'LOGIN';
export const SIGNUP = 'SIGNUP';
export const LOGOUT='LOGOUT'

export const AUTHENTICATE = 'AUTHENTICATE';

export const authenticate = ( token,userId) => {
    return { type: AUTHENTICATE, userId: userId, token: token };
};

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAzo7ycXUl6GNARf03h_2fAmVynoGwnJ5c',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );

        if (!response.ok) {
            const errorDate = await response.json();
            const errorId = errorDate.error.message;
            let message = 'some thing wrong';
            if (errorId === 'EMAIL_EXISTS') {
                message = 'This Email already exited';
            }

            throw new Error(message);
        }

        const resData = await response.json();
        console.log(resData);

        dispatch(authenticate(resData.idToken, resData.localId))
        saveDataToStorge(resData.idToken, resData.localId);
    }
}


export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAzo7ycXUl6GNARf03h_2fAmVynoGwnJ5c',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
        );

        if (!response.ok) {
            const errorDate = await response.json();
            const errorId = errorDate.error.message;
            let message = 'some thing wrong';
            if (errorId === 'EMAIL_NOT_FOUND') {
                message = 'This Email Not exited';
            }
            else if (errorId === 'INVALID_PASSWORD') {
                message = 'incorrect password';
            }

            throw new Error(message);
        }

        const resData = await response.json();
        console.log(resData);
        dispatch(authenticate(resData.idToken, resData.localId))
        saveDataToStorge(resData.token, resData.localId);
    };
};


export const logout=()=>{
    AsyncStorage.removeItem('userData');
    return{type:LOGOUT}
}

const saveDataToStorge = (token, userId) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId
    }))
}