"use strict";
const common_vendor = require("../common/vendor.js");
let requestCount = 0;
const request = (options) => {
  requestCount++;
  common_vendor.index.showLoading({ title: "加载中", mask: true });
  return new Promise((resolve, reject) => {
    common_vendor.index.__f__("log", "at utils/request.js:8", "底层request", options);
    common_vendor.index.request({
      url: "http://127.0.0.1:8000" + options.url,
      method: "GET",
      data: options.data || {},
      header: {
        // 'Origin': 'http://localhost:8080',  // 显式声明
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        "X-Token": common_vendor.index.getStorageSync("token") || "",
        ...options.header
      },
      success: (res) => {
        common_vendor.index.__f__("log", "at utils/request.js:21", res);
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          common_vendor.index.showToast({ title: res.data.msg || "请求异常", icon: "none" });
          reject(res);
        }
      },
      fail: (err) => {
        common_vendor.index.__f__("log", "at utils/request.js:30", err);
        common_vendor.index.showToast({ title: "网络连接失败", icon: "none" });
        reject(err);
      },
      complete: () => {
        if (--requestCount <= 0) {
          common_vendor.index.hideLoading();
        }
      }
    });
  });
};
exports.request = request;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/request.js.map
