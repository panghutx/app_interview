// api/interview.js
import  request  from '../utils/request.js'

// 获取面经列表
export const getInterviews = (page) => {
	console.log(page)
  return request({
    url: '/app/interview-questions/?page='+page,
    method: 'GET'
  })
}

// 获取面经详情
export const getInterviewDetail = (id) => {
	console.log("获取面经详情",id)
  return request({
    url: `/app/interview-questions/${id}/`,
    method: 'GET'
  })
}

//发布面经
export const uploadInterview = (data) => {
	console.log("发布面经",data)
  return request({
    url: `/app/interview-questions/new/`,
    method: 'POST',
    data:data
  })
}