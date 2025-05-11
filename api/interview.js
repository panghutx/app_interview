// api/interview.js
import  request  from '../utils/request.js'

// 获取面经列表
export const getInterviews = () => {
  return request({
    url: '/app/interview-questions',
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