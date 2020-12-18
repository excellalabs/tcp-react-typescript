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
                data: 'logged in',
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