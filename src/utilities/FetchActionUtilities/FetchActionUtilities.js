import {
    showErrorMessage
} from './../NotificationUtilities/NotificationUtilities';

export const handleResponse = (response) => {
    console.log("response for login", JSON.stringify(response))
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
            })
            .finally(() => {
            })
    } catch (e) {
        showErrorMessage(e.message)
    }
}


export const handleCatch = (e) => {
    try {
        showErrorMessage(e.message)
    } catch (error) {
    }
}