import {use, useState} from "react";

export default ({ getModel, seyGetModel, getShipment}) => {
  const [index, setIndex] = useState(0);
  const [singleShipmentData, setSingleShipmentData] = useState();

  const getShipmentData = async () => {
    const getData = await getShipment(index);
    setSingleShipmentData(getData);
    console.log(getData);
  };
  console.log(singleShipmentData);

  const converTime = (time) => {
    const newTime = new Date(time);
    const dataTime = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(newTime);

    return dataTime;
  };

  return getModel ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="fixed inset-0 w-full h-full bg-black opacity-40"
      onClick={() => setGetModel(false)}></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="flex justify-end">
            <button
            className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
            onClick={() => setGetModel(false)}>
             <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mx-auto"
              viewBox="0 0 20 20"
              fill="currentColor">

                <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 oL10 8.586l4.293-4.293a1 1 0 111.414 1.
                414L11.414 10L4.293 4.293A1 1 0 01-1.414 1.141L10 11.414l-4.293 4.
                293a1 1 0 01-1.414-1.414L9.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};
