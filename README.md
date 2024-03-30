<h1 align="center">React Chat Bubble</h1>

<div align="center">这是一个基础版的聊天机器人模板</div>
<div align="center">This is a basic version of chatbot template</div>

### ✨ 特性

* 🎈 聊天页面以气泡形式嵌入到某个站点。
* 使用 `iframe` 嵌入页面中作为页面的一部分。
* 单独作为一个页面展示。

### 快速开始

```shell
npx degit github:代码开源账户的用户名/仓库名 my-chatbot-example

cd my-chatbot-example

yarn install

yarn dev
```

当程序运行起来后，访问：[`http://localhost:3000 ` ](http://localhost:3000)

### 使用方式

```html
<!--以气泡形式嵌入到其它站点中-->
<script type="module" src="http://YOUR-DOMAIN/embed.bubble.js"></script>

<!--以 iframe 形式嵌入到其它站点中-->
<iframe src="http://YOUR-DOMAIN/chatbot" />
```

### FAQ

* 如果构建气泡脚本文件`embed.bubble.js`

  > **气泡源代码地址：`根目录/bubble/*`**
  >
  > 气泡构建命令：`yarn build:bubble`，需在项目根目录下执行。
  >
  > 执行完成后 `embed.bubble.js` 文件会进入 `public` 文件夹。
  >
  > 此时，访问：`http://localhost:3000/embed.bubble.js`

### 想体验更多功能？

请访问我们的 [官方](https://www.newoaks.ai) 地址。

### 如有疑问？

请发送邮件至：ray_abcdefg@gmail.com

