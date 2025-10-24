import React, { useEffect, useState } from "react";
import { ViewProject } from "../components";

const HomePage = () => {
  const [showModal, setShowModal] = useState(true);
  const [gender, setGender] = useState(null);



  const selectGender = (g) => {
    setGender(g);
    
    if (g === 'male') {

      setShowModal(false);
    }

  };

  return (
    <div className="[&_*]:font-montserrat">
      <ViewProject />

      {/* Gender modal (Tailwind) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50"
            aria-hidden="true"
            // onClick={() => setShowModal(false)}
          />

          <div className="relative z-10 w-full max-w-lg mx-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
           { gender === 'female' ? <div className="p-6"><h1>
            Nuk eshte per gjinine femerore. Merruni me pune te juaja kapeni fshisen
            </h1></div> :   <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">Tell us your gender</h2>
                <p className="text-sm text-gray-600 mb-4">This helps us personalize content for you.</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => selectGender("male")}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Male
                  </button>

                  <button
                    onClick={() => selectGender("female")}
                    className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
                  >
                    Female
                  </button>

                  <button
                    onClick={() => selectGender("other")}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                  >
                    Other
                  </button>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => {
                      try {
                        localStorage.setItem("gender", "not-specified");
                      } catch (e) {}
                      setShowModal(false);
                    }}
                    className="text-sm text-gray-500 hover:underline"
                  >
                    Prefer not to say
                  </button>

                  <button
                    onClick={() => setShowModal(false)}
                    className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
                  >
                    Close
                  </button>
                </div>
              </div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
