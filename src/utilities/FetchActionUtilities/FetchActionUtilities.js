 

export const handleResponse = (response) => {
    try {
        return response.json()
            .then((res) => {
                if (res.status === "success") {
                    return res;
                } else {
                    // RTError(res.message)
                }
            })
            .catch((e) => {
                console.log("login response catch", e);
            })
            .finally(() => {
            })
    } catch (error) {
        // RTError(error.message);
    }
}
 

export const handleCatch = (e) => {
    try {
        console.log("catch error", e)
        // RTError(e.message);
    } catch (error) {
    }
}