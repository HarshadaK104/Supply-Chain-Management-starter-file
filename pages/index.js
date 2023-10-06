import React, {useState,useEffect,useContext} from "react";
import CompleteShipment from "../Components/CompleteShipment";

import {
  Table,
  Form,
  Services,
  Profile,
  completeShipment,
  GetShipment,
  StartShipment,

} from "../Components/index";

import { TrackingContext} from "../Conetxt/Tracking";

const index = () => {
  const {
    currentUser,
    createShipment,
    getAllShipment,
    compeleteShipment,
    getShipment,
    startShipment,
    getShipmentsCount
  } = useContext(TrackingContext);

  //STATE VARIABLE
  const [createShipmentModel, setCreateShipmentModel] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [startModal, setStartModal] = useState(false);
  const [completeModal, setCompleteModal] = useState(false);
  const [getModel, setGetModel] = useState(false);

  // DATA STATE VARIABLE
  const [allShipmentsdata, setallShipmentsdata] = useState();

  useEffect(() => {
    const getCampaignsData = getAllShipment();

    return async () => {
      const allData = await getCampaignsData;
      setallShipmentsdata(allData);
    };
  }, []);

  return (
    <>
    <Services
      setOpenProfile={setOpenProfile}
      setCompleteModal={setCompleteModal}
      setGetModel={setGetModel}
      setStartModal={setStartModal}
      />

      <Table
      setCreateShipmentModel = {setCreateShipmentModel}
      allShipmentsdata={allShipmentsdata}
      />

      <Form
      createShipmentModel={createShipmentModel}
      createShipment={createShipment}
      setCreateShipmentModel={setCreateShipmentModel}
      />

      <Profile
      openProfile={openProfile}
      setOpenProfile={setOpenProfile}
      currentUser={currentUser}
      getShipmentsCount={getShipmentsCount}
      />

      <compeleteShipment
      completeModal={completeModal}
      setCompleteModal={setCompleteModal}
      compeleteShipment={compeleteShipment}
      />

      <GetShipment
      getModel={getModel}
      setGetModel={setGetModel}
      getShipment={getShipment}
      />

      <StartShipment
      startModal={startModal}
      setStartModal={setStartModal}
      startShipment={startShipment}
      />
    </>
  );
};

export default index;
