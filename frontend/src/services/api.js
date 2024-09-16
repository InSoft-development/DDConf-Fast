
const BASE_URL = process.env.REACT_APP_API || window.location.origin;

export const request = (endpoint, method, params = null) => {

    const bodyStructure = {method, params};

    return fetch(`${BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyStructure)
    })
}
