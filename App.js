
import React from 'react';

import {
  Root
} from 'native-base';

import {
  AuthRoute,

} from './src/Routes/index'
import {
    VideoComponent
} from './src/components/index'

class App extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <AuthRoute /> 
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
