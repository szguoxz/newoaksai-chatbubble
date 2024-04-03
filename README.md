<h1 align="center">Newoaks AI React Chat Bubble</h1>
<div align="center">NewOaks AI is an AI chatbot builder, which allows you to engage with customers, nurture leads and book conversational appointments for your website, text SMS and files by Custom ChatGPT and Claude. The open source code is the chat bubble embedded on websites to engage with customers.

[Website](https://www.newoaks.ai) | [Documentation](https://www.newoaks.ai/guide/main) | [Blog](https://www.newoaks.ai/blog/) | [Twitter](https://twitter.com/Rockwood_XRay)</div>

![NewOaks AI](https://cdn.newoaks.ai/open/newoaksai-chatbubble/chatbot.png)

### ✨ features

* 🎈 Chat page is embedded in a website as a bubble
* You can also use `iframe` to embed the chat bubble as part of the page
* Or you can simple use the chat bubble as a syandalone page

### Quick Start

```shell
npx degit github:szguoxz/chatbubble my-chatbot-example

cd my-chatbot-example

yarn install

yarn dev
```

Visit：[`http://localhost:3000 ` ](http://localhost:3000)

### How to use the code

```html
<!-- Embed the chat bubble into your website -->
<script type="module" src="http://YOUR-DOMAIN/embed.bubble.js"></script>

<!-- Embed as iframe -->
<iframe src="http://YOUR-DOMAIN/chatbot" />
```

### FAQ

* How to build the chatbubble script: `embed.bubble.js`

  > **chatbubble source code：`/bubble/*`**
  >
  > Build command：`yarn build:bubble`，need to run under the project root directory。
  >
  > After build succeeded, `embed.bubble.js` will be copied into `public` folder。
  >
  > Then you can visit：`http://localhost:3000/embed.bubble.js`

### Support & Community
You'll find a lot of resources to help you get started with HeyForm in the [help center](https://www.newoaks.ai/guide/main). However, if you can't find what you're looking for there, don't hesitate to reach out to us:

  > Have a question? Join the [Discord server](https://discord.com/invite/fuBt2K6k3p) and get instant help.
  > 
  > Found a bug? [Create an issue](https://github.com/szguoxz/chatbubble/issues)

### Want to know more？

Visit [Official](https://www.newoaks.ai) website

### Any questions?, welcome to submit issues or send email to ：cguo@newoaks.ai
