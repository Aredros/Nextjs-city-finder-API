import React from "react";
import Image from "next/image";
import Django from "../src/pages/Djangocircle.png";

interface StoredCity {
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

interface CityDetailsProps {
  chosenCity: StoredCity | null;
  closeModal: () => void;
}

export default function CityDetails({
  chosenCity,
  closeModal,
}: CityDetailsProps) {
  return (
    <React.Fragment>
      <div className="p-5 w-[300px] text-center bg-[#171717] border-white border-2 rounded-md">
        {" "}
        <div className="text-center">
          <Image
            className="m-auto mb-5"
            src={chosenCity?.country.flagImageUri || Django}
            alt="flag"
            width={50}
            height={20}
          />
          <h3 className="text-left text-white">
            <b> Ville: </b>
            {chosenCity?.name}
          </h3>
          <h3 className="text-left text-white">
            <b>Population:</b> {chosenCity?.population}
          </h3>
          <h3 className="text-left text-white">
            <b>Elevation:</b> {chosenCity?.elevationMeters}
          </h3>
          <h3 className="text-left text-white">
            <b>Timezone:</b> {chosenCity?.timezone}
          </h3>
          <h3 className="text-left text-white">
            <b>Latitude:</b> {chosenCity?.latitude}
          </h3>
          <h3 className="text-left text-white">
            <b>Longitude:</b> {chosenCity?.longitude}
          </h3>
        </div>
        <button
          className="m-auto bg-[#4D599C] mt-5 py-1 px-4 rounded-md text-white"
          onClick={() => closeModal()}
        >
          Close
        </button>
      </div>
    </React.Fragment>
  );
}
