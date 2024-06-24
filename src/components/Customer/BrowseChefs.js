import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ClipLoader from "react-spinners/ClipLoader";

import ChefProfile from "../Chef/Profile";
import "./Customer.css";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const BrowseChefs = () => {
  const [chefs, setChefs] = useState([]);
  const [filteredChefs, setFilteredChefs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    fetchChefs();
  }, []);

  useEffect(() => {
    filterAndSortChefs();
  }, [searchTerm, sortOrder]);

  const fetchChefs = async () => {
    try {
      const response = await fetch("http://localhost:8080/get-all");
      const data = await response.json();
      setChefs(data.usersList);
      setFilteredChefs(sortChefsByCost(data.usersList));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setErrMsg("Could not fetch the data, try once again!");
      setIsLoading(false);
    }
  };

  const sortChefsByCost = (chefsList) => {
    return chefsList.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.cost - b.cost;
      } else {
        return b.cost - a.cost;
      }
    });
  };

  const filterAndSortChefs = () => {
    let filteredList = chefs.filter((chef) => {
      const foodItems =
        typeof chef.Fooditems === "string"
          ? chef.Fooditems
          : chef.Fooditems.join(", ");
      return foodItems.toLowerCase().includes(searchTerm.toLowerCase());
    });
    filteredList = sortChefsByCost(filteredList);
    setFilteredChefs(filteredList);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const renderChefs = () => {
    return (
      <>
        <div>
          <input
            type="text"
            placeholder="Search by food items..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <select value={sortOrder} onChange={handleSortOrderChange}>
            <option value="asc">Cost: Low to High</option>
            <option value="desc">Cost: High to Low</option>
          </select>
        </div>
        <div className="chefs">
          {filteredChefs.map((chef) => (
            <ChefProfile key={uuidv4()} chef={chef} />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="browse-chefs">
      {isLoading && (
        <div>
          <ClipLoader
            color={color}
            loading={isLoading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      {filteredChefs.length > 0 ? renderChefs() : <p>{errMsg}</p>}
    </div>
  );
};

export default BrowseChefs;
