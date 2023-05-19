import { AxiosRequestConfig, AxiosRequestHeaders, Method } from "axios";

type RequestConfigProps = {
    method: Method,
    url: string,
    baseURL?: string,
    accessToken?: string,
}

const BASE_URL = 'http://localhost:3000/api';

function requestConfig(props: RequestConfigProps):AxiosRequestConfig{
    const {method,baseURL, url, accessToken} = props;
    const axiosHeaders: AxiosRequestConfig['headers'] = { 'Content-Type': 'application/json', 'Accept': '*/*'};

    const request: AxiosRequestConfig = { method, url, baseURL: BASE_URL };

    if(baseURL) request.baseURL = baseURL;
    if(accessToken) axiosHeaders.Authorization = `Bearer ${accessToken}`;
    request.headers = axiosHeaders;

    return request;
}


export { requestConfig }