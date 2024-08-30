// import './assets/main.css'
// import '@/assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // 导入路由

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
// import DataTable from 'primevue/datatable';
// import Column from 'primevue/column';

const app = createApp(App);
console.log(app);  // 查看控制台输出的内容
console.log(window.__VUE_DEVTOOLS_GLOBAL_HOOK__);

app.use(PrimeVue, { theme: { preset: Aura } });
app.use(router);  // 使用路由

// app.component('DataTable', DataTable);
// app.component('Column', Column);

app.mount('#app');
