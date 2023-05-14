import { useState } from 'react'
import Input from './input'

export default function SearchBar () {
    const [query, setQuery] = useState('')
    const [filter, setFilters] = useState(DEFAULT_FILTERS)

    return <div>
        <Input label='Search' value={query} onChange={setQuery} />
        {/* <Input label='Age' value={filter.age} type='range' onChange={setFilters} /> */}
        {/* <Input label='Players' value={filter.players} type='range' onChange={setFilters} /> */}
        {/* <Input label='Duration' value={filter.duration} type='range' onChange={setFilters} /> */}
        {/* <Input label='Type' value={filter.type} type='enum' onChange={setFilters} /> */}
        {/* <Input label='Play Type' value={filter.playtype} type={['enum']} onChange={setFilters} /> */}
    </div>
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