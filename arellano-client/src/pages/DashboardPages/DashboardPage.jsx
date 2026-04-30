import { useLocation } from 'react-router-dom';
import { BarChart } from '@mui/x-charts/BarChart';

import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import { Typography, Card, CardContent } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
        field: 'firstName',
        headerName: 'First Name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last Name',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full Name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const clubs = [
  'Arsenal','Liverpool','Man Utd','Tottenham','Everton','Sunderland',
  'Newcastle','Nottingham Forest','Leeds','Man City','West Ham',
  'Burnley','Fulham','Chelsea','Aston Villa','Wolves','Crystal Palace',
  'Brentford','Bournemouth','Brighton',
];

const netSpendInPounds = [
  251.4, 235, 166.9, 137.8, 116, 113.4, 95.6, 95.4, 91.5, 80.2,
  69.7, 57.8, 18.93, 9.5, -8, -14.7, -23, -58.9, -63.3, -68.15,
];

const clubColors = [
  '#EF0107','#C8102E','#DA291C','#132257','#003399','#E03A3E',
  '#241F20','#DD0000','#FFCD00','#6CABDD','#7A263A','#6C1D45',
  '#CC0000','#034694','#670E36','#FDB913','#1B458F','#E30613',
  '#DA291C','#0057B8',
];

function DashboardPage() {
    const location = useLocation();

    return (
        <>
        {/*Enhancement 1: Create and design a DashboardPage for [Overview or Summary]. | DONE */}
            <Typography variant="h4" gutterBottom sx={{ fontFamily: "'Lexend', sans-serif" }}>
                Dashboard
            </Typography>
            {/* Summary Section */}
            <Stack direction={{ xs: 'column', md:'row' }} spacing={2} sx={{ mb: 4 }} display="flex">
                <Card>
                    <CardContent>
                        <Typography variant="h6" fontFamily="'Lexend', sans-serif">
                            Total Users
                        </Typography>
                        <Typography variant="h4" fontFamily="'Lexend', sans-serif">
                            {rows.length}
                        </Typography>
                    </CardContent>
                </Card>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">
                                Average Age
                            </Typography>
                            <Typography variant="h4">
                                {(
                                    rows.reduce((sum, row) => sum + (row.age || 0), 0) /
                                    rows.filter((row) => row.age !== null).length
                                ).toFixed(1)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Stack>

                {/* Charts */}
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ mb: 4 }}>

                {/* BAR CHART CARD */}
                <Card sx={{ p: 2, flex: 2}}>
                    <Typography
                    variant="h6"
                    sx={{
                        mb: 2,
                        fontFamily: "'Lexend', sans-serif",
                        fontWeight: 600,
                    }}
                    >
                    Premier League Net Spend 2025
                    </Typography>

                    <BarChart
                    height={400}
                    xAxis={[
                        {
                        data: clubs,
                        tickLabelStyle: { angle: 45, fontSize: 10 },
                        height: 80,
                        label: 'Clubs',
                        },
                    ]}
                    yAxis={[
                        {
                        width: 50,
                        valueFormatter: (v) =>
                            v < 0 ? `-£${-v}m` : `£${v}m`,
                        },
                    ]}

                    series={[
                    {
                        data: netSpendInPounds,
                        valueFormatter: (v) =>
                        v < 0 ? `-£${-v}m` : `£${v}m`,
                        colorGetter: (params) =>
                        clubColors[params.dataIndex],
                    },
                    ]}
                />

                </Card>
                {/* PIE CHART CARD */}
                <Card sx={{ p: 5, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography
                    variant="h6"
                    sx={{
                        mb: 2,
                        fontFamily: "'Lexend', sans-serif",
                        color: clubColors[14],
                        fontWeight: 500,
                    }}
                    >
                    Distribution
                    </Typography>

                    <PieChart
                    series={[
                        {
                        data: [
                            { id: 0, value: 60, label: "A" },
                            { id: 1, value: 80, label: "B" },
                            { id: 2, value: 20, label: "C" },
                            { id: 3, value: 10, label: "D" },
                        ],
                        },
                    ]}
                    width={250}
                    height={250}
                    margin={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    />
                </Card>

                </Stack>
                {/* DataGrid */}
                <Typography variant="h5" gutterBottom sx={{ fontFamily: "'Lexend', sans-serif" }}>
                    User Overview
                </Typography>
                <Box sx= {{
                    height: 420,
                    width: '100%',
                    borderRadius: 4,
                    boxShadow: '0 8px 30px rgb(8, 4, 8)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    overflow: 'hidden',
                }}
                >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: {
                        pageSize: 5,
                        },
                    },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick

                    sx={{
                    border: 'none',
                    fontFamily: "'Lexend', sans-serif",
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: 'rgba(167,139,250,0.2)',
                        color: '#5b21b6',
                        fontWeight: 'bold',
                        borderBottom: 'none',
                    },
                    }}
                />
                </Box>
                
                {/* React Leaflet Map */}
                <Typography variant="h5" gutterBottom sx={{ mt: 4, fontFamily: "'Lexend', sans-serif" }}>
                    Location Map
                </Typography>
                <Box sx={{ height: 500, width: '100%' }}>
                    <MapContainer center={[14.604253, 120.994314]} zoom={13} style={{ height: '100%', width: '100%' }}>

                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[14.604253, 120.994314]}>
                            <Popup>
                                National University-Manila <br /> 
                                <p><i>551 F Jhocson St, Sampaloc, Manila 1008 Metro Manila</i></p>
                            </Popup>
                        </Marker>
                    </MapContainer>
                </Box>
            </>
        );
    }

export default DashboardPage;

                            
    