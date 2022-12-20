import Container from '@mui/material/Container'
import { CardMain } from 'components/CardMain/CardMain'
import { useState } from 'react'

export const App = () => {
  const [cardsProps, setCardsProps] = useState([{ color: 'red' }, { color: 'green' }, { color: 'blue' }])

  return (
    <Container
      sx={{
        backgroundColor: 'lightcoral',
        display: 'flex',
        gap: '10px',
        justifyContent: 'center',
        padding: '10px',
        flexWrap: 'wrap',
      }}
    >
      {cardsProps.map((cardProp) => (
        <CardMain
          color={cardProp.color}
          logInParent={(ev) => console.log('hey :) got logged', ev.target.toString())}
          key={cardProp.color}
        />
      ))}
    </Container>
  )
}
