self.__BUILD_MANIFEST = {
  "polyfillFiles": [
    "static/chunks/polyfills.js"
  ],
  "devFiles": [
    "static/chunks/react-refresh.js"
  ],
  "ampDevFiles": [],
  "lowPriorityFiles": [],
  "rootMainFiles": [],
  "pages": {
    "/_app": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_app.js"
    ],
    "/_error": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/_error.js"
    ],
    "/cadastro-comprador": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/cadastro-comprador.js"
    ],
    "/cadastro-produtor": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/cadastro-produtor.js"
    ],
    "/compra": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/compra.js"
    ],
    "/listComprador": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/listComprador.js"
    ],
    "/listSacas": [
      "static/chunks/webpack.js",
      "static/chunks/main.js",
      "static/chunks/pages/listSacas.js"
    ]
  },
  "ampFirstPages": []
};
self.__BUILD_MANIFEST.lowPriorityFiles = [
"/static/" + process.env.__NEXT_BUILD_ID + "/_buildManifest.js",
,"/static/" + process.env.__NEXT_BUILD_ID + "/_ssgManifest.js",

];