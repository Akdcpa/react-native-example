import {
    AUTH_BASE
} from '../../configs/Configs';
import {
    getAuthToken
} from './../AuthAction/AuthAction';
import {
    handleResponse,
    handleCatch,
} from '../../utilities/FetchActionUtilities/FetchActionUtilities';


export const createPosts = async (data) => {
    let token = await getAuthToken();
    return fetch(`${AUTH_BASE}post/create`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            // 'Content-type': "application/json"
        },
        method: 'POST',
        body: data
    })
        .then((res) => {
            return handleResponse(res);
        })
        .catch((e) => {
            return handleCatch(e);
        })
}

export const getPosts = async () => {
    let token = await getAuthToken();
    return fetch(`${AUTH_BASE}post/get`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    })
        .then((res) => {
            return handleResponse(res);
        })
        .catch((e) => {
            return handleCatch(e);
        })
}

export const searchPosts = async (search) => {
    let token = await getAuthToken();
    return fetch(`${AUTH_BASE}post/search?search=${search}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    })
        .then((res) => {
            return handleResponse(res);
        })
        .catch((e) => {
            return handleCatch(e);
        })
}

export const likes = async (post_id) => {
    let token = await getAuthToken();
    return fetch(`${AUTH_BASE}post/like`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify({
            post_id
        })
    })
        .then((res) => {
            return handleResponse(res);
        })
        .catch((e) => {
            return handleCatch(e);
        })
}

export const dislikes = (post_id) => {
    let token = getAuthToken();
    return fetch(`${AUTH_BASE}post/dislike`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify({
            post_id
        })
    })
        .then((res) => {
            return handleResponse(res);
        })
        .catch((e) => {
            return handleCatch(e);
        })
}

export const addComment =async (post_id, comment) => {
    let token = await getAuthToken();
    return fetch(`${AUTH_BASE}comment/create`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        method: 'POST',
        body: JSON.stringify({
            post_id,
            comment
        })
    })
        .then((res) => {
            return handleResponse(res);
        })
        .catch((e) => {
            return handleCatch(e);
        })
}

export const loadComments = async (post_id) => {
    let token = await getAuthToken();
    return fetch(`${AUTH_BASE}comment/get?post_id=${post_id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'GET'
    })
        .then((res) => {
            return handleResponse(res);
        })
        .catch((e) => {
            return handleCatch(e);
        })
}