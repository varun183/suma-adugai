import React, { useState, useEffect } from "react";
import { TextField, Box, InputAdornment } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import { fetchAllCategories } from "../../../State/Customers/Category/categoryThunks";

const SearchPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { categories, loading, error } = useSelector((state) => state.category);
  const jwt = localStorage.getItem("jwt"); // Get token if needed for API call

  // Fetch categories when component mounts
  useEffect(() => {
    dispatch(fetchAllCategories({ jwt }));
  }, [dispatch, jwt]);

  // Filter categories based on search input
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-container p-5 lg:px-20">
      {/* Search Input */}
      <div className="search-bar flex justify-center mb-6">
        <TextField
          variant="outlined"
          placeholder="Search for a category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className="mr-2" />
              </InputAdornment>
            ),
          }}
        />
      </div>

      {/* Show loading state */}
      {loading && <p className="text-center">Loading categories...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Categories Grid */}
      <Box className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </Box>
    </div>
  );
};

export default SearchPage;
