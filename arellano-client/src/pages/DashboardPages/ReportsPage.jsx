import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { LineChart } from '@mui/x-charts/LineChart';
import { Gauge } from "@mui/x-charts/Gauge";
import { PieChart } from "@mui/x-charts/PieChart";
import { DataGrid } from "@mui/x-data-grid";
import PrintIcon from "@mui/icons-material/Print";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";


const columns = [
  { field: "id", headerName: "ID", width: 80 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    sortable: false,
    width: 160,
      valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35, category: "sales" },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42, category: "users" },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45, category: "finance" },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16, category: "sales" },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 22, category: "users" },
  { id: 6, lastName: "Melisandre", firstName: "Melisandre", age: 150, category: "finance" },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44, category: "sales" },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36, category: "users" },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65, category: "finance" },
];


const ReportsPage = () => {
  const printRef = useRef(null);

  const [color, setColor] = useState("#a78bfa");
  const handleChange = (event, newColor) => {
    if (newColor) setColor(newColor);
  };
    const handleGenerate = () => {
    console.log("Generate clicked");
  };

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open("", "_blank", "width=1200,height=900");
    if (!printWindow) return;

    const headMarkup = Array.from(
      document.querySelectorAll('style, link[rel="stylesheet"]')
    )
      .map((node) => node.outerHTML)
      .join("");

    const exportedAt = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date());

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Reports</title>
          ${headMarkup}
          <style>
     {/Enhancement 1: Create and design a your printing pdf based on you Laboratory 5 ReportsPage design.}
      @page {
          size: A4;
          margin: 14mm;
        }

        body {
          margin: 0;
          font-family: "Lexend", Arial, sans-serif;
          background: linear-gradient(135deg, #fdfbff, #f3f0ff);
          color: #2e2a3b;
        }

        /* Soft magical background glow */
        .report-shell {
          padding: 28px;
          border-radius: 18px;
          background: radial-gradient(circle at top, #ffffff 0%, #f7f4ff 60%, #efeaff 100%);
        }

        /* Header fairy vibe */
        .report-header {
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(180, 160, 255, 0.4);
        }

        .report-header h1 {
          margin: 0 0 6px;
          font-size: 30px;
          font-weight: 800;
          letter-spacing: 0.5px;
          background: linear-gradient(90deg, #7c5cff, #c084fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .report-header p {
          margin: 0;
          font-size: 13px;
          color: #6b5f8a;
        }

        /* Cards soft fairy glow */
        .report-content .MuiCard-root {
          border-radius: 16px !important;
          box-shadow: 0 10px 30px rgba(140, 120, 255, 0.15) !important;
          border: 1px solid rgba(200, 180, 255, 0.3);
          break-inside: avoid;
          page-break-inside: avoid;
          background: #ffffff;
        }

        /* Charts clean & soft */
        .report-content svg {
          max-width: 100%;
        }

        /* Subtle sparkle effect */
        .report-shell::before {
          content: "";
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.08;
          background-image: radial-gradient(#c084fc 1px, transparent 1px);
          background-size: 20px 20px;
          pointer-events: none;
        }
          </style>
        </head>
        <body>
          <div class="report-shell">
            <div class="report-header">
              <h2>Reports Summary</h2>
              <p>Exported: ${exportedAt}</p>
            </div>
            ${printContent.outerHTML}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <Box>
      {/* HEADER */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Lexend', sans-serif",
              fontSize: 32,
              fontWeight: 500,
            }}
          >
            Reports
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontFamily: "'Lexend', sans-serif" }}>
            Analytics overview with charts, data, and export features.
          </Typography>
        </Box>
      <Stack direction="row" spacing={1.5} sx={{ flexWrap: "wrap" }}>
        <Button
          size="small"
          variant="contained"
          onClick={handleGenerate}
          sx={{
            flex: 1,
            minWidth: 100,
            textTransform: "none",
            py: 2,
            fontSize: 14,
            fontFamily: "'Lexend', sans-serif",
            borderRadius: 2,
            background: "linear-gradient(180deg, #6B8754, #5f575b)",
            boxShadow: "0 0 10px rgba(167, 139, 250, 0.35)",
            color: "#fff",
            transition: "0.2s ease",
            "&:hover": {
              boxShadow: "0 0 16px rgba(167, 139, 250, 0.55)",
              transform: "translateY(-1px)",
            },
          }}
        >
          Generate
        </Button>

        <Button
          size="small"
          variant="outlined"
          startIcon={<PrintIcon fontSize="small" />}
          onClick={handlePrint}
          sx={{
            flex: 1,
            minWidth: 150,
            textTransform: "none",
            py: 2,
            fontSize: 14,
            fontFamily: "'Lexend', sans-serif",
            borderRadius: 2,
            color: "#e9e3ff",
            borderColor: "rgba(167, 139, 250, 0.6)",
            background: "rgba(30, 24, 44, 0.4)",
            backdropFilter: "blur(6px)",
            transition: "0.2s ease",
            "&:hover": {
              borderColor: "#a78bfa",
              boxShadow: "0 0 14px rgba(167, 139, 250, 0.4)",
              transform: "translateY(-1px)",
            },
          }}
        >
          Export
        </Button>
        <Button 
       size="small"
          variant="contained"
          onClick={handleGenerate}
          sx={{
            flex: 1,
            minWidth: 100,
            textTransform: "none",
            py: 2,
            fontSize: 14,
            fontFamily: "'Lexend', sans-serif",
            borderRadius: 2,
            background: "linear-gradient(180deg, #6B8754, #5f575b)",
            boxShadow: "0 0 10px rgba(167, 139, 250, 0.35)",
            color: "#fff",
            transition: "0.2s ease",
            "&:hover": {
              boxShadow: "0 0 16px rgba(167, 139, 250, 0.55)",
              transform: "translateY(-1px)",
            },
          }}
        >
          Filter
        </Button>
      </Stack>
    </Stack>
            
      {/* CONTENT */}
      <Stack ref={printRef} spacing={3}>
      {/* DATA TABLE */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontFamily: "'Lexend', sans-serif", color: "#3f3f46", fontWeight: 500 }}>
              Reports
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: "'Lexend', sans-serif"}}>
              Report Analytics overview showing generated reports,
              category breakdown, and current completion performance.
            </Typography>
          </CardContent>
        </Card>
        {/* LINE CHART */}
        <Stack direction="column" spacing={2}>
          <LineChart
            height={300}
            xAxis={[{ scaleType: "point", data: ["Mon", "Tue", "Wed", "Thu", "Fri"] }]}
            series={[
              {
                data: [15, 23, 18, 19, 13],
                label: "Example Series",
                color: color,
                showMark: true,
              },
            ]}
            sx={{
              "& .MuiLineElement-root": {
                strokeWidth: 3,
                filter: "drop-shadow(0px 0px 6px rgba(167,139,250,0.8))",
              },
            }}
          />
          <ToggleButtonGroup value={color} exclusive onChange={handleChange}>
            {["#e48c9d", "#250315", "#fffb00", "#ff0000"].map((value) => (
              <ToggleButton key={value} value={value} sx={{ p: 1 }}>
                <div
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: "100%",
                    backgroundColor: value,
                  }}
                />
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Stack>
        {/* CHART ROW */}
        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          {/* PIE */}
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6">Category Share</Typography>

              <PieChart
                series={[
                  {
                    data: [
                      { id: 1, value: 14, label: "Sales" },
                      { id: 2, value: 10, label: "Users" },
                      { id: 3, value: 8, label: "Inventory" },
                      { id: 4, value: 6, label: "Finance" },
                    ],
                  },
                ]}
                width={280}
                height={220}
              />
            </CardContent>
          </Card>

          {/* GAUGE */}
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6">Completion Rate</Typography>

              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Gauge width={180} height={180} value={78} />
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ReportsPage;