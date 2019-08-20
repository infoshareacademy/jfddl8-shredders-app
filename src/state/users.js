import fetchServiceDuck from './fetchServiceDuck'
import { mapObjectToArray } from '../services/mapObjectToArray'

const fetchConcerts = fetchServiceDuck(
  'https://jfddl8-shredders.firebaseio.com/users/',
  'users',
  mapObjectToArray
)

export const fetchWithToken = fetchConcerts.fetchWithToken
export const fetchs = fetchConcerts.fetchs
export default fetchConcerts.reducer