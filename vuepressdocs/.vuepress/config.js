const path = require("path");

module.exports = {
  base: "/",
  title: "el-form-schema",
  description: "el-form-schema 中后台表单解决方案，旨在让表单开发这件事情变的易用、简单、高效!",
  dest: path.resolve(__dirname, "../../docs/"),
  markdown: { lineNumbers: true },
  themeConfig: {
    logo: '/logo.jpg', // 左上角logo
    repo: "lisiyizu/el-form-schema",
    docsDir: "vuepress",
    nav: [
      {
        text: "主页",
        link: "/"
      },
      {
        text: "指南",
        link: "/guide/"
      }
    ],
    sidebar: {
      "/base/": [
        {
          title: "表单组件",
          collapsable: false,
          children: [ "base" ]
        }
      ],
      "/guide/": [
        {
          title: "指南",
          collapsable: false,
          children: ["", "feature", "base", "initValueAndDefault", "destruct", "rules", "tip", "layout",  "dialog", "expression", "data", "templateString",  "watchModel", "apiConfig", "elInputNum", "object", "array", "table", "slot", "showcase"]
        }
      ]
    }
  },
  chainWebpack(config) {
    config.resolve.alias.set("@", path.resolve(__dirname, "../../src/"));
  }
};
