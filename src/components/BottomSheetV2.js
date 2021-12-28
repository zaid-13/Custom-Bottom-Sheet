import React, { useEffect, useRef } from 'react';
import { View, Text, useWindowDimensions, Animated, PanResponder } from 'react-native';

const BottomSheetV2 = () => {

    const {width, height} = useWindowDimensions();

    const bool = useRef(new Animated.Value(0)).current;

    const animHeight = useRef(new Animated.Value(480)).current;

    const panResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            animHeight.setOffset(animHeight._value);
        },
        onPanResponderMove: Animated.event([
            null,
            {dy: animHeight}
        ], {
            useNativeDriver: false,
            listener: () => {console.log({...animHeight})}
        }),
        onPanResponderRelease: (e, gestureState) => {

            Animated.spring(animHeight, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: false
            }).start()

            animHeight.flattenOffset();
            console.log("onRelease: ", animHeight._value)
        }
    })).current;

    // useEffect(() => {
    //     Animated.spring(animHeight, {
    //         toValue: 500,
    //         duration: 2000,
    //         useNativeDriver: false
    //     }).start()
    // }, [])

    return (
        <Animated.View

            { ...panResponder.panHandlers}

            style={{
                height: animHeight.interpolate({
                    inputRange: [150, 480],
                    outputRange: [480, 150],
                    extrapolate: 'clamp'
                }),
                backgroundColor: "pink",
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                marginHorizontal: 10
            }}
        >
            <Text 
                style={{
                    color: "black",
                    fontSize: 20,
                    textAlign: 'center',
                    padding: 20
                }}
            >Custom BottomSheetV2</Text>

            <Text 
                style={{
                    color: "purple",
                    fontSize: 16,
                    textAlign: 'center',
                    padding: 20
                }}>
                    This is BottomSheet V2
            </Text>
        </Animated.View>
    )
}

export default BottomSheetV2;