import fetchServiceDuck from './fetchServiceDuck'

const fetchConcerts = fetchServiceDuck(
  'https://jfddl8-shredders.firebaseio.com/users/',
  'users'
)

export const fetchWithToken = fetchConcerts.fetchWithToken
export const fetchs = fetchConcerts.fetchs
export default fetchConcerts.reducer
