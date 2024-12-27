import { getQuery } from 'h3'
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  if (query.userToken) {
    const fetchedUser = {
      name: 'Alice',
      email: 'test.gmail.com'
    }

    return fetchedUser
  }
})
