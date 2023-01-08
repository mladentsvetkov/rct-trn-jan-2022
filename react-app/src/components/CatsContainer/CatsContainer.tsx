import { Box, Button, Container, ImageList, ImageListItem, TextField } from '@mui/material'
import { Dispatch } from 'react'
import { Actions, ActionType, State } from 'pages/CatsStore'

const CatsContainer = ({ state, dispatch }: { state: State; dispatch: Dispatch<Actions> }) => (
  <Container sx={{ margin: '30px' }}>
    <Box width={'20rem'} component="form" display="flex" gap="1rem" noValidate autoComplete="off">
      <TextField
        value={state.query.limit}
        type={'number'}
        id="limit"
        label="How many cats?"
        variant="outlined"
        onChange={(ev) =>
          dispatch({
            type: ActionType.updateQuery,
            payload: { newQuery: { ...state.query, limit: Number(ev.target.value) } },
          })
        }
      />
      <Button variant="outlined" onClick={() => dispatch({ type: ActionType.deleteData })}>
        Delete them cats!
      </Button>
    </Box>
    <ImageList sx={{ width: 600, height: 600 }} cols={3} rowHeight={200}>
      {state.data.map((item) => (
        <ImageListItem key={item.id}>
          <img src={item.url} alt={item.title} loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  </Container>
)

export default CatsContainer
