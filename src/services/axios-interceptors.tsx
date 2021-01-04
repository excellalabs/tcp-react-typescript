export interface InterceptorInfo {
    pathMatch: string,
    responseFunction: Function
}

const oauthInterceptorInfo: InterceptorInfo = { 
    pathMatch: 'oauth', 
    responseFunction: function (config: any) {
        if(config.url.includes('username=user&password=pass&')){
            return new Promise((resolve, reject) => {
            const res = {
                data: {
                    access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX25hbWUiOiJ1c2VyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImV4cCI6MTYwOTcyMTg1NSwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6IjlhOGIwZjVhLTNjYTQtNGEzNC05MjFkLWYxYTM3M2EzM2U1MiIsImVtYWlsIjoiam9obkB3aW5jaGVzdGVyLmNvbSIsImNsaWVudF9pZCI6ImFwcCIsImlhdCI6MTYwOTM2NjY1OH0.Bc1xq2fW8aH80OJxdpYGFEMRf-YQzK6RW692VHPzCBA"
                },
                status: 200,
                statusText: "OK",
                headers: { "content-type": "text/plain; charset=utf-8" },
                config,
                request: {}
            };

            return resolve(res);
            });
        } else {
            return Promise.reject({reason: 'login failed'})
        }
    }
}

export const interceptorInfos: InterceptorInfo[] = [
    oauthInterceptorInfo
]