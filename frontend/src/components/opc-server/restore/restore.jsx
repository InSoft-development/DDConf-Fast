import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Flex } from 'antd';

const Restore = () => {

    const { control } = useFormContext();

    return (
        <Flex align='center' className='mb-14'>
            <label
                htmlFor="restore"
                className='text_type_main_default mr-10'
            >Воостановить соединение после падения</label>
            <Controller
                name='restore'
                control={control}
                render={({ field: { value, onChange } }) => (
                    <input
                        type="checkbox"
                        id="restore"
                        name='restore'
                        value={value}
                        onChange={onChange}
                    />
                )}
            />
        </Flex>
    );
}

export default Restore;
