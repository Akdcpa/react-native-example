import {
    showErrorMessage
} from './../NotificationUtilities/NotificationUtilities';

export const handleResponse = (response) => {
    try {
        return response.json()
            .then((res) => {
                if (res.status === "success") {
                    return res;
                } else {
                    showErrorMessage(res.message)
                }
            })
            .catch((e) => {
                console.log("handle response cache", e)
            })
            .finally(() => {
            })
    } catch (e) {
        showErrorMessage(e.message)
    }
}


export const handleCatch = (e) => {
    try {
        console.log("handle catch cache", e)
        showErrorMessage(e.message)
    } catch (error) {
    }
}