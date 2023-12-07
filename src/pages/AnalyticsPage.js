import React, { useState, useEffect } from "react";
import analyticsService from "../services/AnalyticsService";

const AnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      // Replace with your actual API call
      const data = await analyticsService();
      console.log(data);
      setAnalyticsData(data.data);
    };

    fetchData();
  }, []);

  function convertDate(lastTimestamp) {
    if (lastTimestamp == "") return "Not yet clicked";

    let date = new Date(lastTimestamp);

    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  return (
    <div
      className="min-h-screen py-10"
      style={{ backgroundImage: "linear-gradient(115deg, #1A237E, #78909C)" }}
    >
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-semibold text-center mb-6">
          URL Analytics
        </h1>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Short URL
                </th>
                <th scope="col" className="py-3 px-6">
                  Original URL
                </th>
                <th scope="col" className="py-3 px-6">
                  Created At
                </th>
                <th scope="col" className="py-3 px-6">
                  Username
                </th>
                <th scope="col" className="py-3 px-6">
                  Click Count
                </th>
                <th scope="col" className="py-3 px-6">
                  Last Click
                </th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="py-4 px-6">{item.shortUrl}</td>
                  <td className="py-4 px-6">{item.longUrl}</td>
                  <td className="py-4 px-6">{convertDate(item.createdAt)}</td>
                  <td className="py-4 px-6">{item.username}</td>
                  <td className="py-4 px-6">{item.clickCount}</td>
                  <td className="py-4 px-6">
                    {convertDate(item.timestamps.split(",").pop().trim())}
                  </td>{" "}
                  {/* Placeholder for Timestamps */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
