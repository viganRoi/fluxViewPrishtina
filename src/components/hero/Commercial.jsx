import { useState } from 'react';
import { mainUrl, STORE_IMAGE_PATH } from '../../utils/consts';
import { useNavigate, useParams } from 'react-router-dom';
import AdmCommercialStoreModal from '../admin/commercialStore/AdmCommercialStoreModal';
import ContextMenuCommercialStore from '../contextMenu/ContextMenuCommercialStore';

import { useEffect } from 'react';
import { useMediaQuery } from '@mui/material';

const Commercial = ({ filteredCommercial, floor }) => {
  const navigate = useNavigate();
  const isSmallDev = window.innerWidth < 700;
  const isMidDev = useMediaQuery("(max-width:1024px)");
  const { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [contextMenu, setContextMenu] = useState({
    open: false,
    anchorEl: null,
    data: {}
  });
  const [popup, setPopup] = useState({
    x: 0,
    y: 0,
    open: false,
    data: {},
  });

  const handleContextMenu = (e, apartment) => {
    e.preventDefault();
    setContextMenu({
      open: true,
      anchorEl: e.currentTarget,
      data: apartment
    });
  }; const getSvgHeight = () => {
    return '100%';
  };

  useEffect(() => {
    if (typeof floor === 'number') {
      const idx = Math.max(0, Math.min((filteredCommercial || []).length - 1, floor - 1));
      setCurrentIndex(idx);
    }
  }, [floor, filteredCommercial]);
  return (
    <div className='bg-white w-full h-screen flex flex-col items-center justify-center relative'>
      <div className='relative w-full h-full flex items-center justify-center'>
        <div className="bg-white w-full min-h-[500px] md:min-h-screen flex flex-col items-center justify-center overflow-auto md:overflow-hidden relative">
          {filteredCommercial?.map((building, index) => (
            <div
              key={building.buildingName + building.id}
              style={{
                height: index === currentIndex ? getSvgHeight() : "100%",
                opacity: currentIndex === index ? 1 : 0,
                transition: "opacity 0.1s ease-in-out",
                width: isSmallDev ? "300%" : "100%",
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                overflow: "hidden",
              }}
            >
              <svg
                width={"100%"}
                height={"100%"}
                preserveAspectRatio="xMidYMid slice"
                style={{ transform: isSmallDev && 'scale(1.9) translateX(20px)' }}
                viewBox={building.viewBoxStyle}
              >
                <image
                  xlinkHref={`${mainUrl}${STORE_IMAGE_PATH}${id}-${currentIndex + 1}.png`}
                  alt=""
                  width={building.imgWidth} height={building.imgHeight}
                  transform={building.imgTransform}
                />
                {building?.commercialStoreList.map((apartment) => {
                  if (apartment.pointsType === "path") {
                    return (
                      <path
                        d={apartment.path}
                        onContextMenu={(e) => handleContextMenu(e, apartment)}
                        className={
                          !apartment.isAvailable
                            ? apartment.isRent
                              ? 'rent-class'
                              : 'parking-available'
                            : 'sold'
                        }
                        id={apartment.apartmentId}
                        onMouseEnter={(e) =>
                          setPopup({
                            data: apartment,
                            open: true,
                            x: e.clientX + 10,
                            y: e.clientY + 10,
                          })
                        }
                        onMouseLeave={() =>
                          setPopup({
                            x: 0,
                            y: 0,
                            open: false,
                            data: {},
                          })
                        }
                        onClick={() => {
                          navigate(`/commercial/unit/${apartment.id}`);
                        }}
                      />
                    );
                  }
                  if (apartment.pointsType === "polygon") {
                    return (
                      <polygon
                        key={apartment.id}
                        points={apartment.path}
                        className={"parking-available"}
                        id={apartment.apartmentId}
                        onClick={() => navigate(`/commercial/unit/${apartment.id}`)}
                      />
                    );
                  }
                })}
              </svg>
            </div>
          ))}
        </div>
      </div>
      <ContextMenuCommercialStore menu={contextMenu} setMenu={setContextMenu} />
      <AdmCommercialStoreModal />
    </div>
  );
};

export default Commercial;