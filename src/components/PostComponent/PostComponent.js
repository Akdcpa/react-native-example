import React, { Component } from 'react'
import { Text, View } from 'react-native'

import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { IMAGE_BASE } from '../../configs/Configs'

export default class PostComponent extends Component {
    render() {
        return (
            <View>
                <Card>
                    <Card.Title title={this.props.users.name} />

                    <Card.Content>
                        <Title>Card title</Title>
                        <Paragraph>{this.props.message}</Paragraph>
                    </Card.Content>

                    <Card.Cover source={`${IMAGE_BASE}${this.props.logo}`} />

                    <Card.Actions>
                        <Button>Cancel</Button>
                        <Button>Ok</Button>
                    </Card.Actions> 
                </Card>
            </View>
        )
    }
}
