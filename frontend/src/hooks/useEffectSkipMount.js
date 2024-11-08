import { useEffect, useRef } from 'react';

const useEffectSkipMount = (cb, dep) => {

    const isMount = useRef(false);

    useEffect(() => {
        if(isMount.current){
            cb();
        }

        isMount.current = true;

    }, dep);

}

export default useEffectSkipMount;