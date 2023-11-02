// utils.js
const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    return formattedTime;
  };
  
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // Month is zero-based, so we add 1
    const day = now.getDate();
    const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    return formattedDate;
  };
  
  let serialNumberCounter = 1;
  
  const generateSrno = () => {
    return serialNumberCounter++;
  };
  
  module.exports = {
    getCurrentTime,
    getCurrentDate,
    generateSrno,
  };
  