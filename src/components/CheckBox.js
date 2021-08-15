import React from 'react';
import {StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';


export function CheckBox(props) {
    return (
        <Checkbox
            status={props.isChecked ? 'checked' : 'unchecked'}
            onPress={props.onPress}
           
        />
    );
}

const styles = StyleSheet.create({
    check: {
        color:'#1DB863',
    }

}); 