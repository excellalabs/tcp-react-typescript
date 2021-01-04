export interface InterceptorInfo {
  pathMatch: string;
  responseFunction: Function;
}

export const interceptorInfos: InterceptorInfo[] = [];
