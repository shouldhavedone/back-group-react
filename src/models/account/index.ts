import { useState } from 'react';
import { createModel } from 'hox';
import { useRequest } from 'ahooks';

export const USER_TOKEN = 'token';

function useAccount() {
  const [account, setAccount] = useState<ILoginSuccessData>({});

  const userLogin = useRequest(
    data => ({ url: '/a/login', method: 'post', data }),
    { manual: true, onSuccess: handleLoginSuccess });

  function handleLoginSuccess(data: ILoginSuccessData) {
    window.localStorage.setItem(USER_TOKEN, data.token!);
    setAccount({
      token: data.token,
      nickname: data.nickname
    });
  }

  return { login: userLogin.run, account };
}

export interface ILoginSuccessData  {
  token?: string;
  nickname?: string;
}



export default createModel(useAccount);