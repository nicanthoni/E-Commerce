
import { BarChart } from '@mui/x-charts';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const dataset = [
  {
    apparel: 59,
    other: 106,
    month: 'Jan',
  },
  {
    apparel: 50,
    other: 207,
    month: 'Fev',
  },
  {
    apparel: 47,
    other: 99,
    month: 'Mar',
  },
  {
    apparel: 54,
    other: 129,
    month: 'Apr',
  },
  {
    apparel: 57,
    other: 185,
    month: 'May',
  },
  {
    apparel: 60,
    other: 202,
    month: 'June',
  },
  {
    apparel: 59,
    other: 234,
    month: 'July',
  },
  {
    apparel: 65,
    other: 197,
    month: 'Aug',
  },
  {
    apparel: 51,
    other: 162,
    month: 'Sept',
  },
  {
    apparel: 60,
    other: 247,
    month: 'Oct',
  },
  {
    apparel: 67,
    other: 210,
    month: 'Nov',
  },
  {
    apparel: 61,
    other: 300,
    month: 'Dec',
  },
];

const valueFormatter = (value) => `${value} units`;

export default function MonthlySales() {
  return (
    <BarChart
      height={300}
      dataset={dataset}
      yAxis={[{ label: 'units sold'}]}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'apparel', label: 'Apparel', valueFormatter },
        { dataKey: 'other', label: 'Other', valueFormatter },
      ]}
      sx={{sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
          transform: 'translate(-12px, 0)',
        },
      },}}
    />
  );
}
