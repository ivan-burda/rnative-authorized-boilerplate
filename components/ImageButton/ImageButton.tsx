import React, {FC} from 'react';
import {TouchableOpacity, Image, StyleSheet, ImageProps} from 'react-native';

interface Props {
    onPress: () => void;
    imageSource: ImageProps;
}

export const ImageButton: FC<Props> = ({onPress, imageSource}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Image source={imageSource} style={styles.image}/>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginBottom: 5,
        resizeMode: 'contain',
    },
});