
import FlexBetween from "@/components/FlexBetween";
import Header from "@/components/Header";
import StatBox from "@/components/StatBox";
import PieChart from "@/components/PieChart";
import BarChart from "@/components/BarChart";
import LineChart from "@/components/LineChart";
import DoughnutChart from "@/components/DoughnutChart"; // Import DoughnutChart
import ScatterPlot from "@/components/ScatterPlot"; // Import ScatterPlot
import { useGetDataQuery } from "@/state/api";
import {
  Box,

  useTheme,
  useMediaQuery,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'sector', headerName: 'Sector', width: 150 },
  { field: 'topic', headerName: 'Topic', width: 150 },
  { field: 'region', headerName: 'Region', width: 150 },
  { field: 'country', headerName: 'Country', width: 150 },
  { field: 'source', headerName: 'Source', width: 150 },
  { field: 'pestle', headerName: 'PESTLE', width: 150 },
  { field: 'intensity', headerName: 'Intensity', width: 150 },
  { field: 'likelihood', headerName: 'Likelihood', width: 150 },
  { field: 'relevance', headerName: 'Relevance', width: 150 },
  // Add any other fields from your data that you want to display
];

function Dashboard() {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDataQuery();

  if (!data || isLoading) {
    return (
      <Box
        width="100%"
        height="100%"
        minHeight="80vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  // Process data for charts
  const processedDataForPie = data.map(entry => ({
    sector: entry.region,
    
  }));

  const processedDataForBar = data.map(entry => ({
    sector: entry.sector,
    value: entry.intensity,
   
  }));

  const processedDataForLine = data.map(entry => ({
    date: entry.published, 
    value: entry.intensity, 
    
    
  }));

  const processedDataForDoughnut = data.map(entry => ({
    sector: entry.sector,
  }));

  const processedDataForScatter = data.filter(entry => entry.intensity && entry.likelihood);

  return (
    <Box m="1.5rem 2.5rem">
  <FlexBetween>
    <Header
      title="DATA DASHBOARD"
      subtitle="Overview of your data"
      sx={{ color: '#ffffff' }} // Set text color to white
    />
  </FlexBetween>

  
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        <StatBox
          title="Total Entries"
          value={data.length}
          description="Total number of data entries"
        />
        <StatBox
          title="Total Regions"
          value={new Set(data.map((entry) => entry.region)).size}
          description="Unique regions represented in the data"
        />
        <StatBox
          title="Total Countries"
          value={new Set(data.map((entry) => entry.country)).size}
          description="Unique countries represented in the data"
        />

        <Box
          gridColumn="span 6"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt} 
          p="1rem"
          borderRadius="0.55rem"
          sx={{
            "&:hover": {
              backgroundColor: theme.palette.secondary[300], 
            },
          }}
        >
          <PieChart data={processedDataForPie} />
        </Box>

        <Box
          gridColumn="span 6"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt} 
          p="1rem"
          borderRadius="0.55rem"
          sx={{
            "&:hover": {
              backgroundColor: theme.palette.secondary[300], 
            },
          }}
        >
          <BarChart data={processedDataForBar} />
        </Box>

        <Box
          gridColumn="span 12"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt} 
          p="1rem"
          borderRadius="0.55rem"
          sx={{
            "&:hover": {
              backgroundColor: theme.palette.secondary[300], 
            },
          }}
        >
          <LineChart data={processedDataForLine} />
        </Box>

        <Box
          gridColumn="span 6"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt} 
          p="1rem"
          borderRadius="0.55rem"
          sx={{
            "&:hover": {
              backgroundColor: theme.palette.secondary[300], 
            },
          }}
        >
          <DoughnutChart data={processedDataForDoughnut} />
        </Box>

        <Box
          gridColumn="span 6"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt} 
          p="1rem"
          borderRadius="0.55rem"
          sx={{
            "&:hover": {
              backgroundColor: theme.palette.secondary[300], 
            },
          }}
        >
          <ScatterPlot serverData={processedDataForScatter} />
        </Box>

        <Box
          gridColumn="span 12"
          gridRow="span 12"
          backgroundColor={theme.palette.background.alt}  
          p="1rem"
          borderRadius="0.55rem"
          sx={{
            "&:hover": {
              backgroundColor: theme.palette.secondary[300], 
            },
          }}
        >
          <DataGrid
            rows={data}
            columns={columns}
            getRowId={(row) => row._id} // Specify the unique identifier
            autoHeight
            rowHeight={20}
            checkboxSelection
            disableSelectionOnClick
            sx={{
              "& .MuiDataGrid-cell": {
                color: theme.palette.secondary[900], // Dark text color for DataGrid cells
              },
              "& .MuiDataGrid-headerCell": {
                backgroundColor: theme.palette.secondary[200], // Darker header background
                color: theme.palette.primary[900], // Dark header text color
              },
              "& .MuiDataGrid-row:hover": {
                backgroundColor: theme.palette.secondary[300], // Darker row background on hover
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
