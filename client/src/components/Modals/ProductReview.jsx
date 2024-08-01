import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Rating } from '@mui/material';
import { formatDate } from '../../utils/formatters/formatDate';
import { Typography } from '@mui/material';
import { Link, Stack } from '@mui/material';

// Created for mobile view only (desktop view shows this data without need for mobile)
export default function ProductReviewModal(props) {
  return (
    <>
      <Dialog open={props.modalState} onClose={props.onClose}>
        <Stack p={2} gap={4}>
          <Stack>
            <Typography variant='caption'>
              Reviewed on {formatDate(props.reviewDate)}
            </Typography>
            <Typography variant='caption' color='primary.main'>
              {' '}
              Sold by {''}
              <Link
                variant='caption'
                href='#'
                underline='hover'
                sx={{
                  color: 'primary.main',
                  '&:hover': { color: 'secondary.main' },
                }}
              >
                {props.vendorName}
              </Link>
            </Typography>
          </Stack>

          <Typography variant='body2'>"{props.review}"</Typography>

          <DialogActions>
            <Button
              component={Link}
              href={`/product/${props.id}`}
              variant='contained'
              color='secondary'
              sx={{
                color: 'text.secondary',
                textTransform: 'none',
                textWrap: 'nowrap',
                borderRadius: 6,
                fontWeight: 'bold',
              }}
            >
              Buy Again
            </Button>

            <Button
              variant='contained'
              color='secondary'
              onClick={props.onClose}
              autoFocus
              sx={{
                color: 'text.secondary',
                textTransform: 'none',
                textWrap: 'nowrap',
                borderRadius: 6,
                fontWeight: 'bold',
              }}
            >
              Edit Review
            </Button>
          </DialogActions>
        </Stack>
      </Dialog>
    </>
  );
}
