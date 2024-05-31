import { Typography } from '@mui/material';
import { Gauge, gaugeClasses  } from '@mui/x-charts/Gauge';



export default function Traffic() {
  return (
    <>
    <Typography>
        Monthly Traffic
    </Typography>
    <Gauge
    height={150}
    value={48}
    startAngle={-110}
    endAngle={110}
  sx={{
    [`& .${gaugeClasses.valueText}`]: {
      fontSize: 30,
      transform: 'translate(0px, 0px)',
    },
  }}
  text={
     ({ value, valueMax }) => `${value} / ${valueMax}`
  }
/>
</>
  );
}



