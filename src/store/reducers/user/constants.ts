export const BASE_CONFIG = {
  base: {
    panel_view_mode: 'vertical', // 分屏展示方式 左右，'horizontal' 上下，'vertical';
    program_theme: 'white', //应用程序主题
    text_color: 'blue', //文本颜色
    zoom_factor: 100, //内容缩放比例
    language: 'zh-cn', //软件语言
  },
  http: {
    timeout: 0, //接口请求超时时间 单位毫秒
    follow_redirect: 1, //请求是否自动重定向
    max_requst_loop: 5, //最大重定向次数
    auto_convert_field_to_mock: 1, //是否自动将参数转换成mock变量
    auto_request_param_to_json: 1, //发送数据 json 化
  },
  proxy: {
    system: {
      is_used: -1, // 是否使用系统代理
      env_first: -1, //是否优先使用HTTP_PROXY,HTTPS_PROXY,NO_PROXY系统环境变量
      auth: {
        //默认使用系统的代理配置来连接任何在线服务，或发送 API 请求
        is_used: -1, //是否使用身份认证开关 1|-1
        username: '',
        password: '',
      },
    },
    custom: {
      is_used: -1, //是否使用自定义代理
      proxy_type: [], //proxy类型 http/https
      proxy_url: '', //代理服务器地址
      proxy_port: 8080, //代理服务器端口号
      proxy_bypass: '', //输入逗号分隔的主机以绕过代理设置。eg:127.0.0.1,localhost,*.example.com
      auth: {
        is_used: -1, //是否使用身份认证开关 1|-1
        username: '',
        password: '',
      },
    },
  },
  certificate: {
    //ca证书
    ca_cert: {
      is_used: -1, //是否使用CA证书
      path: '', //本地路径
      base64: '', //证书base64地址
      file_name: '', //证书文件名称
    },
    client_certs: [], //客户端证书  [{  host: 'www.baidu.com',  port: '443', }]
  },
  universal: {
    default_createn_method: 'POST', //新建接口默认方法
    use_quick_close: 1, //是否使用快捷关闭，(鼠标中箭点击自动关闭tab)
    use_shortcuts_key: 1, //是否启用快捷键
    auto_download_updates: 1, //是否自动下载最新更新包
    auto_send_err_message: 1, //是否加入开发体验计划，自动发送错误报告
    ask_closing_unsaved_tabs: 1, //关闭未保存的页签时是否需要二次询问
  },
};
