import { ThemeProvider } from '@emotion/react'
import React, { ReactNode } from 'react'
import { createTheme } from '@mui/material'

interface ThemeProviderProps {
  children: ReactNode
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ff4400',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderRadius: '20px',
        },
      },
    },
  },
})

export const Theme = (props: ThemeProviderProps) => <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
