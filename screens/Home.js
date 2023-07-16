import { Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, TextInput, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { UserContext } from '../context/app.context';
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
// import { addTodo, checkTodo, deleteTodo , editTodo} from '../redux/slices/todoSlice';
// import Checkbock from 'expo-checkbox';
import { Entypo } from '@expo/vector-icons';

const Home = ({ navigation }) => {
    const [userInfo,  setUserInfo] = useState(null);
    // const [text, setText] = useState('');
    // const [index, setIndex] = useState();
    // const [editModal, setEditModal] = useState(false);
    const { setToken } = useContext(UserContext);
    // const dispatch = useDispatch();
    // const todos = useSelector((state) => state.todo);

    useEffect(() => {
        getUserInfo();
    }, []);

    // const renderItem = ({ item, index }) => {
    //     return (
    //         <View style={{
    //             width: '90%',
    //             alignSelf: 'center',
    //             height: 50,
    //             borderRadius: 5,
    //             borderWidth: 1,
    //             alignItems: 'center',
    //             paddingHorizontal: 10,
    //             borderColor: '#c4c4c4',
    //             marginBottom: 10,
    //             flexDirection: 'row'
    //         }}>
    //             <Checkbock
    //                 value={item.completed}
    //                 onValueChange={() => {
    //                     dispatch(checkTodo(item.id))
    //                 }}
    //                 color={item.completed ? '#4630EB' : undefined}
    //             />
    //             <Text style={{ fontSize: 19, marginLeft: 10, textDecorationLine: item.completed ? 'line-through' : 'none'  }}>{item.text}</Text>
    //             <View style={{
    //                 flexDirection: 'row',
    //                 alignItems: 'flex-end',
    //                 position: 'absolute',
    //                 right: 20,
    //             }}>
    //                 <TouchableOpacity onPress={() => {
    //                     setIndex(item.id);
    //                     setEditModal(true);
    //                     setText(item.text);
    //                 }} style={{ marginRight: 10,}}><Entypo name='edit' size={24} color={'#5f4eee'} /></TouchableOpacity>
    //                 <TouchableOpacity onPress={() => {
    //                     dispatch(deleteTodo(index));
    //                 }} ><Entypo name='trash' size={24} color={'#a12'} /></TouchableOpacity>
    //             </View>
    //         </View>
    //     )
    // }

    const getUserInfo = async () => {
        const token = await AsyncStorage.getItem('token');
        if(!token) return;
        try {
            const response = await fetch(
            "https://www.googleapis.com/userinfo/v2/me", {
                headers: {
                Authorization: `Bearer ${token}`
                }
            })
            const user = await response.json();
            const userString = JSON.stringify(user);
            setUserInfo(user);
            await AsyncStorage.setItem('@user', userString);
        } catch (error) {
            console.log(error);
        }
    }

    const handleLogout = async () => {
        await AsyncStorage.clear();
        setUserInfo(null);
        setToken(null);
    }

    const handleSubmit = () => {
        dispatch(addTodo({ id: todos.length + 1, text }));
        setText('');
    }

  return (
    <SafeAreaView>
        <View style={{
            width: '90%',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center'
        }}>
            <Image source={{ uri: userInfo?.picture }} style={{
            width: 50,
            height: 50,
            borderRadius: 20,
            }} />
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
            }}>ToDo</Text>
            <TouchableOpacity onPress={() => handleLogout()}>
            <Image source={{ uri: 'https://cdn.icon-icons.com/icons2/2943/PNG/512/logout_icon_184025.png' }} style={{
                width: 50,
                height: 50,
                borderRadius: 20,
            }} />
            </TouchableOpacity>
        </View>
        {/* <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
            justifyContent: 'center'
        }}>
            <TextInput
                value={text} 
                onChangeText={(val) => {
                    console.log(val, 'JJJJ')
                    setText(val)
                }}
                placeholder='Add Task'
                style={{
                    width: '70%',
                    height: 50,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#c4c4c4',
                    alignSelf: 'center',
                    paddingHorizontal: 10,
                    marginRight: 10,
                }}
            />
            <TouchableOpacity disabled={text.length > 0 ? false : true} onPress={handleSubmit} style={{
                width: 60,
                height: 50,
                backgroundColor: text.length === 0 ? '#4c4c4c' : '#5f4eee',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{
                    color: '#fff',
                    fontSize: 18,
                }}>Add</Text>
            </TouchableOpacity>
        </View>
        <View style={{
            marginTop: 20,
            width: '100%',
            height: '70%',
        }}>
            <FlatList
                data={todos}
                renderItem={renderItem}
                style={{
                    height: '90%',
                }}
            />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Movies')} style={{
            width: '90%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            backgroundColor: '#5adaaa',
            alignSelf: 'center',
        }}>
            <Text>Go To Movies</Text>
        </TouchableOpacity>

        {editModal && <View style={{
            width: '100%',
            height: 1000,
            position: 'absolute',
            top: 0, 
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)'
        }}>
        <View style={{
            width: '90%',
            height: 140,
            position: 'absolute',
            top: 100, 
            left: 20,
            backgroundColor: '#c4c4c4'
        }}>
            <TextInput
                value={text} 
                onChangeText={(val) => {
                    console.log(val, 'JJJJ')
                    setText(val)
                }}
                placeholder='Add Task'
                style={{
                    width: '70%',
                    height: 50,
                    borderRadius: 10,
                    backgroundColor: '#fff',
                    alignSelf: 'center',
                    paddingHorizontal: 10,
                    marginRight: 10,
                    marginTop: 10,
                }}
            />
            <TouchableOpacity disabled={text.length > 0 ? false : true} onPress={() => {
                dispatch(editTodo({ id: index, text }));
                setText('');
                setEditModal(false);
            }} style={{
                width: 60,
                alignSelf: 'center',
                marginTop: 20,
                height: 50,
                backgroundColor: text.length === 0 ? '#4c4c4c' : '#5f4eee',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={{
                    color: '#fff',
                    fontSize: 18,
                }}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {setText('');setEditModal(false)}} style={{
                width: 40,
                alignSelf: 'center',
                height: 40,
                backgroundColor: '#a12',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                right: 5,
                top: 5
            }}>
                <Text style={{
                    color: '#fff',
                    fontSize: 18,
                }}>X</Text>
            </TouchableOpacity>
        </View>
        </View>} */}
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})