export const checkResponce = (res) => {

    if(!res.ok){
        return Promise.reject(res)
    }
    
    return res.json()

}