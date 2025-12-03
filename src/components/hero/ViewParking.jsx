import { useState } from "react";
import { commercialArea } from "../../utils/server";
import { useNavigate } from "react-router-dom";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const ViewParking = () => {
    const navigate = useNavigate();
    const isSmallDev = window.innerWidth < 700;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hoveredId, setHoveredId] = useState(null);
    const [activeButton, setActiveButton] = useState("building");

    const handleButtonClick = (filter) => {
        setActiveButton(filter);
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % commercialArea.length);
    };

    const handlePrevious = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + commercialArea.length) % commercialArea.length
        );
    };

    const currentBuilding = commercialArea[currentIndex];

    const getSvgHeight = () => {
        return "100%";
    };

    return (
        <div className="relative bg-brand w-full h-[110vh] md:min-h-[1080px] flex flex-col items-center justify-center">
            <div className="relative bg-brand w-full h-full flex flex-col justify-center items-center overflow-x-auto md:overflow-x-hidden">
                <h1 className="hidden md:block md:absolute top-20 text-white z-20 font-semibold text-2xl md:text-5xl bg-primary/60 p-4 rounded-lg">
                Zgjedh vendparkimin
                </h1>
                <div
                    className="absolute md:relative w-full flex items-center justify-center"
                    style={{ height: getSvgHeight() }}
                >
                    <div
                        style={{
                            transition: "opacity 0.1s ease-in-out",
                            height: getSvgHeight(),
                            width: isSmallDev ? "350%" : "100%",
                            position: "absolute",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            overflow: isSmallDev ? "auto" : "hidden",
                            top: 0,
                            left: 0,
                            zIndex: 1,
                        }}
                    >
                        <svg
                            x="0px"
                            y="0px"
                            viewBox="0 0 1920 1080"
                            height={isSmallDev ? "" : "100%"}
                            width={"100%"}
                            xmlSpace="preserve"
                            preserveAspectRatio="xMidYMid slice"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <image
                                href={currentBuilding.image}
                                alt={currentBuilding.name}
                                width="100%"
                                height="100%"
                            />
                            {currentBuilding.points.map((point, idx) => (
                                <path
                                    key={`${currentBuilding.id}-${point.name}-${idx}`}
                                    className={['a', 'b', 'e', 'f'].includes(point.name) ? 'sold' : 'available'}
                                    d={point.path}
                                    onClick={() => {
                                        if (['n1', 'n2'].includes(point.name)) {
                                            navigate(`/parking/${point.name}`);
                                        }
                                    }}
                                    style={{
                                        cursor: 'pointer'
                                    }}
                                />
                            ))}
                        </svg>
                    </div>
                </div>
            </div>
            <div className="absolute w-screen h-48 bg-brand bottom-0 z-0"></div>
            <div className="absolute w-11/12 flex justify-end items-center bottom-10 z-10">
                <div className="right-0 top-12 flex justif-center items-center gap-2 md:gap-4">
                    <button
                        onClick={handlePrevious}
                        className="bg-gold transition-all duration-.3s hover:text-bck w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center"
                    >
                        <SlArrowLeft color="var(--brand-color)" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="bg-gold transition-all duration-.3s  hover:text-bck w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center"
                    >
                        <SlArrowRight color="var(--brand-color)" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewParking;
