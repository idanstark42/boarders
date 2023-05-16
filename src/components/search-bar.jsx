import { useState } from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import FitlerIcon from '@mui/icons-material/FilterList'
import { Menu, MenuItem } from '@mui/material'

export default function SearchBar () {
    const [query, setQuery] = useState('')
    const [filter, setFilters] = useState(DEFAULT_FILTERS)

    return <Paper elevation={0} sx={styles}>
        <InputBase fullWidth value={query} onChange={e => setQuery(e.target.value)} />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
        </IconButton>
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <FitlerIcon />
        </IconButton>
    </Paper>
}

const styles = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '0.5rem 1rem',
    border: '1px solid #ccc',
}

const DEFAULT_FILTERS = {
    age: {
        min: 0,
        max: 99
    },
    players: {
        min: 0,
        max: 99
    },
    duration: {
        min: 0,
        max: 99
    },
    type: [],
    playtype: []
}