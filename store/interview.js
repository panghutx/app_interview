import { defineStore } from 'pinia'
import { getInterviews } from '../api/interview'

export const useInterviewStore = defineStore('interview', {
  state: () => ({
    list: []
  }),
  actions: {
    async fetchList() {
      this.list = await getInterviews()
    }
  }
})