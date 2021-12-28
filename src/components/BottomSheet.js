import React, { useRef } from 'react';
import { Animated, PanResponder, Text, useWindowDimensions, View, Button } from 'react-native';

const BottomSheet = () => {
    const { width, height } = useWindowDimensions();

    const translate = useRef(new Animated.Value(480)).current;


    const panResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            console.log("on Grant -----------------------------------------------------------------");
            translate.setOffset(translate._value);  // take value from _value and put into offset
            // translate._value = 0;
            console.log("onGrant => offset", translate._offset);
            console.log("onGrant => value", translate._value);
        },
        onPanResponderMove: Animated.event(
            [
              null,
              { dy: translate }
            ],
            {useNativeDriver: false}
        ),
        onPanResponderRelease: (e, gestureState) => {
            // if (translate._value < -20) {
            //     Animated.spring(translate, {
            //         toValue: 0,
            //         duration: 2000,
            //         useNativeDriver: true
            //     }).start();
                // translate._value = -480;   // 1. flattenOffset() will add this to _value 480  + (-480) = 0     2. then onGrant setOffset(translate._value) will take 0 from _value and put it in the offset

                // here we are deliberately setting the value of ._value because
                // when we animate the element to 0, _value and _offset have no
                // idea about this movement, so next time when panresponder 
                // grants permission setOffset() will set its own calculated value
                // and not our own, giving unexpected results. 
            // }
            // console.log("inside if 1st condition", "value", translate._value, "offset", translate._offset);
            // if (translate._value > 50) {
            //     Animated.spring(translate, {
            //         toValue: 480,
            //         duration: 2000,
            //         useNativeDriver: true
            //     }).start();
            //     translate._value = 480;
            //     translate._offset = 480;
            //     console.log("inside if 2nd condition", "value", translate._value, "offset", translate._offset);
            // }
            // translate.flattenOffset();   // add value to _value and reset offset
            // // translate._value = 0;
            // console.log({ ...translate })


            // if (translate._value < -30) {
            //     Animated.spring(translate, {
            //         toValue: 0,
            //         duration: 2000,
            //         useNativeDriver: true
            //     }).start()
            //     translate._value = 0;
            //     translate._offset = 0;

            // } else if (translate._value > 100) {
            //     Animated.spring(translate, {
            //         toValue: 480,
            //         duration: 2000,
            //         useNativeDriver: true
            //     }).start()
            //     translate.setOffset(480);
            //     translate.setValue(0);

            //     // console.log("onRelease greater than 100");
            // }

            

            if (gestureState.dy < -30) {
                translate._value = 0;
                
                Animated.spring(translate, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true
                }).start()
                translate._offset = 0;
                
            }

            translate.flattenOffset();

            console.log("onRelease ----------------------------------------------------------------------------")

            console.log("onRelease => offset", translate._offset);
            console.log("onRelease => value", translate._value);




        }
    })).current;

    return (
        <Animated.View

            {...panResponder.panHandlers}

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