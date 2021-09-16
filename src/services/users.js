// eslint-disable-next-line import/no-anonymous-default-export
export default httpUsers => ({
  get: async () => {
    const response = await httpUsers.get('/users')
    return {
      data: response
    }
  }
})
