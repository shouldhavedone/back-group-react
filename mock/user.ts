/*
 * @Description: 
 * @version: 1.0.0
 * @Author: wutao
 * @Date: 2021-07-16 16:33:12
 * @LastEditTime: 2021-07-19 14:00:34
 */
const accounts = [
  { username: 'admin', password: '123', nickname: '管理员', role: 0, token: 'admin' },
  { username: 'user', password: '123', nickname: '操作员', role: 1, token: 'user' },
]

const access = {
  admin: {
    isList: true,
    isAdd: true,
    isDetail: true,
    isList2: true,
    isDel: true
  },
  user: {
    isList: true,
    isAdd: false,
    isDetail: true,
    isDel: false
  }
}

export default {
  'POST /a/login': function (req, res) {
    const { username, password } = req.body;
    let user;
    accounts.map(function (account) {
      if (username === account.username && password === account.password) {
        user = account;
      }
    })
    if (!user) {
      res.status(401);
      res.send({ code: 401, message: '用户名或密码失败' })
    } else {
      res.send({ code: 200, message: '响应成功', nickname: user.nickname, token: user.token })
    }
  },
  'POST /a/access': function (req, res) {
    const token = req.headers['x-access-token'];
    if (!token || !access[token]) {
      res.status(401);
      res.send({ code: 401, message: '无令牌访问' });
      return;
    }
    setTimeout(function () {
      res.send({ code: 200, message: '响应成功', data: access[token] })
    }, 1000)
  }
}