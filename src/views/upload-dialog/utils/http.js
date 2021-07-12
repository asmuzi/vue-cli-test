import axios from 'axios'

const instance = axios.create({
  headers: {
    timeout: 3000,
    'Content-Type': 'multipart/form-data',
    authorization:
      // eslint-disable-next-line max-len
      'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIwOThmNmJjZDQ2MjFkMzczY2FkZTRlODMyNjI3YjRmNiIsImlhdCI6MTYyNTcyNzk1OCwiYXVkIjoibmV4dG9waXVzZXIiLCJ1aWQiOiIxIiwidGVuYW50SWQiOiIxNTk2ODcwNjY5Mjc4IiwiZXhwIjoxNjI1ODE0MzU4LCJuYmYiOjE2MjU3Mjc5NTh9.27-4pCvlFpULzaRs--t9hV2C7aYmxcZWwMwqGuijcqc'
  }
})

export const upload = params => instance.post('/file/import/single', params)
