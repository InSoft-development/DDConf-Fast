import checkResponce from '../utils/checkResponce';

const baseUrl = process.env.REACT_APP_API || window.location.origin;

export const request = async (endpoint, method, params = null) => {
    try{
        const bodyStructure = {method, params};

        const responce = await fetch(`${baseUrl}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyStructure)
        })

        const data = await checkResponce(responce);

        return data;

    }catch(error){
        throw new Error(error.message);
    }
}
