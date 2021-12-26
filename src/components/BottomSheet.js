import React, { useRef } from 'react';
import { Animated, PanResponder, Text, useWindowDimensions, View, Button } from 'react-native';

const BottomSheet = () => {
    const { width, height } = useWindowDimensions();

    const translate = useRef(new Animated.Value(480)).current;

    const pan = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            translate.setOffset(translate._value);
            console.log("granted permission");
            console.log("showing translate._value in grant", translate._value);
        },
        onPanResponderMove: Animated.event([
            null,
            {
                dy: translate
            }
        ], {
            useNativeDriver: false,
            listener: (e, g) => console.log({ ...translate })
        }),
        onPanResponderRelease: (e, gestureState) => {
            // translate.flattenOffset();
            // if (translate._value < 0) {
            //     Animated.spring(translate, {
            //         toValue: 0,
            //         duration: 2000,
            //         useNativeDriver: true
            //     }).start();
            //     // translate.flattenOffset();
            // } else if (translate._value > 0) {
            //     Animated.spring(translate, {
            //         toValue: 480,
            //         duration: 2000,
            //         useNativeDriver: true
            //     }).start();
            // }
            translate.flattenOffset();

        }
    })).current;

    return (
        <Animated.View

            {...pan.panHandlers}

            style={{
                backgroundColor: "pink",
                height: height / 1.2,
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                marginHorizontal: 10,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                transform: [
                    { translateY: translate }
                ]
            }}
        >
            <Text style={{ color: 'black', fontSize: 20, textAlign: 'center', paddingVertical: 20 }}>Custom Bottom Sheet</Text>
        </Animated.View>
    )
}

export default BottomSheet;