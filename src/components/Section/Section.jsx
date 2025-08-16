import React from "react";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Filters from "../Filters/Filter.jsx";
import styles from "./Section.module.css";

export default function Section() {
  const [filters, setFilters] = useState([{ key: "all", label: "All" }]);
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://api.tvmaze.com/shows");
        const shows = response.data;

        // Get unique genres
        const genres = [...new Set(shows.flatMap((show) => show.genres))];
        setFilters([
          { key: "all", label: "All" },
          ...genres.map((genre) => ({ key: genre, label: genre }))
        ]);

        setData(shows);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  const showFilters = filters.length > 1;
  const filteredData = data.filter((show) =>
    showFilters && selectedFilterIndex !== 0
      ? show.genres.includes(filters[selectedFilterIndex].key)
      : show
  );

  return (
    <div>
      <div className={styles.header}>
        <h3 className="text-3xl p-3 m-3 ">TV Shows</h3>
      </div>
      {showFilters && (
        <div className={styles.filterWrapper}>
          <Filters
            filters={filters}
            selectedFilterIndex={selectedFilterIndex}
            setSelectedFilterIndex={setSelectedFilterIndex}
          />
        </div>
      )}
      {loading ? (
        <CircularProgress />
      ) : (
        <div className={styles.cardsWrapper}>
          {filteredData.map((show) => (
            <div className={styles.card} key={show.id}>
              <img
                src={
                  show.image
                    ? show.image.medium
                    : "https://via.placeholder.com/210"
                }
                alt={show.name}
                className={styles.cardImage}
              />
              <Typography variant="h6" className={styles.cardTitle}>
                {show.name}
              </Typography>
              <Typography variant="body2" className={styles.cardGenre}>
                Genres: {show.genres.join(", ")}
              </Typography>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
