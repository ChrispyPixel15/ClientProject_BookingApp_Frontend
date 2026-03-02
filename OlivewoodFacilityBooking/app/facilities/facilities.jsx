import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Octicons } from '@react-native-vector-icons/octicons';
import { useState } from "react";

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
    ])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Pressable style={({pressed}) => [
                    pressed ? styles.settingsPressed : styles.settings
                ]}>
                    <Octicons name='gear' color="#344e41" size={24}/>
                </Pressable>
                <Text style={styles.heading}>Facilities</Text>
                { user === "ADMIN" ? (
                    <Pressable style={({pressed}) => [
                        pressed ? styles.addPressed : styles.add
                    ]}>
                        <Octicons name='plus' color="#344e41" size={24}/>
                    </Pressable>
                ) : (
                    <View></View>
                )}
            </View>
            <ScrollView style={styles.facilitiesHolder}>
                {
                    facs.map((fac) => (
                        <View style={fac.fullyBooked ? styles.facilityUnavailable : styles.facility} key={fac.id}>
                            <Text style={fac.fullyBooked ? styles.facilityUnavailableText : styles.facilityText}>{fac.name}</Text>
                            <View style={fac.fullyBooked ? styles.slotsUnavailable : styles.slots}>
                                <Text style={fac.fullyBooked ? styles.slotsUnavailableText : styles.slotsText}>{fac.fullyBooked ? "Slots Unavailable" : "Slots Available"}</Text>
                            </View>
                        </View>
                    ))
                }
            </ScrollView>
            
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
        opacity: 0.5
    },
    facilitiesHolder: {
        flex: 1,
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 30
    },
    facility: {
        width: '100%',
        backgroundColor: '#3a5a40',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
        paddingTop: 60,
        borderRadius: 15,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    facilityUnavailable: {
        width: '100%',
        backgroundColor: '#3a4c3d',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
        paddingTop: 60,
        borderRadius: 15,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
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
})

export default Facilities;