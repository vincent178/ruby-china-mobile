
使用 local state 混合 redux global state store

使用 rem 做移动端的字体适配

Component 自己保存所有的关于页面 UI 以及 interaction 相关的 state
Store 只保存数据, 相当于前端的数据库



所有 Response 采用 JSON 格式返回，请求状态通过 HTTP Status 返回。

HTTP Status

200, 201 - 请求成功，或执行成功。
400 - 参数不符合 API 的要求、或者数据格式验证没有通过，请配合 Response Body 里面的 error 信息确定问题。
401 - 用户认证失败，或缺少认证信息，比如 access_token 过期，或没传，可以尝试用 refresh_token 方式获得新的 access_token。
403 - 当前用户对资源没有操作权限。
404 - 资源不存在。
500 - 服务器异常。
错误的情况 Response Body 一定会是这样的格式: { "error" : "Error message" }


React.PropTypes 约定 component 所需参数, 只有 shared 文件夹下面需要


server side preload 数据
通过 component fetchData 静态方法, 共享服务端和浏览器端相同的代码, 实现服务器端根据不同的url preload data
这个方案配合 redux, container-component structure, react-router

server side render css
把所有需要的 css extract 成 app.css 文件


提交回复
reply[body]:不好意思 在测试 @beyondouyuan #a :lollipop:

1. 有 access_token, 没有过期, 直接发送请求
2. 有 access_token, 已经过期, 更新 access_token, 然后发送请求
3. 没有 access_token, 跳转

server加载内容, 到了用户浏览器使用 access_token 加载一次信息, 服务器回复所有 meta data


TODO
真正的 hot reload
错误处理
run in production

