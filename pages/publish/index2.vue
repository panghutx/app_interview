<template>
	<view class="container">
		<uni-card :is-shadow="false" is-full>
			<text class="uni-h6">分享面经，功德+1🥰</text>
		</uni-card>
		
			<view class="example">
				<!-- 基础用法，不包含校验规则 -->
				<uni-forms ref="baseForm" :model="form" labelWidth="80px">
					<uni-forms-item label="标题" required>
						<uni-easyinput v-model="form.value.title" placeholder="请输入面经标题" />
					</uni-forms-item>
					<uni-forms-item label="内容" required>
						<uni-easyinput type="textarea" v-model="form.value.content" placeholder="请输入面经内容" />
					</uni-forms-item>
					<uni-forms-item label="类别" required>
						<uni-data-select v-model="form.value.skills" :localdata="skillsRange.value" >
						</uni-data-select>
					</uni-forms-item>
					<uni-forms-item label="标签" required>
						<uni-easyinput v-model="form.value.tags" placeholder="请输入标签，支持多标签，以,分隔" />
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
	import { ref } from 'vue'
				// 基础表单数据
				const form= ref({
					title: '',
					content: '',
					tags:'',
					skills: 0
				})

				const skillsRange =ref([{
						value: 0,
						text: "全部"
					},
					{
						value: 1,
						text: "后端"
					},
					{
						value: 2,
						text: "前端"
					},
					{
						value: 3,
						text: "测试"
					},
					{
						value: 4,
						text: "算法"
					},
					{
						value: 5,
						text: "大数据"
					},
					{
						value: 6,
						text: "运维"
					}
				])

    const handleSubmit = () => {
      if (!form.value.title || !form.value.content || !form.value.tags) {
        uni.showToast({
          title: '请完整填写信息',
          icon: 'none'
        })
        return
      }
    
      const selectedTag = tags.value[selectedTagIndex.value]
      console.log("发布内容：", form.value, "标签：", selectedTag.label)
      
      // 这里可以调用 API 发送数据
      // yourApiMethod(form.value)
    
      uni.showToast({
        title: '发布成功',
        icon: 'success'
      })
    }
		
		
</script>

<style scoped>
	.example {
		padding: 15px;
		background-color: #fff;
	}

	.segmented-control {
		margin-bottom: 15px;
	}

	.button-group {
		margin-top: 15px;
		display: flex;
		justify-content: space-around;
	}

	.form-item {
		display: flex;
		align-items: center;
		flex: 1;
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
</style>
