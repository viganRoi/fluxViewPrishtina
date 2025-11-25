import { useState } from "react";
import { useParams } from "react-router-dom";

const ParkingFilter = ({
  onFilterChange,
  onParkingNumberChange,
  parkingNumber,
}) => {
  const [selectedType, setSelectedType] = useState([]);
  const { id } = useParams();

  // const handleTypeChange = (type) => {
  //   setSelectedType((prev) =>
  //     prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
  //   );
  // };
  const handleTypeChange = (type) => {
    setSelectedType((prev) => {
      const newTypes = prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type];
      onFilterChange(newTypes);
      return newTypes;
    });
  };

  const resetFilters = () => {
    setSelectedType([]);
    setSelectedFloor("-1");
    setSelectedFunctionality([]);
    onFilterChange([]);
  };

  const mappingParkingNumberToFloor = {
    1: id === "n1" ? "Bodrumi" : "Bodrumi -2",
    2: id === "n1" ? "Suterreni 1" : "Bodrumi -1",
    3: "Suterreni 2",
  };

  return (
    <div className="bg-white w-full h-full flex flex-col md:flex-row items-center justify-center pt-6 pb-12">
      <div className="w-11/12 md:w-5/6 flex flex-col md:flex-row items-start md:items-center gap-5 justify-between relative">
        <div className="flex flex-col items-start">
          <h3 className="text-base font-semibold montserrat mb-2">Tipi</h3>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedType.includes("Parkingjet")}
                onChange={() => handleTypeChange("Parkingjet")}
                className="hidden"
              />
              <div
                className={`w-5 h-5 border rounded-md ${
                  selectedType.includes("Parkingjet")
                    ? "bg-[var(--brand-color)]"
                    : "bg-white"
                }`}
              />
              <span className="montserrat">Parkingjet</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedType.includes("Depo")}
                onChange={() => handleTypeChange("Depo")}
                className="hidden"
              />
              <div
                className={`w-5 h-5 border rounded-md ${
                  selectedType.includes("Depo")
                    ? "bg-[var(--brand-color)]"
                    : "bg-white"
                }`}
              />
              <span className="montserrat">Depo</span>
            </label>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <h3 className="text-base font-semibold montserrat mb-2">Kati</h3>
          <div className="flex space-x-2">
            {Object.keys(mappingParkingNumberToFloor).map((floor, inx) => {
              if (id === "n2" && inx === 2) return null;
              return (
                <button
                  key={floor}
                  className={`px-4 py-2 border rounded-md ${
                    String(parkingNumber) === floor
                      ? "bg-[var(--brand2-color)] text-white"
                      : "bg-white"
                  }`}
                  onClick={() => {
                    onParkingNumberChange(floor);
                  }}
                >
                  {mappingParkingNumberToFloor[floor]}
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div className="flex flex-col items-start">
            <h3 className="text-base font-semibold montserrat mb-2">
              Legjenda
            </h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <a className="w-4 h-4 rounded-full bg-green-600 opacity-70" />E
                lirë
              </div>
              <div className="flex items-center gap-2">
                <a className="w-4 h-4 rounded-full bg-[#8b0000] opacity-70" />E
                shitur
              </div>
              <div className="flex items-center gap-2">
                <a className="w-4 h-4 rounded-full bg-[#ff7b00] opacity-70" />E
                rezevuar
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={resetFilters}
          className="px-6 py-2 bg-black text-[var(--brand-color)] text-sm uppercase montserrat rounded-md"
        >
          RESETO FILTERN
        </button>
      </div>
    </div>
  );
};

export default ParkingFilter;
