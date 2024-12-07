import { MessageType } from './types';
import SvgEmphasize from '@assets/icons/emphasize.svg?react';
import SvgOkay from '@assets/icons/okay.svg?react';
import SvgSent from '../icons/sent.svg?react';
import SvgReceived from '../icons/received.svg?react';

export const MESSAGE_ICONS = {
  disconnect: SvgEmphasize,
  connected: SvgOkay,
  error: SvgEmphasize,
  sent: SvgSent,
  received: SvgReceived,
};

export const msgList = [
  {
    type: 'connected' as MessageType,
    title: `连接成功: ws://154.221.17.249:8101?uid=10000265`,
    time: '12:23:39',
    data: {
      collection: {
        id: 'api2',
        parent_id: '0',
        name: 'API可用数据',
        sort: 97,
        version: 214,
        create_time: 1742350494,
        update_time: 1749072053,
        data: {
          request: {
            url: '/get',
            method: 'get',
            auth: {
              type: 'inherit',
              kv: { key: 'mollit in Ut', value: '{{token}}' },
              bearer: { key: 'in exercitation anim consectetur eu' },
              basic: { username: '万洋', password: 'minim id' },
              digest: {
                username: '廖芳',
                password: 'Excepteur deserunt enim irure labore',
                realm: 'id fugiat',
                nonce: 'culpa magna',
                algorithm: 'eiusmod sint velit enim',
                qop: 'nisi cillum laboris',
                nc: 'aute consectetur in',
                cnonce: 'cillum',
                opaque: 'qui incididunt cillum ea labore',
              },
              hawk: {
                authId: '42',
                authKey: 'adipisicing',
                algorithm: 'incididunt',
                user: 'Ut',
                nonce: 'proident deserunt non anim ex',
                extraData: 'mollit pariatur dolore do aute',
                app: 'nostrud sint adipisicing enim',
                delegation: 'consectetur ea ut',
                timestamp: '2022-12-02 05:53:03',
                includePayloadHash: 14,
              },
              awsv4: {
                accessKey: 'cupidatat sit labore tempor',
                secretKey: 'in sed',
                region: 'aliquip laboris voluptate',
                service: 'sint',
                sessionToken: 'dolor reprehenderit consequat ipsum incididunt',
                addAuthDataToQuery: 46,
              },
              ntlm: {
                username: '韩敏',
                password: 'et in',
                domain: 'y.efn@qq.com',
                workstation: 'Lorem ea eu',
                disableRetryRequest: 64,
              },
              edgegrid: {
                accessToken: 'id qui minim officia',
                clientToken: 'dolore in in magna',
                clientSecret: 'consectetur dolor voluptate est',
                nonce: 'magna ut consequat sit',
                timestamp: '1972-04-21 01:46:30',
                baseURi: 'ea',
                headersToSign: 'in sed fugiat nisi aute',
              },
              oauth1: {
                consumerKey: 'qui dolore voluptate labore',
                consumerSecret: 'aute officia esse qui',
                signatureMethod: 'elit consectetur in ad adipisicing',
                addEmptyParamsToSign: 43,
                includeBodyHash: 61,
                addParamsToHeader: 51,
                realm: 'in ex',
                version: 'minim dolor aute sunt',
                nonce: 'sit',
                timestamp: '2013-05-01 07:08:30',
                verifier: 'incididunt et mollit elit veniam',
                callback: 'aliqua anim adipisicing',
                tokenSecret: 'dolor ut commodo eiusmod',
                token: 'pariatur et cupidatat Duis',
              },
            },
            headers: {
              sys_header: [
                {
                  name: 'User-Agent',
                  field_type: 'String',
                  value: 'Hapydev-Runtime/1.0.0',
                  value_type: 'text',
                  is_required: 1,
                  is_used: 1,
                  description: '',
                },
                {
                  name: 'Accept',
                  field_type: 'String',
                  value: '*/*',
                  value_type: 'text',
                  is_required: 1,
                  is_used: 1,
                  description: '',
                },
                {
                  name: 'Accept-Encoding',
                  field_type: 'String',
                  value: 'gzip, deflate, br',
                  value_type: 'text',
                  is_required: 1,
                  is_used: 1,
                  description: '',
                },
                {
                  name: 'Connection',
                  field_type: 'String',
                  value: 'keep-alive',
                  value_type: 'text',
                  is_required: 1,
                  is_used: 1,
                  description: '',
                },
              ],
              parameter: [
                {
                  name: 'aaa',
                  field_type: 'String',
                  value: '{{token}}',
                  value_type: 'text',
                  is_required: 1,
                  is_used: 1,
                  description: '',
                },
              ],
            },
            params: {
              parameter: [
                {
                  name: 'aaa',
                  field_type: 'String',
                  value: '{{token}}',
                  value_type: 'text',
                  is_required: 1,
                  is_used: 1,
                  description: '',
                },
              ],
              restful: [
                {
                  name: 'bbb',
                  field_type: 'String',
                  value: '222',
                  value_type: 'text',
                  is_required: 1,
                  is_used: 1,
                  description: '',
                },
              ],
            },
            body: {
              mode: 'none',
              raw_type: null,
              parameter: [
                {
                  name: 'User-Agent',
                  field_type: 'String',
                  value: '{{token}}/1.0.0',
                  value_type: 'text',
                  is_required: 1,
                  is_used: 1,
                  description: '',
                },
              ],
              raw: 'reprehenderit {{token}} consequat',
              raw_para: ['occaecat eiusmod Lorem fugiat culpa'],
              raw_schema: { type: 'laboris dolore nostrud ad' },
              binary: null,
            },
            cookies: [
              {
                name: 'User-Agent',
                field_type: 'String',
                value: 'Hapydev-Runtime/1.0.0',
                value_type: 'text',
                is_required: 1,
                is_used: 1,
                description: '',
              },
            ],
            pre_tasks: [{ type: 'customScript', enabled: 74, data: '', id: '34' }],
            post_tasks: [
              {
                type: 'customScript',
                enabled: 74,
                data: "console.log(pm.response.json(),'===pm=====')",
                id: '34',
              },
            ],
          },
        },
      },
      options: {
        variables: {
          environment: { envHost: 'echo.baidu.com', path: 'v2', token: '====token======' },
        },
        project: {
          auth: { type: 'bearer', bearer: '12312312312312' },
          pre_scripts: "console.log('project pre')",
          post_scripts: "console.log('project after')",
        },
        env_urls: { default: 'https://postman-echo.com', netease: 'www.163.com', qq: 'www.qq.com' },
        collections: {},
      },
    },
  },
  {
    type: 'disconnect' as MessageType,
    title: `连接断开: ws://154.221.17.249:8101?uid=10000265`,
    time: '12:23:39',
    data: {
      content_type: 'json',
      text: {
        event: 'LOGIN_GAME',
        data: {
          uid: 10000265,
          house_id: 10001,
        },
      },
    },
  },
  {
    type: 'sent' as MessageType,
    title: `{
        "event": "LOGIN_GAME",
        "data": {
            "uid": 10000265,
            "house_id": 10001
        }
    }`,
    time: '12:23:39',
    data: {
      content_type: 'json',
      text: `{
            "event": "LOGIN_GAME",
            "data": {
                "uid": 10000265,
                "house_id": 10001
            }
        }`,
    },
  },
  {
    type: 'received' as MessageType,
    title: `{
        "event": "LOGIN_GAME",
        "data": {
            "uid": 10000265,
            "house_id": 10001
        }
    }`,
    time: '12:23:39',
    data: {
      content_type: 'html',
      text: `{
            "event": "LOGIN_GAME",
            "data": {
                "uid": 10000265,
                "house_id": 10001
            }
        }`,
    },
  },
];
