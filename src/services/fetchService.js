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
  console.log(concert)
  return fetch('https://jfddl8-shredders.firebaseio.com/concertList.json',
    {
      method: 'POST',
      body: JSON.stringify(concert)
    })
    .then(console.log('xxxx'))

}
