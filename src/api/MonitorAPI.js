import request from '../utils/request';
import qs from 'qs';

export const getMonitorPaper = query => {
    return request({
        url: '/getMonitorPaper',
        method: 'get',
        params: query
    });
};
