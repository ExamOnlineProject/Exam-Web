import request from '../utils/request';
import qs from 'qs';

export const getMonitorPaper = query => {
    return request({
        url: '/getMonitorPaper',
        method: 'get',
        params: query
    });
};

export const selectMontiorStudent = query => { 
    return request({
		url: '/selectMonitorStudent',
        method: 'get',
        params: query
    });
};
