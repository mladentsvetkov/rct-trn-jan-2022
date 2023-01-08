import { Rating, Typography, Box } from '@mui/material'
import CatsContainer from 'components/CatsContainer/CatsContainer'
import { useState, useContext } from 'react'
import { CatsContext } from './CatsStore'

export const SomePage = () => {
  const [value, setValue] = useState<number | null>(2)
  const { state, dispatch } = useContext(CatsContext)

  return (
    <>
      <Box>
        <Typography component="legend">Controlled</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
        />
        <Typography component="legend">Read only</Typography>
        <Rating name="read-only" value={value} readOnly />
        <Typography component="legend">Disabled</Typography>
        <Rating name="disabled" value={value} disabled />
        <Typography component="legend">No rating given</Typography>
        <Rating name="no-value" value={null} />
      </Box>
      <Box>
        <CatsContainer state={state} dispatch={dispatch} />
      </Box>
    </>
  )
}
