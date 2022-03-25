import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IAnimal } from '../models/IAnimal'
import { Button } from '../styles/Button'
import './Animal.css'

export const Animal = () => {
  let theAnimal: IAnimal = {
    id: 0,
    name: '',
    latinName: '',
    yearOfBirth: 0,
    shortDescription: '',
    longDescription: '',
    imageUrl: '',
    medicine: '',
    isFed: false,
    lastFed: new Date(),
  }
  const { id } = useParams()
  const [animal, setAnimal] = useState<IAnimal>(theAnimal)
  const [isHungry, setIsHungry] = useState(false)
  let theAnimalId: number = Number(id)

  useEffect(() => {
    let getLS = JSON.parse(localStorage.getItem('Animals') || '[]')
    // eslint-disable-next-line array-callback-return
    getLS.map((animal: IAnimal) => {
        if (animal.id === theAnimalId) {
          let LastFed = Math.floor(
            (new Date().getTime() - new Date(animal.lastFed).getTime()) /
            (1000 * 60 * 60)
          )
          if (LastFed >= 3) {
            animal.isFed = false
          }

          if (LastFed >= 4) {
            setIsHungry(true)
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
          theAnimal = animal
          setAnimal(theAnimal)
        }
      })
  }, [])

  function feedme(thisAnimal: IAnimal) {
    thisAnimal.lastFed = new Date()
    thisAnimal.isFed = true
    setAnimal(thisAnimal)
    setIsHungry(false)
    let animalsFromLS: IAnimal[] = JSON.parse(
      localStorage.getItem('Animals') || '[]',
    )
    for (let i = 0; i < animalsFromLS.length; i++) {
      if (animalsFromLS[i].id === thisAnimal.id) {
        animalsFromLS[i] = animal
        console.log(animalsFromLS[i])
      }
    }
    localStorage.setItem('Animals', JSON.stringify(animalsFromLS))
  }

  return (
    <article className='detalisArticle'>
      <h1>{animal.name}</h1>
      {animal.isFed && isHungry ? (
        <h2>
          {animal.name} är hungrig, blev matad för mer än 3 timmar sen! 😢
        </h2>
      ) : (<h2>{animal.name} är mätt Nu 😊</h2>)}

      {isHungry === true && <h2> {animal.name} är jättehungrig, blev matad för mer än 4 timmar sen! 😰</h2>}
      <img src={animal.imageUrl} width="100%" height="auto" alt="Animal" />
      <h3>latinNamn: {animal.latinName}</h3>
      <p>
        Mer om {animal.name} {animal.longDescription}
      </p>
      <h3>Medisin: {animal.medicine}</h3>
      <h3>Födelseår: {animal.yearOfBirth}</h3>

      <div className='btnContent'>
         {animal.isFed === false && (
        <Button color="red"
          onClick={() => {
            feedme(animal)
          }}
        >
          Mata {animal.name}
        </Button>
      )}

      <Button><Link to="/">Start Sida</Link></Button>
     </div>
    </article>
  )
}
