import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Alert } from '@mui/material'

export const App = () => {
  const { data } = useQuery(['use-query-test'], () =>
    axios('http://www.randomnumberapi.com/api/v1.0/random?min=100&max=1000&count=5')
  )

  // let a = 3

  // let b: boolean = a

  // console.log(b)

  console.log('hello')

  return (
    <div>
      <Alert color="warning">Warning! This is my first MUI component instance :)</Alert>
      <br />
      <br />
      <div>This is a random response to test react query and axios: {data?.data}</div>
      <br />
      <br />
      <Link to="/somepage">Let's test this dom router.</Link>
    </div>
  )
}
