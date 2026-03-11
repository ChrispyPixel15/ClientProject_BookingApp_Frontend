import { createContext, useState } from "react";
import { loginUser, logoutUser } from '../api/api';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export const UserContext = createContext();

function UserProvider({children}) {
    const router = useRouter();
    const [loginErr, setLoginErr] = useState('');

    async function handleLogin(number, pin) {
        try {
            const token = await loginUser(number, pin);
            await AsyncStorage.setItem("token", token.token);
            setLoginErr('');
            router.navigate('/facilities/facilities');
        }
        catch (err) {
            setLoginErr(err.message);
        }
    }

    async function logoutHandler() {
        await AsyncStorage.removeItem("token");
        logoutUser();
        router.replace("/accounts/login");
    }

    return (
        <UserContext.Provider value={{handleLogin, logoutHandler, loginErr}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;