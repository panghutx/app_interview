<template>
  <view class="detail-container">
    <!-- 标题部分 -->
    <view class="header">
      <text class="title">{{ interview.title }}</text>
      <view class="meta">
        <text class="author">{{ interview.author }}</text>
        <text class="time">{{ formatTime(interview.published_at) }}</text>
      </view>
    </view>
    
    <!-- 标签 -->
    <view class="tags">
      <text 
        v-for="tag in interview.tags.split(',')" 
        :key="tag" 
        class="tag-item"
      >
        {{ tag.trim() }}
      </text>
    </view>
    
    <!-- 难度 -->
    <view class="difficulty">
      难度: <text :class="interview.difficulty.toLowerCase()">{{ interview.difficulty }}</text>
    </view>
    
    <!-- 内容 -->
    <view class="content">
      <text>{{ interview.content }}</text>
    </view>
    
    <!-- 底部操作栏 -->
    <view class="footer">
      <view class="actions">
        <view class="action-item" @click="handleLike">
		  <uni-icons type="hand-up" size="24" :color="isLiked ? '#2979ff' : '#666'"></uni-icons>
          <text>点赞 {{ interview.likes }}</text>
        </view>
        <view class="action-item">
          <uni-icons type="chat" size="24" color="#666"></uni-icons>
          <text>评论</text>
        </view>
        <view class="action-item">
          <uni-icons type="star" size="24" :color="isCollected ? '#ffb800' : '#666'"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getInterviewDetail } from '../../api/interview'
import { onLoad } from '@dcloudio/uni-app'

const interview = ref({
  title: '',
  content: '',
  tags: '',
  published_at: '',
  author: '',
  difficulty: '',
  likes: 0,
  views: 0
})

const isLiked = ref(false)
const isCollected = ref(false)

// 获取路由参数
const routeParams = ref({})

onLoad((options) => {
  console.log(options)
  routeParams.value = options
  fetchData()
})

// 格式化时间
const formatTime = (timeStr) => {
  const date = new Date(timeStr)
  return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`
}

// 获取详情数据
const fetchData = async () => {
	console.log("进入详情页接口")
  uni.showLoading({
    title: '加载中...'
  })
  
  try {
    const res = await getInterviewDetail(routeParams.value.id)
    interview.value = res
    console.log(res)
    // 增加浏览量
    interview.value.views += 1
  } catch (error) {
    uni.showToast({
      title: '加载失败',
      icon: 'none'
    })
  } finally {
    uni.hideLoading()
  }
}

// 点赞处理
const handleLike = () => {
  isLiked.value = !isLiked.value
  if (isLiked.value) {
    interview.value.likes += 1
  } else {
    interview.value.likes -= 1
  }
}
</script>
<style scoped>
.detail-container {
  padding: 30rpx;
  background-color: #f8f8f8;
  min-height: 100vh;
}

.header {
  margin-bottom: 30rpx;
}

.title {
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
  line-height: 1.4;
  margin-bottom: 20rpx;
}

.meta {
  display: flex;
  font-size: 26rpx;
  color: #999;
}

.author {
  margin-right: 20rpx;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
  margin-bottom: 30rpx;
}

.tag-item {
  display: inline-block;
  padding: 6rpx 20rpx;
  background: #f0f6ff;
  color: #2979ff;
  border-radius: 6rpx;
  font-size: 24rpx;
}

.difficulty {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 40rpx;
}

.difficulty text {
  margin-left: 10rpx;
}

.difficulty .easy {
  color: #67c23a;
}

.difficulty .medium {
  color: #e6a23c;
}

.difficulty .hard {
  color: #f56c6c;
}

.content {
  font-size: 30rpx;
  line-height: 1.6;
  color: #333;
  margin-bottom: 80rpx;
  white-space: pre-line;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 20rpx 30rpx;
  box-shadow: 0 -4rpx 12rpx rgba(0, 0, 0, 0.05);
}

.actions {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 24rpx;
  color: #666;
}

.action-item text {
  margin-top: 8rpx;
}
</style>