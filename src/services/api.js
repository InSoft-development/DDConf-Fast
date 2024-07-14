
export const BASE_URL = 'http://localhost:8080'


export const request = (endpoint, method, params = null) => {

    const bodyStructure = params ? {method, params} : {method};

    return fetch(`${BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyStructure)
    })
}
