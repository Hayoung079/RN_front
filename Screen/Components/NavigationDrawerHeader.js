// Import React and Component
import { Icon } from 'native-base';
import React from 'react';
import {View, TouchableOpacity} from 'react-native';

const NavigationDrawerHeader = (props) => {
    const toggleDrawer = () => {
        props.navigationProps.toggleDrawer();
    };

    return (
        <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={toggleDrawer}>
                <Icon
                    type='Feather'
                    name='menu'
                    style={{width: 25, height: 25, marginLeft: 5, color: '#fff'}}
                />
            </TouchableOpacity>
        </View>
    );
};
export default NavigationDrawerHeader;