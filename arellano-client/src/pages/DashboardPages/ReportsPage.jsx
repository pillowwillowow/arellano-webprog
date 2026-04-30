import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

{/*Enhancement 2: Create and design a ReportsPage for [Charts or Data Visualization]. | DONE */}
const Tableau10 = [
  '#fcfdff',
  '#87ffef',
  '#ff0004',
  '#ff0077',
  '#30ff15',
  '#ffc800',
  'rgb(0, 0, 0)',
  '#ffffff',
];

const chartsParams = {
  height: 300,
};
export default function BasicColor() {
  const [color, setColor] = React.useState('#050708');

  const handleChange = (event, nextColor) => {
    setColor(nextColor);
  };

  return (
    <Stack direction="column" spacing={2}>
      <LineChart
        {...chartsParams}
        series={[
          {
            data: [15, 23, 18, 19, 13],
            label: "Example Series",
            color,
            showMark: true,
           lineStyle: {
            strokeWidth: 10,
            filter: "drop-shadow(0px 0px 6px rgba(167,139,250,0.8))",
          },
          markSize: 7,
          },
        ]}  
      />
      <ToggleButtonGroup value={color} exclusive onChange={handleChange}>
        {Tableau10.map((value) => (
          <ToggleButton key={value} value={value} sx={{ p: 6 }}>
            <div
              style={{
                width: 15,
                height: 15,
                backgroundColor: value,
                display: 'inline-block',
              }}
            />
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
}
