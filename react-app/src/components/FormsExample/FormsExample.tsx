import React from 'react'
import { useForm } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

type FormDataType = {
  name: string
  email: string
  age: number
  otherThings: string
}

export const FormsExample = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormDataType>()

  const submitData = (data: FormDataType) => {
    console.log('submit')
    console.log(data)
  }

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit(submitData)}>
      <Grid container spacing={2}>
        <Grid item xs={5} md={5}>
          <TextField
            fullWidth
            required
            label="Name"
            variant="outlined"
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register('name', {
              required: { value: true, message: 'Name is required' },
              maxLength: { value: 10, message: 'Your name is too long' },
            })}
          />
        </Grid>

        <Grid item xs={5} md={5}>
          <TextField
            fullWidth
            required
            label="Email"
            variant="outlined"
            {...register('email', {
              required: {
                value: true,
                message: 'Email is required',
              },
              pattern: {
                value: /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,4}$/,
                message: 'Invalid email',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>

        <Grid item xs={2} md={2}>
          <TextField
            fullWidth
            type="number"
            label="Age"
            variant="outlined"
            {...register('age', {
              valueAsNumber: true,
              pattern: {
                value: /^[0-9]+$/,
                message: 'Invalid age',
              },
            })}
            error={!!errors.age}
            helperText={errors.age?.message}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            multiline
            label="Other things"
            variant="outlined"
            {...register('otherThings', {
              maxLength: { value: 200, message: 'Max limit is 200 characters' },
            })}
            error={!!errors.otherThings}
            helperText={errors.otherThings?.message}
          />
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button onClick={() => reset()}>Reset</Button>
        <Button type="submit" sx={{ margin: '0 8px' }} variant="contained" disableRipple>
          Submit
        </Button>
      </Box>
    </form>
  )
}
