const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      "/api": {
        target: () => {
          if (window.location.hostname === "como.duckdns.org") {
            return process.env.VUE_APP_SERVER_DNS_URL;
          } else if (window.location.hostname === "35.237.222.239") {
            return process.env.VUE_APP_SERVER_URL;
          } else {
            return process.env.VUE_APP_SERVER_LOCAL_URL;
          }
        },
        changeOrigin: true,
      },
    },
  },
});
