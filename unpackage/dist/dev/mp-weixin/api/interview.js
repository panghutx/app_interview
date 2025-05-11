"use strict";
const common_vendor = require("../common/vendor.js");
const utils_request = require("../utils/request.js");
const getInterviews = () => {
  return utils_request.request({
    url: "/app/interview-questions",
    method: "GET"
  });
};
const getInterviewDetail = (id) => {
  common_vendor.index.__f__("log", "at api/interview.js:14", "获取面经详情", id);
  return utils_request.request({
    url: `/app/interview-questions/${id}/`,
    method: "GET"
  });
};
exports.getInterviewDetail = getInterviewDetail;
exports.getInterviews = getInterviews;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/interview.js.map
