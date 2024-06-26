export const checkResponce = (res) => {

    if(!res.ok || res.error === null){
        console.log('Ошибка ответа от сервера');
        return Promise.reject(res)
    }
    
    return res.json()

}