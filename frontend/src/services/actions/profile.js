import { getProfilesMock } from '../api';
import { checkResponce } from '../../utils/checkResponce';

export const PROFILE_REQUEST = 'PROFILE_REQUEST';
export const PROFILE_REQUEST_SUCCESS = 'PROFILE_REQUEST_SUCCESS';
export const PROFILE_REQUEST_FAILED = 'PROFILE_REQUEST_FAILED';

export const getProfiles = () => (dispatch) => {
    dispatch({type: PROFILE_REQUEST});
    getProfilesMock()
        // Индексирование процессов
        .then(res => {
            const processes = res.active.proc_data.map((process, index) => {
                return {
                    ...process,
                    id: index,
                }
            });

            const prifiles = [];

            res.loadout_names.forEach((profile, index) => {
                prifiles.push({
                    name: profile,
                    id: `p_${index}`
                })
            })
            
            return {
                ...res,
                active: {
                    name: res.active.name,
                    proc_data: processes
                },
                loadout_names: prifiles
            };
        })
        .then(res => {
            dispatch({type: PROFILE_REQUEST_SUCCESS, payload: res})
        })
        .catch(error => {
            console.log(error);
            dispatch({type: PROFILE_REQUEST_FAILED})
        })
}