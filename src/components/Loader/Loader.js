import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default class Loader extends React.Component {
    render() {
        return (
            <View style={[styles.container, styles.horizontal]}>
              {
                this.props.visible &&
                <ActivityIndicator  size="large" color="#0000ff" /> 
              }
            </View>
        )
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // marginTop:
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});
