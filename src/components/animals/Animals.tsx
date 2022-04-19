import { ChangeEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IAnimal } from '../models/IAnimal'
import './Animals.css'
import { Button } from '../styles/Button'
import axios from 'axios'

export const Animals = () => {
  const [animalsFromLS, setAnimalsFromLS] = useState<IAnimal[]>([])
  const [iputValue, setInputValue] = useState('')

  const getAnswer = async () => {
    if (JSON.parse(localStorage.getItem('Animals') || '[]').length > 0) return
    const { data } = await axios(
      'https://animals.azurewebsites.net/api/animals',
    )
    setAnimalsFromLS(data)
    localStorage.setItem('Animals', JSON.stringify(data))
  }

  useEffect(() => {
    getAnswer()
    let getLS: IAnimal[] = JSON.parse(localStorage.getItem('Animals') || '[]')
    setAnimalsFromLS(getLS)
    // eslint-disable-next-line array-callback-return
  }, [])

  animalsFromLS.map((animal: IAnimal) => {
    let LastFed = Math.floor(
      (new Date().getTime() - new Date(animal.lastFed).getTime()) /
        (1000 * 60 * 60),
    )
    if (LastFed >= 4) {
      animal.isFed = false
    }
  })

  let animalsLis = animalsFromLS.map((animal) => {
    return (
      <article key={animal.id} className="container">
        <h1>Namn: {animal.name}</h1>
        {animal.isFed === false && (
          <article>
            <Button primary>
              <Link to={'/' + animal.id}>
                För mer än 4 timmar sen, har {animal.name} blivit matad!! 😰
                Mata
              </Link>
            </Button>
          </article>
        )}
        <div className="content">
          <img src={animal.imageUrl} alt="Animal" className="image" />
          <h2>
            Beskrivning:{animal.shortDescription}....
            <Link to={'/' + animal.id}>Mer information</Link>
          </h2>
        </div>
      </article>
    )
  })

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value)
  }
  function handleClick() {
    // eslint-disable-next-line array-callback-return
    animalsFromLS.map((animal: IAnimal) => {
      if (animal.name === iputValue) {
        setAnimalsFromLS([animal])
      }
    })
  }

  return (
    <>
      <div className="searchContent">
        <input
          type="text"
          onChange={handleChange}
          placeholder="Sök djur"
        ></input>
        <Button onClick={handleClick}>SÖK</Button>
      </div>
      {animalsLis}
    </>
  )
}
