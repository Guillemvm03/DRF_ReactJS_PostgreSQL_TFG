import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRent } from "../../../hooks/useRent";
import RentMap from "../../layout/RentMap";
import html2canvas from 'html2canvas';

const RentalHistory = () => {
  const { userRents, useGetRents } = useRent();
  const [mapImage, setMapImage] = useState(null);

  useEffect(() => {
    useGetRents(true);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

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

  const handleShare = async (mapId, buttonId) => {
    const mapElement = document.getElementById(mapId);
    const buttonElement = document.getElementById(buttonId);
    if (mapElement && buttonElement) {
      // Ocultar el botón de descarga
      buttonElement.style.display = 'none';

      // Capturar la imagen del mapa
      const canvas = await html2canvas(mapElement, {
        scale: 2, // Aumentar la escala para mayor calidad
        useCORS: true, // Para habilitar la carga de imágenes cross-origin
      });

      // Mostrar nuevamente el botón de descarga
      buttonElement.style.display = 'block';

      // Generar la imagen y descargarla
      const image = canvas.toDataURL('image/png');
      setMapImage(image);
      const link = document.createElement('a');
      link.href = image;
      link.download = 'map.png';
      link.click();
    }
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
                <div className="mt-4 md:mt-0 md:ml-6 flex-grow">
                  <h2 className="text-lg font-bold">{rent.productTitle}</h2>
                  <p className="mt-2 text-gray-600">
                    <b>Start date:</b> {formatDate(rent.start_date)}
                  </p>
                  <p className="mt-2 text-gray-600">
                    <b>End date:</b> {formatDate(rent.end_date)}
                  </p>
                  <span className="ml-auto font-bold">
                    Amount: ${rent.amount}
                  </span>
                </div>
                <div id={`rentMap-${index}`} className="mt-4 md:mt-0 md:ml-6 w-full">
                  <RentMap
                    startLat={rent.start_lat}
                    startLng={rent.start_lng}
                    endLat={rent.end_lat}
                    endLng={rent.end_lng}
                    mapId={`rentMap-${index}`}
                  />
                  <button
                    id={`downloadButton-${index}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                    onClick={() => handleShare(`rentMap-${index}`, `downloadButton-${index}`)}
                  >
                    Download Map
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default RentalHistory;
