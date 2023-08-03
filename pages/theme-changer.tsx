import { useState, ChangeEvent, useEffect, FC } from 'react'
import { GetServerSideProps } from 'next'
import {
  Card,
  CardContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from '@mui/material'
import Cookies from 'js-cookie'
import axios from 'axios'

import { Layout } from '@/components/layouts'

interface Props {
  theme: string
}

const ThemeChangerPage: FC<Props> = ({ theme }) => {
  const [currentTheme, setCurrentTheme] = useState(theme)

  const onThemeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedTheme = e.target.value
    setCurrentTheme(selectedTheme)
    localStorage.setItem('theme', selectedTheme)
    // Las cookies son enviadas al backend en request time
    Cookies.set('theme', selectedTheme)
  }

  useEffect(() => {
    localStorage.getItem('theme')
  }, [])

  const onClick = async () => {
    const { data } = await axios.get('/api/hello')
  }

  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel> Tema </FormLabel>
            <RadioGroup value={currentTheme} onChange={onThemeChange}>
              <FormControlLabel
                value='light'
                control={<Radio />}
                label='Light'
              />
              <FormControlLabel value='dark' control={<Radio />} label='Dark' />
              <FormControlLabel
                value='custom'
                control={<Radio />}
                label='Custom'
              />
            </RadioGroup>
          </FormControl>

          <Button onClick={onClick}>Solicitud</Button>
        </CardContent>
      </Card>
    </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const theme = req.cookies.theme || 'dark'

  const validThemes = ['light', 'dark', 'custom']

  return {
    props: {
      theme: validThemes.includes(theme) ? theme : 'dark',
    },
  }
}

export default ThemeChangerPage
