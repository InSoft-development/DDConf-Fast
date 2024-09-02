// 8000
export const BASE_URL = window.location.origin;


export const request = (endpoint, method, params = null) => {

    const bodyStructure = {method, params};

    return fetch(`${BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(bodyStructure)
    })
}
