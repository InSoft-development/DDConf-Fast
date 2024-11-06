const checkResponce = async (res) => {
    try{
        if(!res.ok){
            await Promise.reject(new Error(`HTTP Status: ${res.status}`))
        }
        return await res.json()
    }catch(error){      
        throw new Error(error.message);
    }
}

export default checkResponce;