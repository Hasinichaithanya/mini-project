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
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState();
  let [color, setColor] = useState("#ffffff");

  useEffect(() => {
    fetchChefs();
  }, [sortOrder]); // Refetch chefs when sort order changes

  const fetchChefs = async (query = "") => {
    setIsLoading(true);
    const endpoint = query
      ? `http://localhost:8080/search?q=${query}`
      : "http://localhost:8080/get-all";
    fetch(endpoint)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        const data = sortChefsByCost(response.usersList);
        setChefs(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setErrMsg("Could not fetch the data, try once again!");
      });
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

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
    fetchChefs(query);
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
          {chefs.map((chef) => (
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
          {" "}
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
      {chefs.length > 0 ? renderChefs() : <p>{errMsg}</p>}
    </div>
  );
};

export default BrowseChefs;
