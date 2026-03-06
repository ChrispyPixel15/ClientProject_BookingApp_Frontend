import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Octicons } from '@react-native-vector-icons/octicons';
import { useRouter } from "expo-router";
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";

function Settings() {
    const router = useRouter();
    const [user, setUser] = useState({
        id: 0,
        role: 'ADMIN',
        name: 'User Name',
        number: '080 000 0000',
        unit: '1234'
    });
    const [edit, setEdit] = useState(false);
    const [editMode, setEditMode] = useState('');
    const [newInfo, setNewInfo] = useState('');
    const [pinReset, setPinReset] = useState(false);

    function goHome() {
        router.navigate('/facilities/facilities');
    }

    function editInfo(mode) {
        setEdit(true);
        setEditMode(mode);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable style={({pressed}) => [
                    pressed ? styles.homePressed : styles.home
                ]}
                onPress={goHome}>
                    <Octicons name='home' color="#344e41" size={24}/>
                </Pressable>
                <Text style={styles.heading}>Settings</Text>
            </View>
            <View style={styles.infoHolder}>
                <View style={styles.infoSection}>
                    <View style={styles.infoSectionText}>
                        <Text style={styles.infoText}>Name:</Text>
                        <Text style={styles.infoText}>{user.name}</Text>
                    </View>                    
                    <Pressable style={({pressed}) => [
                        pressed ? styles.editPressed : styles.edit
                    ]}
                    onPress={() => editInfo('Name')}>
                        <Octicons name='pencil' color="#344e41" size={24}/>
                    </Pressable>
                </View>
                <View style={styles.infoSection}>
                    <View style={styles.infoSectionText}>
                        <Text style={styles.infoText}>Number:</Text>
                        <Text style={styles.infoText}>{user.number}</Text>
                    </View>
                    <Pressable style={({pressed}) => [
                        pressed ? styles.editPressed : styles.edit
                    ]}
                    onPress={() => editInfo('Number')}>
                        <Octicons name='pencil' color="#344e41" size={24}/>
                    </Pressable>
                </View>
                <View style={styles.infoSection}>
                    <View style={styles.infoSectionText}>
                        <Text style={styles.infoText}>Unit:</Text>
                        <Text style={styles.infoText}>{user.unit}</Text>
                    </View>                    
                    <Pressable style={({pressed}) => [
                        pressed ? styles.editPressed : styles.edit
                    ]}
                    onPress={() => editInfo('Unit')}>
                        <Octicons name='pencil' color="#344e41" size={24}/>
                    </Pressable>
                </View>
            </View>
            {user.role === 'ADMIN' ? (
                <Pressable style={({pressed}) => [
                    pressed ? styles.buttonPressed : styles.button
                ]}
                onPress={() => setPinReset(true)}>
                    <Text style={styles.buttonText}>Allow PIN Reset</Text>
                </Pressable>
            ) : (
                <Text style={styles.resetText}>
                    In order to change PIN please contact admin.
                </Text>
            )}
            {edit ? (
                <View style={styles.overlay}>
                    <View style={styles.editFacilityHolder}>
                        <Pressable style={styles.close} onPress={() => setEdit(false)}>
                            <Octicons name='x' color="#344e41" size={24}/>
                        </Pressable>
                        <Text style={styles.editHeading}>Edit {editMode}</Text>
                        <Text style={styles.inputLabel}>{editMode}</Text>
                        <TextInput style={styles.input} value={newInfo} onChange={(e) => setNewInfo(e)} placeholder={`${editMode}...`} placeholderTextColor="#a3b18a" />
                        <Pressable style={({pressed}) => [
                            pressed ? styles.buttonPressed : styles.button
                        ]}>
                            <Text style={styles.buttonText}>Edit</Text>
                        </Pressable>
                    </View>
                </View>
            ) : (
                <View></View>
            )}
            {pinReset ? (
                <View style={styles.overlay}>
                    <View style={styles.editInfoHolder}>
                        <Pressable style={styles.close} onPress={() => setPinReset(false)}>
                            <Octicons name='x' color="#344e41" size={24}/>
                        </Pressable>
                        <Text style={styles.editHeading}>PIN Reset Request</Text>
                        <Text style={styles.inputLabel}>Resident Name</Text>
                        <TextInput style={styles.input} placeholder='Resident Name...' placeholderTextColor="#a3b18a" />
                        <Text style={styles.inputLabel}>Unit</Text>
                        <TextInput style={styles.input} placeholder='Unit...' placeholderTextColor="#a3b18a" />
                        <Text style={styles.inputLabel}>Cell Number</Text>
                        <TextInput style={styles.input} placeholder='Cell Number...' placeholderTextColor="#a3b18a" />
                        <Pressable style={({pressed}) => [
                            pressed ? styles.buttonPressed : styles.button
                        ]}>
                            <Text style={styles.buttonText}>Allow Reset</Text>
                        </Pressable>
                    </View>
                </View>
            ) : (
                <View></View>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f5f5f5",
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        position: 'relative',
        paddingTop: 20
    },
    heading: {
        fontFamily: 'Figtree-VariableFont_wght',
        color: '#344E41',
        fontSize: 40,
        textAlign: "center",
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    home: {
        position: 'absolute',
        top: '70%',
        left: '10%'
    },
    homePressed: {
        position: 'absolute',
        top: '70%',
        left: '10%',
        opacity: 0.5
    },
    infoHolder: {
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 100
    },
    infoSection: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 80
    },
    infoSectionText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%'
    },
    infoText: {
        fontFamily: 'Figtree-VariableFont_wght',
        color: '#344E41',
        fontSize: 18
    },
    edit: {
        opacity: 1
    },
    editPressed: {
        opacity: 0.5
    },
    button: {
        backgroundColor: "#588157",
        padding: 15,
        borderRadius: 25,
        width: 180,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        marginBottom: 10,
        elevation: 5
    },
    buttonPressed: {
        backgroundColor: "#4c684b",
        padding: 15,
        borderRadius: 25,
        width: 180,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        marginBottom: 10,
        elevation: 5
    },
    buttonText: {
        fontFamily: 'Roboto-VariableFont_wdth,wght',
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'center',
    },
    resetText: {
        fontFamily: 'Figtree-VariableFont_wght',
        color: '#344E41',
        fontSize: 20,
        width: '85%',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center'
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        backgroundColor: '#3e52427c',
    },
    close: {
        position: 'absolute',
        right: '5%',
        top: '5%',
    },
    closePressed: {
        position: 'absolute',
        right: '5%',
        top: '5%',
        opacity: 0.5
    },
    editHeading: {
        fontFamily: 'Figtree-VariableFont_wght',
        color: '#344E41',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 22,
        marginBottom: 30
    },
    editInfoHolder: {
        backgroundColor: '#f5f5f5',
        width: '85%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 130,
        padding: 15,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 15,
        elevation: 5,
        position: 'relative'
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
})

export default Settings;