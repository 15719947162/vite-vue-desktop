import request from '@/utils/request';

export const getFileList = (unitId) => request({ 
    url: `/ems/basic/attachment/list/${unitId}`, 
    method: 'get' 
});
export const deleteFile = (fileId) => request({ 
    url: `/ems/basic/attachment/delete/${fileId}`, 
    method: 'delete' 
});
