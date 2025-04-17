'use client'

import { useEffect, useState } from "react";
import { json } from "../../data/dashboard_data";
import { VisualizationPanel } from "survey-analytics";
import "survey-analytics/survey.analytics.css";
import { Model } from "survey-core";
import { BarChart, PieChart, XAxis, Bar, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { CircularProgress, Alert, Typography, Box, Divider } from '@mui/material';

export default function Dashboard() {
  const [vizPanel, setVizPanel] = useState<VisualizationPanel | null>(null);
  const [surveyData, setSurveyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/saveSurvey");
        const data = await res.json();
        setSurveyData(data);
        setLoading(false);

        const survey = new Model(json);
        const panel = new VisualizationPanel(survey.getAllQuestions(), data);
        setVizPanel(panel);
      } catch (err) {
        setError("Failed to load survey data.");
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const transformDataForCharts = (data: any[]) => {
    const tripTypeCount: any = {};
    const paymentMadeCount: any = { true: 0, false: 0 };

    data.forEach((entry) => {
      // Count TripType occurrences
      tripTypeCount[entry.TripType] = (tripTypeCount[entry.TripType] || 0) + 1;

      // Count paymentMade occurrences
      if (entry.paymentMade) {
        paymentMadeCount.true += 1;
      } else {
        paymentMadeCount.false += 1;
      }
    });

    // Convert counts into chart data format
    const tripTypeData = Object.keys(tripTypeCount).map((type) => ({
      name: type,
      count: tripTypeCount[type],
    }));

    const paymentData = [
      { name: "Paid", value: paymentMadeCount.true },
      { name: "Not Paid", value: paymentMadeCount.false },
    ];

    return { tripTypeData, paymentData };
  };

  const { tripTypeData, paymentData } = transformDataForCharts(surveyData);

  // Check the data before rendering charts
  console.log(tripTypeData, paymentData);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" align="center" gutterBottom color="primary">
        Survey Dashboard
      </Typography>
      <Typography variant="body1" align="center" paragraph color="textSecondary">
        Here is a breakdown of the survey responses.
      </Typography>

      {/* Visualizations */}
      <Typography variant="h5" gutterBottom align="center" color="primary">
        Visual Analysis
      </Typography>

      {/* Bar Chart for TripType */}
      <Typography variant="h6" align="center" color="textSecondary">Trip Type Breakdown</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={tripTypeData}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <Divider sx={{ marginTop: 4 }} />

      {/* Pie Chart for Payment Status */}
      <Typography variant="h6" align="center" color="textSecondary" mt={4}>Payment Status Breakdown</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={paymentData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {paymentData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#82ca9d" : "#8884d8"} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}
