import React, { useEffect, useState } from "react";
import { Commercial, CommercialFilter, CommercialMobile, } from "../components";
import { fetchAllCommercialStoreByBuilding } from "../features/commercialStore/CommercialStoreApi";
import { getCommercialStoresData } from "../features/commercialStore/CommercialStoreSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const CommercialPage = () => {
  const isSmallDev = window.innerWidth < 700;
  const dispatch = useDispatch();
  const { id } = useParams();
  const data = useSelector(getCommercialStoresData);
  const [floor, setFloor] = useState(1);
  const [filter, setFilter] = useState("all");
  const [commercialCode, setCommercialCode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchAllCommercialStoreByBuilding(id));
    }
  }, [dispatch, id]);

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  useEffect(() => {
    // If the route provided an id like 'cd' or 'gh', use it as parkingCode
    // and map it to a parkingNumber if needed by the rest of the app.
    if (id) {
      const code = id.toString().toLowerCase();
      setCommercialCode(code);
      // map known codes to numeric parkingNumber (adjust mapping if needed)
      const map = {
        cd: 1,
        gh: 2,
      };
      if (map[code] !== undefined) setFloor(map[code]);
    } else {
      setCommercialCode('');
    }
  }, [id]);

  return (
    <div className="bg-white flex flex-col w-full items-center overflow-x-hidden">
      <div className='bg-black w-full h-64 md:h-96 relative items-center justify-center text-center px-12'>
        <img src="/projektet/assets/images/hero/apartmentBck.png" alt="" className='absolute h-4/7 md:h-full bottom-0 right-0 ' />
        <div className='absolute bottom-6 md:bottom-20 flex items-center gap-6 md:gap-12'>
          <button
            onClick={() => navigate(-1)}
            className="bg-brand transition-all duration-.3s hover:opacity-80 w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center"
          >
            <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 7L15 7M1 7L7 13M1 7L7 1" stroke="#00345B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <h1 className='text-white text-2xl md:text-7xl font-semibold'>Afarizmi <span className="text-secondary">{commercialCode ? commercialCode.toUpperCase() : ''}</span></h1>
        </div>
      </div>
      <CommercialFilter
        floor={floor}
        onFilterChange={handleFilterChange}
        onFloorChange={(f) => setFloor(f)}
        floors={(data || []).map((_, i) => i + 1)}
      />
      <Commercial floor={floor} filteredCommercial={data} />
    </div>
  );
};

export default CommercialPage;
