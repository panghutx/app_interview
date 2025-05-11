<!-- <template>
  <view class="container">
    <view class="header">
      <text class="title">{{ detail.title }}</text>
      <view class="meta">
        <text class="author">作者: {{ detail.author }}</text>
        <text class="time">发布时间: {{ formatTime(detail.published_at) }}</text>
        <text class="category">分类: {{ detail.category }}</text>
      </view>
    </view>

   <view class="tags">
      <text v-for="tag in detail.tags.split(',')" :key="tag" class="tag-item">
        {{ tag.trim() }}
      </text>
    </view>

    <view class="content">
      <text>{{ detail.content }}</text>
    </view>

    <view class="footer">
      <view class="stats">
        <text>👀 {{ detail.views }}</text>
        <text>👍 {{ detail.likes }}</text>
      </view>
      <view class="difficulty">
        难度: {{ detail.difficulty }}
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getInterviewDetail } from '../../api/interview'
const detail = ref({});

const formatTime = (timeStr) => {
  const date = new Date(timeStr);
  return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getDate().toString().padStart(2,'0')}`;
};

const fetchDetail = async () => {
  try {
    const id = route.query.id;
    const response =  await getInterviewDetail(id)
    detail.value = response.data;
  } catch (error) {
    uni.showToast({
      title: '加载失败',
      icon: 'none'
    });
  }
};

onMounted(() => {
  fetchDetail();
});
</script>

<style scoped>
.container {
  padding: 20rpx;
  background-color: #f8f8f8;
  min-height: 100vh;
}
.header {
  margin-bottom: 20rpx;
}
.title {
  font-size: 36rpx;
  font-weight: bold;
  margin-bottom: 10rpx;
}
.meta {
  display: flex;
  gap: 20rpx;
  color: #999;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
  margin-bottom: 15rpx;
}
.tag-item {
  padding: 4rpx 16rpx;
  background: #f0f6ff;
  color: #2979ff;
  border-radius: 4rpx;
  font-size: 22rpx;
}
.content {
  margin-bottom: 20rpx;
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
</style -->>
