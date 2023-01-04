import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { MouseEvent, useContext } from 'react'
import { AuthContext } from 'providers/authentication/AuthenicationProvider'

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
)

interface CardMainProps {
  color: string
  logInParent: (ev: MouseEvent<HTMLButtonElement>) => void
}

export const CardMain = (props: CardMainProps) => {
  const { color, logInParent } = props

  const { isAuth, toggleAuth } = useContext(AuthContext)

  return (
    <Card sx={{ minWidth: 275, backgroundColor: { color } }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="div">
          be{bull}nev{bull}o{bull}lent
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={logInParent} id={color}>
          Log to Parent
        </Button>
      </CardActions>
    </Card>
  )
}
