
export const BASE_URL = 'http://localhost:8080'


export const request = (method, params = null) => {

    const bodyStructure = params ? {method, params} : {method};

    return fetch(`${BASE_URL}/dd104`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyStructure)
    })
}
