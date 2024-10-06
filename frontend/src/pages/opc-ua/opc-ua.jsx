import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import OpcServer from '../../components/opc-server/opc-server';
import { useForm, useFieldArray } from 'react-hook-form';

const OpcUa = () => {

    const { register, handleSubmit, control } = useForm({
        shouldUnregister: true,
    })

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'servers',
        shouldUnregister: true
    })

    const addServer = (e) => {
        e.preventDefault();
        append({
            url1: ''
        });
    }

    const removeServer = (index) => {
        remove(index)
    }

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <>
            <form className='mt-20' onSubmit={handleSubmit(onSubmit)}>
                {
                    fields.map((field, index) => (
                        <div key={field.id} className='mb-20'>
                            <OpcServer 
                                id={index} 
                                register={register}
                                removeServer={removeServer}
                            />
                        </div>
                    ))
                }
                <button>Send</button>
                <footer>
                    <button type='button' onClick={addServer}>Добавить сервер</button>
                </footer>
            </form>

        </>
    )

}

export default OpcUa;