import React, { useState } from "react";


const CommercialFilter = ({ onFilterChange, floor, onFloorChange, floors = [1, 2] }) => {

    const resetFilters = () => {
        onFilterChange([]);
        if (onFloorChange) onFloorChange(1);
    };

    return (
        <div className="bg-white w-full h-full flex flex-col md:flex-row items-center justify-center pt-6">
            <div className="w-11/12 md:w-5/6 flex flex-col md:flex-row items-start md:items-center gap-5 justify-center relative">
                <div className="flex flex-col items-start">
                    <h3 className="text-base font-semibold montserrat mb-2">Kati</h3>
                    <div className="flex space-x-2">
                        {floors.map((f) => (
                            <button
                                key={String(f)}
                                className={`px-4 py-2 border rounded-md ${String(f) === String(floor) ? 'bg-primary text-black' : 'bg-white'}`}
                                onClick={() => {
                                    if (onFloorChange) onFloorChange(Number(f));
                                }}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommercialFilter;