import { RadioGroup, FormControlLabel, Radio, Box } from '@mui/material'
import { StyledRadioGroup } from 'components/StyledComponent'

const MuiDemo = () => (
  <Box display="flex">
    <RadioGroup>
      <FormControlLabel value="female" control={<Radio />} label="Female" />
      <FormControlLabel value="male" control={<Radio />} label="Male" />
      <FormControlLabel value="other" control={<Radio />} label="Other" />
    </RadioGroup>
    <StyledRadioGroup>
      <FormControlLabel value="female" control={<Radio />} label="Female" />
      <FormControlLabel value="male" control={<Radio />} label="Male" />
      <FormControlLabel value="other" control={<Radio />} label="Other" />
    </StyledRadioGroup>
  </Box>
)

export default MuiDemo
