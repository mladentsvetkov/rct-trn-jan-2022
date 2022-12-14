import { Box, Grid, Typography, CircularProgress, Alert, Button } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import axiosInstanceLocal from 'axiosLocal'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const JokesSearch = () => {
  const [search, setSearch] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [jokes, setJokes] = useState<{ text: string; id: string }[]>([])
  const [randomJoke, setRandomJoke] = useState('')
  const [isError, setIsError] = useState(false)

  const getCategories = async () => {
    const response = await axiosInstanceLocal('/categories')
    const data: string[] = response.data

    setCategories(data) // remove this!!!!
    return data
  }

  const getRandomPerCategory = async (category: string) => {
    const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${category}`)
    const data: {
      categories: string[]
      created_at: string
      icon_url: string
      id: string
      updated_at: string
      url: string
      value: string
    } = await response.json()

    setRandomJoke(data.value)
  }

  const searchJokeByText = async (query: string) => {
    const response = await fetch(`https://api.chucknorris.io/jokes/search?query=${query}`)
    const data: {
      total: number
      result: {
        categories: string[]
        created_at: string
        icon_url: string
        id: string
        updated_at: string
        url: string
        value: string
      }[]
    } = await response.json()
    const { result } = data
    const jokes = result.map((joke) => ({ text: joke.value, id: joke.id }))
    setJokes(jokes)
  }

  useEffect(() => {
    getCategories()
  }, [])

  const {
    data: queryData,
    isError: queryIsError,
    isLoading: queryIsLoading,
    isFetching: queryIsFetching,
    refetch: queryRefetch,
  } = useQuery(['getJokesUniqueKey'], getCategories, {
    retry: false,
    enabled: false,
    onSuccess: () => toast.success('Yessss!'),
    onError: () => toast.warn('Noooo!'),
    onSettled: () => toast.info('Whatever....'),
    refetchOnWindowFocus: false,
    select: (data) => {
      console.log(data)
      console.log(' i take the response data and map it to ui model')
      return data
    },
  })

  useEffect(() => {
    if (search.length >= 3) {
      searchJokeByText(search)
    }
  }, [search])

  useEffect(() => {
    if (selectedCategory.length > 0) {
      getRandomPerCategory(selectedCategory)
    }
  }, [selectedCategory])

  return (
    <Box padding={'10rem'}>
      <Button onClick={() => queryRefetch()}>Refetch</Button>
      {(queryIsLoading || queryIsFetching) && <CircularProgress />}
      {queryIsError && <Alert severity="error">This is an error alert ??? check it out!</Alert>}
      {!queryIsLoading && !queryIsFetching && !queryIsError && queryData && queryData.length}
      <form
        style={{ display: 'flex', gap: '50px', alignItems: 'center', fontSize: '24px' }}
        onSubmit={(ev) => {
          ev.preventDefault()
          if (search.length >= 3) {
            searchJokeByText(search)
          }
          if (selectedCategory.length > 0) {
            getRandomPerCategory(selectedCategory)
          } else {
            setRandomJoke('')
          }
        }}
      >
        <label htmlFor="search" style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '24px' }}>
          Search
          <input
            id="search"
            value={search}
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            style={{ fontSize: '24px' }}
          />
        </label>
        <label
          htmlFor="selectedCategory"
          style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '24px' }}
        >
          Category
          <select
            style={{ fontSize: '24px' }}
            id="selectedCategory"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value)
              setSearch('')
            }}
          >
            <option />
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <button style={{ fontSize: '24px' }}>Submit</button>
      </form>
      {isError ? (
        <p>Error!</p>
      ) : (
        <Box display={'flex'} flexDirection={'column'} gap="10px">
          <Typography variant="h4">Random joke per category:</Typography>
          <Typography variant="h5">{randomJoke}</Typography>
          <Typography variant="h4">Jokes search result:</Typography>
          <ul>
            {jokes.map((joke) => (
              <li key={joke.id}>
                <Typography variant="h5">{joke.text}</Typography>
              </li>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  )
}
