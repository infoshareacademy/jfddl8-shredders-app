import { mapObjectToArray } from './mapObjectToArray'

export const getConcertsFromBase = () => {
  return fetch('https://jfddl8-shredders.firebaseio.com/concertList.json')
    .then(r => r.json())
    .then(data => {
      const concerts = mapObjectToArray(data)
      return concerts
    })
}

export const addConcertsToBase = (concert) => {
  return fetch('https://jfddl8-shredders.firebaseio.com/concertList.json',
    {
      method: 'POST',
      body: JSON.stringify(concert)
    })

}

export const removeConcertsInBase = (key) => {
  return fetch('https://jfddl8-shredders.firebaseio.com/concertList/' + key + '.json',
    {
      method: 'DELETE',
    })
}

export const toggleFavoriteConcertsInBase = (key, isFavorite) => {
  return fetch('https://jfddl8-shredders.firebaseio.com/concertList/' + key + '.json',
    {
      method: 'PATCH',
      body: JSON.stringify({
        isFavorite
      })
    })
}
