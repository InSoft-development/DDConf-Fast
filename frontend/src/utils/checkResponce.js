import { notification } from 'antd';
import { WarningOutlined } from '@ant-design/icons';

export const checkResponce = (res) => {

    if(!res.ok || res.error === null){
        notification.error({
            message: `Код ответа сервер ${res.status}`,
            description: `${res.statusText}`,
            placement: 'topLeft',
            icon: (
                <WarningOutlined style={{fontSize: 24, color: 'var(--red)'}}/>
            )
        });
        
        return Promise.reject(res)
    }
    
    return res.json()

}