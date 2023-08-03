import { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider, CssBaseline, Theme } from '@mui/material'
import '@/styles/globals.css'
import { customTheme, darkTheme, lightTheme } from '@/themes'
import Cookies from 'js-cookie'

interface Props extends AppProps {
  theme: string
}

export default function App({ Component, pageProps, theme }: Props) {
  const [currentTheme, setCurrentTheme] = useState(lightTheme)

  useEffect(() => {
    const cookieTheme = Cookies.get('theme') || 'light'
    const selectedTheme: Theme =
      cookieTheme === 'light'
        ? lightTheme
        : cookieTheme === 'dark'
        ? darkTheme
        : customTheme

    setCurrentTheme(selectedTheme)
  }, [])

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
