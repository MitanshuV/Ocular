import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Card } from "../ui/card";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaStar,
  FaStarHalfAlt,
} from "react-icons/fa"; // Import star icon from react-icons
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const TripDetails = () => {
  const locationState = useLocation();

  const tripData = locationState.state || {}; // Get the state passed from the navigate

  // Ensure that required trip data is available
  const hasData = tripData.location && tripData.days && tripData.budget;
  console.log(tripData);

  // Parse the tripDetails field if available and is a valid JSON string
  let parsedTripDetails = {};
  if (tripData.tripDetails) {
    try {
      parsedTripDetails = JSON.parse(tripData.tripDetails.tripDetails);
      console.log("Parsed Trip Details:", parsedTripDetails);
    } catch (error) {
      console.error("Error parsing tripDetails:", error);
    }
  }

  // Safely check if itinerary exists and is a non-null object
  if (
    parsedTripDetails.itinerary &&
    typeof parsedTripDetails.itinerary === "object" &&
    !Array.isArray(parsedTripDetails.itinerary)
  ) {
    // Check if the object has any properties
    if (Object.keys(parsedTripDetails.itinerary).length > 0) {
      // Iterate over object entries (key-value pairs)
      Object.entries(parsedTripDetails.itinerary).forEach(
        ([key, value], index) => {
          console.log(`Itinerary Entry ${index + 1} - Key "${key}":`, value);
        }
      );
    } else {
      console.log("Itinerary exists but is empty.");
    }
  } else {
    console.log("No itinerary found or it's not an object.");
  }

  return (
    <div>
      <div className="trip-details mb-10">
        <h1 className="text-left text-3xl font-bold my-4 capitalize">
          {tripData.location}
        </h1>
        <div className="flex justify-start space-x-4">
          <p className="text-md text-gray-600 bg-gray-100 h-10 w-[100px] rounded-2xl flex items-center justify-center shadow-md">
            📅 {tripData.days} Day
          </p>
          <p className="text-md text-gray-600 bg-gray-100 h-10 w-[100px] rounded-2xl flex items-center justify-center shadow-md">
            💰 {tripData.budget}
          </p>
          <p className="text-md text-gray-600 bg-gray-100 h-10 w-[100px] rounded-2xl flex items-center justify-center shadow-md">
            🍻 {tripData.tripDetails.companion}
          </p>
        </div>
      </div>

      {hasData ? (
        <div>
          <h1 className="text-left text-2xl font-bold my-2">
            Hotel Recommendations
          </h1>
          {/* Render parsed trip details if available */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-8">
            {parsedTripDetails.hotels.map((hotel, index) => (
              <Card
                key={index}
                className="group relative p-4 shadow-lg border rounded-lg flex flex-col overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl"
              >
                {/* Image Section */}
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <img
                    className="rounded-lg object-cover h-56 w-full"
                    src="https://images.unsplash.com/photo-1657002865844-c4127d542c41?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt={hotel.hotelName}
                  />
                </div>

                {/* Hotel Information */}
                <div className="flex flex-col flex-1">
                  <h2 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                    {hotel.hotelName}
                  </h2>

                  <p className="text-sm text-gray-700 mb-1 flex items-center">
                    <FaMapMarkerAlt className="text-blue-500 mr-2" />
                    <span className="ml-1">{hotel.hotelAddress}</span>
                  </p>

                  <p className="text-sm text-gray-700 mb-2 flex items-center">
                    <FaMoneyBillWave className="text-green-500 mr-2" />
                    <span className="ml-1">Price: {hotel.price} per night</span>
                  </p>

                  {/* Ratings Section */}
                  <div className="flex items-center mb-2">
                    <FaStar className="text-yellow-500 mr-2" />
                    <span className="ml-1 text-sm text-gray-700">
                      {hotel.reviews} Reviews
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Render the itinerary dynamically */}
          {parsedTripDetails.itinerary &&
            typeof parsedTripDetails.itinerary === "object" &&
            !Array.isArray(parsedTripDetails.itinerary) && (
              <div className="my-10 p-8 bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 rounded-3xl shadow-2xl text-white">
                {/* Header Section */}
                <h2 className="text-3xl font-extrabold mb-6 flex items-center gap-3">
                  🌍 <span className="tracking-wide">Itinerary Overview</span>
                </h2>

                {/* Check if object has keys */}
                {Object.keys(parsedTripDetails.itinerary).length > 0 ? (
                  <div className="space-y-10">
                    {Object.entries(parsedTripDetails.itinerary).map(
                      ([dayKey, dayValue]) => (
                        <div
                          key={dayKey}
                          className="p-6 rounded-xl bg-white bg-opacity-10 backdrop-blur-md shadow-lg border border-gray-600 hover:shadow-2xl transition-all duration-300"
                        >
                          {/* Day Header */}
                          <h3 className="text-2xl font-bold flex items-center gap-2 mb-5 text-blue-400">
                            📅 Day {dayKey.replace(/(\D+)(\d+)/, "$1 $2")}
                          </h3>

                          {/* Time slots list */}
                          {Object.keys(dayValue).length > 0 ? (
                            <div className="space-y-6">
                              {Object.entries(dayValue).map(
                                ([timeKey, timeValue]) => (
                                  <div
                                    key={timeKey}
                                    className="flex flex-col sm:flex-row items-center bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-md border border-gray-500 hover:scale-[1.02] hover:border-blue-400 transition-all duration-300 overflow-hidden"
                                  >
                                    {/* Left Side - Image */}
                                    <div className="w-full sm:w-1/3">
                                      <img
                                        src={
                                          timeValue.placeImgUrl
                                            ? timeValue.placeImgUrl
                                            : "https://images.unsplash.com/photo-1740382281576-95db2cf42d72?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDh8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D"
                                        }
                                        alt={
                                          timeValue.placeName
                                            ? `Image of ${timeValue.placeName}`
                                            : "Beautiful travel destination"
                                        }
                                        className="w-full h-48 sm:h-full object-cover rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none"
                                      />
                                    </div>

                                    {/* Right Side - Details */}
                                    <div className="p-6 w-full sm:w-2/3">
                                      {/* Time Period Header (Removed ⏰) */}
                                      <p className="text-lg font-semibold text-white flex items-center gap-2">
                                        {timeKey.charAt(0).toUpperCase() +
                                          timeKey.slice(1)}
                                      </p>

                                      {/* Time Period Details */}
                                      {typeof timeValue === "object" ? (
                                        <div className="mt-2 space-y-2 text-gray-200">
                                          {timeValue.placeName && (
                                            <p className="text-sm">
                                              <span className="font-medium text-blue-300">
                                                📍 Place:
                                              </span>{" "}
                                              {timeValue.placeName}
                                            </p>
                                          )}
                                          {timeValue.placeDetail && (
                                            <p className="text-sm">
                                              <span className="font-medium text-blue-300">
                                                📝 Details:
                                              </span>{" "}
                                              {timeValue.placeDetail}
                                            </p>
                                          )}
                                          {timeValue.rating &&
                                            typeof timeValue.rating ===
                                              "number" &&
                                            timeValue.rating > 0 && (
                                              <p className="text-sm flex items-center gap-2">
                                                <span className="font-medium text-blue-300">
                                                  ⭐ Rating:
                                                </span>
                                                <span className="flex text-yellow-400">
                                                  {"★".repeat(
                                                    Math.floor(timeValue.rating)
                                                  )}{" "}
                                                  {/* Full stars */}
                                                  {timeValue.rating % 1 !== 0
                                                    ? "⭑"
                                                    : ""}{" "}
                                                  {/* Half star if needed */}
                                                  {"☆".repeat(
                                                    5 -
                                                      Math.ceil(
                                                        timeValue.rating
                                                      )
                                                  )}{" "}
                                                  {/* Empty stars */}
                                                </span>
                                                <span>
                                                  ({timeValue.rating.toFixed(1)}
                                                  )
                                                </span>
                                              </p>
                                            )}
                                          {timeValue.ticketPricing && (
                                            <p className="text-sm">
                                              <span className="font-medium text-blue-300">
                                                🎟️ Ticket Price:
                                              </span>{" "}
                                              {timeValue.ticketPricing}
                                            </p>
                                          )}
                                          {timeValue.timeTravel && (
                                            <p className="text-sm">
                                              <span className="font-medium text-blue-300">
                                                ⏳ Travel Time:
                                              </span>{" "}
                                              {timeValue.timeTravel}
                                            </p>
                                          )}
                                          {!timeValue.placeName &&
                                            !timeValue.placeDetail && (
                                              <p className="text-sm text-gray-400 italic">
                                                No details available.
                                              </p>
                                            )}
                                        </div>
                                      ) : (
                                        <p className="text-sm text-gray-300 mt-2">
                                          {timeValue}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          ) : (
                            <p className="text-gray-400 italic mt-3">
                              No activities planned for this day.
                            </p>
                          )}
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-gray-400 italic text-center">
                    ⚠️ Itinerary object exists but is empty
                  </p>
                )}
              </div>
            )}
        </div>
      ) : (
        <p>No trip details available. Please try again.</p>
      )}
    </div>
  );
};

export default TripDetails;
