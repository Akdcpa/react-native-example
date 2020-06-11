
import React from 'react';

import {
  Root
} from 'native-base';

import {
  AuthRoute,

} from './src/Routes/index'

import {
  VideoExample
} from './src/screens/index'

class App extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <AuthRoute /> 
      // <VideoExample/>
    )
  }
}

export default () => {
  return (
    <Root>
      <App />
    </Root>
  )
};
 
