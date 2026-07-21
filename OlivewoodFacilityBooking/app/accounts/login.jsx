import { UserContext } from "@/contexts/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { KeyboardAvoidingView, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

function Login() {
    const router = useRouter();
    const [number, setNumber] = useState('');
    const [pin, setPin] = useState('');
    const { handleLogin, loginErr } = useContext(UserContext);
    const navigation = useNavigation();
    const [buttonWord, setButtonWord] = useState("Login");
    const [err, setErr] = useState(false)
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        const loggedIn = async () => {
            const log = await AsyncStorage.getItem("token");
            console.log(log);
            if (!isTokenExpired(log)) {
                setLogged(true);
                console.log("truethatis");
            }
            else {
                setLogged(false);
                console.log("nottruetahtis");
            }
        }

        loggedIn();

        if (logged) {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: "facilities/facilities" }],
                })
            );
        }
    })
    
    function isTokenExpired(token) {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return Date.now() >= payload.exp * 1000;
    } catch {
        return true;
    }
    }

    function createAccount() {
        router.navigate('/accounts/createAccount');
    }

    async function login() {
        setButtonWord("Loading");
        await handleLogin(number, pin);
        if (handleLogin) {
            setErr(false);
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "facilities/facilities" }],
            })
        );
        
        } else {
            setErr(true);
        }
    }

    function resetPin() {
        router.navigate('/accounts/pinResetInfo');
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor='#f5f5f5' />
            <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="height" enabled >
                                                    <ScrollView>
                <View style={styles.logoHolder}>
                    <Text style={styles.logoText}>Estate Facility Booking</Text>
                </View>
                <Text style={styles.loginText}>Log In</Text>
                <View style={styles.formHolder}>
                    {loginErr !== '' ? (
                        <View style={styles.error}>
                            <Text style={styles.errortext}>Your password or username is incorrect.</Text>
                        </View>
                    ) : (
                        <View></View>
                    )}
                    <Text style={styles.inputLabel}>Cell Number</Text>
                    <TextInput style={styles.input} keyboardType="number-pad" value={number} placeholder="Cell Number..." placeholderTextColor="#a3b18a" onChangeText={(e) => setNumber(e)} />
                    <Text style={styles.inputLabel}>PIN</Text>
                    <TextInput style={[styles.input, {marginBottom: 8}]} keyboardType="number-pad" value={pin} placeholder="PIN..." placeholderTextColor="#a3b18a" onChangeText={(e) => setPin(e)} secureTextEntry={true} />
                    <Pressable onPress={resetPin}>
                        <Text style={styles.resetLink}>Reset PIN</Text>
                    </Pressable>
                    <Pressable style={({pressed}) => [
                        pressed ? styles.buttonPressed : styles.button
                    ]} onPress={login}>
                        <Text style={styles.buttonText}>{buttonWord}</Text>
                    </Pressable>
                    <Text style={styles.bottomText}>Not registered?</Text>
                    <Pressable onPress={createAccount}>
                        <Text style={styles.link}>Register</Text>
                    </Pressable>
                </View>
                </ScrollView>
                </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    error: {
        backgroundColor: "#b91414",
        borderRadius: 10,
        marginBottom: 10
    },
    errortext: {
        color: "#f5f5f5",
        fontFamily: 'Figtree-VariableFont_wght',
        fontSize: 18,
        padding: 5
    },
    container: {
        backgroundColor: "#f5f5f5",
        flex: 1,
    },
    logoHolder: {
        flex: 0.3,
        marginTop: 150
    },
    logoText: {
        fontFamily: 'Figtree-VariableFont_wght',
        color: '#344E41',
        fontSize: 40,
        textAlign: "center",
    },
    loginText: {
        fontFamily: 'Figtree-VariableFont_wght',
        color: '#344E41',
        fontSize: 20,
        textAlign: "center",
        marginBottom: 25
    },
    formHolder: {
        width: "80%",
        marginLeft: 'auto',
        marginRight: 'auto',
        flex: 1,
    },
    inputLabel: {
        fontFamily: 'Figtree-VariableFont_wght',
        color: '#344E41',
        fontSize: 16,
        marginLeft: 8,
        marginBottom: 5
    },
    input: {
        borderWidth: 0.9,
        borderColor: "#3A5A40",
        borderRadius: 15,
        height: 40,
        width: "100%",
        elevation: 5,
        backgroundColor: '#f5f5f5',
        color: '#344E41',
        fontFamily: 'Figtree-VariableFont_wght',
        fontSize: 16,
        paddingLeft: 10,
        marginBottom: 20
    },
    resetLink: {
        marginLeft: 'auto',
        marginRight: 8,
        fontFamily: 'Figtree-VariableFont_wght',
        color: '#798366',
        fontSize: 16,
        textDecorationColor: '#798366',
        textDecorationLine: 'underline'
    },
    buttonHolder: {
        flex: 1,
    },
    button: {
        backgroundColor: "#588157",
        padding: 15,
        borderRadius: 25,
        width: 180,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 40,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    buttonPressed: {
        backgroundColor: "#4c684b",
        padding: 15,
        borderRadius: 25,
        width: 180,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 40,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    buttonText: {
        fontFamily: 'Figtree-VariableFont_wght',
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'center',
    },
    bottomText: {
        marginRight: 'auto',
        marginLeft: 'auto',
        fontFamily: 'Figtree-VariableFont_wght',
        color: '#344E41',
        fontSize: 16,
        marginTop: 20,
        marginBottom: 5,
    },
    link: {
        marginRight: 'auto',
        marginLeft: 'auto',
        fontFamily: 'Figtree-VariableFont_wght',
        color: '#798366',
        fontSize: 16,
        textDecorationColor: '#798366',
        textDecorationLine: 'underline'
    },
})

export default Login;