<template>
  <view class="publish-container">

    <uni-card :is-shadow="false" is-full>
      <text class="uni-h6">分享面经，功德+1🥰</text>
    </uni-card>
    <!-- 卡片区域 -->
    <view class="card">
      <uni-forms ref="form" :model="form" @submit="handleSubmit">
        <uni-forms-item label="标题" required>
          <!-- 标题输入框 -->
          <uni-easyinput label="标题" placeholder="请输入面经标题" v-model="form.title" clearable />
        </uni-forms-item>

        <uni-forms-item label="类别" required>
          <!-- 分类选择 -->
          <picker mode="selector" :range="catagorys" range-key="label" @change="handleTagChange">
            <view class="picker">
              <text>{{ catagorys[selectedTagIndex]?.label || '选择分类' }}</text>
            </view>
          </picker>
        </uni-forms-item>

        <uni-forms-item label="标签" required>
          <uni-easyinput v-model="form.tag" placeholder="请输入标签，支持多标签，以,分隔" />

        </uni-forms-item>


        <uni-forms-item label="内容" required>
          <uni-easyinput type="textarea" placeholder="请输入面经内容" v-model="form.content" maxlength="1000" clearable
            :auto-height="true" />
        </uni-forms-item>

      </uni-forms>
    </view>

    <!-- 发布按钮 -->
    <view class="submit-button" @click="handleSubmit">
      发布面经
    </view>
  </view>
</template>

<script setup>
import { ref, toRaw } from 'vue'
import { uploadInterview } from '../../api/interview'

const form = ref({
  title: '',
  content: '',
  tag: '',
  category: '全部'
})

const catagorys = ref([
  { value: '全部', label: '全部' },
  { value: '前端', label: '前端' },
  { value: '后端', label: '后端' },
  { value: '测试', label: '测试' },
  { value: '算法', label: '算法' },
  { value: '大数据', label: '大数据' },
  { value: '运维', label: '运维' }
])

const selectedTagIndex = ref(0)

const handleTagChange = (e) => {
  selectedTagIndex.value = e.detail.value
  form.value.category = catagorys.value[selectedTagIndex.value].value
  console.log(catagorys.value[selectedTagIndex.value].value);

  // 这里可以触发数据刷新
  // fetchData()
}


const handleSubmit = async () => {
  console.log(form.value.title);

  if (!form.value.title || !form.value.content || !form.value.tag) {
    uni.showToast({
      title: '请完整填写信息',
      icon: 'none'
    })
    return
  }

  // const selectedTag = catagorys.value[selectedTagIndex.value]

  try {
    // ⚠️ 异步调用等待接口返回结果
    const payload = {
      title: form.value.title,
      content: form.value.content,
      tags: form.value.tag,
      category: form.value.category,
    }

    console.log("发送的参数:", payload)
    const response = await uploadInterview(payload)
    console.log("发布成功:", response.data)

    uni.showToast({
      title: '发布成功',
      icon: 'success'
    })

    uni.navigateTo({
      url: `/pages/index/index`
    })
  } catch (error) {
    console.error("发布失败:", error)
    uni.showToast({
      title: '发布失败',
      icon: 'none'
    })
  }
}
</script>

<style scoped>
.publish-container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 15px;
  background-color: #f7f7f7;
  height: 100vh;
  padding-bottom: 20px;
}

.card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.picker {
  margin: 10px 0;
  padding: 12px;
  background-color: #f3f3f3;
  border-radius: 8px;
  color: #333;
}

.submit-button {
  background: linear-gradient(45deg, #2979ff, #00c6ff);
  color: white;
  text-align: center;
  border-radius: 8px;
  padding: 14px 0;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(41, 121, 255, 0.3);
  margin-top: 20px;
}

/* 多标签输入区域样式 */
.multi-tags-section {
  margin: 15px 0;
}

.section-title {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.tags-input-container {
  position: relative;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px;
  background-color: #fafafa;
}

.tag-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  box-sizing: border-box;
}

.tags-display {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-item {
  display: flex;
  align-items: center;
  background-color: #e6f7ff;
  padding: 4px 10px;
  border-radius: 15px;
  border: 1px solid #91d5ff;
  color: #1890ff;
  font-size: 12px;
}

.tag-item text {
  margin-right: 4px;
}
</style>
