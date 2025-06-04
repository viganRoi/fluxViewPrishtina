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
    window.open(`${pdfPath}${pdfUrl}`, "_blank");
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full h-full bg-white flex justify-center text-brand pt-4 pb-8 md:pb-24">
        <div className="w-11/12 md:w-5/6 flex flex-col justify-center content-center gap-4 md:gap-10">
          <div className="w-full flex justify-between items-center">
            <div className="w-full flex gap-4 items-center">
              <button className=" border-brand text-black rounded-full h-12 w-12 flex items-center justify-center">
                <img src="/assets/icons/arrowup.svg" alt="" />
              </button>
              <h3 className="text-black text-[18px] montserrat">Kthehu Pas</h3>
            </div>

            <div className="w-full flex justify-end items-center">
              <button className="text-black text-[16px]  border border-black rounded-full px-6 py-2 montserrat hover:bg-black hover:text-white transition-all duration-500">
                Shiko te gjitha apartamentet
              </button>
            </div>
          </div>

          <div className="w-full flex h-full justify-center bg-white items-center ">
            <div className="w-full flex flex-col gap-2 flex-[4]">
              <div className=" border-b border-black  w-5/6">
                {" "}
                <h1 className="text-brand leading-none  text-[134px] montserrat font-bold">
                  A1{" "}
                  <span className="text-black text-[24px] font-normal">
                    Apartamenti
                  </span>
                </h1>
              </div>

              <div className="w-full flex flex-col gap-2 ">
                <div className="flex w-5/6 border-b py-4 border-slate-300 text-[18px] text-black items-center gap-2">
                  <img
                    className="w-[35px] "
                    src="/assets/icons/key-s.svg"
                    alt=""
                  />{" "}
                  Dhoma: 3+1
                </div>

                <div className="flex w-5/6 border-b py-4 border-slate-300 text-[18px] text-black items-center gap-2">
                  <img
                    className="w-[35px] "
                    src="/assets/icons/floor.svg"
                    alt=""
                  />{" "}
                  Kati: 1
                </div>

                <div className="flex w-5/6 border-b py-4 border-slate-300 text-[18px] text-black items-center gap-2">
                  <img
                    className="w-[35px] "
                    src="/assets/icons/sip.svg"
                    alt=""
                  />{" "}
                  Sipërfaqja: 99.34m²
                </div>

                <div className="flex  border-b py-4 border-slate-300 text-[18px] text-black items-center gap-2">
                  <img
                    className="w-[35px] "
                    src="/assets/icons/terrace.svg"
                    alt=""
                  />{" "}
                  Terraca: 10.23m²
                </div>

                <div className="flex  py-4 border-slate-300 text-[18px] font-black text-black montserrat items-center gap-2">
                  <img
                    className="w-[35px] "
                    src="/assets/icons/siptotal.svg"
                    alt=""
                  />{" "}
                  Siperfaqja totale:{" "}
                  <span className="text-brand">
                    109.57 m<sup>2</sup>
                  </span>
                </div>
              </div>

              <div className="w-full flex flex-col gap-4">
                <button className="w-full px-4 py-2 bg-black text-brand hover:bg-brand hover:text-black transition-all duration-500 montserrat rounded-full">
                  Rezervo një takim
                </button>
                <button className="w-full px-4 py-2 border border-brand text-black hover:bg-brand montserrat transition-all duration-500 rounded-full">
                  Shkarko PDF
                </button>
              </div>
            </div>
            <div className="w-full flex h-full flex-col justify-start items-start gap-2 flex-[8]">
              <div className="w-full flex justify-center items-center gap-4 ">
                <div className="w-fit px-2 bg-[#D2D6D7]  flex items-center border border-brand rounded-full justify-between md:justify-center">
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
                    className="md:hidden border-dark border rounded-full py-2  px-6 text-sm text-nowrap montserrat text-text"
                  >
                    360° Vr Tour
                  </button>
                  <div className="tabs" style={{ backgroundColor: "#D2D6D7" }}>
                    <input
                      type="radio"
                      id="radio-1"
                      name="tabs"
                      checked={selectedTab === "3d"}
                    />
                    <label
                      className="tab montserrat"
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
                      className="tab montserrat"
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
                          className="tab montserrat"
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
                <img src="/assets/images/planimetria.png" alt="" />
                <div className="absolute flex flex-col justify-center items-center bottom-10 -right-6  ">
                  <h3 className="text-[12px] text-black font-semibold">
                    Orientimi
                  </h3>
                  <img
                    className="w-4/5"
                    src="/assets/images/orientimi.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
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
            className="w-full py-2 border-gold border bg-brandD rounded-full text-gold text-nowrap montserrat flex items-center justify-center gap-4"
          >
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
