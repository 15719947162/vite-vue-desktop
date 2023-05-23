import { createApp } from 'vue';

import App from './App.vue';
import 'virtual:svg-icons-register';
import '@/styles/index.css';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/dist/index.css';

createApp(App)
    .use(ElementPlus, {
        locale: zhCn,
    })
    .mount('#app');
