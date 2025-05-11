"use strict";
const common_vendor = require("../../common/vendor.js");
const api_interview = require("../../api/interview.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_search_bar2 + _easycom_uni_load_more2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_load_more)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const searchText = common_vendor.ref("");
    const activeTag = common_vendor.ref("all");
    const loading = common_vendor.ref(false);
    const interviewList = common_vendor.ref([]);
    const tags = [
      { value: "all", label: "全部" },
      { value: "前端", label: "前端" },
      { value: "后端", label: "后端" },
      { value: "数据库", label: "数据库" }
    ];
    const formatTime = (timeStr) => {
      const date = new Date(timeStr);
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    };
    const filteredInterviews = common_vendor.computed(() => {
      let list = interviewList.value;
      if (activeTag.value !== "all") {
        list = list.filter((item) => item.category === activeTag.value);
      }
      if (searchText.value) {
        const keyword = searchText.value.toLowerCase();
        list = list.filter(
          (item) => item.title.toLowerCase().includes(keyword) || item.content.toLowerCase().includes(keyword) || item.tags.toLowerCase().includes(keyword)
        );
      }
      return list;
    });
    const fetchData = async () => {
      loading.value = true;
      try {
        const res = await api_interview.getInterviews();
        interviewList.value = res;
      } catch (error) {
        common_vendor.index.showToast({
          title: "加载失败",
          icon: "none"
        });
      } finally {
        loading.value = false;
      }
    };
    const changeTag = (tag) => {
      activeTag.value = tag;
    };
    const handleSearch = () => {
    };
    const goDetail = (id) => {
      {
        common_vendor.index.navigateTo({
          url: `/pages/detail/index?id=${id}`
        });
      }
    };
    common_vendor.onMounted(() => {
      fetchData();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleSearch),
        b: common_vendor.o(($event) => searchText.value = $event),
        c: common_vendor.p({
          placeholder: "搜索面经",
          modelValue: searchText.value
        }),
        d: common_vendor.f(tags, (tag, k0, i0) => {
          return {
            a: common_vendor.t(tag.label),
            b: tag.value,
            c: activeTag.value === tag.value ? 1 : "",
            d: common_vendor.o(($event) => changeTag(tag.value), tag.value)
          };
        }),
        e: common_vendor.f(filteredInterviews.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.author),
            c: common_vendor.t(formatTime(item.published_at)),
            d: common_vendor.f(item.tags.split(","), (tag, k1, i1) => {
              return {
                a: common_vendor.t(tag.trim()),
                b: tag
              };
            }),
            e: common_vendor.t(item.difficulty),
            f: common_vendor.t(item.views),
            g: common_vendor.t(item.likes),
            h: item.id,
            i: common_vendor.o(($event) => goDetail(item.id), item.id)
          };
        }),
        f: common_vendor.p({
          status: loading.value ? "loading" : "noMore"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
