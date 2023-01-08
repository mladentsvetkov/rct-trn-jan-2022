import Container from '@mui/material/Container'
import { CardMain } from 'components/CardMain/CardMain'
import { VeryHighComponent } from 'components/VeryHighComponent/VeryHighComponent'
import { useContext, useMemo, useRef, useState, MouseEvent } from 'react'
import { Box, Button } from '@mui/material'
import { JokesSearch } from 'components/JokesSearch/JokesSearch'
import { AuthenticationProvider } from 'providers/authentication/AuthenicationProvider'
import CatsContainer from 'components/CatsContainer/CatsContainer'
import { CatsContext } from 'pages/CatsStore'
import { Link } from 'react-router-dom'

const findPrime = (num: number) => {
  console.log('calculating prime numbers')
  let i,
    primes = [2, 3],
    n = 5
  const isPrime = (n: number) => {
    let i = 1,
      p = primes[i],
      limit = Math.ceil(Math.sqrt(n))
    while (p <= limit) {
      if (n % p === 0) {
        return false
      }
      i += 1
      p = primes[i]
    }
    return true
  }
  for (i = 2; i <= num; i += 1) {
    while (!isPrime(n)) {
      n += 2
    }
    primes.push(n)
    n += 2
  }
  return primes[num - 1]
}

export const App = () => {
  const [cardsProps, setCardsProps] = useState([{ color: 'red' }, { color: 'green' }, { color: 'blue' }])
  const [triggerRerender, setTriggerRerender] = useState(false)

  const targetRefComponent = useRef<null | HTMLDivElement>(null)
  const { state, dispatch } = useContext(CatsContext)

  const scroll = () => {
    targetRefComponent.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // useEffect(() => {
  //   scroll()
  // }, [triggerRerender])

  // const somePrimeNumberExpensive = findPrime(1332318)
  // const somePrimeNumberExpensive = useMemo(() => findPrime(1332318), [])

  // console.log('rerendered')

  const handleLogInParent = (ev: MouseEvent<HTMLButtonElement>) => {
    console.log('hey :) got logged', ev.target.toString())
  }

  return (
    <>
      <Link to="somepage">Go to SomePage</Link>
      <Link to="muidemo">Go to MUI Demo</Link>
      <CatsContainer state={state} dispatch={dispatch} />
      <JokesSearch />
      <Box margin={'10rem'} fontSize="5rem">
        <Button onClick={scroll} sx={{ fontSize: '2rem' }}>
          go to bottom
        </Button>
        <Button onClick={() => setTriggerRerender(!triggerRerender)} sx={{ fontSize: '2rem' }}>
          trigger rerender
        </Button>
        {/* <Box>Prime number: {somePrimeNumberExpensive}</Box> */}
      </Box>
      <VeryHighComponent />
      <AuthenticationProvider>
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
            <CardMain color={cardProp.color} logInParent={handleLogInParent} key={cardProp.color} />
          ))}
        </Container>
      </AuthenticationProvider>
      <div ref={targetRefComponent}>go here please</div>
    </>
  )
}
