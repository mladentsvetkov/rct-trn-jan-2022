import { styled } from '@mui/material/styles'
import { RadioGroup } from '@mui/material'
import { ReactNode } from 'react'

const StyledComponent = styled(RadioGroup)(({ theme }) => ({
  width: '250px',
  color: theme.palette.action.active,
  '& .MuiFormControlLabel-label': {
    fontStyle: 'italic',
  },
}))

export const StyledRadioGroup = ({ children }: { children: ReactNode }) => {
  return <StyledComponent>{children}</StyledComponent>
}
