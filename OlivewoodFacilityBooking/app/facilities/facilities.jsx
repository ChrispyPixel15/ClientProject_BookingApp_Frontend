import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Octicons } from '@react-native-vector-icons/octicons';
import { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

function Facilities() {
    const user = 'ADMIN';
    const [facs, setfacs] = useState([
        {
            id: 1,
            name: 'Tennis Court 1',
            fullyBooked: false
        },
        {
            id: 2,
            name: 'Tennis Court 2',
            fullyBooked: true
        }
    ]);
    const [addFacility, setAddFacility] = useState(false);
    const router = useRouter();
    const [edit, setEdit] = useState(false);

    function goToFacility(id) {
        router.push(`/facilities/${id}`);
    }

    function goToSettings() {
        router.navigate('/settings/settings');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable style={({pressed}) => [
                    pressed ? styles.settingsPressed : styles.settings
                ]}
                onPress={goToSettings}>
                    <Octicons name='gear' color="#344e41" size={24}/>
                </Pressable>
                <Text style={styles.heading}>Facilities</Text>
                { user === "ADMIN" ? (
                    <Pressable style={({pressed}) => [
                        pressed ? styles.addPressed : styles.add
                    ]}
                    onPress={() => setAddFacility(true)}>
                        <Octicons name='plus' color="#344e41" size={24}/>
                    </Pressable>
                ) : (
                    <View></View>
                )}
            </View>
            <ScrollView style={styles.facilitiesHolder}>
                {
                    facs.map((fac) => (
                        <Pressable style={
                            ({pressed}) => [
                                fac.fullyBooked ? (
                                    styles.facilityUnavailable
                                ) : (
                                    pressed ? styles.facilityPressed : styles.facility
                                )
                            ]
                        } 
                        onPress={() => {
                            if(!fac.fullyBooked) {
                                goToFacility(fac.id);
                            }
                        }}
                        key={fac.id}>
                            {user === 'ADMIN' ? (<Pressable style={({pressed}) => [
                                pressed ? styles.editPressed : styles.edit
                            ]}
                            onPress={() => setEdit(true)}>
                                <Octicons name='pencil' color="#ffffff" size={16}/>
                            </Pressable>) : (<View></View>)}
                            <Text style={fac.fullyBooked ? styles.facilityUnavailableText : styles.facilityText}>{fac.name}</Text>
                            <View style={fac.fullyBooked ? styles.slotsUnavailable : styles.slots}>
                                <Text style={fac.fullyBooked ? styles.slotsUnavailableText : styles.slotsText}>{fac.fullyBooked ? "Slots Unavailable" : "Slots Available"}</Text>
                            </View>
                        </Pressable>
                    ))
                }
            </ScrollView>
            {addFacility ? (
                <View style={styles.overlay}>
                    <View style={styles.addFacilityHolder}>
                        <Pressable style={styles.close} onPress={() => setAddFacility(false)}>
                            <Octicons name='x' color="#344e41" size={24}/>
                        </Pressable>
                        <Text style={styles.addHeading}>New Facility</Text>
                        <Text style={styles.inputLabel}>Name</Text>
                        <TextInput style={styles.input} placeholder="Name..." placeholderTextColor="#a3b18a" />
                        <Pressable style={({pressed}) => [
                            pressed ? styles.buttonPressed : styles.button
                        ]}>
                            <Text style={styles.buttonText}>Create</Text>
                        </Pressable>
                    </View>
                </View>
            ) : (
                <View></View>
            )}
            {edit ? (
                <View style={styles.overlay}>
                    <View style={styles.addFacilityHolder}>
                        <Pressable style={styles.close} onPress={() => setEdit(false)}>
                            <Octicons name='x' color="#344e41" size={24}/>
                        </Pressable>
                        <Text style={styles.addHeading}>Edit Facility</Text>
                        <Text style={styles.inputLabel}>Name</Text>
                        <TextInput style={styles.input} placeholder="Name..." placeholderTextColor="#a3b18a" />
                        <View style={styles.buttonHolder}>
                            <Pressable style={({pressed}) => [
                                pressed ? styles.buttonPressed : styles.button
                            ]}>
                                <Text style={styles.buttonText}>Edit</Text>
                            </Pressable>
                            <Pressable style={({pressed}) => [
                                pressed ? styles.deletePressed : styles.delete
                            ]}>
                                <Text style={styles.buttonText}>Delete</Text>
                            </Pressable>
                        </View>
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
        position: 'relative'
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
    addHeading: {
        fontFamily: 'Figtree-VariableFont_wght',
        color: '#344E41',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 22,
        marginBottom: 30
    },
    addFacilityHolder: {
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
    buttonHolder: {
        flexDirection: 'row'
    },
    button: {
        backgroundColor: "#588157",
        padding: 12,
        borderRadius: 25,
        width: 120,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        marginBottom: 10,
        elevation: 5
    },
    buttonPressed: {
        backgroundColor: "#4c684b",
        padding: 12,
        borderRadius: 25,
        width: 120,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        marginBottom: 10,
        elevation: 5
    },
    delete: {
        backgroundColor: "#971515",
        padding: 12,
        borderRadius: 25,
        width: 120,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        marginBottom: 10,
        elevation: 5
    },
    deletePressed: {
        backgroundColor: "#6b1313",
        padding: 12,
        borderRadius: 25,
        width: 120,
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
    settings: {
        position: 'absolute',
        top: '70%',
        left: '10%'
    },
    settingsPressed: {
        position: 'absolute',
        top: '70%',
        left: '10%',
        opacity: 0.5
    },
    add: {
        position: 'absolute',
        top: '70%',
        right: '10%'
    },
    addPressed: {
        position: 'absolute',
        top: '70%',
        right: '10%',
        opacity: 0.5,
    },
    facilitiesHolder: {
        flex: 1,
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 30,
    },
    facilityPressed: {
        width: '100%',
        backgroundColor: '#2e4432',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
        paddingTop: 70,
        borderRadius: 15,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        position: 'relative'
    },
    facility: {
        width: '100%',
        backgroundColor: '#3a5a40',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
        paddingTop: 70,
        borderRadius: 15,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        position: 'relative'
    },
    facilityUnavailable: {
        width: '100%',
        backgroundColor: '#3a4c3d',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
        paddingTop: 70,
        borderRadius: 15,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative'
    },
    facilityText: {
        fontFamily: 'Roboto-VariableFont_wdth,wght',
        color: '#ffffff',
        fontSize: 20
    },
    facilityUnavailableText: {
        fontFamily: 'Roboto-VariableFont_wdth,wght',
        color: '#acacac',
        fontSize: 20
    },
    slots: {
        backgroundColor: '#a3b18a',
        padding: 3,
        width: 120,
        borderRadius: 20
    },
    slotsUnavailable: {
        backgroundColor: '#36453e',
        padding: 3,
        width: 120,
        borderRadius: 20
    },
    slotsText: {
        fontFamily: 'Roboto-VariableFont_wdth,wght',
        fontSize: 13,
        color: '#ffffff',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    slotsUnavailableText: {
        fontFamily: 'Roboto-VariableFont_wdth,wght',
        fontSize: 13,
        color: '#acacac',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    edit: {
        position: 'absolute',
        right: '5%',
        top: '30%',
    },
    editPressed: {
        position: 'absolute',
        right: '5%',
        top: '30%',
        opacity: 0.5
    },
})

export default Facilities;