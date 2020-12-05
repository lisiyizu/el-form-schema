const path = require("path");

module.exports = {
  base: "/el-form-schema/",
  title: "el-form-schema",
  description: "基于element-ui二次封装，中后台表单解决方案",
  dest: path.resolve(__dirname, "../../docs/"),
  markdown: { lineNumbers: true },
  themeConfig: {
    repo: "lisyizu/el-form-schema",
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
          children: ["", "feature", "base", "layout", "expression", "array", "object", "table", "showcase"]
        }
      ]
    }
  },
  chainWebpack(config) {
    config.resolve.alias.set("@", path.resolve(__dirname, "../../src/"));
  }
};
