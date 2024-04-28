import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRent } from "../../../hooks/useRent";
import RentMap from "../../layout/RentMap";
import html2canvas from 'html2canvas';

const RentalHistory = () => {
  const { userRents, useGetRents } = useRent();

  useEffect(() => {
    useGetRents(true);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"; // Gestiona fechas nulas o indefinidas

    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString)
      .toLocaleDateString("en-US", options)
      .replace(/(\d+)\/(\d+)\/(\d+), (\d+:\d+)/, "$3-$1-$2 $4");
  };

  const handleShare = async () => {
      const mapElement = document.getElementById('rentMap'); // Asegúrate de que tu componente de mapa tenga este ID
      const canvas = await html2canvas(mapElement);
      const image = canvas.toDataURL('image/png');
      // Guarda esta imagen en el contexto o estado global
      setSharedImage(image); // Suponiendo que tienes un método para actualizar tu contexto
    };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h1 className="text-2xl font-bold my-4">Rental History</h1>
          <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
            Get Bills
          </button>
        </div>
        {userRents &&
          userRents.map((rent, index) => (
            <div key={index} className="mb-8">
              <div className="flex flex-col md:flex-row border-b border-gray-400 py-4">
                <div className="flex-shrink-0">
                  <img
                    src={
                      rent.imageUrl ||
                      "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    }
                    alt="Imagen del producto"
                    className="w-32 h-32 object-cover"
                  />
                </div>
                <div className="mt-4 md:mt-0 md:ml-6">
                  <h2 className="text-lg font-bold">{rent.productTitle}</h2>
                  <p className="mt-2 text-gray-600">
                    <b>Start date:</b> {formatDate(rent.start_date)}
                  </p>
                  <p className="mt-2 text-gray-600">
                    <b>End date:</b> {formatDate(rent.end_date)}
                  </p>
                  {/* <div className="mt-4 flex items-center"> */}
                  <span className="ml-auto font-bold">
                    Amount: ${rent.amount}
                  </span>
                  {/* </div> */}
                </div>
                {/* <div id="rentMap"> */}
                  <RentMap
                    startLat={rent.start_lat}
                    startLng={rent.start_lng}
                    endLat={rent.end_lat}
                    endLng={rent.end_lng}
                  />
                {/* </div> */}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default RentalHistory;
