require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_static__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_static___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa_static__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_bodyparser__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_bodyparser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_koa_bodyparser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_koa_router__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_koa_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__routes__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__koa_cors__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__koa_cors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__koa_cors__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_nuxt__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_nuxt__);







async function start() {
    const app = new __WEBPACK_IMPORTED_MODULE_0_koa___default.a();
    const host = process.env.HOST || '127.0.0.1';
    const port = process.env.PORT || 4000;
    // const host = process.env.NODE_ENV=='production'? 'http://47.106.163.14': '127.0.0.1'
    // const port = process.env.NODE_ENV=='production'? 3002 : 3000
    // const host =  '127.0.0.1'
    // const port =  3000
    app.on('error', function (err, ctx) {
        console.log('-------统一错误打印-------');
        console.log(err);
    });
    app.use(__WEBPACK_IMPORTED_MODULE_5__koa_cors___default()());
    app.use(__WEBPACK_IMPORTED_MODULE_2_koa_bodyparser___default()());
    app.use(__WEBPACK_IMPORTED_MODULE_1_koa_static___default()('.'));
    const router = new __WEBPACK_IMPORTED_MODULE_3_koa_router___default.a();
    router.use('', __WEBPACK_IMPORTED_MODULE_4__routes__["a" /* default */].routes());
    app.use(router.routes()).use(router.allowedMethods()); //注册路由
    // Import and Set Nuxt.js options
    const config = __webpack_require__(15);
    config.dev = !(app.env === 'production');

    // Instantiate nuxt.js
    const nuxt = new __WEBPACK_IMPORTED_MODULE_6_nuxt__["Nuxt"](config);

    // Build in development
    if (config.dev) {
        const builder = new __WEBPACK_IMPORTED_MODULE_6_nuxt__["Builder"](nuxt);
        await builder.build();
    }

    app.use(async (ctx, next) => {
        await next();
        ctx.status = 200; // koa defaults to 404 when it sees that status is unset
        return new Promise((resolve, reject) => {
            ctx.res.on('close', resolve);
            ctx.res.on('finish', resolve);
            nuxt.render(ctx.req, ctx.res, promise => {
                // nuxt.render passes a rejected promise into callback on error.
                promise.then(resolve).catch(reject);
            });
        });
    });

    app.listen(port, host);
    console.log('Server listening on ' + `http://${host}:${port}`);
}

start();

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("koa-static");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api__ = __webpack_require__(7);

// import article from './article';
// import user from './user';

const router = new __WEBPACK_IMPORTED_MODULE_0_koa_router___default.a();
// router.use('/article', article.routes(), article.allowedMethods());
// router.use('/user', user.routes(), user.allowedMethods());
router.use('/api', __WEBPACK_IMPORTED_MODULE_1__api__["a" /* default */].routes(), __WEBPACK_IMPORTED_MODULE_1__api__["a" /* default */].allowedMethods());
/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__controller_article__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_router__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa_router__);


const Api = new __WEBPACK_IMPORTED_MODULE_1_koa_router___default.a();
/**
 * 文章列表
 */
Api.post('/articlelist', __WEBPACK_IMPORTED_MODULE_0__controller_article__["a" /* default */].articlelist);
Api.post('/artById', __WEBPACK_IMPORTED_MODULE_0__controller_article__["a" /* default */].artById);
Api.post('/findByConditions', __WEBPACK_IMPORTED_MODULE_0__controller_article__["a" /* default */].findByConditions);
Api.post('/findByCate', __WEBPACK_IMPORTED_MODULE_0__controller_article__["a" /* default */].findByCate);
Api.post('/findHotsArticle', __WEBPACK_IMPORTED_MODULE_0__controller_article__["a" /* default */].findHotsArticle);
/* harmony default export */ __webpack_exports__["a"] = (Api);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mongoose_dbConnect__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);


// import {
//     ArticleModel
// } from '../mongoose/dbConnect'



/**
 * article Controller
 * Get List
 * Create Article
 * Set Article
 */
class ArticleController {
  constructor() {
    // 文章
    this.articlelist = this.articlelist.bind(this);
    this.artById = this.artById.bind(this);
    this.findByConditions = this.findByConditions.bind(this);
  }

  /**
   * 获取文章列表
   * @param {*} ctx
   * @param {*} next
   */
  async articlelist(ctx) {
    const body = ctx.request.body;
    try {
      if (body.skip != undefined && body.limit) {
        let option = {
          skip: Number(body.skip),
          limit: Number(body.limit)
        };
        let totalCount = await __WEBPACK_IMPORTED_MODULE_0__mongoose_dbConnect__["a" /* default */].countNum({});
        let data = JSON.parse(JSON.stringify((await __WEBPACK_IMPORTED_MODULE_0__mongoose_dbConnect__["a" /* default */].findArt({}, option))));
        for (let i = 0; i < data.length; i++) {
          var date = __WEBPACK_IMPORTED_MODULE_1_moment___default()(data[i].time).format('YYYY-MM-DD HH:mm');
          data[i].time = date;
        }
        ctx.body = {
          code: 0,
          totalCount: totalCount,
          data: data,
          desc: "成功"
        };
      } else {
        ctx.body = {
          code: 0,
          data: {},
          desc: "参数错误"
        };
      }
    } catch (err) {
      ctx.throw(err);
    }
  }
  /**
   * 获取文章详情
   */
  async artById(ctx) {
    const body = ctx.request.body;
    try {
      if (body.id != undefined) {
        let id = body.id;
        let data = await __WEBPACK_IMPORTED_MODULE_0__mongoose_dbConnect__["a" /* default */].getArtById(id);
        ctx.body = {
          code: 0,
          data: data,
          desc: "成功"
        };
      } else {
        ctx.body = {
          code: 0,
          data: {},
          desc: "未指定的文章id"
        };
      }
    } catch (err) {
      ctx.throw(err);
    }
  }
  /**
   * 按条件查找 全部返回  不包括某些项目
   */
  async findByConditions(ctx) {
    const body = ctx.request.body;
    const condition = body.condition;
    let option = {},
        data = [];
    switch (condition) {
      case 'tag':
        option = { tag: 1, _id: 0, image: 1 };
        break;
      default:
        option = {};
        break;
    }
    data = await __WEBPACK_IMPORTED_MODULE_0__mongoose_dbConnect__["a" /* default */].findByConditions({}, option);
    ctx.body = {
      code: 0,
      data: data,
      desc: "成功"
    };
  }
  async findHotsArticle(ctx) {
    let data = await __WEBPACK_IMPORTED_MODULE_0__mongoose_dbConnect__["a" /* default */].findHotsArticle();
    ctx.body = {
      code: 0,
      data: data,
      desc: "成功"
    };
  }
  /**
   * 按分类查找
   */
  async findByCate(ctx) {
    const body = ctx.request.body;
    const tagName = body.condition;
    const key = body.key;
    let option = {};
    switch (tagName) {
      case 'cate':
        option = {
          "type": "article",
          "content.tag": key
        };
        break;
      default:
        break;
    }
    let data = await __WEBPACK_IMPORTED_MODULE_0__mongoose_dbConnect__["a" /* default */].findByConditions(option);
    ctx.body = {
      code: 0,
      data: data,
      desc: "成功"
    };
  }
}

/* harmony default export */ __webpack_exports__["a"] = (new ArticleController());

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_Article__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_config__ = __webpack_require__(11);




__WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.connect(__WEBPACK_IMPORTED_MODULE_2__config_config__["a" /* default */].db.url, { useNewUrlParser: true });
const db = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('db success');
});
/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__model_Article__["a" /* default */]);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);
/**
 * 文章模型
 */

const ArticleSchema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema({
  title: String, //标题
  type: String,
  content: Object //文章内容
  // like:Number,//喜欢人数
  // isLower: { //是否下架
  //     type: Boolean,
  //     default: false
  // }
}, {
  // collection: 'markdown'
  collection: 'article'
});

ArticleSchema.statics = {
  /* 查找 分页*/
  async findArt(data = {}, option = {}) {
    const result = await this.find(data).skip(option.skip).limit(option.limit);
    return result;
  },
  /* 文章详情 按id */
  async getArtById(id) {
    const hid = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.mongo.ObjectId(id);
    const result = await this.find({ _id: hid });
    return result[0];
  },
  /* 按条件查找*/
  async findByConditions(option = {}) {
    const result = await this.find(option);
    return result;
  },
  // 查找最热文章
  async findHotsArticle() {
    const result = await this.find({ type: "article" });
    let res = result.map((item, index) => {
      return { title: item.title, id: item.id };
    });
    return res;
  },
  // /* 创建 */
  // async createArt(data = {}) {
  //     const result = await this.create(data);
  //     return result;
  // },
  // /* 总条数 */
  async countNum(data = {}, option = {}) {
    const result = await this.countDocuments(data);
    return result;
  }
};

const ArticleModel = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('article', ArticleSchema);
/* harmony default export */ __webpack_exports__["a"] = (ArticleModel);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 需要检查的token的 请求地址
 */
// const verifyPath = [
//   '/api/userlist',
//   '/api/createarticle',
//   '/api/articlelist',
//   '/api/setarticle'
// ];

// const whitelist = ["http://boss.didiheng.com", "*"] //白名单

/* harmony default export */ __webpack_exports__["a"] = ({
  db: {
    // url: 'mongodb://localhost:27017/herox'
    url: 'mongodb://47.106.163.14:27017/herox'
  }
  // secret: 'LiuHeng9227fe78182er',
  // port: process.env.port || '12345',
  // Imgurl: process.env.NODE_ENV === 'production' ? 'http://www.didiheng.com:8888' : `http://localhost:12345`,
  // verifyPath,
  // whitelist
});

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("@koa/cors");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

const pkg = __webpack_require__(16);
module.exports = {
    mode: 'universal',
    /*
    ** Headers of the page
    */
    head: {
        title: 'Still there will be a dream',
        meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1,maximum-scale=1.0, user-scalable=0' }, { hid: 'description', name: 'description', content: pkg.description }],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        noscript: [{ innerHTML: 'This website requires JavaScript.' }],
        script: [{ src: 'https://webapi.amap.com/maps?v=1.4.8&key=fbfea934b19ea5bb8ad1d741a5b10077' }]
    },

    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#E16B8C' },

    /*
    ** Global CSS
    */
    css: [{
        src: '~assets/css/global.less',
        lang: 'less'
    }, '~assets/css/page-transletion.css', 'highlight.js/styles/atom-one-dark-reasonable.css'],
    router: {
        linkActiveClass: 'active-link'
    },
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [{
        src: '~/plugins/imagePreview',
        ssr: false
    }, '~/plugins/axios'],
    vendor: ['marked', 'highlight.js'],
    /*
    ** Nuxt.js modules
    */
    modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios', '@nuxtjs/style-resources'],
    styleResources: {
        less: '~/assets/css/global.less'
    },
    /*
    ** Axios module configuration
    */
    axios: {
        // proxy: true
        // See https://github.com/nuxt-community/axios-module#options
    },
    proxy: {
        // '/api/': 'http://127.0.0.1:4000',
    },
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
            if (ctx.isClient) {
                // 拓展 webpack 配置
                // 添加 alias 配置
                // Object.assign(config.resolve.alias, {
                //   'utils': path.resolve(__dirname, 'utils')
                // })
            }
        },
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        }
    }
};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = {"name":"herox_fe","version":"1.0.0","description":"My Nuxt.js project","author":"liyushilezhi","private":true,"scripts":{"dev":"backpack dev","start":"cross-env NODE_ENV=production node build/main.js","build":"nuxt build && backpack build","generate":"nuxt generate","runTStart":"npm run build&&npm run start"},"dependencies":{"@koa/cors":"^2.2.2","@nuxtjs/axios":"^5.0.0","@nuxtjs/style-resources":"^0.1.2","animejs":"^3.0.1","cross-env":"^5.2.0","highlight.js":"^9.13.1","jparticles":"^2.0.1","js-cookie":"^2.2.0","koa":"^2.6.1","koa-bodyparser":"^4.2.1","koa-router":"^7.4.0","koa-static":"^5.0.0","less":"^3.8.1","less-loader":"^4.1.0","marked":"^0.5.1","moment":"^2.24.0","mongoose":"^5.4.6","nuxt":"^2.5.0","vue-photo-preview":"^1.1.3"},"devDependencies":{"backpack-core":"^0.7.0","nodemon":"^1.11.0"}}

/***/ })
/******/ ]);
//# sourceMappingURL=main.map