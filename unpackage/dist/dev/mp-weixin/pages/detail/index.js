"use strict";
const common_vendor = require("../../common/vendor.js");
const api_interview = require("../../api/interview.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const interview = common_vendor.ref({
      title: "",
      content: "",
      tags: "",
      published_at: "",
      author: "",
      difficulty: "",
      likes: 0,
      views: 0
    });
    const isLiked = common_vendor.ref(false);
    const isCollected = common_vendor.ref(false);
    const routeParams = common_vendor.ref({});
    common_vendor.onLoad((options) => {
      common_vendor.index.__f__("log", "at pages/detail/index.vue:75", options);
      routeParams.value = options;
      fetchData();
    });
    const formatTime = (timeStr) => {
      const date = new Date(timeStr);
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    };
    const fetchData = async () => {
      common_vendor.index.__f__("log", "at pages/detail/index.vue:88", "进入详情页接口");
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      try {
        const res = await api_interview.getInterviewDetail(routeParams.value.id);
        interview.value = res;
        common_vendor.index.__f__("log", "at pages/detail/index.vue:96", res);
        interview.value.views += 1;
      } catch (error) {
        common_vendor.index.showToast({
          title: "加载失败",
          icon: "none"
        });
      } finally {
        common_vendor.index.hideLoading();
      }
    };
    const handleLike = () => {
      isLiked.value = !isLiked.value;
      if (isLiked.value) {
        interview.value.likes += 1;
      } else {
        interview.value.likes -= 1;
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(interview.value.title),
        b: common_vendor.t(interview.value.author),
        c: common_vendor.t(formatTime(interview.value.published_at)),
        d: common_vendor.f(interview.value.tags.split(","), (tag, k0, i0) => {
          return {
            a: common_vendor.t(tag.trim()),
            b: tag
          };
        }),
        e: common_vendor.t(interview.value.difficulty),
        f: common_vendor.n(interview.value.difficulty.toLowerCase()),
        g: common_vendor.t(interview.value.content),
        h: common_vendor.p({
          type: "hand-up",
          size: "24",
          color: isLiked.value ? "#2979ff" : "#666"
        }),
        i: common_vendor.t(interview.value.likes),
        j: common_vendor.o(handleLike),
        k: common_vendor.p({
          type: "chat",
          size: "24",
          color: "#666"
        }),
        l: common_vendor.p({
          type: "star",
          size: "24",
          color: isCollected.value ? "#ffb800" : "#666"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2fd5b0a7"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/detail/index.js.map
