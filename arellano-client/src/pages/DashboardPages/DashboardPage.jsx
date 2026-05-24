import { useLocation } from "react-router-dom";
import { BarChart } from "@mui/x-charts/BarChart";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Typography, Card, CardContent } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First Name", width: 150, editable: true },
  { field: "lastName", headerName: "Last Name", width: 150, editable: true },
  { field: "age", headerName: "Age", type: "number", width: 110, editable: true },
  {
    field: "fullName",
    headerName: "Full Name",
    sortable: false,
    width: 160,
    valueGetter: (value, row) =>
      `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, firstName: "Beatrice", lastName: "Kristi", age: 23 },
  { id: 2, firstName: "Claire", lastName: "Cottrill", age: 25 },
  { id: 3, firstName: "Phoebe", lastName: "Bridgers", age: 30 },
  { id: 4, firstName: "Mitski", lastName: "Miyawaki", age: 33 },
  { id: 5, firstName: "Faye", lastName: "Webster", age: 26 },
  { id: 6, firstName: "Daniel", lastName: "Caesar", age: 29 },
  { id: 7, firstName: "Steve", lastName: "Lacy", age: 26 },
  { id: 8, firstName: "Frank", lastName: "Ocean", age: 36 },
  { id: 9, firstName: "Laufey", lastName: "Lin", age: 24 },
  { id: 10, firstName: "Niki", lastName: "Zefanya", age: 25 },
  { id: 11, firstName: "Keshi", lastName: "Ho", age: 29 },
  { id: 12, firstName: "Sabrina", lastName: "Carpenter", age: 24 },
  { id: 13, firstName: "Arlo", lastName: "Parks", age: 24 },
  { id: 14, firstName: "Brent", lastName: "Faiyaz", age: 28 },
  { id: 15, firstName: "Joji", lastName: "Miller", age: 31 },
];


const clubs = [
  "Arsenal","Liverpool","Man Utd","Tottenham","Everton","Sunderland",
  "Newcastle","Nottingham Forest","Leeds","Man City","West Ham",
  "Burnley","Fulham","Chelsea","Aston Villa","Wolves","Crystal Palace",
  "Brentford","Bournemouth","Brighton",
];

const netSpendInPounds = [
  251.4, 235, 166.9, 137.8, 116, 113.4, 95.6, 95.4, 91.5, 80.2,
  69.7, 57.8, 18.93, 9.5, -8, -14.7, -23, -58.9, -63.3, -68.15,
];

const dashboardCardSx = {
  borderRadius: 3,
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
  transition: "0.3s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
  },
  p: 2,
};

function DashboardPage() {
  const location = useLocation();

  return (
    <>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontFamily: "'Lexend', sans-serif", fontWeight: 600, color: "#13220d", }}
      >
        Dashboard Summary ˚˖𓍢ִ໋🧚🏻‍♀️₊
      </Typography>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 3 }}>
        <Card
          sx={{
            ...dashboardCardSx,
            flex: 1,
            background: "linear-gradient(135deg, #13220d, #1f3a18)",
            color: "#fff",
          }}
        >
          <CardContent>
            <Typography sx={{ opacity: 0.8 }}>Total Users</Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
              {rows.length}
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            ...dashboardCardSx,
            flex: 1,
            background: "linear-gradient(135deg, #dfb2b9, #f3d6db)",
          }}
        >
          <CardContent>
            <Typography sx={{ opacity: 0.8 }}>Average Age</Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", mt: 1 }}>
              {(
                rows.reduce((sum, r) => sum + (r.age || 0), 0) /
                rows.filter((r) => r.age !== null).length
              ).toFixed(1)}
            </Typography>
          </CardContent>
        </Card>
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ mb: 3 }}>

        {/* BAR CHART */}
        <Card
          sx={{
            ...dashboardCardSx,
            flex: 2,
            p: 2,
            height: "100%",
            overflow: "hidden",
          }}
        >
          <Typography
            sx={{
              mb: 2,
              fontWeight: 600,
              fontFamily: "'Lexend', sans-serif",
              color: "#13220d",
            }}
          >
            Premier League Net Spend
          </Typography>

          <Box sx={{ width: "100%", overflowX: "auto" }}>
            <BarChart
              height={420}
              margin={{
                top: 20,
                right: 20,
                bottom: 90,
                left: 60,
              }}
              xAxis={[
                {
                  data: clubs,
                  scaleType: "band",

                  tickLabelStyle: {
                    angle: -35,
                    textAnchor: "end",
                    fontSize: 11,
                    fontFamily: "'Lexend', sans-serif",
                  },
                },
              ]}
              yAxis={[
                {
                  width: 60,

                  valueFormatter: (v) =>
                    v < 0 ? `-£${Math.abs(v)}m` : `£${v}m`,

                  tickLabelStyle: {
                    fontFamily: "'Lexend', sans-serif",
                    fontSize: 11,
                  },
                },
              ]}
              series={[
                {
                  data: netSpendInPounds,

                  valueFormatter: (v) =>
                    v < 0 ? `-£${Math.abs(v)}m` : `£${v}m`,

                  color: "#6B8754",
                },
              ]}
              borderRadius={6}
              grid={{ horizontal: true }}
              sx={{
                "& .MuiChartsAxis-line": {
                  stroke: "#d4d4d8",
                },

                "& .MuiChartsAxis-tick": {
                  stroke: "#d4d4d8",
                },

                "& .MuiChartsGrid-line": {
                  stroke: "rgba(0,0,0,0.08)",
                  strokeDasharray: "4 4",
                },

                "& .MuiBarElement-root": {
                  fill: "#6B8754",
                  filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.15))",
                  transition: "0.25s ease",
                },

                "& .MuiBarElement-root:hover": {
                  fill: "#4b6337",
                },

                "& .MuiChartsAxis-tickLabel": {
                  fill: "#18181b",
                  fontFamily: "'Lexend', sans-serif",
                },
              }}
            />
          </Box>
        </Card>

          {/* PIE CHART */}
            <Card
              sx={{
                flex: 1,
                borderRadius: 3,
                p: 2,
                height: "100%",
                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
                transition: "0.3s",

                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                },
              }}
            >
              <Typography
                sx={{
                  mb: 2,
                  fontWeight: 600,
                  fontFamily: "'Lexend', sans-serif",
                  color: "#13220d",
                }}
              >
                Category Share
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  flex: 1,
                }}
              >
              <PieChart
                  width={250}
                  height={250}
                  series={[
                    {
                      innerRadius: 45,
                      outerRadius: 90,
                      paddingAngle: 2,
                      cornerRadius: 5,

                      data: [
                        { id: 0, value: 60, label: "A", color: "#6B8754" },
                        { id: 1, value: 80, label: "B", color: "#e48c9d" },
                        { id: 2, value: 20, label: "C", color: "#f5c16c" },
                        { id: 3, value: 10, label: "D", color: "#8b5cf6" },
                      ],
                    },
                  ]}
                  slotProps={{
                    legend: {
                      labelStyle: {
                        fontFamily: "'Lexend', sans-serif",
                        fontSize: 12,
                      },
                    },
                  }}
                />
              </Box>
            </Card>
          </Stack>

      <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems="stretch">

        {/* DATA GRID */}
        <Card sx={{ ...dashboardCardSx, flex: 1 }}>
          <Typography sx={{ mb: 2, fontWeight: 600 }}>
            User Overview
          </Typography>

          <Box sx={{ height: 420, borderRadius: 2, overflow: "hidden" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSizeOptions={[5, 10]}
              initialState={{
                pagination: { paginationModel: { pageSize: 5 } },
              }}
              checkboxSelection
              disableRowSelectionOnClick
              sx={{
                border: "none",
                fontFamily: "'Lexend', sans-serif",

                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#13220d",
                  color: "#fff",
                },

                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: "#13220d",
                },

                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            />
          </Box>
        </Card>

        {/* MAP */}
        <Card sx={{ ...dashboardCardSx, flex: 1 }}>
          <Typography sx={{ mb: 2, fontWeight: 600 }}>
            Location Map
          </Typography>

          <Box sx={{ height: 420, borderRadius: 2, overflow: "hidden" }}>
            <MapContainer
              center={[14.604253, 120.994314]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[14.604253, 120.994314]}>
                <Popup>
                  National University-Manila <br />
                  <i>551 F Jhocson St</i>
                </Popup>
              </Marker>
            </MapContainer>
          </Box>
        </Card>

      </Stack>
    </>
  );
}

export default DashboardPage;