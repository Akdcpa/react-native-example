import {
    Toast
} from 'native-base';

export const showNormalMessage = (message) => {
    Toast.show({
        text: message,        
        position: "top"
      })
}

export const showSuccessMessage = (message) => {
    Toast.show({
        text: message,
        position: "top",
        type: "success"
      })
}

export const showWarningMessage = (message) => {
    Toast.show({
        text: message,
        position: "top",
        type: "warning"
      })
}

export const showErrorMessage = (message) => {
    Toast.show({
        text: message,
        position: "top",
        type: "danger"
      })
}