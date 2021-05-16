import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';

import VideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'
<<<<<<< HEAD

import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VideoPlayer)
=======
import hls from 'videojs-contrib-hls'

Vue.use(VideoPlayer)
Vue.use(hls)
>>>>>>> a2f7a7fcd0d6b04666ea3eb42b32058a82209f4e

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | vue-manage-system`;
    const username = localStorage.getItem('ms_username');
    const role = localStorage.getItem('ms_role');
    // if (to.path === '/chapter_mgr'){
    //     Vue.prototype.$alert('请通过课程进行管理！','通知', {
    //         confirmButtonText: '确定'
    //     });
    //     this.$router.go(-1);
    //
    // }
        if (to.path === '/student_mgr' || to.path === '/admin_mgr' || to.path === '/teacher_mgr'){
        if(role === '1'){
            next()
        } else {
            Vue.prototype.$alert('无管理员权限！','通知', {
                confirmButtonText: '确定'
            });
            this.$router.go(-1);
        }
    }
    if (!username && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
});

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
