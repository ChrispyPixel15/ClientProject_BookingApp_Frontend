import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Octicons } from '@react-native-vector-icons/octicons';
import { useEffect, useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';

function Facility() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [add, setAdd] = useState(false);
    const [date, setDate] = useState(new Date());
    const displayDate = date.toLocaleDateString();
    const [show, setShow] = useState(false);
    const [bookings, setBookings] = useState([
        {
            id: 1,
            time: "11:00 - 12:00",
            name: 'John Doe',
            date: "2026/03/08"
        }
    ]);
    const [edit, setEdit] = useState(false);

    const [selectedSlot, setSelectedSlot] = useState(`Select a slot.`)
    
    const arrayRange = (start, end, step = 1) => Array.from({length: end - start / step + 1}, (_, i) => start + i * step);
    const numberRange = arrayRange(8,18);
    const timeSlotNumbers = numberRange.map((number) => ({
        key: `${number.toString().padStart(2, '0')}:00`,
        slot: `${number.toString().padStart(2, '0')}:00 - ${(number + 1).toString().padStart(2, '0')}:00`
    })); 

    function goHome() {
        router.navigate('/facilities/facilities');
    }

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.mainheader}>
                    <Pressable style={({pressed}) => [
                        pressed ? styles.homePressed : styles.home
                    ]}
                    onPress={goHome}>
                        <Octicons name='home' color="#344e41" size={24}/>
                    </Pressable>
                    <Text style={styles.heading}>Tennis Courts 1</Text>
                    <Pressable style={({pressed}) => [
                        pressed ? styles.addPressed : styles.add
                    ]}
                    onPress={() => setAdd(true)}>
                        <Octicons name='plus' color="#344e41" size={24}/>
                    </Pressable>
                </View>
                <Pressable style={({pressed}) => [
                    pressed ? styles.dateHolderPressed : styles.dateHolder
                ]}
                onPress={() => setShow(true)}>
                    <Octicons name='calendar' color="#344e41" size={16}/>
                    <Text>{displayDate && displayDate}</Text>
                </Pressable>
            </View>
            <ScrollView>
                {
                    timeSlotNumbers.map((number) => (
                        <View key={number.key} style={styles.timeSlot}>
                            <Text>{number.key}</Text>
                            {
                                bookings.map((booking, key) => {
                                    if (booking.time === number.slot && displayDate === booking.date) {
                                        return (
                                            <View key={key} style={styles.timeCard}>
                                                <Pressable style={({pressed}) => [
                                                    pressed ? styles.editPressed : styles.edit
                                                ]}
                                                onPress={() => setEdit(true)}>
                                                    <Octicons name='pencil' color="#ffffff" size={16}/>
                                                </Pressable>
                                                <Text style={styles.timeCardText}>{booking.name}</Text>
                                                <Text style={styles.timeCardText}>{booking.time}</Text>
                                            </View>
                                        )
                                    }
                                })
                            }
                        </View>
                    ))
                }
            </ScrollView>
            {add ? (
                <View style={styles.overlay}>
                    <View style={styles.addBookingHolder}>
                        <Pressable style={styles.close} onPress={() => setAdd(false)}>
                            <Octicons name='x' color="#344e41" size={24}/>
                        </Pressable>
                        <Text style={styles.addHeading}>New Booking</Text>
                        <Pressable style={({pressed}) => [
                            pressed ? [styles.dateHolderPressed, {width: '35%'}] : [styles.dateHolder, {width: '35%'}]
                        ]}
                        onPress={() => setShow(true)}>
                            <Octicons name='calendar' color="#344e41" size={16}/>
                            <Text>{displayDate && displayDate}</Text>
                        </Pressable>
                        <View style={styles.slotSelectHolder}>
                            <Text style={[styles.inputLabel, {padding: 10}]}>Time Slot:</Text>
                            <Pressable style={styles.slotSelection}>
                                <Text style={styles.slotText}>{selectedSlot}</Text>
                            </Pressable>
                        </View>
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
            {show && (
                <DateTimePicker 
                    testID="dateTimePicker"
                    value={date}
                    mode='date'
                    onChange={onDateChange}
                />
            )}
            {edit ? (
                <View style={styles.overlay}>
                    <View style={styles.editHolder}>
                        <Pressable style={styles.close} onPress={() => setEdit(false)}>
                            <Octicons name='x' color="#344e41" size={24}/>
                        </Pressable>
                        <Text style={styles.addHeading}>Edit Booking</Text>
                        <Pressable style={({pressed}) => [
                            pressed ? [styles.dateHolderPressed, {width: '35%'}] : [styles.dateHolder, {width: '35%'}]
                        ]}
                        onPress={() => setShow(true)}>
                            <Octicons name='calendar' color="#344e41" size={16}/>
                            <Text>{displayDate && displayDate}</Text>
                        </Pressable>
                        <View style={styles.slotSelectHolder}>
                            <Text style={[styles.inputLabel, {padding: 10}]}>Time Slot:</Text>
                            <Pressable style={styles.slotSelection}>
                                <Text style={styles.slotText}>{selectedSlot}</Text>
                            </Pressable>
                        </View>
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
    },
    header: {
        borderBottomColor: '#979797',
        borderBottomWidth: 0.5
    },
    mainheader: {
        flexDirection: 'row',
        position: 'relative',
        paddingTop: 20,
        
    },
    dateHolder: {
        flexDirection: 'row',
        width: '25%',
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 10
    },
    dateHolderPressed: {
        flexDirection: 'row',
        width: '25%',
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 10,
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
    editHolder: {
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
    heading: {
        fontFamily: 'Figtree-VariableFont_wght',
        color: '#344E41',
        fontSize: 35,
        textAlign: "center",
        marginLeft: 'auto',
        marginRight: 'auto',
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
        opacity: 1,
        position: 'absolute',
        top: 5,
        right: 10,
    },
    editPressed: {
        opacity: 0.5,
        position: 'absolute',
        top: 5,
        right: 10,
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
    addBookingHolder: {
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
    timeSlot: {
        height: 80,
        borderTopColor: '#3A5A40',
        borderTopWidth: 0.5,
        position: 'relative',
    },
    timeCard: {
        position: 'absolute',
        backgroundColor: '#344E41',
        width: "85%",
        left: 45,
        height: '95%',
        top: '2.5%',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 45
    },
    timeCardText: {
        fontFamily: 'Figtree-VariableFont_wght',
        color: '#ffffff',
        fontSize: 20
    },
    slotSelectHolder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 20
    },
    slotSelection: {
        padding: 10,
        borderColor: '#3A5A40',
        borderWidth: 0.5,
        width: '50%',
        borderRadius: 15,
        elevation: 5,
        backgroundColor: '#f5f5f5'
    },
    slotText: {
        fontFamily: 'Figtree-VariableFont_wght',
        color: '#344E41',
        fontSize: 16,
        textAlign: 'center'
    },
})

export default Facility;