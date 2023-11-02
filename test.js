const axios = require("axios");

const getTotalByTaluka = async (taluka) => {
  try {
    const res = await axios.get("http://mehdb.vercel.app/agepops");
    const data = res.data;
    const talukas = data.map((obj) => obj["Taluka"]);
    const index = talukas.indexOf(taluka); // find the index of the specified taluka in the array of Talukas
    if (index !== -1) {
      const talukaData = data[index]; // retrieve the data of the specified taluka from the data array
      const total = talukaData["0_17_M"]; // retrieve the total from the data of the specified taluka
      return total;
    } else {
      return "Taluka not found"; // return a message if the specified taluka is not found in the array of Talukas
    }
  } catch (error) {
    console.error(error);
  }
};

// Example usage:
getTotalByTaluka("Kadi (SC)").then((total) => console.log(total)); // logs the total of Mahesana to the console