import PropTypes from "prop-types";
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {
    Header,
    Left,
    Right,
    Body
} from 'native-base';

import RNVIE from 'react-native-vector-icons/Entypo';

class NBHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.openDrawer = this.openDrawer.bind(this) ;
    }

    openDrawer = () => {
        console.log("header button press", this.props.navigation)
        this.props.navigation.toggleDrawer()
    }

    render() {
        return (
            <Header
                {...this.props}
                style={{
                    backgroundColor: '#3792cb'
                }}
            >
                <Left>
                    <RNVIE
                        name={"menu"}
                        onPress={this.openDrawer}
                        size={28}
                    />
                </Left>
                <Body>
                    <Text style={{ fontSize: 18 }}>{this.props.title}</Text>
                </Body>
            </Header>
        );
    }
}

export default NBHeader;
