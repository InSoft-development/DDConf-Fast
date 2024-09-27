import { message } from 'antd';
import { uniqueValues } from './uniqueValues';

export const isProfileNameValid = (profileName) => {

    if(profileName.length === 0){
        message.open({
            type: 'warning',
            content: 'Названия профиля не может быть пустым',
            duration: 3
        })

        return false;
    }

    // eslint-disable-next-line
    const regExp = /[\&\;\|\*\?\'\"\`\[\]\(\)\$\<\>\{\}\^\#\/\%\!\\]/g;

    const matches = profileName.match(regExp);

    if(matches !== null){
        message.open({
            type: 'warning',
            content: `В названии профиля не могут использоваться ${uniqueValues(matches).join(' ')}`,
            duration: 5
        })

        return false
    }

    return true;

}