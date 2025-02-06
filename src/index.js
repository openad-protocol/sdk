! function(e, t) {
    "object" === typeof module && "object" === typeof module.exports ? module.exports = t() : "function" === typeof define && define.amd ? define(t) : e.openADJsSDK = t()
}(this, (function() {
    const e = {
        init: function(e) {
            this.hostURL = e, this.TG.init();
        },
        version: '3.2.4',
        build: '202502062008',
        hostURL: 'https://bf2055756e.api.openad.network',
        resources: {},
        bridge: {
            init: async function(data){
                let { userInfo, adParams, adInfo } = data;
                if(!userInfo){
                    userInfo = {};
                }
                if(!adParams){
                    adParams = {};
                }
                let { zoneId, publisherId } = adInfo;
                let dom = document.querySelector(`.openADJsSDKBanner[zoneId="${zoneId}"][publisherId="${publisherId}"]`);
                if(!dom){
                    console.log('error', `can not find render dom .openADJsSDKBanner[zoneId="${zoneId}"][publisherId="${publisherId}"]`);
                    return false;
                }
                let res = await this.get({ adParams, userInfo, adInfo }), RES;
                if(res.code === 0){
                    RES = res.data;
                    dom.innerHTML = `<a href="javascript:void(0);" style="display: block;" onclick="window.openADJsSDK.bridge.click({ 'zoneId':${zoneId}, 'publisherId':${publisherId} })"><img src="${RES['resource_url']}" style="max-width: 100%;max-height: 100%;display: block;"></a>`;
                }else{
                    console.log('error', res.msg);
                    return false;
                }
                res = await this.log(adInfo);
                if(res.code === 0){
                    console.log(res.msg);
                }else{
                    console.log(res.msg);
                }
            },
            get: async function(data){
                return await window.openADJsSDK.functionSent.get(data);
            },
            log: async function(adInfo){
                return await window.openADJsSDK.functionSent.log(adInfo);
            },
            click: async function(adInfo){
                return await window.openADJsSDK.functionSent.click(adInfo);
            },
        },
        interactive: {
            dom: 'openADJsSDKInteractive',
            clock: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAuJJREFUeNq8l91vTEEYxvdsNi1tybbVVkuRUEn1ohFfsdJ2+RPcIUG5ITSC0l6KG25cccWNm3LTROLSBkF8RNH6rLQJrSoNopS2CI7nTZ4jk8k5nTmn3X2T387umZl33p05884zjuu6MUvLB2vBJlAPFoMC1k2AQdADroP74KeVVwnAwEJwBDxx7e0xOAwqTP6dKWYgDvaBNrCAz76Am+AuGAaf+byEbVKgAST5/DU4Cc6GnYES0Kn9o52g0mLGqsAu8FTpfwEk/dr7OagG19jxG2gFBRYD6xSCdjBBX1dAmSmAeeAeO7wEqQgD6zSBQSWIZFAACXCJDfvAMoPj0+AWgzYFUQuG6LsDOH4B7GeDMbDa4FCWZITt05Yz0QDG2WeHHoC8OO9Y2WrhrEhp3xRiOY6xzytQrAZwnBXdIN8ygOEIAUi/F+x3UJ7JXp8DtnJXnrLOYNHsOzjD782SXeNMHkuZWC7Hsm+d4BOok5QuAaRZkQFjOQjgA7jDTJuWj1Ws6I7lzrpYrpAA5it5O1c2xHJ5nMes2MccBjDCcq4E8Jc/8iI6+xOhz2/vxE3gY5I/ykM6cVgWcSs7Ae38XuxilpMJrv1KsCjE4K4y4HnwIyAAh1u7hX08W8JyIEEZtZlyy9Zk1p7xBa4wtK3nllOXah3LR3IqNeLLDfAe1IKvlkFU0rk7xRLJWj8Eo9r094Iy0OgJhz7m5y0zcP6b2M6xnoNZ3sM2PuyiLsjW4Hk88FwK3f+noUilN6zYm8UADnGMAVCqC5I9rBy1ECRRSFFjiu32U0RxRQn3W0iyMNQpkuwix/IVpaWaKF0/A4NvBG/pM+MpIZMsv6rI8gMRX0xRVkcVWZ6xkeXqTKgXE5mVbXr0AYhKbgYPlP4dQRcTm6tZO6hSjtHbPM/7mYJjvKTWMMNtYJLyjvgT4Nx0LqfVnMreEJfTHm658ulcTnUrBGso4bzr+WzWjftcz3/ZOP0nwACjryfJixYb2QAAAABJRU5ErkJggg==',
            init: async function(data){
                let res = await window.openADJsSDK.functionSent.get({ ...data });
                return { code: res.code };
            },
            getRender: function(data){
                const { adInfo, cb } = data;
                const { zoneId, publisherId } = adInfo;
                let dom = document.querySelector(`.${this.dom}[zoneId="${zoneId}"][publisherId="${publisherId}"]`);
                if(dom){
                    dom.remove();
                }
                dom = document.createElement('div');
                dom.className = this.dom;
                dom.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;left:0;z-index:10000;background: linear-gradient(135deg, #d3d78d, #71a888, #d8dbb9), url(https://telegram.org/img/tgme/pattern.svg);background-blend-mode: overlay;background-repeat: no-repeat;background-position: center;background-size: cover;';
                dom.setAttribute('zoneId', zoneId);
                dom.setAttribute('publisherId', publisherId);
                document.body.appendChild(dom);
                let RES = window.openADJsSDK.resources[`${publisherId}_${zoneId}`], lan = RES.params.language;
                RES = RES ? RES.resource : null;
                if(RES){
                    window.openADJsSDK.resources[`${publisherId}_${zoneId}`].cb = cb;
                    cb.adResourceLoad && cb.adResourceLoad(true);
                }else{
                    return false;
                }
                cb.adOpening && cb.adOpening(true);
                dom.innerHTML =
                    '<div style="margin:32px 32px 0; background:rgba(0,0,0,0.3);border-radius:12px;padding:5px;box-sizing:border-box;">' +
                    `<div onclick="window.openADJsSDK.interactive.cbLog('click', { 'zoneId':${zoneId}, 'publisherId':${publisherId} })" style="background:#fff;border-radius:10px 10px 0 0;padding:4px 4px 0;box-sizing:border-box;height:calc(100vw - 82px);">`+
                    `<img src="${RES['resource_url']}" style="width:100%;display:block;border-radius:8px 8px 0 0;height:100%;">`+
                    '</div>'+
                    `<div style="font-weight:bold;line-height:26px;font-size:20px;padding:6px 10px 10px;width:100%;text-align:left;background:#fff;box-sizing:border-box;color:#000;">${RES['resource_text']}</div>` +
                    `<div style="line-height:18px;font-size:14px;width:100%;text-align:left;padding:0 10px 22px;background:#fff;border-radius:0 0 10px 10px;box-sizing:border-box;color:#000;">${RES['resource_desc']}</div>` +
                    '</div>' +
                    `<div style="margin:20px 32px; width:calc(100% - 64px);line-height:48px;height:48px;border-radius:10px;background:linear-gradient(to bottom, #4ebef6, #1f86b9);color:#fff;font-size:20px;cursor:pointer;text-align:center;" onclick="window.openADJsSDK.interactive.cbLog('click', { 'zoneId':${zoneId}, 'publisherId':${publisherId} })">GO</div>` +
                    '<div style="position:absolute;left:20px;bottom:18px;right:20px;display:flex; -webkit-box-pack:center; justify-content:center; align-items:center; flex-direction:column; -webkit-flex-direction:column; text-align:center;">'+
                    `<div tag="${this.dom+'Countdown'}" style="width:78px;height:22px;line-height:22px;background:rgba(0,0,0,0.6);border-radius:11px;text-align:center;display: flex;justify-content:center;align-items:center;">` +
                    `<img src="${this.clock}" style="width:16px;height:16px;margin-right:6px;"/>`+
                    '<i style="color:#fff;font-size:14px;font-style:normal;"></i>'+
                    '</div>'+
                    `<div style="text-align:center;display: flex;justify-content:center;align-items:center;font-size:12px;color:#fff;line-height:14px;margin:10px 0 0;text-shadow:0 0 2px #000;">
                ${lan === 'zh' ? '本頁麵爲廣告內容，請您跳转后谨慎甄別。' : 'This page contains advertising content. Please verify carefully after being redirected.'}
              </div>`+
                    '</div>';
                cb.adOpened && cb.adOpened(true);
                this.countDown(adInfo, cb);
            },
            log: async function (adInfo) {
                return await window.openADJsSDK.functionSent.log(adInfo);
            },
            click: async function(adInfo){
                return await window.openADJsSDK.functionSent.click(adInfo);
            },
            countDown: function (adInfo, cb){
                let countdownTime = 15;
                let countdownInterval = setInterval(async () => {
                    let dom = document.querySelector(`.${this.dom}[zoneId="${adInfo.zoneId}"][publisherId="${adInfo.publisherId}"]`), ele;
                    if(dom){
                        ele = dom.querySelector(`div[tag="${this.dom}Countdown"] i`);
                    }
                    if(ele && dom){
                        ele.innerHTML = '00:'+(countdownTime < 10 ? '0': '')+countdownTime;
                        if (countdownTime === 0) {
                            clearInterval(countdownInterval);
                            ele.innerHTML = '';
                            await this.cbLog('viewAD', adInfo, cb);
                        } else {
                            countdownTime--;
                        }
                    }else{
                        clearInterval(countdownInterval);
                    }
                }, 1000);
            },
            cbLog: async function (type, adInfo, cb) {
                cb = cb || window.openADJsSDK.resources[`${adInfo.publisherId}_${adInfo.zoneId}`].cb || {};
                let res = await this.log(adInfo);
                if(res.code === 0){
                    cb.adTaskFinished && cb.adTaskFinished(true);
                }else{
                    cb.adTaskFinished && cb.adTaskFinished(false);
                }
                cb.adClosing && cb.adClosing(type);
                this.destroy(adInfo, cb, type);
                if(type === 'click'){
                    cb.adClick && cb.adClick(true);
                    await this.click(adInfo);
                }
            },
            destroy: function (dom, cb, type){
                dom = document.querySelector( `.${this.dom}[zoneId="${dom.zoneId}"][publisherId="${dom.publisherId}"]`);
                document.body.removeChild(dom);
                cb.adClosed && cb.adClosed(type);
            },
        },
        functionSent: {
            get: async function(data){
                let { adParams, userInfo, adInfo } = data, _this = window.openADJsSDK;
                let TG = adParams.TG, env = this.getBrowserInfo({}, _this), user = userInfo || {}, _t = env._t;
                let location = window.location.href.substring(0, window.location.href.indexOf('?')) || window.location.href;
                let error = { code: -2, msg: 'get openAD ads error!' };
                location = location.includes('tgWebAppData') ? location.split('#')[0] : location;
                let params = {
                    'sid': _t,
                    'language': env.language.split('-')[0].split('_')[0],
                    'version': adParams.version || env.osVersion+' '+env.browser+ ' '+env.browserVersion,
                    'channel': env.channel,
                    'platform': env.platform,
                    'fromType': 'script',
                    location,
                    'userId': user.userId || env.platformOS,
                    'firstName': user.firstName ||env.platformOS,
                    'lastName': user.lastName || env.platformOS,
                    'userName': user.username || user.userName || env.platformOS,
                    'walletType': user.walletType || 'null',
                    'walletAddress': user.walletAddress || 'null',
                    'isPremium': false,
                }
                if(TG){
                    user = _this.TG.initDataUnsafe.user || {};
                    if(typeof user === 'string'){
                        user = JSON.parse(user);
                    }
                    userInfo = JSON.parse(JSON.stringify(user));
                    if(!user.id || user.id.toString().length > 12){
                        return error;
                    }
                    user = {
                        'userId': user.id || params.userId,
                        'firstName': user.id ? (user['first_name'] || 'FN'+user.id) : params.firstName,
                        'lastName': user.id ? (user['last_name'] || 'LN'+user.id) : params.lastName,
                        'userName': user.id ? (user['username'] || 'UN'+user.id) : params.userName,
                        'isPremium': user['is_premium'] || false,
                    };
                    params = {
                        ...params,
                        ...user,
                        channel: 'TG',
                        language: (user.id ? (user['language_code'] || user['languageCode']) : params.language).split('_')[0].split('-')[0].toLocaleLowerCase(),
                        version: user.id ? _this.TG.version : params.version,
                        platform: params.platform,
                    }
                }
                if(userInfo && Object.prototype.hasOwnProperty.call(userInfo, 'is_bot') && userInfo['is_bot']){
                    return error;
                }
                let traceId = '', openADStore;
                for(let key in params){
                    if(key !== '_t' && key !== 'location'){
                        traceId += params[key]+'+';
                    }
                }
                if(localStorage.openADStore){
                    openADStore = JSON.parse(localStorage.openADStore);
                    if(new Date().valueOf() - 24*3600*1000 > Number(openADStore._t)){
                        openADStore = { _t };
                    }
                }else{
                    openADStore = { _t };
                }
                localStorage.openADStore = JSON.stringify(openADStore);
                params.traceId = adInfo.publisherId+(new Date(openADStore._t).getDate()+1)+''+(new Date(openADStore._t).getDay()+1+adInfo.zoneId)+window.shortHash(traceId+'+'+openADStore._t);
                params = { ...adInfo, ...user, ...params };
                try {
                    let res = await this.AJAX('get', _this.hostURL+'/v3/api/getAd', params, 'json');
                    if(res && res.errcode === 0 && res.data && res.data.eventId){
                        const RES = res.data;
                        const data = {
                            'width': RES.width,
                            'type': RES['type'],
                            'height': RES.height,
                            'resource_id': RES['resource_id'] || RES.id,
                            'resource_url': RES['resource_url'] || RES['banner_url'],
                            'resource_text': RES['resource_text'] || '',
                            'resource_desc': RES['resource_desc'] || '',
                        }
                        _this.resources[`${adInfo.publisherId}_${adInfo.zoneId}`] = {
                            hasLog: false,
                            hasClick: false,
                            params: { ...params, eventId: res.data.eventId, cb: RES.cb, 'hash': RES.hash, 'signature': RES.signature },
                            resource: { ...data, 'click_url': RES['jumpURL'] || RES['click_url'] },
                        };
                        return { code: 0, data };
                    }else{
                        return error;
                    }
                } catch (e) {
                    return e;
                }
            },
            log: async function(adInfo){
                let _this = window.openADJsSDK, resource = _this.resources[`${adInfo.publisherId}_${adInfo.zoneId}`];
                if(!resource){
                    return { code: -1, msg: 'can not find resource' };
                }
                let ok = { code: 0, msg: 'send log info successfully' }, error = { code: -2, msg: 'send log info failed' };
                try {
                    let res = await this.AJAX('get', _this.hostURL+'/v3/api/logInfo', { ...resource.params, requestType: 'loginfo' }, 'json');
                    if(res.errcode === 0){
                        return ok;
                    }else{
                        return error;
                    }
                } catch (e) {
                    return e;
                }
            },
            click: async function(adInfo){
                let _this = window.openADJsSDK, resource = _this.resources[`${adInfo.publisherId}_${adInfo.zoneId}`];
                if(!resource){
                    this.open({});
                    return false;
                }
                try {
                    let res = await this.AJAX('get', _this.hostURL+'/v3/api/clickInfo', { ...resource.params, requestType: 'clickinfo' }, 'json');
                    if(res.errcode === 0){
                        console.log('success', 'send click info successfully');
                    }else{
                        console.log('error', 'send click info failed');
                    }
                } catch (e) {
                    console.log('error', 'send click info failed');
                }
                this.open(resource);
            },
            open: function(resource){
                let _this = window.openADJsSDK, url = resource.resource || {}/**, params = resource.params || {}**/;
                url = url['click_url'] || 'https://t.me/OpenAD_protocol';
                if(resource.params.channel === 'TG'){
                    if(url.includes('t.me') || url.includes('tg//')){
                        _this.TG.openTelegramLink(url);
                    }else{
                        _this.TG.openLink(url);
                    }
                }else{
                    window.open(url);
                }
            },
            AJAX: function(method, url, data, dataType){
                return new Promise((resolve, reject) => {
                    data = { rt: new Date().valueOf() , ...data };
                    window.J$.ajax({
                        method,
                        url,
                        dataType,
                        data: method === 'get' ? data : JSON.stringify(data),
                        contentType: 'application/json', // 设置为 JSON 格式
                        async: true,
                        timeout: 5000,
                        success: (res) => {
                            return resolve(res);
                        },
                        error: (xhr, status, error) => {
                            if (xhr.status === 404) {
                                return reject({ code: -3, msg: 'Ajax Request 404 !' });
                            } else if (status === 'timeout') {
                                return reject({ code: -4, msg: 'Ajax Request Timeout !' });
                            } else {
                                console.log('Ajax request error:', error);
                                return reject({ code: -5, msg: 'Ajax Request Error !' });
                            }
                        },
                    });
                });
            },
            getBrowserInfo: function (obj) {
                let NewObj = {
                    appMode: 'browser',
                    appName: '',
                    channel: '',
                    osVersion: '',
                    browser: '',
                    browserVersion: '',
                    platform: '',
                    platformOS: '',
                    language: window.navigator.language,
                    _t: new Date().valueOf(),
                };
                obj = obj ? Object.assign(NewObj, obj) : NewObj;
                let UA = navigator.userAgent.toLocaleLowerCase();
                if(UA.indexOf('macintosh') > -1){
                    obj.platform = 'MAC';
                    obj.platformOS = 'Mac OS X';
                    let t = UA.indexOf('mac os x'), t1 = UA.indexOf(')');
                    obj.osVersion = UA.slice(t+9,t1).replace('mac os x','').replace(/_/g, '.');
                    if(obj.osVersion === ''){
                        obj.osVersion = 'Mac OS X';
                    }
                    if(1024 >= document.documentElement.offsetWidth){
                        obj.channel = 'H5';
                    }else{
                        obj.channel = 'PC';
                    }
                } else if(UA.indexOf('windows') > -1){
                    obj.platform = 'WIN';
                    let PcList = [
                        { name: '5.0',OS: '2000',version: '2000' },
                        { name: '5.1',OS: 'XP',version: 'Sp1 / Sp2' },
                        { name: '5.2',OS: 'XP / 2003',version: 'XP Sp3 / Server 2003' },
                        { name: '6.0',OS: 'Vista / 2008',version: 'Vista / Server 2008' },
                        { name: '6.1',OS: '7 / 2008',version: '7 / Server 2008 R2' },
                        { name: '6.2',OS: '8 / 2012',version: '8 / Server 2012' },
                        { name: '6.3',OS: '8.1 / 2012',version: '8.1 / Server 2012 R2' },
                        { name: '6.4',OS: '10',version: '6.4' },
                        { name: '10.0',OS: '10',version: '10.0' },
                        { name: '11.0',OS: '11',version: '11.0' },
                    ];
                    for(let i=0;i<PcList.length;i++){
                        let WIN = 'windows nt '+ PcList[i].name;
                        if(UA.indexOf(WIN) > -1){
                            obj.platformOS = 'Windows '+PcList[i].OS;
                            obj.osVersion = 'Win'+PcList[i].version;
                        }
                    }
                    if(1024 >= document.documentElement.offsetWidth){
                        obj.channel = 'H5';
                    }else{
                        obj.channel = 'PC';
                    }
                } else if(UA.indexOf('android') > -1 || UA.indexOf('linux') > -1){
                    obj.channel = 'H5';
                    let MList = UA.split(';');
                    for(let i=0;i<MList.length;i++){
                        if(MList[i].indexOf('android') > -1){
                            obj.platformOS = 'Android'+ MList[i].slice(MList[i].indexOf('android'),MList[i].length).replace('android','').replace(/[*_?]/g,'.').replace(/[-+?]/g,' ')
                        }
                        if(MList[i].indexOf('build') > -1){
                            obj.osVersion = MList[i].slice(0,MList[i].indexOf('build')).replace(/[*_?]/g,'.').replace(/[-/+?]/g,' ')
                        }
                    }
                    obj.platform = 'ANDROID';
                } else if(UA.match(/\(i[^;]+;( U;)? cpu.+mac os x/)){
                    obj.channel = 'H5';
                    if(UA.indexOf('iphone') > -1){
                        obj.platformOS = 'Iphone';
                    }else if(UA.indexOf('ipad') > -1){
                        obj.platformOS = 'Ipad';
                    }else if(UA.indexOf('ipod') > -1){
                        obj.platformOS = 'Ipod';
                    }
                    obj.osVersion = UA.slice(UA.lastIndexOf(obj.platformOS.toLocaleLowerCase()),UA.indexOf('like')-1).replace(obj.platformOS+' os','').replace(/[*_?]/g,'.').replace(/[-/+?]/g,' ');
                    obj.platform = 'IOS';
                }
                let UAList = UA.split(' ');
                let TestList = [
                    { test: 'micromessenger',name: 'WeXin',get: 'micromessenger',appMode: 'WX' },
                    { test: 'tencenttraveler',name: 'TencentTraveler',get: 'tencenttraveler',appMode: 'browser' },
                    { test: 'firefox',name: 'FireFox',get: 'firefox',appMode: 'browser' },
                    { test: 'edge',name: 'Edge',get: 'edge',appMode: 'browser' },
                    { test: 'bidubrowser',name: 'BaiDuBrowser',get: 'bidubrowser',appMode: 'browser' },
                    { test: 'maxthon',name: 'Maxthon',get: 'maxthon',appMode: 'browser' },
                    { test: 'qqbrowser',name: 'QQBrowser',get: 'qqbrowser',appMode: 'browser' },
                    { test: 'opera',name: 'Opera',get: 'opera',appMode: 'browser' },
                    { test: 'opr',name: 'Opera',get: 'opr',appMode: 'browser' },
                    { test: 'presto',name: 'Opera',get: 'version',appMode: 'browser' },
                    { test: '360se',name: '360SE',get: '360se',appMode: 'browser' },
                    { test: '360ee',name: '360EE',get: '360ee',appMode: 'browser' },
                    { test: 'metasr',name: 'SoGou',get: 'metasr',appMode: 'browser' },
                    { test: 'se',name: 'SoGou',get: 'se',appMode: 'browser' },
                    { test: 'the world',name: 'The World',get: 'the world',appMode: 'browser' },
                    { test: 'theworld',name: 'The World',get: 'theworld',appMode: 'browser' },
                    { test: 'uc',name: 'UC',get: 'uc',appMode: 'browser' },
                    { test: 'ubrowser',name: 'UC',get: 'ubrowser',appMode: 'browser' },
                    { test: 'lbbrowser',name: 'LBBrowser',get: 'lbbrowser',appMode: 'browser' },
                    { test: 'version',name: 'Safari',get: 'version',appMode: 'browser' },
                    { test: 'chrome',name: 'Chrome',get: 'chrome',appMode: 'browser' },
                    { test: 'iemobile',name: 'IEMobile',get: 'iemobile',appMode: 'browser' },
                    { test: 'trident/7.0',name: 'MSIE',get: 'rv:',appMode: 'browser' },
                    { test: 'msie',name: 'MSIE',get: 'msie',appMode: 'browser' },
                ];
                if(UA.indexOf('khtml') > -1 && UA.indexOf('gecko') > -1 && UA.indexOf('safari') > -1 && UA.indexOf('applewebkit') > -1){
                    for(let j=0;j<TestList.length;j++) {
                        if (UA.indexOf(TestList[j].test) > -1) {
                            obj.browser = TestList[j].name;
                            obj.appName = TestList[j].get;
                            obj.appMode = TestList[j].appMode;
                            // eslint-disable-next-line no-use-before-define
                            getBrowserVersion(TestList[j].get);
                            break;
                        }
                    }
                }else{
                    for(let j=0;j<TestList.length;j++){
                        if(UA.indexOf(TestList[j].test) > -1){
                            obj.browser = TestList[j].name;
                            obj.appName = TestList[j].get;
                            obj.appMode = TestList[j].appMode;
                            // eslint-disable-next-line no-use-before-define
                            getBrowserVersion(TestList[j].get);
                            break;
                        }
                    }
                }
                if(UA.indexOf('trident') > -1 || UA.indexOf('msie') > -1){
                    if(UA.indexOf('msie') > -1){
                        // eslint-disable-next-line no-use-before-define
                        getBrowserVersion('msie')
                    }else if(UA.indexOf('trident') > -1){
                        // eslint-disable-next-line no-use-before-define
                        getBrowserVersion('rv')
                    }
                    obj.browserVersion = 'IE'+ obj.browserVersion;
                }
                function getBrowserVersion(browser) {
                    for(let k=0;k<UAList.length;k++){
                        if(UAList[k].indexOf(browser) > -1){
                            UAList[k] = UAList[k].replace(/[;:)*_\-\/+?]/g,'');
                            obj.browserVersion = UAList[k].slice(UAList[k].indexOf(browser)+browser.length,UA.length);
                            break;
                        }
                    }
                }
                return obj;
            },
            Obj2String: function(obj) {
                let string = '';
                for(let key in obj){
                    string+= '&'+key+'='+obj[key];
                }
                string = encodeURIComponent(string).replace(/%/g, '_');
                return string;
            },
        },
        TG: {
            eventHandlers: {},
            initParams: {},
            isIframe: false,
            version: '6.0',
            initData: '',
            initDataUnsafe: {},
            platform: 'unknown',
            init: function(){
                this.initParams = this.storeParams();
                this.storeCache();
                this.initIsIframe();
                this.resetParams();
            },
            storeParams: function(){
                let locationHash = '';
                try {
                    locationHash = location.hash.toString();
                    locationHash = locationHash.replace(/^#/, '');
                    let params = {};
                    if (!locationHash.length) {
                        return params;
                    }
                    if (locationHash.indexOf('=') < 0 && locationHash.indexOf('?') < 0) {
                        params._path = this.urlSafeDecode(locationHash);
                        return params;
                    }
                    let qIndex = locationHash.indexOf('?');
                    if (qIndex >= 0) {
                        let pathParam = locationHash.substring(0, qIndex);
                        params._path = this.urlSafeDecode(pathParam);
                        locationHash = locationHash.substring(qIndex + 1);
                    }
                    let queryParams = this.urlParseQueryString(locationHash);
                    for (let k in queryParams) {
                        params[k] = queryParams[k];
                    }
                    return params;
                } catch (e) {
                    //
                }
            },
            storeCache: function(){
                let storedParams = this.sessionStorageGet('initParams');
                if (storedParams) {
                    for (let key in storedParams) {
                        if (typeof this.initParams[key] === 'undefined') {
                            this.initParams[key] = storedParams[key];
                        }
                    }
                }
                this.sessionStorageSet('initParams', this.initParams);
            },
            initIsIframe: function(){
                let isIframe = this.isIframe, iFrameStyle, dataParsed;
                try {
                    isIframe = (window.parent !== null && window !== window.parent);
                    if (isIframe) {
                        window.addEventListener('message', function (event) {
                            if (event.source !== window.parent) {
                                return;
                            }
                            try {
                                dataParsed = JSON.parse(event.data);
                            } catch (e) {
                                return;
                            }
                            if (!dataParsed || !dataParsed.eventType) {
                                return;
                            }
                            if (dataParsed.eventType === 'set_custom_style') {
                                if (event.origin === 'https://web.telegram.org') {
                                    iFrameStyle.innerHTML = dataParsed.eventData;
                                }
                            } else if (dataParsed.eventType === 'reload_iframe') {
                                try {
                                    window.parent.postMessage(JSON.stringify({ eventType: 'iframe_will_reload' }), '*');
                                } catch (e) {
                                    //
                                }
                                location.reload();
                            } else {
                                this.receiveEvent(dataParsed.eventType, dataParsed.eventData);
                            }
                        });
                        iFrameStyle = document.createElement('style');
                        document.head.appendChild(iFrameStyle);
                        try {
                            window.parent.postMessage(JSON.stringify({ eventType: 'iframe_ready', eventData: { 'reload_supported': true } }), '*');
                        } catch (e) {
                            //
                        }
                    }
                    this.isIframe = isIframe;
                } catch (e) {
                    //
                }
            },
            resetParams: function(){
                let initParams = this.initParams;
                if (initParams.tgWebAppData && initParams.tgWebAppData.length) {
                    this.initData = initParams.tgWebAppData;
                    this.initDataUnsafe = this.urlParseQueryString(this.initData);
                    for (let key in this.initDataUnsafe) {
                        let val = this.initDataUnsafe[key];
                        try {
                            if (val.substring(0, 1) === '{' && val.substring(-1) === '}' || val.substring(0, 1) === '[' && val.substring(-1) === ']') {
                                this.initDataUnsafe[key] = JSON.parse(val);
                            }
                        } catch (e) {
                            //
                        }
                    }
                }
                if (initParams.tgWebAppVersion) {
                    this.version = initParams.tgWebAppVersion;
                }
                if (initParams.tgWebAppPlatform) {
                    this.platform = initParams.tgWebAppPlatform;
                }
            },
            postEvent: function(eventType, callback, eventData) {
                if (!callback) {
                    callback = function () {};
                }
                if (eventData === undefined) {
                    eventData = '';
                }
                console.log('[Telegram.WebView] > postEvent', eventType, eventData);
                if (window['TelegramWebviewProxy'] !== undefined) {
                    window['TelegramWebviewProxy'].postEvent(eventType, JSON.stringify(eventData));
                    callback();
                } else if (window.external && 'notify' in window.external) {
                    window.external.notify(JSON.stringify({ eventType: eventType, eventData: eventData }));
                    callback();
                } else if (this.isIframe) {
                    try {
                        let trustedTarget = 'https://web.telegram.org';
                        trustedTarget = '*';
                        window.parent.postMessage(JSON.stringify({ eventType: eventType, eventData: eventData }), trustedTarget);
                        callback();
                    } catch (e) {
                        callback(e);
                    }
                } else {
                    callback({ notAvailable: true });
                }
            },
            receiveEvent: function(eventType, eventData) {
                console.log('[Telegram.WebView] < receiveEvent', eventType, eventData);
                this.callEventCallbacks(eventType, function(callback) {
                    callback(eventType, eventData);
                });
            },
            callEventCallbacks(eventType, cb) {
                let curEventHandlers = this.eventHandlers[eventType];
                if (curEventHandlers === undefined ||
                    !curEventHandlers.length) {
                    return;
                }
                for (let i = 0; i < curEventHandlers.length; i++) {
                    try {
                        cb(curEventHandlers[i]);
                    } catch (e) {
                        //
                    }
                }
            },
            urlParseQueryString: function(queryString) {
                let params = {};
                if (!queryString.length) {
                    return params;
                }
                let queryStringParams = queryString.split('&');
                let i, param, paramName, paramValue;
                for (i = 0; i < queryStringParams.length; i++) {
                    param = queryStringParams[i].split('=');
                    paramName = this.urlSafeDecode(param[0]);
                    paramValue = param[1] == null ? null : this.urlSafeDecode(param[1]);
                    params[paramName] = paramValue;
                }
                return params;
            },
            urlSafeDecode: function(urlencoded) {
                try {
                    urlencoded = urlencoded.replace(/\+/g, '%20');
                    return decodeURIComponent(urlencoded);
                } catch (e) {
                    return urlencoded;
                }
            },
            sessionStorageSet: function(key, value) {
                try {
                    window.sessionStorage.setItem('__telegram__' + key, JSON.stringify(value));
                    return true;
                } catch(e) {
                    //
                }
                return false;
            },
            sessionStorageGet: function(key) {
                try {
                    return JSON.parse(window.sessionStorage.getItem('__telegram__' + key));
                } catch(e) {
                    //
                }
                return null;
            },
            ready: function () {
                this.postEvent('web_app_ready');
            },
            versionCompare: function(v1, v2) {
                if (typeof v1 !== 'string') {
                    v1 = '';
                }
                if (typeof v2 !== 'string') {
                    v2 = '';
                }
                v1 = v1.replace(/^\s+|\s+$/g, '').split('.');
                v2 = v2.replace(/^\s+|\s+$/g, '').split('.');
                let a = Math.max(v1.length, v2.length), i, p1, p2;
                for (i = 0; i < a; i++) {
                    p1 = parseInt(v1[i]) || 0;
                    p2 = parseInt(v2[i]) || 0;
                    if (p1 === p2) {
                        continue;
                    }
                    if (p1 > p2) {
                        return 1;
                    }
                    return -1;
                }
                return 0;
            },
            versionAtLeast: function(ver) {
                return this.versionCompare(this.version, ver) >= 0;
            },
            openTelegramLink: function (url, options) {
                let a = document.createElement('A');
                a.href = url;
                if (a.protocol !== 'http:' && a.protocol !== 'https:') {
                    console.error('[Telegram.WebApp] Url protocol is not supported', url);
                    throw Error('WebAppTgUrlInvalid');
                }
                if (a.hostname !== 't.me') {
                    console.error('[Telegram.WebApp] Url host is not supported', url);
                    throw Error('WebAppTgUrlInvalid');
                }
                let path_full = a.pathname + a.search;
                options = options || {};
                if (this.isIframe || this.versionAtLeast('6.1')) {
                    let req_params = { 'path_full': path_full };
                    if (options.force_request) {
                        req_params.force_request = true;
                    }
                    this.postEvent('web_app_open_tg_link', false, req_params);
                } else {
                    location.href = 'https://t.me' + path_full;
                }
            },
            openLink: function (url, options) {
                let a = document.createElement('A');
                a.href = url;
                if (a.protocol !== 'http:' && a.protocol !== 'https:') {
                    console.error('[Telegram.WebApp] Url protocol is not supported', url);
                    throw Error('WebAppTgUrlInvalid');
                }
                options = options || {};
                if (this.versionAtLeast('6.1')) {
                    let req_params = { url };
                    if (this.versionAtLeast('6.4') && options.try_instant_view) {
                        req_params.try_instant_view = true;
                    }
                    if (this.versionAtLeast('7.6') && options.try_browser) {
                        req_params.try_browser = options.try_browser;
                    }
                    this.postEvent('web_app_open_link', false, req_params);
                } else {
                    window.open(url, '_blank');
                }
            },
        },
    };
    return console.log("this", this), e;
})), ! function(a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
        if (!a.document) {
            throw new Error("Ajax requires a window with a document")
        }
        return b(a)
    } : b(a)
}("undefined" != typeof window ? window : this, function(a, b) {
    var c = [],
        d = c.slice,
        e = c.concat,
        f = c.push,
        g = c.indexOf,
        h = {},
        i = h.toString,
        j = h.hasOwnProperty,
        k = {},
        l = "Split jQuery Ajax Funtion as Window.J$.ajax and remove other Functions width jQuery.1.11.1, Compatible with old browsers, Case for import full jQuery component without conflict. Author: https://github.com:MrVincentP/jq-ajax, Modification Date: 2024-04-11 16:35:00. In My App, I use it to request JSONP for thirdparty components and same origin ajax request instead axios.",
        m = function(a, b) {
            return new m.fn.init(a, b)
        },
        n = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        o = /^-ms-/,
        p = /-([\da-z])/gi,
        q = function(a, b) {
            return b.toUpperCase()
        };
    m.fn = m.prototype = {
        Async: l,
        constructor: m,
        selector: "",
        length: 0
    }, m.extend = m.fn.extend = function() {
        var a, b, c, d, e, f, g = arguments[0] || {},
            h = 1,
            i = arguments.length,
            j = !1;
        for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || m.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++) {
            if (null != (e = arguments[h])) {
                for (d in e) {
                    a = g[d], c = e[d], g !== c && (j && c && (m.isPlainObject(c) || (b = m.isArray(c))) ? (b ? (b = !1, f = a && m.isArray(a) ? a : []) : f = a && m.isPlainObject(a) ? a : {}, g[d] = m.extend(j, f, c)) : void 0 !== c && (g[d] = c))
                }
            }
        }
        return g
    }, m.extend({
        expando: "Ajax" + (l + Math.random())
            .replace(/\D/g, ""),
        isReady: !0,
        error: function(a) {
            throw new Error(a)
        },
        isFunction: function(a) {
            return "function" === m.type(a)
        },
        isArray: Array.isArray || function(a) {
            return "array" === m.type(a)
        },
        isWindow: function(a) {
            return null != a && a == a.window
        },
        isPlainObject: function(a) {
            var b;
            if (!a || "object" !== m.type(a) || a.nodeType || m.isWindow(a)) {
                return !1
            }
            try {
                if (a.constructor && !j.call(a, "constructor") && !j.call(a.constructor.prototype, "isPrototypeOf")) {
                    return !1
                }
            } catch (c) {
                return !1
            }
            if (k.ownLast) {
                for (b in a) {
                    return j.call(a, b)
                }
            }
            for (b in a) {}
            return void 0 === b || j.call(a, b)
        },
        type: function(a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? h[i.call(a)] || "object" : typeof a
        },
        each: function(a, b, c) {
            var d, e = 0,
                f = a.length,
                g = r(a);
            if (c) {
                if (g) {
                    for (; f > e; e++) {
                        if (d = b.apply(a[e], c), d === !1) {
                            break
                        }
                    }
                } else {
                    for (e in a) {
                        if (d = b.apply(a[e], c), d === !1) {
                            break
                        }
                    }
                }
            } else {
                if (g) {
                    for (; f > e; e++) {
                        if (d = b.call(a[e], e, a[e]), d === !1) {
                            break
                        }
                    }
                } else {
                    for (e in a) {
                        if (d = b.call(a[e], e, a[e]), d === !1) {
                            break
                        }
                    }
                }
            }
            return a
        },
        trim: function(a) {
            return null == a ? "" : (a + "")
                .replace(n, "")
        },
        makeArray: function(a, b) {
            var c = b || [];
            return null != a && (r(Object(a)) ? m.merge(c, "string" == typeof a ? [a] : a) : f.call(c, a)), c
        },
        merge: function(a, b) {
            var c = +b.length,
                d = 0,
                e = a.length;
            while (c > d) {
                a[e++] = b[d++]
            }
            if (c !== c) {
                while (void 0 !== b[d]) {
                    a[e++] = b[d++]
                }
            }
            return a.length = e, a
        },
        now: function() {
            return +new Date
        }
    }), m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
        h["[object " + b + "]"] = b.toLowerCase()
    });

    function r(a) {
        var b = a.length,
            c = m.type(a);
        return "function" === c || m.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
    }
    var x, y = a.document,
        z = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        A = m.fn.init = function(a, b) {
            var c, d;
            if (!a) {
                return this
            }
            if ("string" == typeof a) {
                if (c = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : z.exec(a), !c || !c[1] && b) {
                    return !b || b.Async ? (b || x)
                        .find(a) : this.constructor(b)
                        .find(a)
                }
                if (c[1]) {
                    if (b = b instanceof m ? b[0] : b, m.merge(this, m.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : y, !0)), u.test(c[1]) && m.isPlainObject(b)) {
                        for (c in b) {
                            m.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c])
                        }
                    }
                    return this
                }
                if (d = y.getElementById(c[2]), d && d.parentNode) {
                    if (d.id !== c[2]) {
                        return x.find(a)
                    }
                    this.length = 1, this[0] = d
                }
                return this.context = y, this.selector = a, this
            }
            return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : m.isFunction(a) ? "undefined" != typeof x.ready ? x.ready(a) : a(m) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), m.makeArray(a, this))
        };
    A.prototype = m.fn, x = m(y);
    var E = /\S+/g,
        F = {};

    function G(a) {
        var b = F[a] = {};
        return m.each(a.match(E) || [], function(a, c) {
            b[c] = !0
        }), b
    }
    m.Callbacks = function(a) {
        a = "string" == typeof a ? F[a] || G(a) : m.extend({}, a);
        var b, c, d, e, f, g, h = [],
            i = !a.once && [],
            j = function(l) {
                for (c = a.memory && l, d = !0, f = g || 0, g = 0, e = h.length, b = !0; h && e > f; f++) {
                    if (h[f].apply(l[0], l[1]) === !1 && a.stopOnFalse) {
                        c = !1;
                        break
                    }
                }
                b = !1, h && (i ? i.length && j(i.shift()) : c ? h = [] : k.disable())
            },
            k = {
                add: function() {
                    if (h) {
                        var d = h.length;
                        ! function f(b) {
                            m.each(b, function(b, c) {
                                var d = m.type(c);
                                "function" === d ? a.unique && k.has(c) || h.push(c) : c && c.length && "string" !== d && f(c)
                            })
                        }(arguments), b ? e = h.length : c && (g = d, j(c))
                    }
                    return this
                },
                remove: function() {
                    return h && m.each(arguments, function(a, c) {
                        var d;
                        while ((d = m.inArray(c, h, d)) > -1) {
                            h.splice(d, 1), b && (e >= d && e--, f >= d && f--)
                        }
                    }), this
                },
                has: function(a) {
                    return a ? m.inArray(a, h) > -1 : !(!h || !h.length)
                },
                empty: function() {
                    return h = [], e = 0, this
                },
                disable: function() {
                    return h = i = c = void 0, this
                },
                disabled: function() {
                    return !h
                },
                lock: function() {
                    return i = void 0, c || k.disable(), this
                },
                locked: function() {
                    return !i
                },
                fireWith: function(a, c) {
                    return !h || d && !i || (c = c || [], c = [a, c.slice ? c.slice() : c], b ? i.push(c) : j(c)), this
                },
                fire: function() {
                    return k.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!d
                }
            };
        return k
    }, m.extend({
        Deferred: function(a) {
            var b = [
                    ["resolve", "done", m.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", m.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", m.Callbacks("memory")]
                ],
                c = "pending",
                d = {
                    state: function() {
                        return c
                    },
                    always: function() {
                        return e.done(arguments)
                            .fail(arguments), this
                    },
                    then: function() {
                        var a = arguments;
                        return m.Deferred(function(c) {
                            m.each(b, function(b, f) {
                                var g = m.isFunction(a[b]) && a[b];
                                e[f[1]](function() {
                                    var a = g && g.apply(this, arguments);
                                    a && m.isFunction(a.promise) ? a.promise()
                                        .done(c.resolve)
                                        .fail(c.reject)
                                        .progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                                })
                            }), a = null
                        })
                            .promise()
                    },
                    promise: function(a) {
                        return null != a ? m.extend(a, d) : d
                    }
                },
                e = {};
            return d.pipe = d.then, m.each(b, function(a, f) {
                var g = f[2],
                    h = f[3];
                d[f[1]] = g.add, h && g.add(function() {
                    c = h
                }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
                    return e[f[0] + "With"](this === e ? d : this, arguments), this
                }, e[f[0] + "With"] = g.fireWith
            }), d.promise(e), a && a.call(e, e), e
        }
    });
    var K = "undefined",
        L;
    for (L in m(k)) {
        break
    }
    m.acceptData = function(a) {
        var b = m.noData[(a.nodeName + " ")
                .toLowerCase()],
            c = +a.nodeType || 1;
        return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute("classid") === b
    };

    function Q(a, b, d, e) {
        if (m.acceptData(a)) {
            var f, g, h = m.expando,
                i = a.nodeType,
                j = i ? m.cache : a,
                k = i ? a[h] : a[h] && h;
            if (k && j[k] && (e || j[k].data) || void 0 !== d || "string" != typeof b) {
                return k || (k = i ? a[h] = c.pop() || m.guid++ : h), j[k] || (j[k] = i ? {} : {
                    toJSON: m.noop
                }), ("object" == typeof b || "function" == typeof b) && (e ? j[k] = m.extend(j[k], b) : j[k].data = m.extend(j[k].data, b)), g = j[k], e || (g.data || (g.data = {}), g = g.data), void 0 !== d && (g[m.camelCase(b)] = d), "string" == typeof b ? (f = g[b], null == f && (f = g[m.camelCase(b)])) : f = g, f
            }
        }
    }
    m.extend({
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        _data: function(a, b, c) {
            return Q(a, b, c, !0)
        }
    });
    var Y = /^(?:focusinfocus|focusoutblur)$/;

    function J$() {
        return !0
    }

    function _() {
        return !1
    }
    m.event = {
        trigger: function(b, c, d, e) {
            var f, g, h, i, k, l, n, o = [d || y],
                p = j.call(b, "type") ? b.type : b,
                q = j.call(b, "namespace") ? b.namespace.split(".") : [];
            if (h = l = d = d || y, 3 !== d.nodeType && 8 !== d.nodeType && !Y.test(p + m.event.triggered) && (p.indexOf(".") >= 0 && (q = p.split("."), p = q.shift(), q.sort()), g = p.indexOf(":") < 0 && "on" + p, b = b[m.expando] ? b : new m.Event(p, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = q.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + q.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : m.makeArray(c, [b]), k = m.event.special[p] || {}, e || !k.trigger || k.trigger.apply(d, c) !== !1)) {
                if (!e && !k.noBubble && !m.isWindow(d)) {
                    for (i = k.delegateType || p, Y.test(i + p) || (h = h.parentNode); h; h = h.parentNode) {
                        o.push(h), l = h
                    }
                    l === (d.ownerDocument || y) && o.push(l.defaultView || l.parentWindow || a)
                }
                n = 0;
                while ((h = o[n++]) && !b.isPropagationStopped()) {
                    b.type = n > 1 ? i : k.bindType || p, f = (m._data(h, "events") || {})[b.type] && m._data(h, "handle"), f && f.apply(h, c), f = g && h[g], f && f.apply && m.acceptData(h) && (b.result = f.apply(h, c), b.result === !1 && b.preventDefault())
                }
                if (b.type = p, !e && !b.isDefaultPrevented() && (!k._default || k._default.apply(o.pop(), c) === !1) && m.acceptData(d) && g && d[p] && !m.isWindow(d)) {
                    l = d[g], l && (d[g] = null), m.event.triggered = p;
                    try {
                        d[p]()
                    } catch (r) {}
                    m.event.triggered = void 0, l && (d[g] = l)
                }
                return b.result
            }
        },
        special: {
            load: {
                noBubble: !0
            }
        }
    }, m.removeEvent = y.removeEventListener ? function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    } : function(a, b, c) {
        var d = "on" + b;
        a.detachEvent && (typeof a[d] === K && (a[d] = null), a.detachEvent(d, c))
    }, m.Event = function(a, b) {
        return this instanceof m.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? J$ : _) : this.type = a, b && m.extend(this, b), this.timeStamp = a && a.timeStamp || m.now(), void(this[m.expando] = !0)) : new m.Event(a, b)
    }, m.Event.prototype = {
        isDefaultPrevented: _,
        isPropagationStopped: _
    };
    m.fn.extend({
        bind: function(a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function(a, b) {
            return this.off(a, null, b)
        }
    });
    var Kb = m.now(),
        Lb = /\?/,
        Mb = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    m.parseJSON = function(b) {
        if (a.JSON && a.JSON.parse) {
            return a.JSON.parse(b + "")
        }
        var c, d = null,
            e = m.trim(b + "");
        return e && !m.trim(e.replace(Mb, function(a, b, e, f) {
            return c && b && (d = 0), 0 === d ? a : (c = e || b, d += !f - !e, "")
        })) ? Function("return " + e)() : m.error("Invalid JSON: " + b)
    }, m.parseXML = function(b) {
        var c, d;
        if (!b || "string" != typeof b) {
            return null
        }
        try {
            a.DOMParser ? (d = new DOMParser, c = d.parseFromString(b, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(b))
        } catch (e) {
            c = void 0
        }
        return c && c.documentElement && !c.getElementsByTagName("parsererror")
            .length || m.error("Invalid XML: " + b), c
    };
    var Nb, Ob, Pb = /#.*$/,
        Qb = /([?&])_=[^&]*/,
        Rb = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Sb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Tb = /^(?:GET|HEAD)$/,
        Ub = /^\/\//,
        Vb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        Wb = {},
        Xb = {},
        Yb = "*/".concat("*");
    try {
        Ob = location.href
    } catch (Zb) {
        Ob = y.createElement("a"), Ob.href = "", Ob = Ob.href
    }
    Nb = Vb.exec(Ob.toLowerCase()) || [];

    function $b(a) {
        return function(b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e = 0,
                f = b.toLowerCase()
                    .match(E) || [];
            if (m.isFunction(c)) {
                while (d = f[e++]) {
                    "+" === d.charAt(0) ? (d = d.slice(1) || "*", (a[d] = a[d] || [])
                        .unshift(c)) : (a[d] = a[d] || [])
                        .push(c)
                }
            }
        }
    }

    function _b(a, b, c, d) {
        var e = {},
            f = a === Xb;

        function g(h) {
            var i;
            return e[h] = !0, m.each(a[h] || [], function(a, h) {
                var j = h(b, c, d);
                return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1)
            }), i
        }
        return g(b.dataTypes[0]) || !e["*"] && g("*")
    }

    function ac(a, b) {
        var c, d, e = m.ajaxSettings.flatOptions || {};
        for (d in b) {
            void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d])
        }
        return c && m.extend(!0, a, c), a
    }

    function bc(a, b, c) {
        var d, e, f, g, h = a.contents,
            i = a.dataTypes;
        while ("*" === i[0]) {
            i.shift(), void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"))
        }
        if (e) {
            for (g in h) {
                if (h[g] && h[g].test(e)) {
                    i.unshift(g);
                    break
                }
            }
        }
        if (i[0] in c) {
            f = i[0]
        } else {
            for (g in c) {
                if (!i[0] || a.converters[g + " " + i[0]]) {
                    f = g;
                    break
                }
                d || (d = g)
            }
            f = f || d
        }
        return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
    }

    function cc(a, b, c, d) {
        var e, f, g, h, i, j = {},
            k = a.dataTypes.slice();
        if (k[1]) {
            for (g in a.converters) {
                j[g.toLowerCase()] = a.converters[g]
            }
        }
        f = k.shift();
        while (f) {
            if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift()) {
                if ("*" === f) {
                    f = i
                } else {
                    if ("*" !== i && i !== f) {
                        if (g = j[i + " " + f] || j["* " + f], !g) {
                            for (e in j) {
                                if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                                    g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                                    break
                                }
                            }
                        }
                        if (g !== !0) {
                            if (g && a["throws"]) {
                                b = g(b)
                            } else {
                                try {
                                    b = g(b)
                                } catch (l) {
                                    return {
                                        state: "parsererror",
                                        error: g ? l : "No conversion from " + i + " to " + f
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return {
            state: "success",
            data: b
        }
    }
    m.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Ob,
            type: "GET",
            isLocal: Sb.test(Nb[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Yb,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": m.parseJSON,
                "text xml": m.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(a, b) {
            return b ? ac(ac(a, m.ajaxSettings), b) : ac(m.ajaxSettings, a)
        },
        ajaxPrefilter: $b(Wb),
        ajaxTransport: $b(Xb),
        ajax: function(a, b) {
            "object" == typeof a && (b = a, a = void 0), b = b || {};
            var c, d, e, f, g, h, i, j, k = m.ajaxSetup({}, b),
                l = k.context || k,
                n = k.context && (l.nodeType || l.Async) ? m(l) : m.event,
                o = m.Deferred(),
                p = m.Callbacks("once memory"),
                q = k.statusCode || {},
                r = {},
                s = {},
                t = 0,
                u = "canceled",
                v = {
                    readyState: 0,
                    getResponseHeader: function(a) {
                        var b;
                        if (2 === t) {
                            if (!j) {
                                j = {};
                                while (b = Rb.exec(f)) {
                                    j[b[1].toLowerCase()] = b[2]
                                }
                            }
                            b = j[a.toLowerCase()]
                        }
                        return null == b ? null : b
                    },
                    getAllResponseHeaders: function() {
                        return 2 === t ? f : null
                    },
                    setRequestHeader: function(a, b) {
                        var c = a.toLowerCase();
                        return t || (a = s[c] = s[c] || a, r[a] = b), this
                    },
                    overrideMimeType: function(a) {
                        return t || (k.mimeType = a), this
                    },
                    statusCode: function(a) {
                        var b;
                        if (a) {
                            if (2 > t) {
                                for (b in a) {
                                    q[b] = [q[b], a[b]]
                                }
                            } else {
                                v.always(a[v.status])
                            }
                        }
                        return this
                    },
                    abort: function(a) {
                        var b = a || u;
                        return i && i.abort(b), x(0, b), this
                    }
                };
            if (o.promise(v)
                .complete = p.add, v.success = v.done, v.error = v.fail, k.url = ((a || k.url || Ob) + "")
                .replace(Pb, "")
                .replace(Ub, Nb[1] + "//"), k.type = b.method || b.type || k.method || k.type, k.dataTypes = m.trim(k.dataType || "*")
                .toLowerCase()
                .match(E) || [""], null == k.crossDomain && (c = Vb.exec(k.url.toLowerCase()), k.crossDomain = !(!c || c[1] === Nb[1] && c[2] === Nb[2] && (c[3] || ("http:" === c[1] ? "80" : "443")) === (Nb[3] || ("http:" === Nb[1] ? "80" : "443")))), k.data && k.processData && "string" != typeof k.data && (k.data = m.param(k.data, k.traditional)), _b(Wb, k, b, v), 2 === t) {
                return v
            }
            h = k.global, h && 0 === m.active++ && m.event.trigger("ajaxStart"), k.type = k.type.toUpperCase(), k.hasContent = !Tb.test(k.type), e = k.url, k.hasContent || (k.data && (e = k.url += (Lb.test(e) ? "&" : "?") + k.data, delete k.data), k.cache === !1 && (k.url = Qb.test(e) ? e.replace(Qb, "$1_=" + Kb++) : e + (Lb.test(e) ? "&" : "?") + "_=" + Kb++)), k.ifModified && (m.lastModified[e] && v.setRequestHeader("If-Modified-Since", m.lastModified[e]), m.etag[e] && v.setRequestHeader("If-None-Match", m.etag[e])), (k.data && k.hasContent && k.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", k.contentType), v.setRequestHeader("Accept", k.dataTypes[0] && k.accepts[k.dataTypes[0]] ? k.accepts[k.dataTypes[0]] + ("*" !== k.dataTypes[0] ? ", " + Yb + "; q=0.01" : "") : k.accepts["*"]);
            for (d in k.headers) {
                v.setRequestHeader(d, k.headers[d])
            }
            if (k.beforeSend && (k.beforeSend.call(l, v, k) === !1 || 2 === t)) {
                return v.abort()
            }
            u = "abort";
            for (d in {
                success: 1,
                error: 1,
                complete: 1
            }) {
                v[d](k[d])
            }
            if (i = _b(Xb, k, b, v)) {
                v.readyState = 1, h && n.trigger("ajaxSend", [v, k]), k.async && k.timeout > 0 && (g = setTimeout(function() {
                    v.abort("timeout")
                }, k.timeout));
                try {
                    t = 1, i.send(r, x)
                } catch (w) {
                    if (!(2 > t)) {
                        throw w
                    }
                    x(-1, w)
                }
            } else {
                x(-1, "No Transport")
            }

            function x(a, b, c, d) {
                var j, r, s, u, w, x = b;
                2 !== t && (t = 2, g && clearTimeout(g), i = void 0, f = d || "", v.readyState = a > 0 ? 4 : 0, j = a >= 200 && 300 > a || 304 === a, c && (u = bc(k, v, c)), u = cc(k, u, v, j), j ? (k.ifModified && (w = v.getResponseHeader("Last-Modified"), w && (m.lastModified[e] = w), w = v.getResponseHeader("etag"), w && (m.etag[e] = w)), 204 === a || "HEAD" === k.type ? x = "nocontent" : 304 === a ? x = "notmodified" : (x = u.state, r = u.data, s = u.error, j = !s)) : (s = x, (a || !x) && (x = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || x) + "", j ? o.resolveWith(l, [r, x, v]) : o.rejectWith(l, [v, x, s]), v.statusCode(q), q = void 0, h && n.trigger(j ? "ajaxSuccess" : "ajaxError", [v, k, j ? r : s]), p.fireWith(l, [v, x]), h && (n.trigger("ajaxComplete", [v, k]), --m.active || m.event.trigger("ajaxStop")))
            }
            return v
        },
        getJSON: function(a, b, c) {
            return m.get(a, b, c, "json")
        },
        getScript: function(a, b) {
            return m.get(a, void 0, b, "script")
        }
    }), m.each(["get", "post"], function(a, b) {
        m[b] = function(a, c, d, e) {
            return m.isFunction(c) && (e = e || d, d = c, c = void 0), m.ajax({
                url: a,
                type: b,
                dataType: e,
                data: c,
                success: d
            })
        }
    }), m.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
        m.fn[b] = function(a) {
            return this.on(b, a)
        }
    }), m._evalUrl = function(a) {
        return m.ajax({
            url: a,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    };
    var dc = /%20/g,
        ec = /\[\]$/,
        fc = /\r?\n/g,
        gc = /^(?:submit|button|image|reset|file)$/i,
        hc = /^(?:input|select|textarea|keygen)/i;

    function ic(a, b, c, d) {
        var e;
        if (m.isArray(b)) {
            m.each(b, function(b, e) {
                c || ec.test(a) ? d(a, e) : ic(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
            })
        } else {
            if (c || "object" !== m.type(b)) {
                d(a, b)
            } else {
                for (e in b) {
                    ic(a + "[" + e + "]", b[e], c, d)
                }
            }
        }
    }
    m.param = function(a, b) {
        var c, d = [],
            e = function(a, b) {
                b = m.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
            };
        if (void 0 === b && (b = m.ajaxSettings && m.ajaxSettings.traditional), m.isArray(a) || a.Async && !m.isPlainObject(a)) {
            m.each(a, function() {
                e(this.name, this.value)
            })
        } else {
            for (c in a) {
                ic(c, a[c], b, e)
            }
        }
        return d.join("&")
            .replace(dc, "+")
    }, m.fn.extend({
        serialize: function() {
            return m.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var a = m.prop(this, "elements");
                return a ? m.makeArray(a) : this
            })
                .filter(function() {
                    var a = this.type;
                    return this.name && !m(this)
                        .is(":disabled") && hc.test(this.nodeName) && !gc.test(a) && (this.checked || !U.test(a))
                })
                .map(function(a, b) {
                    var c = m(this)
                        .val();
                    return null == c ? null : m.isArray(c) ? m.map(c, function(a) {
                        return {
                            name: b.name,
                            value: a.replace(fc, "\r\n")
                        }
                    }) : {
                        name: b.name,
                        value: c.replace(fc, "\r\n")
                    }
                })
                .get()
        }
    }), m.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function() {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && mc() || nc()
    } : mc;
    var jc = 0,
        kc = {},
        lc = m.ajaxSettings.xhr();
    a.ActiveXObject && m(a)
        .on("unload", function() {
            for (var a in kc) {
                kc[a](void 0, !0)
            }
        }), k.cors = !!lc && "withCredentials" in lc, lc = k.ajax = !!lc, lc && m.ajaxTransport(function(a) {
        if (!a.crossDomain || k.cors) {
            var b;
            return {
                send: function(c, d) {
                    var e, f = a.xhr(),
                        g = ++jc;
                    if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields) {
                        for (e in a.xhrFields) {
                            f[e] = a.xhrFields[e]
                        }
                    }
                    a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                    for (e in c) {
                        void 0 !== c[e] && f.setRequestHeader(e, c[e] + "")
                    }
                    f.send(a.hasContent && a.data || null), b = function(c, e) {
                        var h, i, j;
                        if (b && (e || 4 === f.readyState)) {
                            if (delete kc[g], b = void 0, f.onreadystatechange = m.noop, e) {
                                4 !== f.readyState && f.abort()
                            } else {
                                j = {}, h = f.status, "string" == typeof f.responseText && (j.text = f.responseText);
                                try {
                                    i = f.statusText
                                } catch (k) {
                                    i = ""
                                }
                                h || !a.isLocal || a.crossDomain ? 1223 === h && (h = 204) : h = j.text ? 200 : 404
                            }
                        }
                        j && d(h, i, j, f.getAllResponseHeaders())
                    }, a.async ? 4 === f.readyState ? setTimeout(b) : f.onreadystatechange = kc[g] = b : b()
                },
                abort: function() {
                    b && b(void 0, !0)
                }
            }
        }
    });

    function mc() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {}
    }

    function nc() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {}
    }
    m.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(a) {
                return m.globalEval(a), a
            }
        }
    }), m.ajaxPrefilter("script", function(a) {
        void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), m.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var b, c = y.head || m("head")[0] || y.documentElement;
            return {
                send: function(d, e) {
                    b = y.createElement("script"), b.async = !0, a.scriptCharset && (b.charset = a.scriptCharset), b.src = a.url, b.onload = b.onreadystatechange = function(a, c) {
                        (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || e(200, "success"))
                    }, c.insertBefore(b, c.firstChild)
                },
                abort: function() {
                    b && b.onload(void 0, !0)
                }
            }
        }
    });
    var oc = [],
        pc = /(=)\?(?=&|$)|\?\?/;
    m.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = oc.pop() || m.expando + "_" + Kb++;
            return this[a] = !0, a
        }
    }), m.ajaxPrefilter("json jsonp", function(b, c, d) {
        var e, f, g, h = b.jsonp !== !1 && (pc.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "")
            .indexOf("application/x-www-form-urlencoded") && pc.test(b.data) && "data");
        return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = m.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(pc, "$1" + e) : b.jsonp !== !1 && (b.url += (Lb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function() {
            return g || m.error(e + " was not called"), g[0]
        }, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
            g = arguments
        }, d.always(function() {
            a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, oc.push(e)), g && m.isFunction(f) && f(g[0]), g = f = void 0
        }), "script") : void 0
    }), m.parseHTML = function(a, b, c) {
        if (!a || "string" != typeof a) {
            return null
        }
        "boolean" == typeof b && (c = b, b = !1), b = b || y;
        var d = u.exec(a),
            e = !c && [];
        return d ? [b.createElement(d[1])] : (d = m.buildFragment([a], b, e), e && e.length && m(e)
            .remove(), m.merge([], d.childNodes))
    };
    var qc = m.fn.load;
    m.fn.load = function(a, b, c) {
        if ("string" != typeof a && qc) {
            return qc.apply(this, arguments)
        }
        var d, e, f, g = this,
            h = a.indexOf(" ");
        return h >= 0 && (d = m.trim(a.slice(h, a.length)), a = a.slice(0, h)), m.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (f = "POST"), g.length > 0 && m.ajax({
            url: a,
            type: f,
            dataType: "html",
            data: b
        })
            .done(function(a) {
                e = arguments, g.html(d ? m("<div>")
                    .append(m.parseHTML(a))
                    .find(d) : a)
            })
            .complete(c && function(a, b) {
                g.each(c, e || [a.responseText, b, a])
            }), this
    }, "function" == typeof define && define.amd && define("Async", [], function() {
        return m
    });
    var sc = a.J$;
    return m.noConflict = function(b) {
        return a.J$ === m && (a.J$ = sc), b, m
    }, typeof b === K && (a.J$ = m), m
});
! function(n) {
    "use strict";

    function t(n, t) {
        var r = (65535 & n) + (65535 & t);
        return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r
    }

    function r(n, t) {
        return n << t | n >>> 32 - t
    }

    function e(n, e, o, u, c, f) {
        return t(r(t(t(e, n), t(u, f)), c), o)
    }

    function o(n, t, r, o, u, c, f) {
        return e(t & r | ~t & o, n, t, u, c, f)
    }

    function u(n, t, r, o, u, c, f) {
        return e(t & o | r & ~o, n, t, u, c, f)
    }

    function c(n, t, r, o, u, c, f) {
        return e(t ^ r ^ o, n, t, u, c, f)
    }

    function f(n, t, r, o, u, c, f) {
        return e(r ^ (t | ~o), n, t, u, c, f)
    }

    function i(n, r) {
        n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r;
        var e, i, a, d, h, l = 1732584193,
            g = -271733879,
            v = -1732584194,
            m = 271733878;
        for (e = 0; e < n.length; e += 16) i = l, a = g, d = v, h = m, g = f(g = f(g = f(g = f(g = c(g = c(g = c(g = c(g = u(g = u(g = u(g = u(g = o(g = o(g = o(g = o(g, v = o(v, m = o(m, l = o(l, g, v, m, n[e], 7, -680876936), g, v, n[e + 1], 12, -389564586), l, g, n[e + 2], 17, 606105819), m, l, n[e + 3], 22, -1044525330), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 4], 7, -176418897), g, v, n[e + 5], 12, 1200080426), l, g, n[e + 6], 17, -1473231341), m, l, n[e + 7], 22, -45705983), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 8], 7, 1770035416), g, v, n[e + 9], 12, -1958414417), l, g, n[e + 10], 17, -42063), m, l, n[e + 11], 22, -1990404162), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 12], 7, 1804603682), g, v, n[e + 13], 12, -40341101), l, g, n[e + 14], 17, -1502002290), m, l, n[e + 15], 22, 1236535329), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 1], 5, -165796510), g, v, n[e + 6], 9, -1069501632), l, g, n[e + 11], 14, 643717713), m, l, n[e], 20, -373897302), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 5], 5, -701558691), g, v, n[e + 10], 9, 38016083), l, g, n[e + 15], 14, -660478335), m, l, n[e + 4], 20, -405537848), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 9], 5, 568446438), g, v, n[e + 14], 9, -1019803690), l, g, n[e + 3], 14, -187363961), m, l, n[e + 8], 20, 1163531501), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 13], 5, -1444681467), g, v, n[e + 2], 9, -51403784), l, g, n[e + 7], 14, 1735328473), m, l, n[e + 12], 20, -1926607734), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 5], 4, -378558), g, v, n[e + 8], 11, -2022574463), l, g, n[e + 11], 16, 1839030562), m, l, n[e + 14], 23, -35309556), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 1], 4, -1530992060), g, v, n[e + 4], 11, 1272893353), l, g, n[e + 7], 16, -155497632), m, l, n[e + 10], 23, -1094730640), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 13], 4, 681279174), g, v, n[e], 11, -358537222), l, g, n[e + 3], 16, -722521979), m, l, n[e + 6], 23, 76029189), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 9], 4, -640364487), g, v, n[e + 12], 11, -421815835), l, g, n[e + 15], 16, 530742520), m, l, n[e + 2], 23, -995338651), v = f(v, m = f(m, l = f(l, g, v, m, n[e], 6, -198630844), g, v, n[e + 7], 10, 1126891415), l, g, n[e + 14], 15, -1416354905), m, l, n[e + 5], 21, -57434055), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 12], 6, 1700485571), g, v, n[e + 3], 10, -1894986606), l, g, n[e + 10], 15, -1051523), m, l, n[e + 1], 21, -2054922799), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 8], 6, 1873313359), g, v, n[e + 15], 10, -30611744), l, g, n[e + 6], 15, -1560198380), m, l, n[e + 13], 21, 1309151649), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 4], 6, -145523070), g, v, n[e + 11], 10, -1120210379), l, g, n[e + 2], 15, 718787259), m, l, n[e + 9], 21, -343485551), l = t(l, i), g = t(g, a), v = t(v, d), m = t(m, h);
        return [l, g, v, m]
    }

    function a(n) {
        var t, r = "",
            e = 32 * n.length;
        for (t = 0; t < e; t += 8) r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255);
        return r
    }

    function d(n) {
        var t, r = [];
        for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1) r[t] = 0;
        var e = 8 * n.length;
        for (t = 0; t < e; t += 8) r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32;
        return r
    }

    function h(n) {
        return a(i(d(n), 8 * n.length))
    }

    function l(n, t) {
        var r, e, o = d(n),
            u = [],
            c = [];
        for (u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1) u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r];
        return e = i(u.concat(d(t)), 512 + 8 * t.length), a(i(c.concat(e), 640))
    }

    function g(n) {
        var t, r, e = "";
        for (r = 0; r < n.length; r += 1) t = n.charCodeAt(r), e += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t);
        return e
    }

    function v(n) {
        return unescape(encodeURIComponent(n))
    }

    function m(n) {
        return h(v(n))
    }

    function p(n) {
        return g(m(n))
    }

    function s(n, t) {
        return l(v(n), v(t))
    }

    function C(n, t) {
        return g(s(n, t))
    }

    function A(n, t, r) {
        return t ? r ? s(t, n) : C(t, n) : r ? m(n) : p(n)
    }
    "function" == typeof define && define.amd ? define(function() {
        return A
    }) : "object" == typeof module && module.exports ? module.exports = A : n.shortHash = A
}(this);