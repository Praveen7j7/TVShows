import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import styles from "./Filter.module.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function Filters({ filters, selectedFilterIndex, setSelectedFilterIndex }) {
  const handleChange = (event, newValue) => {
    setSelectedFilterIndex(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  }

  return (
    <div>
      <Tabs
        value={selectedFilterIndex}
        onChange={handleChange}
        aria-label="basic tabs example"
        variant="scrollable"
        scrollButtons="auto"
        TabIndicatorProps={{
          style: {
            backgroundColor: "var(--color-primary)"
          }
        }}
      >
        {filters.map((ele, idx) => (
          <Tab
            className={styles.tab}
            label={ele.label}
            {...a11yProps(idx)}
            key={idx}
          />
        ))}
      </Tabs>
    </div>
  );
}

export default Filters;
