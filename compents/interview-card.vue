<template>
  <view class="card" @click="$emit('click')">
    <view class="title">{{ data.title }}</view>
    <view class="meta">
      <text class="author">{{ data.author }}</text>
      <text class="time">{{ formatTime(data.published_at) }}</text>
    </view>
    <view class="tags">
      <tag v-for="tag in data.tags.split(',')" :key="tag" :text="tag.trim()" />
    </view>
  </view>
</template>

<script setup>
import { formatTime } from '../utils/date.js'
import Tag from './tag.vue'

defineProps({
  data: Object
})
</script>

<style scoped>
.card {
  padding: 20rpx;
  margin-bottom: 20rpx;
  background: #fff;
  border-radius: 8rpx;
}
.title {
  font-size: 32rpx;
  font-weight: bold;
}
</style>