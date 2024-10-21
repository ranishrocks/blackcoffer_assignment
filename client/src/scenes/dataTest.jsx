import { Box, useTheme, CircularProgress, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetDataQuery } from "@/state/api"; // Ensure this hook is correctly defined
import Header from "@/components/Header";

function DataTest() {
  const theme = useTheme();
  const { data, isLoading, error } = useGetDataQuery(); // Fetch data from the API

  // Define the columns for the DataGrid based on all parameters
  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "end_year", headerName: "End Year", flex: 1 },
    { field: "intensity", headerName: "Intensity", flex: 1 },
    { field: "sector", headerName: "Sector", flex: 1 },
    { field: "topic", headerName: "Topic", flex: 1 },
    { field: "insight", headerName: "Insight", flex: 2 },
    {
      field: "url",
      headerName: "URL",
      flex: 2,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          Link
        </a>
      ),
    },
    { field: "region", headerName: "Region", flex: 1 },
    { field: "start_year", headerName: "Start Year", flex: 1 },
    { field: "impact", headerName: "Impact", flex: 1 },
    { field: "added", headerName: "Added", flex: 1 },
    { field: "published", headerName: "Published", flex: 1 },
    { field: "country", headerName: "Country", flex: 1 },
    { field: "relevance", headerName: "Relevance", flex: 1 },
    { field: "pestle", headerName: "PESTLE", flex: 1 },
    { field: "source", headerName: "Source", flex: 1 },
    { field: "title", headerName: "Title", flex: 2 },
    { field: "likelihood", headerName: "Likelihood", flex: 1 },
  ];

  // Show a loading spinner while the data is loading
  if (isLoading) {
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

  // Handle error state
  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  // Function to export data to CSV
  const exportToCSV = () => {
    const csvRows = [];
    const headers = columns.map(col => col.headerName).join(',');
    csvRows.push(headers);
    
    data.forEach(row => {
      const values = columns.map(col => row[col.field]).join(',');
      csvRows.push(values);
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'data.csv');
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Box height="100%" maxHeight="85vh" m="1.5rem 2.5rem">
      <Header title="DATA OVERVIEW" subtitle="View and analyze the data" />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={exportToCSV}
        sx={{ mb: 2 }}
      >
        Export to CSV
      </Button>
      <Box
        mt="40px"
        height="72vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading}
          getRowId={(row) => row._id}
          rows={data || []} // Pass the data fetched from MongoDB
          columns={columns}
        />
      </Box>
    </Box>
  );
}

export default DataTest;
