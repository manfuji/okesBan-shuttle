'use client'
import React, { useEffect, useMemo, useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import {
  Box,
  MenuItem,
  Select,
  Typography,
  InputLabel,
  FormControl,
  CircularProgress,
  Button,
} from "@mui/material";
import * as XLSX from "xlsx";

const SurveyTable = () => {
  const [surveyData, setSurveyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pickupFilter, setPickupFilter] = useState("");
  const [departureDateFilter, setDepartureDateFilter] = useState("");

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const res = await fetch("/api/saveSurvey");
        const data = await res.json();
        setSurveyData(data);
      } catch (err) {
        console.error("Error fetching survey data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSurveyData();
  }, []);

  const pickupLocations = useMemo(() =>
    Array.from(new Set((surveyData || []).map(entry => entry.deptpickupLocation).filter(Boolean)))
    , [surveyData]);

  const departureDates = useMemo(() =>
    Array.from(new Set((surveyData || []).map(entry => entry.departureDate).filter(Boolean)))
    , [surveyData]);

  const filteredData = useMemo(() => {
    return (surveyData || []).filter((entry) => {
      return (
        (pickupFilter === "" || entry.deptpickupLocation === pickupFilter) &&
        (departureDateFilter === "" || entry.departureDate === departureDateFilter)
      );
    });
  }, [surveyData, pickupFilter, departureDateFilter]);

  const columns: GridColDef[] = [
    { field: "firstName", headerName: "First Name", flex: 1 },
    { field: "lastName", headerName: "Last Name", flex: 1 },
    { field: "emailAddress", headerName: "Email", flex: 2 },
    { field: "phoneNumber", headerName: "Phone", flex: 1 },
    { field: "TripType", headerName: "Trip Type", flex: 1 },
    { field: "departureDate", headerName: "Departure Date", flex: 1 },
    { field: "departureTime", headerName: "Departure Time", flex: 1 },
    { field: "deptpickupLocation", headerName: "Pickup Location", flex: 1 },
    { field: "deptdropoffLocation", headerName: "Dropoff Location", flex: 1 },
    { field: "returnDate", headerName: "Return Date", flex: 1 },
    { field: "returnTime", headerName: "Return Time", flex: 1 },
    { field: "paymentMade", headerName: "Paid?", flex: 0.8, type: "boolean" },
    { field: "paymentMethod", headerName: "Payment Method", flex: 1 },
    { field: "timestamp", headerName: "Submitted At", flex: 1.5 },
  ];

  // --- Export Handlers ---

  const exportToCSV = () => {
    const headers = columns.map(col => col.headerName).join(",");
    const rows = filteredData.map(row =>
      columns.map(col => `"${row[col.field] ?? ""}"`).join(",")
    );
    const csvContent = [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "survey_data.csv";
    link.click();
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SurveyData");
    XLSX.writeFile(wb, "survey_data.xlsx");
  };

  return (
    <Box>
      <div className="px-24">
        <Typography variant="h5" gutterBottom>
          Survey Submissions
        </Typography>

        <Box display="flex" gap={2} mb={2}>
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel id="pickup-label">Pickup Location</InputLabel>
            <Select
              labelId="pickup-label"
              value={pickupFilter}
              label="Pickup Location"
              onChange={(e) => setPickupFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {pickupLocations.map((location) => (
                <MenuItem key={location} value={location}>
                  {location}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel id="departure-date-label">Departure Date</InputLabel>
            <Select
              labelId="departure-date-label"
              value={departureDateFilter}
              label="Departure Date"
              onChange={(e) => setDepartureDateFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {departureDates.map((date) => (
                <MenuItem key={date} value={date}>
                  {date}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box display="flex" alignItems="center" gap={2}>
            <Button variant="outlined" onClick={exportToCSV}>
              Export CSV
            </Button>
            <Button variant="outlined" onClick={exportToExcel}>
              Export Excel
            </Button>
          </Box>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" py={5}>
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={filteredData.map((row, index) => ({ id: index, ...row }))}
            columns={columns}
            pageSizeOptions={[5, 10, 25]}
            autoHeight
            disableRowSelectionOnClick
            initialState={{
              sorting: {
                sortModel: [{ field: "timestamp", sort: "desc" }],
              },
              columns: {
                columnVisibilityModel: {
                  firstName: true,
                  lastName: true,
                  emailAddress: true,
                  phoneNumber: false,
                  TripType: false,
                  departureDate: false,
                  departureTime: false,
                  deptpickupLocation: false,
                  deptdropoffLocation: false,
                  returnDate: false,
                  returnTime: false,
                  paymentMade: false,
                  paymentMethod: false,
                  timestamp: false,
                },
              },
            }}

            slots={{ toolbar: GridToolbarContainer }}
            slotProps={{
              toolbar: {
                children: <GridToolbarFilterButton />,
              },
            }}
          />
        )}
      </div>
    </Box>
  );
};

export default SurveyTable;
