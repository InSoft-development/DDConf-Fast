import React from 'react';
import { useFieldArray } from 'react-hook-form';
import Subscription from '../subscription/subscription';
import { useFormContext } from 'react-hook-form';

const SubscriptionsSection = ({serverId: id}) => {

    const {control} = useFormContext();

    const {fields, append, remove} = useFieldArray({
        control,
        name: `servers.${id}.subscriptions`,
        shouldUnregister: true
    })

    const addSubscription = (e) => {
        e.preventDefault();
        append({
            interval: 0,
            items: ''
        });
    }

    const removeSubscription = (index) => {
        remove(index)
    }

    return (
        <>
            {fields.map((field, index) => (
                <Subscription key={field.id} serverId={id} subscriptionId={index} removeSubscription={removeSubscription}/>
            ))}
            <div>
                <button type='button' className='btn-green' onClick={addSubscription}>Добавить подписку</button>
            </div>
        </>
    );
}

export default SubscriptionsSection;
