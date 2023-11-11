/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

interface Country {
  node: {
    name: string;
    flagImageUri: string;
    capital: string;
    currencyCodes: string[];
  };
}

interface City {
  node: {
    name: string;
    population: number;
    id: number;
    country: {
      flagImageUri: string;
    };
  };
}
interface Cities {
  edges: City[];
}

export default function DistanceContainer() {
  const [tenFirstCities, setTenFirstCities] = useState<Cities | null>(null);
  const [sortingElement, setSortingElement] = useState("-population");
  const [firstElement, setFirstElement] = useState<number | null>(null);
  const [secondElement, setSecondElement] = useState<number | null>(null);
  const [firstElementName, setFirstElementName] = useState("");
  const [secondElementName, setSecondElementName] = useState("");
  const [distance, setDistance] = useState<number | null>(null);

  const getCityOne = (selectedCity: number, selectedCityName: string) => {
    setFirstElement(selectedCity);
    setFirstElementName(selectedCityName);
  };

  const getCityTwo = (selectedCity: number, selectedCityName: string) => {
    setSecondElement(selectedCity);
    setSecondElementName(selectedCityName);
  };

  useEffect(() => {
    const getDistance = async () => {
      try {
        const res = await axios.get("api/distances/", {
          params: { firstElement, secondElement },
        });
        const { data } = res;
        setDistance(data.data.distanceBetween);
      } catch (error) {
        console.error(error);
      }
    };
    getDistance();
  }, [firstElement, secondElement]);
  /**
   * Fetches search results for the input country name
   */
  useEffect(() => {
    const getCities = async () => {
      try {
        const res = await axios.get("api/cities/", {
          params: { sortingElement },
        });
        const { data } = res;
        console.log(data); // Add this line
        setTenFirstCities(data.data.populatedPlaces.edges);
      } catch (error) {
        console.error(error);
      }
    };
    getCities();
  }, [sortingElement]);

  return (
    <section className="w-full lg:w-[750px] mb-6">
      {/* GRID OF CITIES */}

      {tenFirstCities && Array.isArray(tenFirstCities) && (
        <form className="mt-8 flex flex-col lg:flex-row border-white border-2 p-[15px] justify-between rounded-md w-full">
          <div className="flex flex-col text-center lg:text-left">
            <label>City:</label>
            <select
              className="bg-[#171717]"
              name="city1"
              id="city1"
              onChange={(e) =>
                getCityOne(
                  Number(e.target.value),
                  e.target.options[e.target.selectedIndex].text
                )
              }
            >
              {tenFirstCities.map((item: City) => (
                <option key={`${item.node.name}-city1`} value={item.node.id}>
                  {item.node.name}
                </option>
              ))}
            </select>
            {firstElementName !== "" && <p className="pt-4">FROM:</p>}

            <p className="text-4xl">{firstElementName}</p>
          </div>
          <div className="flex flex-col py-6 text-center">
            {" "}
            {firstElementName !== "" && secondElementName !== "" && (
              <h2>The distance is:</h2>
            )}
            <h2>SELECT 2 CITIES</h2>
            <h2 className="text-2xl font-semibold"> {distance}</h2>
          </div>
          <div className="flex flex-col text-center lg:text-left">
            <label>City:</label>
            <select
              className="bg-[#171717]"
              name="city1"
              id="city1"
              onChange={(e) =>
                getCityTwo(
                  Number(e.target.value),
                  e.target.options[e.target.selectedIndex].text
                )
              }
            >
              {tenFirstCities.map((item: City) => (
                <option key={`${item.node.name}-city1`} value={item.node.id}>
                  {item.node.name}
                </option>
              ))}
            </select>
            {secondElementName !== "" && <p className="pt-4">TO:</p>}
            <p className="text-4xl">{secondElementName}</p>
          </div>
        </form>
      )}
    </section>
  );
}
