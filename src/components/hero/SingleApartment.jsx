import React, { useEffect, useState } from "react";
import { getApartmentDetailModalData } from "../../features/apartment/ApartmentSlice";
import { useDispatch, useSelector } from "react-redux";
import { getApartmentById } from "../../features/apartment/ApartmentAPI";
import {
  homepage,
  orientationImgPath,
  pdfPath,
  planmetricImageUrl,
} from "../../utils/consts";
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
import { ArrowLeft, Key } from "@mui/icons-material";

const SingleApartment = () => {
  const isSmallDev = window.innerWidth < 700;
  const [selectedTab, setSelectedTab] = useState("2d");
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
    window.open(`${pdfPath}${pdfUrl}`, "_blank");
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center  overflow-x-hidden">
      <div className="w-full h-full bg-white flex justify-center text-brand pt-4 pb-8 md:pb-24">
        <div className="w-11/12 md:w-5/6 flex flex-col justify-center content-center gap-4 md:gap-10">
          <div className="w-full flex justify-between items-center">
            <div className="w-full flex gap-4 items-center">
              <button
                onClick={() => navigate(-1)}
                className=" border-brand text-black rounded-full h-12 w-12 flex items-center justify-center"
              >
                <img src="/assets/icons/arrowup.svg" alt="" />
              </button>
              <h3 className="text-black text-[14px] md:text-[18px] circe">
                Kthehu Pas
              </h3>
            </div>

            <div className="w-full flex justify-end items-center">
              <button className="text-black text-[14px] md:text-[16px] text-nowrap  border border-black rounded-full px-6 py-2 circe hover:bg-black hover:text-white transition-all duration-500">
                Shiko te gjitha apartamentet
              </button>
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row h-full justify-center mt-6 md:mt-0 bg-white items-center ">
            <div className="w-full flex  flex-col gap-2 flex-[3]">
              <div className=" border-b border-black  w-full">
                {" "}
                <h1 className="text-brand leading-none  text-[40px] md:text-[50px] montserrat font-bold">
                  {(
                    parseFloat(apartment.square) +
                    parseFloat(apartment.balconySquare)
                  ).toFixed(2)}{" "}
                  <sup>2</sup>{" "}
                  <span className="text-black circe text-[20px] font-normal">
                    Sip Totale
                  </span>
                </h1>
              </div>

              <div className="w-full flex flex-col gap-2 ">
                <div className="flex justify-between w-full  border-b py-4 border-slate-300  text-[16px] md:text-[18px] text-black items-center gap-2">
                  {/* <img
                    className="w-[35px] "
                    src="/assets/icons/key-s.svg"
                    alt=""
                  />{" "} */}
                  <h2 className="circe">Dhoma</h2>
                  <h2 className="font-semibold">{apartment.rooms}</h2>
                </div>

                <div className="flex w-full border-b py-4 border-slate-300 justify-between text-[16px] md:text-[18px] text-black items-center gap-2">
                  {/* <img
                    className="w-[35px] "
                    src="/assets/icons/floor.svg"
                    alt=""
                  />{" "} */}
                  <h2 className="circe">Kati</h2>
                  <h2 className="font-semibold">{apartment.floorNumber}</h2>
                </div>

                <div className="flex w-full border-b py-4 border-slate-300 justify-between text-[16px] md:text-[18px] text-black items-center gap-2">
                  {/* <img
                    className="w-[35px] "
                    src="/assets/icons/sip.svg"
                    alt=""
                  />{" "} */}
                  <h2 className="circe">Sipërfaqja</h2>
                  <h2 className="font-semibold">
                    {apartment.square}
                    <sup>2</sup>
                  </h2>
                </div>

                <div className="flex  border-b py-4 border-slate-300 justify-between text-[16px] md:text-[18px] text-black items-center gap-2">
                  {/* <img
                    className="w-[35px] "
                    src="/assets/icons/terrace.svg"
                    alt=""
                  />{" "} */}
                  <h2 className="circe">Terraca</h2>
                  <h2 className="font-semibold">
                    {apartment.balconySquare}m<sup>2</sup>
                  </h2>
                </div>

                <div className="flex  py-4 border-slate-300 text-[28px] font-semibold text-black montserrat items-center gap-2">
                  {/* <img
                    className="w-[35px] "
                    src="/assets/icons/siptotal.svg"
                    alt=""
                  />{" "} */}
                  <h1 className="circe">
                    {apartment.name}{" "}
                    <span className="text-brand">Apartamenti</span>
                  </h1>
                </div>
              </div>

              <div className="w-full flex md:flex-col gap-4">
                <button className="w-full px-4 py-2 bg-black text-brand hover:bg-brand hover:text-black transition-all duration-500 circe rounded-full">
                  Rezervo një takim
                </button>
                <button
                  onClick={() => window.open(`${pdfPath}${pdfUrl}`, "_blank")}
                  className="w-full px-4 py-2 border border-brand text-black hover:bg-brand circe transition-all duration-500 rounded-full"
                >
                  Shkarko PDF
                </button>
              </div>
            </div>
            <div className="w-full flex h-full flex-col justify-start items-start gap-2 mt-6 md:mt-0 flex-[8]">
              <div className="w-full flex justify-center items-center gap-4 ">
                <div className="w-fit py-1 px-1  gap-2 bg-[#e9e9e9] flex items-center border-brand rounded-full justify-between md:justify-center">
                  <button
                    onClick={() => {
                      if (
                        !apartment.vtourUrl ||
                        apartment.vtourUrl === "null"
                      ) {
                        toast.warning(`Momentalisht nuk eshte ne dispozicion`);
                        return;
                      }
                      window.open(`${apartment.vtourUrl}`, "_blank");
                    }}
                    className="md:hidden border-dark border rounded-full py-2 px-6 text-sm text-nowrap circe text-text"
                  >
                    360° Vr Tour
                  </button>
                  <div
                    className="tabs gap-1"
                    style={{ backgroundColor: "#e9e9e9" }}
                  >
                    <input
                      type="radio"
                      id="radio-1"
                      name="tabs"
                      checked={selectedTab === "3d"}
                    />
                    <label
                      className="tab circe"
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
                      className="tab circe"
                      onClick={() => {
                        handleTabClick("2d");
                      }}
                      htmlFor="radio-1"
                      style={{ fontSize: isSmallDev ? "12px" : "16px" }}
                    >
                      2D
                    </label>

                    <input
                      type="radio"
                      id="radio-3"
                      name="tabs"
                      checked={selectedTab === "onFloor"}
                    />
                    <label
                      className="tab circe mr-2"
                      onClick={() => {
                        handleTabClick("onFloor");
                      }}
                      htmlFor="radio-1"
                      style={{ fontSize: isSmallDev ? "12px" : "16px" }}
                    >
                      On Floor
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
                          className="tab circe pr-2"
                          onClick={() => {
                            if (
                              !apartment.vtourUrl ||
                              apartment.vtourUrl === "null"
                            ) {
                              toast.warning(
                                `Momentalisht nuk eshte ne dispozicion`
                              );
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

                <div className="w-fit px-2 flex items-center gap-2  md:justify-center">
                  <button className="">
                    <img src="/assets/icons/share.svg" alt="" />
                  </button>
                  <button className="">
                    <img src="/assets/icons/heart.svg" alt="" />
                  </button>
                </div>
              </div>
              <div className="w-full  relative flex justify-center items-center">
                {selectedTab === "3d" && (
                  <img
                    className="w-[90%]"
                    src={
                      `${homepage}${planmetricImageUrl}${apartment?.image3dUrl}` ||
                      "/projektet/assets/images/planimetria.png"
                    }
                    alt="3D View"
                  />
                )}
                {selectedTab === "2d" && (
                  <img
                    className="w-[70%]"
                    src={
                      `${homepage}${planmetricImageUrl}${apartment?.imageUrl}` ||
                      "/projektet/assets/images/planimetria.png"
                    }
                    alt="2D View"
                  />
                )}
                {selectedTab === "onFloor" && (
                  <img
                    className="w-[90%] p-14"
                    src="/assets/images/onfloor.png"
                    alt="On Floor View"
                  />
                )}
                <div className="absolute flex flex-col justify-center items-center -bottom-4 md:bottom-10 -right-10 md:-right-6   ">
                  <h3 className="text-[12px] text-black font-semibold">
                    Orientimi
                  </h3>
                  <img
                    className="w-1/2 md:w-4/5"
                    src="/assets/images/orientimi.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="md:hidden bg-brand w-full h-full py-6 flex justify-center mt-0 md:mt-10">
        <div className="md:hidden w-11/12 flex gap-4 justify-between">
          <button className="p-2 border-gold border rounded-full text-gold">
            <PiPhoneThin className="text-3xl" />
          </button>
          <button
            onClick={() => {
              handleOpenPdf(pdfUrl);
            }}
            className="w-full py-2 border-gold border bg-brandD rounded-full text-gold text-nowrap montserrat flex items-center justify-center gap-4"
          >
            {" "}
            <img src="/assets/icons/pdf.png" alt="" className="h-6" /> Shkarko
            Pdf
          </button>
        </div>
      </div> */}
      {isPriceCardVisible && <PriceCard onClose={togglePriceCard} />}
    </div>
  );
};

export default SingleApartment;
