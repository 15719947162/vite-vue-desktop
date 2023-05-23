项目地址：https://github.com/15719947162/vite-vue-desktop.git
直接在要创建项目的文件夹下执行
npm create vite@latest

npm init
创建好了以后根据项目开发需求配置vite.config.js
如果你需要环境变量，需要将vite.config.js写成
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ command, mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // vite 配置
    define: { 'process.env': env },
  }
})
在项目根目录下创建一个.env.development文件，在里面就可以配置全局的环境变量，可以在项目的任何一个地方使用
下面是一个完整配置文件
import { defineConfig, splitVendorChunkPlugin,loadEnv } from 'vite';
export default ({command, mode})=>{
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    define: { 'process.env': env },//定义环境变量
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),//设置路径的别名，使我们在引用模块时方便和简洁
        'components': path.resolve(__dirname, 'src/components'),
      },
    },
    server: {
      host: env.VITE_BASE_IP, //自己主机IP 
      port: 9001,//项目启动的端口
      proxy: {
        '^/api/.*': {
          target: env.VITE_PROXY_HOST, //你需要代理的主机 IP+PORT
          changeOrigin: true,//是否允许跨域
          rewrite: (path) => path.replace(/^\/api/, ''),//请求拦截重写
        },
      },
      hmr: {
        overlay: true,// 在浏览器中显示错误和警告的覆盖层
      },
    },
    build: {
      assetsDir: 'static',// 将静态资源输出到 /static 目录中
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name].js',//指定生成的代码块文件的名称
          entryFileNames: 'static/js/[name].js',//设置入口文件的输出名称
          assetFileNames: 'static/[ext]/[name].[hash].[ext]',//设置静态资源的输出名称
        },
      },
      terserOptions: {
        compress: {
          drop_console: true,//压缩时删除console
          drop_debugger: true,//压缩时删除debugger
        },
        output: {
          comments: false // 移除所有注释
        }
      },
    },
  })
}
工具依赖
首先vue3，vue-router，element-plus，sass，post-css，pinia，axios，其中post-css用作样式的后处理器，和sass不同的是，sass作为css的预处理允许你使用变量、嵌套、混合、函数等高级特性来编写更优雅、更易维护的 CSS 代码，而post-css允许你使用各种插件来扩展 CSS 的功能（如自动添加浏览器前缀、转换未来规范的 CSS 语法等）。两者互补，pinia用作是vuex的替代，是状态机使用更加方便，简洁，高效；axios则是请求处理的不二之选；
npm install vue
npm install element-plus
npm install sass
npm install pinia
npm install axios

npm install @element-plus/icons-vue --save-dev
安装element-plus需要注意，element-plus的icon是存放在@element-plus/icons-vue插件中，需要单独下载，引用。
安装post-css需要注意的是post-css需要在项目的根目录创建一个postcss.config.js文件，来对post-css进行配置，例如：如果想使用post-css插件postcss-import，autoprefixer等
module.exports = {
    plugins: [require('postcss-import'), require('autoprefixer')],
};
postcss-import：将所有的@import导入的 CSS 文件都将以内联方式被插入到最终的 CSS 文件中，从而避免了额外的 HTTP 请求，并提高了页面加载速度。
autoprefixer：用于自动添加浏览器前缀。通过 autoprefixer，我们可以避免手动编写针对不同浏览器的 CSS 样式，从而节省时间和精力

js检测依赖
prettier用于按照js，css格式规范自动格式化js，css文件
eslint用于检测js规范，是否符合自定义js格式
npm install prettier --save-dev
npm install eslint --save-dev

npm install eslint-config-prettier --save-dev
npm install eslint-plugin-prettier --save-dev
npm install eslint-plugin-vue --save-dev
eslint-config-prettier：是一个 ESLint 配置插件，用于关闭与 Prettier 重复的规则，以确保在使用 Prettier 进行代码格式化时不会产生冲突
eslint-plugin-prettier：是一个 ESLint 插件，它可以帮助你在开发过程中自动化格式化代码，确保代码风格的统一性
eslint-plugin-vue：是一个 ESLint 插件，用于帮助开发者在编写 Vue.js 代码时进行静态检查
使用eslint需要在项目根目录创建一个.eslintrc.js文件来配置eslint，例如：
module.exports = {
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    extends: ['plugin:vue/vue3-recommended', 'prettier'],
    plugins: ['prettier', 'vue'],
    rules: {
        // override/add rules settings here, such as:
        'vue/no-mutating-props': 0,
    },                           
};


css检测依赖
prettier用于按照js，css格式规范自动格式化js，css文件
stylelint用于检测css规范，是否符合自定义css格式
npm install prettier --save-dev
npm install stylelint --save-dev

npm install stylelint-config-prettier --save-dev
npm install stylelint-config-standard-scss --save-dev
npm install stylelint-scss --save-dev
使用stylelint需要在项目根目录创建一个.stylelintrc.js文件来配置stylelint，例如：
module.exports = {
    extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier','prettier'],
    rules: {
        'declaration-colon-space-after': 'always-single-line',
        'declaration-colon-space-before': 'never',
        'declaration-block-trailing-semicolon': null,
        'declaration-block-semicolon-space-before': 'never',
        'media-feature-name-no-unknown': null,
        'selector-pseudo-class-no-unknown': [
            true,
            {
                ignorePseudoClasses: ['deep'],
            },
        ],
        'rule-empty-line-before': [
            'always',
            {
                ignore: ['after-comment', 'first-nested'],
            },
        ],
        // style calc中使用v-bind
        'function-calc-no-unspaced-operator': null,
    },
};

提交检测依赖
commitizen，cz-customizable，cz-conventional-changelog，都是用于规范化 Git 提交消息的格式
npm install commitizen --save-dev
npm install cz-customizable --save-dev
npm install cz-conventional-changelog --save--dev

npm install husky --save--dev

npm install @commitlint/cli --save-dev
npm install @commitlint/config-conventional --save-dev
@commitlint/cli和@commitlint/config-conventional是检测提交信息是否符合配置规范
在使用需要在package.json文件中进行配置，意思是使用cz-conventional-changelog的路径地址
"config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
 },
在使用cz-customizable时，需要在根目录创建一个.cz-config.js的文件来定义提交时的询问信息，例如
module.exports = {
    types: [
        { value: 'feature', name: 'feature: 增加新功能' },
        { value: 'bug', name: 'bug: 测试反馈bug列表中的bug号' },
        { value: 'fix', name: 'fix: 修复bug' },
        { value: 'ui', name: 'ui: 更新UI' },
        { value: 'docs', name: 'docs: 文档变更' },
        { value: 'style', name: 'style:代码格式(不影响代码运行的变动)' },
        { value: 'perf', name: 'perf: 性能优化' },
        {
            value: 'refactor',
            name: 'refactor: 重构(既不是增加feature，也不是修复bug)',
        },
        { value: 'release', name: 'release: 发布' },
        { value: 'deploy', name: 'deploy: 部署' },
        { value: 'test', name: 'test: 增加测试' },
        {
            value: 'chore',
            name: 'chore: 构建过程或辅助工具的变动(更改配置文件)',
        },
        { value: 'revert', name: 'revert: 回退' },
        { value: 'build', name: 'build: 打包' },
    ],
    scopes: [
        { name: 'javascript' },
        { name: 'typescript' },
        { name: 'Vue' },
        { name: 'tailwindcss' },
        { name: 'scss|css|less|postcss' },
        { name: 'node' },
        { name: 'other' },
    ],
    // override the messages, defaults are as follows
    messages: {
        type: '请选择提交类型:',
        customScope: '请输入您修改的范围(可选):',
        subject: '请简要描述提交 message (必填):',
        body: '请输入详细描述(可选，待优化去除，跳过即可):',
        footer: '请输入要关闭的issue(待优化去除，跳过即可):',
        confirmCommit: '确认使用以上信息提交？(y/n/e/h)',
    },
    allowCustomScopes: true,
    skipQuestions: ['body', 'footer'],
    subjectLimit: 72,
};

在使用@commitlint/cli和@commitlint/config-conventional时也需要在项目根目录有一个配置文件commitlint.config.js
module.exports = {
    extends: ['@commitlint/config-conventional'],//使用@commitlint/config-conventional插件扩展
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feature', // 新功能（feature）
                'bug', // 此项特别针对bug号，用于向测试反馈bug列表的bug修改情况
                'fix', // 修补bug
                'ui', // 更新 ui
                'docs', // 文档（documentation）
                'style', // 格式（不影响代码运行的变动）
                'perf', // 性能优化
                'release', // 发布
                'deploy', // 部署
                'refactor', // 重构（即不是新增功能，也不是修改bug的代码变动）
                'test', // 增加测试
                'chore', // 构建过程或辅助工具的变动
                'revert', // feat(pencil): add ‘graphiteWidth’ option (撤销之前的commit)
                'merge', // 合并分支， 例如： merge（前端页面）： feature-xxxx修改线程地址
                'build', // 打包
            ],
        ],
        // <type> 格式 小写
        'type-case': [2, 'always', 'lower-case'],
        // <type> 不能为空
        'type-empty': [2, 'never'],
        // <scope> 范围不能为空
        'scope-empty': [2, 'never'],
        // <scope> 范围格式
        'scope-case': [0],
        // <subject> 主要 message 不能为空
        'subject-empty': [2, 'never'],
        // <subject> 以什么为结束标志，禁用
        'subject-full-stop': [0, 'never'],
        // <subject> 格式，禁用
        'subject-case': [0, 'never'],
        // <body> 以空行开头
        'body-leading-blank': [1, 'always'],
        'header-max-length': [0, 'always', 72],
    },
};

husky是git提交钩子管理工具，就是在执行特定操作时够触发一些命令，例如在commit的时候调用eslint，stylelint进行代码检测，调用prettier进行js，css文件代码格式化等，在package.json文件中配置
"husky": {
    "hooks": {
      "pre-commit": "npm run lint && npm run prettier"
    }
}
意思是在commit前执行npm run lint && npm run prettier命令，如果失败会阻止commit命令。
vite实用插件
vite-plugin-style-import，vite-plugin-html，vite-plugin-svg-icons，vite-plugin-windicss，vite-plugin-mpa等都是非常实用的vite插件
npm install vite-plugin-html
npm install vite-plugin-windicss
npm install vite-plugin-mpa

npm install vite-plugin-svg-icons --save-dev
npm install vite-plugin-style-import --save-dev
vite-plugin-style-import，是一个 Vite 插件，用于css按需引入，减少不必要的网络请求和加载时间，提高页面访问速度和用户体验。
vite-plugin-html：是一个 Vite 插件，用于在构建过程中自动生成 HTML 文件。
vite-plugin-svg-icons：是一个 Vite 插件，用于在构建过程中生成 SVG 图标的雪碧图并将其作为 Vue 组件导出。这个插件可以帮助您更轻松地使用 SVG 图标，并且可以减少 HTTP 请求次数以提高性能。
vite-plugin-windicss：是一个 Vite 插件，用于在构建过程中自动化处理 Tailwind CSS 和 Windi CSS 的样式。
vite-plugin-mpa：是一个 Vite 插件，用于支持在多页面应用程序中使用 Vite 进行构建。

这些插件的使用全部在vite.config.js中进行配置
import { defineConfig, splitVendorChunkPlugin,loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue'
import { createStyleImportPlugin } from 'vite-plugin-style-import';
import { createHtmlPlugin } from 'vite-plugin-html';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import windicss from 'vite-plugin-windicss';
import path from 'path';
import mpa from 'vite-plugin-mpa';
export default ({command, mode})=>{
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    ...
    plugins: [
      splitVendorChunkPlugin(),
      vue(),
      mpa(),
      windicss({
        config: 'tailwind.config.js',
      }),
      createHtmlPlugin(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/icons')],// 指定需要缓存的图标文件夹
        symbolId: 'icon-[name]', // 指定symbolId格式
      }),
      createStyleImportPlugin({
        libs: [
          {
            libraryName: 'element-plus',
            esModule: true,
            resolveStyle: (name) => {
              return `element-plus/lib/theme-chalk/${name}.css`;//按需引入组件的css样式
            },
            ensureStyleFile: true, // 忽略文件是否存在, 导入不存在的CSS文件时防止错误。
          },
        ],
      }),
    ],
  })
}


