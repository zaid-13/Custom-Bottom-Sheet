import React, { useRef } from "react";
import { Animated, View, StyleSheet, PanResponder, Text } from "react-native";

const BottomSheetV4 = () => {

    const pan = useRef(new Animated.ValueXY({ x: 180, y: 180 })).current;

    console.log("pan responder value", pan)

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                // pan.setOffset({
                //     x: pan.x._value,
                //     y: pan.y._value
                // });

                console.log("pan.y", pan.y._value);
            },
            onPanResponderMove: Animated.event(
                [
                    null,
                    { dx: pan.x, dy: pan.y }
                ],
                { useNativeDriver: false },
                { listener: e => console.log(e) }
            ),
            onPanResponderRelease: (e, g) => {
                // pan.flattenOffset();
                // if (g.dy > 100)
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    duration: 2000,
                    useNativeDriver: true
                }).start()
            }
        })
    ).current;

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Drag this box!</Text>
            <Animated.View
                style={{
                    transform: [{ translateX: 0 }, { translateY: pan.y }]
                }}
                {...panResponder.panHandlers}
            >
                <View style={styles.box} />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    titleText: {
        fontSize: 14,
        lineHeight: 24,
        fontWeight: "bold"
    },
    box: {
        height: 150,
        width: 150,
        backgroundColor: "blue",
        borderRadius: 5
    }
});

export default BottomSheetV4;