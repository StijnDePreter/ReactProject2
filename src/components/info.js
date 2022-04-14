import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchWeather, selectWeather } from '../features/weather/weatherSlice'
import Card from 'react-bootstrap/Card'

function Info() {
  const dispatch = useDispatch()
  const weather = useSelector(selectWeather)

  const status = useSelector(state => state.weather.status)
  const error = useSelector(state => state.weather.error)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchWeather())
    }
  }, [status, dispatch])

  let content

  if (status === 'loading') {
    content =
      <p>Loading...</p>
  } else if (status === 'succeeded') {
    content =
      <>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={"http://openweathermap.org/img/wn/" + weather.icon + "@4x.png"} alt="Weather Icon" />
          <Card.Body>
            <Card.Title>Vandaag is het {weather.temp} °C in Geel.</Card.Title>
            <Card.Text>
              luchtdruk: {weather.pressure} hPa
              <br />
              Luchtvochtigheid: {weather.humidity} %
              <br />
              Windsnelheid: {weather.windSpeed} km/h
            </Card.Text>
          </Card.Body>
        </Card>
      </>
  } else if (status === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section>
      <h2>Weather</h2>
      {content}
      <br />
      <h2>Info</h2>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Deze app wordt beheerd door Stijn De Preter</Card.Title>
          <Card.Text>
            De app heeft volgende functionaliteiten:
            <br />
            - Artikels tonen
            <br />
            - Artikels toevoegen
            <br />
            - Artikels bewerken
          </Card.Text>
        </Card.Body>
      </Card>
    </section>
  )
}

export default Info;