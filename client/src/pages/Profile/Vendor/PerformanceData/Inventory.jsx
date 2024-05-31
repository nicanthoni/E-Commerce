
import { PieChart } from '@mui/x-charts/PieChart';

export default function VendorInventory() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 50, label: 'Inventory' },
            { id: 1, value: 5, label: 'In Carts' },
            { id: 2, value: 17, label: 'In Wishlists' },
          ],
        },
      ]}
    />
  );
}
