{
  "wallTime": 2,
  "cpuTime": 1,
  "truncated": false,
  "executionModel": "stateless",
  "outcome": "exception",
  "scriptTags": [
    "cf:service=toolcase-cat-dev",
    "cf:environment=production"
  ],
  "scriptVersion": {
    "id": "a1d64113-7c9a-4542-a20c-4b725e071ed6"
  },
  "scriptName": "toolcase-cat-dev-production",
  "diagnosticsChannelEvents": [],
  "exceptions": [
    {
      "stack": "    at .open-next/server-functions/cat-dev/node_modules/.pnpm/next@15.5.9_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/require-hook.js (worker-cat-dev.js:7365:35)\n    at __require3 (worker-cat-dev.js:18:53)\n    at .open-next/server-functions/cat-dev/node_modules/.pnpm/next@15.5.9_react-dom@19.2.4_react@19.2.4__react@19.2.4/node_modules/next/dist/server/next-server.js (worker-cat-dev.js:149250:5)\n    at __require3 (worker-cat-dev.js:18:53)\n    at .open-next/server-functions/cat-dev/index.mjs (worker-cat-dev.js:154200:34)\n    at __init (worker-cat-dev.js:15:56)\n    at worker-cat-dev.js:201708:43",
      "name": "TypeError",
      "message": "resolve is not a function",
      "timestamp": 1771816213557
    }
  ],
  "logs": [],
  "eventTimestamp": 1771816213557,
  "event": {
    "request": {
      "url": "https://www.toolcase.cc/zh-tw/dev/text-encrypt-decrypt",
      "method": "GET",
      "headers": {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "accept-encoding": "gzip, br",
        "accept-language": "en-US,en;q=0.9",
        "cf-connecting-ip": "59.124.242.153",
        "cf-ipcountry": "TW",
        "cf-ray": "9d238766ba879cf3",
        "cf-visitor": "{\"scheme\":\"https\"}",
        "connection": "Keep-Alive",
        "host": "www.toolcase.cc",
        "priority": "u=0, i",
        "referer": "https://www.toolcase.cc/zh-tw/category/dev",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Safari/605.1.15",
        "x-forwarded-proto": "https",
        "x-real-ip": "59.124.242.153"
      },
      "cf": {
        "httpProtocol": "HTTP/3",
        "clientAcceptEncoding": "gzip, deflate, br",
        "requestPriority": "",
        "edgeRequestKeepAliveStatus": 1,
        "requestHeaderNames": {},
        "clientTcpRtt": 0,
        "colo": "SIN",
        "asn": 3462,
        "asOrganization": "Chunghwa Telecom Co.,Ltd.",
        "country": "TW",
        "isEUCountry": false,
        "city": "Taipei",
        "continent": "AS",
        "region": "Taiwan",
        "regionCode": "04",
        "timezone": "Asia/Taipei",
        "longitude": "121.52639",
        "latitude": "25.05306",
        "tlsVersion": "TLSv1.3",
        "tlsCipher": "AEAD-AES128-GCM-SHA256",
        "tlsClientRandom": "fBIN8L5fYxuOpnb23iKxjfSYGRLzhjZq/jcigGwoxCU=",
        "tlsClientCiphersSha1": "QuBDZLQiT2q/daip00Bsc4nsvz0=",
        "tlsClientExtensionsSha1": "KCZZmywbbCwtRjqixRzFWmzusR0=",
        "tlsClientExtensionsSha1Le": "",
        "tlsClientHelloLength": "255",
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
        "verifiedBotCategory": ""
      }
    },
    "response": {
      "status": 500
    }
  },
  "id": 0
}