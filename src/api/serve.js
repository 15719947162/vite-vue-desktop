import request from '@/utils/request';

export const test = (id) => request({ 
    url: `/app/account/manage/list/identity/${id}`, 
    method: 'get' 
});
