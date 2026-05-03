import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { Gauge } from "@mui/x-charts/Gauge";
import { PieChart } from "@mui/x-charts/PieChart";
import PrintIcon from "@mui/icons-material/Print";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";


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
          html, body {
          height: auto;
        }

        .report-shell {
          background: #6B8754 !important;
          -webkit-print-color-adjust: exact;
        }

        * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

        .report-shell {
          padding: 16px;
          border-radius: 18px;
          background: radial-gradient(circle at top, #ffffff 0%, #f7f4ff 60%, #efeaff 100%);
        }

        .report-header {
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(180, 160, 255, 0.4);
        }

        .report-header h1 {
          margin: 1 0 6px;
          font-size: 30px;
          color: #ffffff;
          fontFamily: "'Lexend, sans-serif"
          font-weight: 800;
          letter-spacing: 0.5px;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .report-header p {
          margin: 0;
          font-size: 14px;
          color: #ffffff;
          fontFamily: "'Lexend, sans-serif"
        }

        .report-header h2 {
         color: #ffffff;
         font-size: 16px;
         font-weight: 800;
         fontFamily: "'Lexend, sans-serif";

        .report-content .MuiCard-root {
          border-radius: 16px !important;
          box-shadow: 0 10px 30px rgba(6, 1, 34, 0.89) !important;
          border: 1px solid rgba(200, 180, 255, 0.3);
          break-inside: avoid;
          page-break-inside: avoid;
          background: #ffffff;
        }

        .report-content svg {
          max-width: 100%;
        }

        .report-shell::before {
          content: "";
          position: fixed;
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
            Reports ⋆‧°𓏲ּ𝄢⋆˚꩜｡
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontFamily: "'Lexend', sans-serif", textAlign: "center"}}>
            Analytics overview with charts, data, and export features.
          </Typography>
        </Box>
      <Stack direction="row" spacing={1.5} sx={{ flexWrap: "wrap" }}>
        <Button
          size="small"
          variant="contained"
          onClick={handleGenerate}
          sx={{
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
            color: "#ffffff",
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
            
      {/*Enhancement 1: Create and design a your printing pdf based on you Laboratory 5 ReportsPage design. | DONE */}
      {/* CONTENT */}
      <Stack ref={printRef} spacing={3}>

        {/* DATA TABLE HEADER */}
        <Card sx={{borderRadius: 2}} >
          <CardContent>
            <Typography variant="h6" sx={{ color:"#18181b", fontFamily: "'Lexend', sans-serif", fontWeight: 500 }}>
              Reports
            </Typography>
            <Typography variant="body2" color="#18181b">
              Report Analytics overview showing generated reports,
              category breakdown, and current completion performance.
            </Typography>
          </CardContent>
        </Card>

        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>

          {/* LINE CHART */}
          <Card 
          sx={{ 
            flex: 1, 
            p: 2, 
            borderRadius: 2,               
            background: "#e48c9d",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
            },
          }}>
            <Typography variant="h6" sx={{ fontFamily: "'Lexend', sans-serif", fontWeight: 700 }}>
              Trends
            </Typography>
            <LineChart
              height={280}
              xAxis={[{ scaleType: "point", data: ["Mon", "Tue", "Wed", "Thu", "Fri"] }]}
              series={[
                {
                  data: [15, 23, 18, 19, 13],
                  label: "Example Series",
                  showMark: true,
                },
              ]}
              sx={{
                "& .MuiLineElement-root": {
                  strokeWidth: 8,
                  filter: "drop-shadow(0px 0px 6px rgba(26, 15, 59, 0.8))",
                  stroke: color,
                },
              }}
            />
            <ToggleButtonGroup value={color} exclusive onChange={handleChange} sx={{ mt: 2 }}>
              {["#4b6337", "#ff204c", "#fffc46", "#ff0000"].map((value) => (
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
          </Card>

          {/* BAR CHART */}
          <Card sx={{ flex: 1, p: 2, borderRadius: 2}}>
            <Typography variant="h6" sx={{ mb: 2, fontFamily: "'Lexend', sans-serif", fontWeight: 600 }}>
              Premier League Net Spend 2025
            </Typography>

            <BarChart
              height={270}
              xAxis={[{
                data: clubs,
                tickLabelStyle: { angle: 45, fontSize: 12 },
                height: 60,
              }]}
              yAxis={[{
                width: 50,
                valueFormatter: (v) => v < 0 ? `-£${-v}m` : `£${v}m`,
              }]}
              series={[{
                data: netSpendInPounds,
                valueFormatter: (v) => v < 0 ? `-£${-v}m` : `£${v}m`,
                colorGetter: (params) => clubColors[params.dataIndex],
              }]}
            />
          </Card>

        </Stack>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>

          {/* PIE */}
          <Card sx={{ flex: 1, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontFamily: "'Lexend', sans-serif", fontWeight: 600}}>
                Category Share
              </Typography>
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
                width={200}
                height={200}
              />
            </CardContent>
          </Card>

          {/* GAUGE */}
          <Card
            sx={{
              flex: 2,
              borderRadius: 3,
              p: 1,
              boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
              transition: "0.3s",
              background: "#e48c9d",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
              },
            }}
          >
            <CardContent>
              {/* HEADER */}
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontFamily: "'Lexend', sans-serif",
                  fontWeight: 600,
                  color: "#13220d",
                }}
              >
                Completion Rate
              </Typography>

              {/* GAUGE AREA */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  mt: 1,
                }}
              >
                <Gauge width={140} height={140} value={88} 
                sx={{"& .MuiGauge-valueArc": {
                    fill: "#13220d",
                  }}}
                />
                {/* LABEL UNDER GAUGE */}
                <Typography
                  sx={{
                    mt: 1,
                    fontFamily: "'Lexend', sans-serif",
                    fontWeight: 600,
                    color: "#13220d",
                  }}
                >
                  88%
                </Typography>

                <Typography
                  variant="caption"
                  sx={{
                    opacity: 0.7,
                    fontFamily: "'Lexend', sans-serif",
                    color: "#13220d"
                  }}
                >
                  Overall performance
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ReportsPage;