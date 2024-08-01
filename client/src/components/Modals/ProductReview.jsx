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

// Created for mobile view only (desktop view shows this data without need for mobile)
export default function ProductReviewModal(props) {
  return (
    <>
      <Dialog open={props.modalState} onClose={props.onClose}>
        <DialogTitle id='responsive-dialog-title'>
          <Rating value={props.rating} />
        </DialogTitle>
        <DialogContentText variant='caption' color='text.primary'>
          <Typography
            component='span'
            variant='caption'
            sx={{ fontWeight: 'bold', paddingLeft: 1 }}
          >
            Review:
          </Typography>{' '}
          "{props.review}"
        </DialogContentText>
        <DialogContentText variant='caption' color='text.primary'>
          <Typography
            component='span'
            variant='caption'
            sx={{ fontWeight: 'bold', paddingLeft: 1 }}
          >
            Date of review:
          </Typography>{' '}
          {formatDate(props.reviewDate)}
        </DialogContentText>
        <DialogActions>
          <Button
            variant='contained'
            autoFocus
            onClick={props.onClose}
            color='grey'
            sx={{
              textTransform: 'none',
              backgroundColor: 'white.main',
              color: 'primary.main',
            }}
          >
            Close
          </Button>

          {/*  Necessary? Should anyone be able to update a review? */}
          <Button
            variant='contained'
            onClick={props.onClose}
            autoFocus
            sx={{ textTransform: 'none' }}
          >
            Edit Review
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
