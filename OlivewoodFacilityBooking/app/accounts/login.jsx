import { useRouter } from "expo-router";
import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

function Login() {
    const router = useRouter();
    
    function createAccount() {
        router.navigate('/accounts/createAccount');
    }

    function login() {
        router.navigate('/facilities/facilities')
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor='#f5f5f5' />
                <View style={styles.logoHolder}>
                    <Text style={styles.logoText}>Estate Facility Booking</Text>
                </View>
                <Text style={styles.loginText}>Log In</Text>
                <View style={styles.formHolder}>
                    <Text style={styles.inputLabel}>Cell Number</Text>
                    <TextInput style={styles.input} placeholder="Cell Number..." placeholderTextColor="#a3b18a" />
                    <Text style={styles.inputLabel}>PIN</Text>
                    <TextInput style={[styles.input, {marginBottom: 8}]} placeholder="PIN..." placeholderTextColor="#a3b18a" />
                    <Pressable>
                        <Text style={styles.resetLink}>Reset PIN</Text>
                    </Pressable>
                    <Pressable style={({pressed}) => [
                        pressed ? styles.buttonPressed : styles.button
                    ]} onPress={login}>
                        <Text style={styles.buttonText}>Log In</Text>
                    </Pressable>
                    <Text style={styles.bottomText}>Not registered?</Text>
                    <Pressable onPress={createAccount}>
                        <Text style={styles.link}>Register</Text>
                    </Pressable>
                </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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
    },
    buttonPressed: {
        backgroundColor: "#4c684b",
        padding: 15,
        borderRadius: 25,
        width: 180,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 40,
    },
    buttonText: {
        fontFamily: 'Roboto-VariableFont_wdth,wght',
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