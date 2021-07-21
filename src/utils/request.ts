import { notification } from 'antd';
import request, { RequestOptionsInit } from 'umi-request';
import { history } from 'umi';
// import {TOKEN} from "@/models/account/account";
import { RequestEvent } from "@/models/network";
import { TOKEN } from "@/constants/config";

/**
 * 错误编码
 *
 ```
 200: '服务器成功返回请求的数据。',
 201: '新建或修改数据成功。',
 202: '一个请求已经进入后台排队（异步任务）。',
 204: '删除数据成功。',
 400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
 401: '用户没有权限（令牌、用户名、密码错误）。',
 403: '用户得到授权，但是访问是被禁止的。',
 404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
 406: '请求的格式不可得。',
 410: '请求的资源被永久删除，且不会再得到的。',
 422: '发出的请求中，有一个验证错误。',
 500: '服务器发生错误，请检查服务器。',
 502: '网关错误。',
 503: '服务不可用，服务器暂时过载或维护。',
 504: '网关超时。'
 ```
 */
export const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '发出的请求中，有一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};


export function reqSuccess(res: RequestData, notice = true) {
    if (!res) return false;
    const isSuccess = res.code === 200;
    if (!isSuccess) {
        notice && notification.error({ message: res.message });
    }
    return isSuccess;
    // return res.code === '200';
}


let inErring = false;

function requestEventDispatch({ inRequest, modalLoading, hideLoading, loadingContent, drawerLoading }: RequestParams & { inRequest: boolean }) {
    const event = RequestEvent.getInstance();
    event.inRequest = inRequest;
    event.modalLoading = modalLoading || false;
    event.drawerLoading = drawerLoading || false;
    event.hideLoading = hideLoading || false;
    event.loadingContent = loadingContent;
    dispatchEvent(event.target);
}


interface RequestParams extends RequestOptionsInit {
    modalLoading?: boolean;
    drawerLoading?: boolean;
    hideLoading?: boolean;
    loadingContent?: string;
}
/**
 * response拦截器，错误处理
 *
 * @param response response对象.
 * @param options 请求参数.
 */
request.interceptors.response.use((response) => {
    requestEventDispatch({
        inRequest: false,
        modalLoading: false,
        drawerLoading: false,
        hideLoading: false,
        loadingContent: undefined
    });
    if (response.status > 399) {
        // 无访问权限的时候，跳转到登陆页面
        if (response.status === 401) {
            history.push('/login');
        }
        if (!inErring) {
            const errortext = codeMessage[response.status] || response.statusText;
            inErring = true;
            notification.error({
                message: `请求错误 (${response.status})`,
                description: errortext,
                onClose() {
                    inErring = false;
                }
            });
        }
    }
    return response;
})

/**
 * request拦截器,用于发送前的处理
 * @param url
 * @param options
 */
request.interceptors.request.use((url, options: RequestParams) => {
    requestEventDispatch({
        inRequest: true,
        modalLoading: !!options.modalLoading,
        drawerLoading: !!options.drawerLoading,
        hideLoading: !!options.hideLoading,
        loadingContent: options.loadingContent,
    });
    const Authentication = localStorage.getItem(TOKEN);
    if (Authentication) options.headers = { Authentication };
    //处理登录
    return {
        url, options
    }
})

export default request;

export const SQL_MANAGER = "/sql-manager";

//返回的数据的标准格式
export interface RequestData {
    data: any,
    code?: number,
    message?: string
}
