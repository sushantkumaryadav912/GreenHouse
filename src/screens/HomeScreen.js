import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();
    const animatedValue = new Animated.Value(0);

    const handlePress = () => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start(() => {
            navigation.navigate('NextScreen');
        });
    };

    const rotateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.box, { transform: [{ rotateY }] }]}>
                <Text style={styles.text}>Home Screen</Text>
            </Animated.View>
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>Go to Next Screen</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    box: {
        width: 200,
        height: 200,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    text: {
        color: '#fff',
        fontSize: 18,
    },
    button: {
        padding: 10,
        backgroundColor: '#2196F3',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default HomeScreen;