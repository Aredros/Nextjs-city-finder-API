/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { useEffect, useState, useRef, use } from "react";
import axios from "axios";
import CityDetails from "../../components/CityDetails";

interface City {
  node: {
    name: string;
    population: number;
    id: number;
    elevationMeters: number;
    timezone: string;
    longitude: number;
    latitude: number;
    country: {
      flagImageUri: string;
    };
  };
  cursor: string;
}

interface storedCity {
  name: string;
  population: number;
  id: number;
  elevationMeters: number;
  timezone: string;
  longitude: number;
  latitude: number;
  country: {
    flagImageUri: string;
  };
}

export default function HomeContainer() {
  const [tenFirstCities, setTenFirstCities] = useState<City[] | null>(null);
  const [sortingElement, setSortingElement] = useState("name");
  const [chosenCity, setChosenCity] = useState<storedCity | null>(null);

  const modalRef = useRef<HTMLDialogElement | null>(null);

  const openModal = () => {
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

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

  const handleSort = async (parameter: string) => {
    setSortingElement(parameter);
  };

  const paginationNext = async () => {
    if (tenFirstCities) {
      const lastElementCursorID =
        tenFirstCities[tenFirstCities.length - 1].cursor;
      try {
        const res = await axios.get("api/cities/", {
          params: { sortingElement, lastElementCursorID },
        });
        const { data } = res;
        setTenFirstCities(data.data.populatedPlaces.edges);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const paginationPrev = async () => {
    if (tenFirstCities) {
      const firstElementCursorID = tenFirstCities[0].cursor;
      try {
        const res = await axios.get("api/cities/", {
          params: { sortingElement, firstElementCursorID },
        });
        const { data } = res;
        setTenFirstCities(data.data.populatedPlaces.edges);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const selectACity = (cityID: number) => {
    if (tenFirstCities) {
      const selectedCity = (tenFirstCities as City[]).find(
        (city) => city.node.id === cityID
      );

      if (selectedCity) {
        setChosenCity(selectedCity.node);
        openModal();
      } else {
        console.error("City not found");
      }
    }
  };

  return (
    <section className="w-full lg:w-[750px]">
      {/* GRID OF CITIES */}
      <div className="mt-6 grid grid-cols-3 lg:grid-cols-5 gap-1 py-1 px-1 border-1 border-solid border-white bg-white rounded-md w-full">
        <div className="bg-[#171717] text-center py-2 lg:col-span-1 border-white">
          <h2>Extra</h2>
        </div>
        <div className="flex lg:gap-1.5 justify-center py-2 lg:col-span-2 bg-[#171717] ">
          <h2>City</h2>
          <button
            className="function-button"
            onClick={() => handleSort("-name")}
          >
            ⮟
          </button>
          <button
            className="function-button "
            onClick={() => handleSort("name")}
          >
            ⮝
          </button>
        </div>
        <div className="flex lg:gap-1.5 justify-center py-2 lg:col-span-2 bg-[#171717] ">
          <h2>Population</h2>
          <button
            className="function-button"
            onClick={() => handleSort("-population")}
          >
            ⮟
          </button>
          <button
            className="function-button"
            onClick={() => handleSort("population")}
          >
            ⮝
          </button>
        </div>
        {tenFirstCities &&
          Array.isArray(tenFirstCities) &&
          tenFirstCities.map((item: City) => (
            <React.Fragment key={item.node.id}>
              <div
                className="bg-[#171717] text-center py-2 lg:col-span-1"
                key={`${item.node.name}-details`}
              >
                <button onClick={() => selectACity(item.node.id)}>
                  Details🔎︎
                </button>
              </div>
              <div
                className="bg-[#171717] text-center lg:px-3 py-2 lg:col-span-2"
                key={`${item.node.name}-city`}
              >
                <p>{item.node.name}</p>
              </div>
              <div
                className="bg-[#171717] text-center py-2 lg:col-span-2"
                key={`${item.node.name}-pop`}
              >
                {" "}
                <p>{item.node.population}</p>
              </div>
            </React.Fragment>
          ))}
      </div>
      <div className="w-full text-center my-3">
        <button className="mx-3" onClick={() => paginationPrev()}>
          ⮜
        </button>
        <button className="mx-3" onClick={() => paginationNext()}>
          ⮞
        </button>
      </div>

      <dialog ref={modalRef}>
        <CityDetails chosenCity={chosenCity} closeModal={closeModal} />
      </dialog>
    </section>
  );
}
