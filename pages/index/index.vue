<template>
  <view class="container">
    <!-- 搜索栏 -->
   <view class="search-box">
      <uni-search-bar 
        placeholder="搜索面经" 
        v-model="searchText"
        @confirm="handleSearch"
      />
    </view>

    <!-- 分类筛选 -->
    <scroll-view scroll-x class="tags-scroll">
      <view 
        v-for="tag in tags"
        :key="tag.value"
        class="tag"
        :class="{ active: activeTag === tag.value }"
        @click="changeTag(tag.value)"
      >
        {{ tag.label }}
      </view>
    </scroll-view>

    <!-- 面经列表 -->
    <view class="list">
      <view
        v-for="item in filteredInterviews"
        :key="item.id"
        class="card"
        @click="goDetail(item.id)"
      >
        <text class="title">{{ item.title }}</text>
        <view class="meta">
          <text class="author">{{ item.author }}</text>
          <text class="time">{{ formatTime(item.published_at) }}</text>
        </view>
        <view class="tags">
          <text v-for="tag in item.tags.split(',')" :key="tag" class="tag-item">
            {{ tag.trim() }}
          </text>
        </view>
        <view class="footer">
          <view class="difficulty">
            难度: {{ item.difficulty }}
          </view>
          <view class="stats">
            <text>👀 {{ item.views }}</text>
            <text>👍 {{ item.likes }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 加载更多 -->
     <uni-load-more :status="loading ? 'loading' : (hasMore ? 'more' : 'noMore')"
	 :content-text="{
	     contentdown: '点我显示更多',
	     contentrefresh: '正在加载...',
	     contentnomore: '我是有底线的~'
	   }"
	  @clickLoadMore="fetchData" />

	
    <!-- 底部导航栏 -->
  <view class="tab-bar">
    <view 
      class="tab-item" 
      :class="{ active: activeTab === 'home' }" 
      @click="switchTab('home')"
    >
      <uni-icons type="home" size="28" :color="activeTab === 'home' ? '#2979ff' : '#666'" />
      <text>首页</text>
    </view>
    <view 
      class="tab-item" 
      :class="{ active: activeTab === 'chat' }" 
      @click="switchTab('chat')"
    >
      <uni-icons type="chat" size="28" :color="activeTab === 'chat' ? '#2979ff' : '#666'" />
      <text>交流</text>
    </view>
    <view 
      class="tab-item" 
      :class="{ active: activeTab === 'mine' }" 
      @click="switchTab('mine')"
    >
      <uni-icons type="person" size="28" :color="activeTab === 'mine' ? '#2979ff' : '#666'" />
      <text>我的</text>
    </view>
  </view>   
  
  <!-- 发布按钮 -->
  <view class="float-button" @click="goToPublish">
    <uni-icons type="plusempty" size="28" color="#fff" />
  </view>


  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getInterviews } from '../../api/interview'
const page = ref(1)
const pageSize = 6
const hasMore = ref(true)

const searchText = ref('')
const activeTag = ref('all')
const loading = ref(false)
const interviewList = ref([])
const activeTab = ref('home')

const tags = ref([
  { value: 'all', label: '全部' },
])

// 格式化时间
const formatTime = (timeStr) => {
  const date = new Date(timeStr)
  return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`
}

// 过滤后的面经列表
const filteredInterviews = computed(() => {
  let list = interviewList.value
  
  // 按分类筛选
  // if (activeTag.value !== 'all') {
  //   list = list.filter(item => item.tags === activeTag.value)
  // }
  
  //按标签筛选
  if (activeTag.value !== 'all') {
    list = list.filter(item => {
      const itemTags = item.tags.split(',').map(tag => tag.trim());
      return itemTags.includes(activeTag.value);
    });
  }
  
  // 按搜索词筛选
  if (searchText.value) {
    const keyword = searchText.value.toLowerCase()
    list = list.filter(item => 
      item.title.toLowerCase().includes(keyword) || 
      item.content.toLowerCase().includes(keyword) ||
      item.tags.toLowerCase().includes(keyword)
    )
  }
  
  // 只返回当前页的数据
   return list.slice(0, page.value * pageSize)
})

// 获取数据
const fetchData = async () => {
  if (!hasMore.value) return
  loading.value = true
  try {
    const res = await getInterviews(page.value)
	if (res.results.length < pageSize) {
	      hasMore.value = false  // 说明数据已经加载完了
	}
    // interviewList.value = res
	interviewList.value = [...interviewList.value, ...res.results]
	page.value++
	getTags()
  } catch (error) {
    console.log(error);
    
    uni.showToast({
      title: '加载失败',
      icon: 'none'
    })
  } finally {
    loading.value = false
  }
}

const changeTag = (tag) => {
  activeTag.value = tag
}

const handleSearch = () => {
  // 搜索时自动触发过滤，无需重新请求
}

const getTags =()=>{
	const tagSet = new Set();
	console.log(interviewList.value)
	for (const item of interviewList.value) {
	  const tags = item.tags.split(','); // 先分割成数组
	  tags.forEach(tag => tagSet.add(tag.trim())); // 去除空格并存入 Set
	}
	// console.log(tagSet)
	// 转换为 [{ value: 'xxx', label: 'xxx' }] 的结构
	const dynamicTags = Array.from(tagSet).map(tag => ({
	  value: tag,
	  label: tag
	}));
	
	  tags.value = [
	    { value: 'all', label: '全部' },
	    ...dynamicTags
	  ];
	  console.log(tags.value)
}

// const goDetail = (id) => {
//   uni.navigateTo({
//     url: `/pages/detail/index?id=${id}`
//   })
// }
const goDetail = (id) => {
  // 判断是否是 H5 环境
  if (process.env.UNI_PLATFORM === 'h5') {
    // H5 环境下直接用 window.location
    window.location.href = `/pages/detail/index`;
  } else {
    // 小程序和 App 使用 uni.navigateTo
    uni.navigateTo({
      url: `/pages/detail/index?id=${id}`
    })
  }
}

const goToPublish = () => {
  // 判断是否是 H5 环境
  if (process.env.UNI_PLATFORM === 'h5') {
    window.location.href = `/pages/publish/index`
  } else {
    uni.navigateTo({
      url: '/pages/publish/index'
    })
  }
}


const switchTab = (tab) => {
  activeTab.value = tab
  // 这里可以写跳转逻辑，比如：
  // uni.switchTab({ url: '/pages/home/index' })
  // 或 uni.navigateTo(...)
  console.log('切换到tab:', tab)
}


onMounted(() => {
  fetchData()
  
})

</script>

<style scoped>
.container {
  padding: 20rpx;
  background-color: #f8f8f8;
  min-height: 100vh;
  padding-bottom: 90rpx;
}

.search-box {
  margin-bottom: 20rpx;
}

.tags-scroll {
  white-space: nowrap;
  margin-bottom: 30rpx;
}

.tag {
  display: inline-block;
  padding: 12rpx 30rpx;
  margin-right: 20rpx;
  border-radius: 40rpx;
  background: #f0f0f0;
  color: #666;
  font-size: 28rpx;
}

.tag.active {
  background: #2979ff;
  color: white;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 30rpx;
}

.card {
  background: white;
  border-radius: 16rpx;
  padding: 30rpx;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 10rpx;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.meta {
  display: flex;
  font-size: 24rpx;
  color: #999;
  margin-bottom: 15rpx;
}

.author {
  margin-right: 20rpx;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
  margin-bottom: 15rpx;
}

.tag-item {
  display: inline-block;
  padding: 4rpx 16rpx;
  background: #f0f6ff;
  color: #2979ff;
  border-radius: 4rpx;
  font-size: 22rpx;
  
  
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24rpx;
  color: #666;
}

.stats {
  display: flex;
  gap: 20rpx;
}

.stats text {
  display: flex;
  align-items: center;
}


.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 90rpx; /* 根据你设计调整高度 */
  background: #fff;
  border-top: 1rpx solid #eee;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000; /* 保证浮在最上层 */
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #666;
  font-size: 24rpx;
  cursor: pointer;
}
.tab-item text {
  margin-top: 4rpx;
}
.tab-item.active {
  color: #2979ff;
}

/* +按钮 */
.float-button {
  position: fixed;
  bottom: 80px; /* 距离底部 */
  right: 20px; /* 距离右边 */
  width: 60px;
  height: 60px;
  background-color: #2979ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  z-index: 999;
  transition: all 0.3s;
}
.float-button:hover {
  background-color: #1a5ccc;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.3);
  transform: translateY(-2px);
}


</style>