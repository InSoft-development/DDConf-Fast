// 8000
export const BASE_URL = 'http://127.0.0.1:8000';


export const request = (endpoint, method, params = null) => {

    const bodyStructure = {method, params};

    return fetch(`${BASE_URL}/${endpoint}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyStructure)
    })
}
