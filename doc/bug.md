{
  "message": "No such module \"server-functions/cat-finance/index.mjs\".",
  "exception": {
    "stack": "    at worker.js:8316:50",
    "name": "Error",
    "message": "No such module \"server-functions/cat-finance/index.mjs\".",
    "timestamp": 1771820274196
  },
  "$workers": {
    "truncated": false,
    "event": {
      "request": {
        "url": "https://www.toolcase.cc/zh-tw/finance/mortgage-calculator",
        "method": "HEAD",
        "path": "/zh-tw/finance/mortgage-calculator"
      }
    },
    "outcome": "exception",
    "scriptName": "toolcase-production",
    "eventType": "fetch",
    "executionModel": "stateless",
    "scriptVersion": {
      "id": "924bc3b4-63a0-4a42-b183-677fe019e048"
    },
    "requestId": "9d23ea899b1ffde8"
  },
  "$metadata": {
    "id": "01KJ4BFMGM5CP7WT8RNSEP539F",
    "requestId": "9d23ea899b1ffde8",
    "trigger": "HEAD /zh-tw/finance/mortgage-calculator",
    "service": "toolcase-production",
    "level": "error",
    "error": "No such module \"server-functions/cat-finance/index.mjs\".",
    "message": "No such module \"server-functions/cat-finance/index.mjs\".",
    "account": "1ff43f0d4c3ad3bd98ce5ab767546a68",
    "type": "cf-worker",
    "fingerprint": "2d818eff997819632dcc0b870faa6d31",
    "origin": "fetch",
    "messageTemplate": "No such module \"server-functions/cat-finance/<DOMAIN>\"."
  }
}
{
  "level": "error",
  "message": "HEAD <https://www.toolcase.cc/zh-tw/finance/mortgage-calculator>",
  "$workers": {
    "event": {
      "request": {
        "cf": {
          "requestHeaderNames": {},
          "isEUCountry": false,
          "httpProtocol": "HTTP/2",
          "requestPriority": "weight=16;exclusive=0;group=0;group-weight=0",
          "colo": "SIN",
          "asOrganization": "Chunghwa Telecom Co.,Ltd.",
          "country": "TW",
          "city": "Taipei",
          "continent": "AS",
          "region": "Taiwan",
          "regionCode": "04",
          "timezone": "Asia/Taipei",
          "longitude": "121.52639",
          "latitude": "25.05306",
          "tlsVersion": "TLSv1.3",
          "tlsCipher": "AEAD-CHACHA20-POLY1305-SHA256",
          "tlsClientRandom": "eQjVcCSGgXspd8QAjG/tm8OCOdfeRgtBMHA747BCKXM=",
          "tlsClientCiphersSha1": "eDGmD1H99AwNYzOR+7eoGLo6eLU=",
          "tlsClientExtensionsSha1": "Ub+nUmIm1U57hdNSUph0R+kx9Gc=",
          "tlsClientExtensionsSha1Le": "NMNf2YIpLBhtroOEBooGFi+jtJ8=",
          "tlsExportedAuthenticator": {
            "clientHandshake": "f8d0962fdbb8bd21eea289f0f0057346abe2ee2d9d4a0ec282070ecd212da727",
            "serverHandshake": "5ae5f6efe46c0bff191c395d54f1fc94db4ffebc293b5dd6a5e5abccfa5c5625",
            "clientFinished": "f5bc3a697c586e23283d8515fc229644816c1248c2f8ce0eebfb7e1e417ebf6a",
            "serverFinished": "ed19cc55ceb93f88cce59c1dd8dc5f1664e995973b537cd81384be764f69465e"
          },
          "tlsClientHelloLength": "316",
          "tlsClientAuth": {
            "certPresented": "0",
            "certVerified": "NONE",
            "certRevoked": "0",
            "certIssuerDN": "",
            "certSubjectDN": "",
            "certIssuerDNRFC2253": "",
            "certSubjectDNRFC2253": "",
            "certIssuerDNLegacy": "",
            "certSubjectDNLegacy": "",
            "certSerial": "",
            "certIssuerSerial": "",
            "certSKI": "",
            "certIssuerSKI": "",
            "certFingerprintSHA1": "",
            "certFingerprintSHA256": "",
            "certNotBefore": "",
            "certNotAfter": ""
          },
          "verifiedBotCategory": "",
          "edgeRequestKeepAliveStatus": 1,
          "clientTcpRtt": 62,
          "asn": 3462
        },
        "url": "https://www.toolcase.cc/zh-tw/finance/mortgage-calculator",
        "method": "HEAD",
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, br",
          "cf-connecting-ip": "59.124.242.153",
          "cf-ipcountry": "TW",
          "cf-ray": "9d23ea899b1ffde8",
          "cf-visitor": "{\"scheme\":\"https\"}",
          "connection": "Keep-Alive",
          "host": "www.toolcase.cc",
          "user-agent": "curl/8.7.1",
          "x-forwarded-proto": "https",
          "x-real-ip": "59.124.242.153"
        },
        "path": "/zh-tw/finance/mortgage-calculator"
      },
      "rayId": "9d23ea899b1ffde8",
      "response": {
        "status": 500
      }
    },
    "diagnosticsChannelEvents": [],
    "truncated": false,
    "scriptName": "toolcase-production",
    "outcome": "exception",
    "eventType": "fetch",
    "executionModel": "stateless",
    "scriptVersion": {
      "id": "924bc3b4-63a0-4a42-b183-677fe019e048"
    },
    "requestId": "9d23ea899b1ffde8",
    "cpuTimeMs": 3,
    "wallTimeMs": 4
  },
  "$metadata": {
    "id": "01KJ4BFMGKY7NVV18D7GAEM6AV",
    "requestId": "9d23ea899b1ffde8",
    "trigger": "HEAD /zh-tw/finance/mortgage-calculator",
    "service": "toolcase-production",
    "level": "error",
    "error": "HEAD <https://www.toolcase.cc/zh-tw/finance/mortgage-calculator>",
    "message": "HEAD <https://www.toolcase.cc/zh-tw/finance/mortgage-calculator>",
    "account": "1ff43f0d4c3ad3bd98ce5ab767546a68",
    "type": "cf-worker-event",
    "fingerprint": "f4918ccc6d19708941d560dad7ab004c",
    "origin": "fetch",
    "messageTemplate": "HEAD <https://www.toolcase.cc/zh-tw/finance/mortgage-calculator>"
  }
}
{
  "message": "No such module \"server-functions/cat-dev/index.mjs\".",
  "exception": {
    "stack": "    at worker.js:8316:50",
    "name": "Error",
    "message": "No such module \"server-functions/cat-dev/index.mjs\".",
    "timestamp": 1771820268229
  },
  "$workers": {
    "truncated": false,
    "event": {
      "request": {
        "url": "https://www.toolcase.cc/zh-tw/dev/json-formatter",
        "method": "HEAD",
        "path": "/zh-tw/dev/json-formatter"
      }
    },
    "outcome": "exception",
    "scriptName": "toolcase-production",
    "eventType": "fetch",
    "executionModel": "stateless",
    "scriptVersion": {
      "id": "924bc3b4-63a0-4a42-b183-677fe019e048"
    },
    "requestId": "9d23ea63ca7740d7"
  },
  "$metadata": {
    "id": "01KJ4BFEP5MM0AVVXKSNTR00X5",
    "requestId": "9d23ea63ca7740d7",
    "trigger": "HEAD /zh-tw/dev/json-formatter",
    "service": "toolcase-production",
    "level": "error",
    "error": "No such module \"server-functions/cat-dev/index.mjs\".",
    "message": "No such module \"server-functions/cat-dev/index.mjs\".",
    "account": "1ff43f0d4c3ad3bd98ce5ab767546a68",
    "type": "cf-worker",
    "fingerprint": "5cc4071338f1d2a476b722b5f39e3b7c",
    "origin": "fetch",
    "messageTemplate": "No such module \"server-functions/cat-dev/<DOMAIN>\"."
  }
}
