import React, { useEffect, useState } from "react";
import { getApartmentDetailModalData } from "../../features/apartment/ApartmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { getApartmentById } from "../../features/apartment/ApartmentAPI";
import { homepage, orientationImgPath, pdfPath, planmetricImageUrl } from "../../utils/consts";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { TfiClose } from "react-icons/tfi";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { PiPhoneThin } from "react-icons/pi";
import {
  getWishlistCount,
  handleWishlistData,
  isProductInWishlist,
} from "../../features/wishList/WishlistSlice";
import { PriceCard } from "../";
import "./style.css";

const SingleApartment = () => {
  const isSmallDev = window.innerWidth < 700;
  const [selectedTab, setSelectedTab] = useState("3d");
  const [isPriceCardVisible, setIsPriceCardVisible] = useState(false);

  const apartment = useSelector(getApartmentDetailModalData);
  const wishListItemCount = useSelector(getWishlistCount);
  const isInWishlist = useSelector((state) =>
    isProductInWishlist(state, apartment.id)
  );
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getApartmentById(id));
    }
  }, [dispatch, id]);

  const handleWishlistDataFunction = () => {
    dispatch(handleWishlistData(apartment));
  };

  const {
    isSold,
    imageUrl,
    image3dUrl,
    pdfUrl,
    square,
    floorNumber,
    name,
    balconySquare,
    subtitle,
    rooms,
    apartmentId,
    apartmentNumber,
    apartmentPositionImageUrl,
    vtourUrl,
  } = apartment;

  const handleTabClick = (view) => {
    setSelectedTab(view);
  };

  const togglePriceCard = () => {
    setIsPriceCardVisible(!isPriceCardVisible);
  };

  const handleOpenPdf = (pdfUrl) => {
    window.open(`${pdfPath}${pdfUrl}`, '_blank');
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full h-full bg-brand flex justify-center text-white pt-4 pb-8 md:pb-24">
        <div className="w-11/12 md:w-5/6 flex flex-col justify-center content-center gap-4 md:gap-10">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-xl md:text-2xl certon">
              Objekti: {apartmentNumber}
            </h1>
            <div className="flex gap-4">
              <button
                onClick={handleWishlistDataFunction}
                className="bg-transparent border border-gold transition-all duration-75 hover:text-bck w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center"
              >
                {isInWishlist ? (
                  <IoIosHeart className="fill-gold text-2xl" />
                ) : (
                  <IoIosHeartEmpty className="fill-gold text-2xl" />
                )}
              </button>
              <button
                onClick={() => navigate(-1)}
                className="bg-gold transition-all duration-.3s  hover:text-bck w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center"
              >
                <TfiClose className="fill-white" />
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-between mt-10 md:mt-0 md:mb-10 gap-4 md:gap-0 md:items-center">
            <h1 className="text-gold text-[28px] md:text-5xl certon">
              Apartamenti:{" "}
              <span className="certon text-white">
                {apartmentNumber}-{name}
              </span>
            </h1>
            <div className="flex gap-4">
              <button
                className="w-full py-2 px-12 bg-gold rounded-full text-nowrap"
                onClick={togglePriceCard}
              >
                Pyet për cmimin
              </button>
              <button
                onClick={() => {
                  handleOpenPdf(pdfUrl);
                }}
                className="hidden md:block py-2 px-12 w-full border-gold border bg-brandD rounded-full text-nowrap">
                Shkarko Pdf
              </button>
            </div>
          </div>
          <div className="flex flex-row flex-wrap justify-start md:justify-between mb-4 md:mb-0">
            <div className="flex flex-col gap-1 md:gap-2 w-1/3 md:w-1/6 text-center justify-center items-center">
              <img
                src="/assets/svgs/keys.png"
                alt=""
                className="h-10 md:h-14"
              />
              <p className="text-sm md:text-lg">Dhoma</p>
              <h1 className="text-lg md:text-4xl mb-4 md:mb-0 certon">
                {rooms} + 1
              </h1>
            </div>
            <div className="flex flex-col gap-1 md:gap-2 w-1/3 md:w-1/6 text-center justify-center items-center">
              <img
                src="/assets/svgs/floor.png"
                alt=""
                className="h-10 md:h-14"
              />
              <p className="text-sm md:text-lg">Kati</p>
              <h1 className="text-lg md:text-4xl mb-4 md:mb-0 certon">
                {floorNumber}
              </h1>
            </div>
            <div className="flex flex-col gap-1 md:gap-2 w-1/3 md:w-1/6 text-center justify-center items-center">
              <img src="/assets/svgs/tot.png" alt="" className="h-10 md:h-14" />
              <p className="text-sm md:text-lg">Sipërfaqja</p>
              <h1 className="text-lg md:text-4xl mb-4 md:mb-0 certon">
                {square}m<sup>2</sup>
              </h1>
            </div>
            <div className="flex flex-col gap-1 md:gap-2 w-1/3 md:w-1/6 text-center justify-center items-center">
              <img
                src="/assets/svgs/square.png"
                alt=""
                className="h-10 md:h-14"
              />
              <p className="text-sm md:text-lg">Terasa</p>
              <h1 className="text-lg md:text-4xl mb-4 md:mb-0 certon">
                {balconySquare}m<sup>2</sup>
              </h1>
            </div>
            <div className="flex flex-col gap-1 md:gap-2 w-1/3 md:w-1/6 text-center justify-center items-center">
              <img
                src="/assets/svgs/type.png"
                alt=""
                className="h-10 md:h-14"
              />
              <p className="text-sm md:text-lg">Sip. totale</p>
              <h1 className="text-lg md:text-4xl mb-4 md:mb-0 certon">
                {(square + balconySquare).toFixed(2)}m<sup>2</sup>
              </h1>
            </div>

          </div>
        </div>
      </div>
      <div className="relative w-11/12 md:w-5/6 flex flex-col  justify-center items-start md:items-center mt-2 md:mt-10">
        <div className="w-full flex items-center justify-between md:justify-center">
          <button
            onClick={() => {
              if (!apartment.vtourUrl || apartment.vtourUrl === "null") {
                toast.warning(`Momentalisht nuk eshte ne dispozicion`);
                return;
              }
              window.open(`${apartment.vtourUrl}`, "_blank");
            }}
            className="md:hidden border-dark border rounded-full py-2 px-6 text-sm text-nowrap certon text-text">
            360° Vr Tour
          </button>
          <div className="tabs">
            <input
              type="radio"
              id="radio-1"
              name="tabs"
              checked={selectedTab === "3d"}
            />
            <label
              className="tab certon"
              onClick={() => {
                handleTabClick("3d");
              }}
              htmlFor="radio-1"
              style={{ fontSize: isSmallDev ? "12px" : "16px" }}
            >
              3D
            </label>
            <input
              type="radio"
              id="radio-2"
              name="tabs"
              checked={selectedTab === "2d"}
            />
            <label
              className="tab certon"
              onClick={() => {
                handleTabClick("2d");
              }}
              htmlFor="radio-1"
              style={{ fontSize: isSmallDev ? "12px" : "16px" }}
            >
              2D
            </label>
            {isSmallDev ? (
              <></>
            ) : (
              <>
                <input
                  type="radio"
                  id="radio-3"
                  name="tabs"
                  checked={selectedTab === "vrtour"}
                />
                <label
                  className="tab certon"
                  onClick={() => {
                    if (!apartment.vtourUrl || apartment.vtourUrl === "null") {
                      toast.warning(`Momentalisht nuk eshte ne dispozicion`);
                      return;
                    }
                    window.open(`${apartment.vtourUrl}`, "_blank");
                  }}
                  htmlFor="radio-3"
                  style={{ fontSize: isSmallDev ? "12px" : "16px" }}
                >
                  360° Vr Tour
                </label>
              </>
            )}
          </div>
        </div>
        <div className="hidden md:block absolute top-0 -right-28">
          <img
            src={`${homepage}${orientationImgPath}${apartmentPositionImageUrl}-orientimi.png`}
            alt=""
            className="h-52 object-contain"
          />
        </div>
        <img
          src={
            selectedTab === "2d"
              ? `${homepage}${planmetricImageUrl}${imageUrl}`
              : `${homepage}${planmetricImageUrl}${image3dUrl}`
          }
          alt="Apartment view"
          className="h-[500px] md:h-[1000px] object-contain"
          style={{
            cursor: "pointer",
          }}
        />
        <div className="md:hidden w-full flex flex-col items-start justify-between">
          <h1 className="text-brand text-xl md:text-5xl certon">Orientim:</h1>
          <img
            src={`${homepage}${orientationImgPath}${apartmentPositionImageUrl}-orientimi.png`}
            alt=""
            className="block md:hidden h-42  object-contain"
          />
        </div>
      </div>
      <div className="md:hidden bg-brand w-full h-full py-6 flex justify-center mt-0 md:mt-10">
        <div className="md:hidden w-11/12 flex gap-4 justify-between">
          <button className="p-2 border-gold border rounded-full text-gold">
            <PiPhoneThin className="text-3xl" />
          </button>
          <button
            onClick={() => {
              handleOpenPdf(pdfUrl);
            }}
            className="w-full py-2 border-gold border bg-brandD rounded-full text-gold text-nowrap certon flex items-center justify-center gap-4">
            {" "}
            <img src="/assets/icons/pdf.png" alt="" className="h-6" /> Shkarko
            Pdf
          </button>
        </div>
      </div>
      {isPriceCardVisible && <PriceCard onClose={togglePriceCard} />}
    </div>
  );
};

export default SingleApartment;
