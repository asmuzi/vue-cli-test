import axios from 'axios';

const instance = axios.create({
    headers: {
        timeout: 3000,
        'Content-Type': 'application/json;charset=UTF-8',
        authorization:
            // eslint-disable-next-line max-len
            'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIwOThmNmJjZDQ2MjFkMzczY2FkZTRlODMyNjI3YjRmNiIsImlhdCI6MTYyNTcyNzk1OCwiYXVkIjoibmV4dG9waXVzZXIiLCJ1aWQiOiIxIiwidGVuYW50SWQiOiIxNTk2ODcwNjY5Mjc4IiwiZXhwIjoxNjI1ODE0MzU4LCJuYmYiOjE2MjU3Mjc5NTh9.27-4pCvlFpULzaRs--t9hV2C7aYmxcZWwMwqGuijcqc'
    }
});

const prefix = 'https://api.nextop.cc';
export const uploadFile = params =>
    instance.post(prefix + '/importExportPlatform/file/import/single', params);

export const exportFile = params =>
    instance
        .get(
            prefix +
                '/importExportPlatform/file/download?fileId=' +
                params.fileId,
            params,
            {
                responseType: 'blob'
            }
        )
        .then(res => {
            downBuffer(res);
        });

// 通过 a 标签实现下载
export const downloadFile = (url, filename) => {
    let a = document.createElement('a');
    a.href = url;
    a.download = decodeURI(filename);
    document.body.appendChild(a);
    a.click();
    a.remove();
};

// 接口返回文件流
export const downBuffer = (res, filename) => {
    let blob = new Blob([res]);
    let blobURL = window.URL.createObjectURL(blob);
    // 下载处理
    // 下载处理
    const resultName =
        filename || 'content-disposition' in res.headers
            ? decodeURIComponent(
                res.headers['content-disposition']
                    .split(';')[1]
                    .split('=')[1]
                    .replace(/"/g, '')
            )
            : '下载文件';

    downloadFile(blobURL, resultName);
    window.URL.revokeObjectURL(blobURL);
};
