import request from '../utils/request';
import qs from 'qs';

export const getMonitorPaper = query => {
    return request({
        url: '/getMonitorPaper',
        method: 'get',
        params: query
    });
};
<<<<<<< HEAD

export const selectMontiorStudent = query => { 
    return request({
		url: '/selectMonitorStudent',
        method: 'get',
        params: query
    });
};
=======
>>>>>>> a2f7a7fcd0d6b04666ea3eb42b32058a82209f4e
