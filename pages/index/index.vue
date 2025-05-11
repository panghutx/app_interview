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
<!-- 	<uni-section title="基本用法" type="line">
		<uni-search-bar @confirm="handleSearch" :focus="true" v-model="searchText" @blur="blur" @focus="focus" @input="input"
			@cancel="cancel" @clear="clear">
		</uni-search-bar>
		<view class="search-result">
			<text class="search-result-text">当前输入为：{{ searchText }}</text>
		</view>
	
	</uni-section> -->

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
    <uni-load-more :status="loading ? 'loading' : 'noMore'" />
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getInterviews } from '../../api/interview'

const searchText = ref('')
const activeTag = ref('all')
const loading = ref(false)
const interviewList = ref([])

const tags = [
  { value: 'all', label: '全部' },
  { value: '前端', label: '前端' },
  { value: '后端', label: '后端' },
  { value: '数据库', label: '数据库' }
]

// 格式化时间
const formatTime = (timeStr) => {
  const date = new Date(timeStr)
  return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`
}

// 过滤后的面经列表
const filteredInterviews = computed(() => {
  let list = interviewList.value
  
  // 按分类筛选
  if (activeTag.value !== 'all') {
    list = list.filter(item => item.category === activeTag.value)
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
  
  return list
})

// 获取数据
const fetchData = async () => {
  loading.value = true
  try {
    const res = await getInterviews()
    interviewList.value = res
  } catch (error) {
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


onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.container {
  padding: 20rpx;
  background-color: #f8f8f8;
  min-height: 100vh;
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
</style>