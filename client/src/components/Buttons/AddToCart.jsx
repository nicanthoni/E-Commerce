import { Button } from '@mui/material'

export default function AddToCart () {
    return (
        <Button
              variant='contained'
              color='secondary'
              sx={{
                color: 'primary.main',
                textTransform: 'none',
              }}
            >
              Add to cart
            </Button>
    )
}