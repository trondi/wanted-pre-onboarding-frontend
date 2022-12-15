const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/signin",
    createProxyMiddleware({
      //   target: "https://localhost:8000",
      target: "https://pre-onboarding-selection-task.shop/",

      changeOrigin: true,
    })
  );
};
