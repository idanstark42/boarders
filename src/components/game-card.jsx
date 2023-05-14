import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'


export default function GameCard({ game, editable }) {
  return <Card sx={{ minWidth: 275 }}>
    <CardContent>
      <Typography variant='h5' component='div'>
        {game.name}
      </Typography>
      <Typography sx={{ mb: 1.5 }} color='text.secondary'>
      </Typography>
      <Typography variant='body2'>
        {game.description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size='small'>Learn More</Button>
    </CardActions>
  </Card>
}