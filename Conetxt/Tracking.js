import React, {useState, useEffect} from 'react';
import web3Modal from "web3modal";
import { ethers } from 'ethers';

//INTERNAL IMPORT
import tracking from "./Tracking.json";
import { requestToBodyStream } from 'next/dist/server/body-streams';
const ContractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
const ContractABI = tracking.abi;

//---FETCHING SMART CONTRACT
const fetchContract = (signerOrProvider) =>
new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);

export const TrackingContext = React.createContext();

export const TrackingProvider = ({children}) => {
    //STATE VARIABLE
    const DappName = "Product Tracking Dapp";
    const [currentUser, setCurrentUser]= useState("");

    const createShipment = async (items) => {
        console.log(items);
        const {receiver, pickupTime, distance, price} = items;

        try{
            const web3Modal = new web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);
            const createItem = await contract.createShipment(
                receiver,
                new Date(pickupTime).getTime(),
                distance,
                ethers.utils.parseUnits(price, 18),
                {
                    value: ethers.utils.parseUnits(price, 18),
                }
            );
            await createItem.wait();
            console.log(createItem);
        }
        catch(error){
            console.log("Something went wrong",error);
        }
    };

    const getAllShipment = async () => {
        try{
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);

            const shipments = await contract.getAllTransactions();
            const allShipments = shipments.map((shipment) => ({
                sender: shipment.sender,
                receiver: shipment.receiver,
                price: ethers.utils.formatEther(shipment.price.toString()),
                pickupTime: shipment.pickupTime.toNumber(),
                deliveryTime: shipment.deliveryTime.toNumber(),
                distance: shipment.distance.toNumber(),
                isPaid: shipment.isPaid,
                status: shipment.status,
            }));

            return allShipments;
        }
        catch(error){
            console.log("error want, getting shipment");
        }
    };

    const getAllShipmentsCount = async() => {
        try{
            if (!window.ethereum) return "Install MetaMask";

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            const provider = new ethers.providers.JsonRpcProvider();
            const contract = fetchContract(provider);
            const getAllShipmentsCount = await contract.getAllShipmentsCount(accounts[0]);
            return getAllShipmentsCount.toNumber();
        }
        catch(error){
            console.log("error want, getting shipment");
        }
    };

    const completeShipment = async (completeShip) => {
        console.log(completeShip);

        const {receiver, index} = completeShip;

        try{
            if (!window.ethereum) return "Install MetaMask";
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const transaction = await contract.completeShipment(
                accounts[0],
                receiver,
                index,
                {
                    gasLimit: 300000,
                }
            );

            transaction.wait();
            console.log(transaction);
        }
        catch(error){
            console.log("wrong completeShipment",error);
        }
    };

    const getShipment = async (index) => {
        console.log(index * 1);
        try {
           if (!window.ethereum) return "Install MetaMask";
           
           const accounts = await window.ethereum.request({
            method: "eth_accounts",
           });

           const provider = new ethers.providers.JsonRpcProvider();
           const contract = fetchContract(provider);
           const shipment = await contract.getShipment(accounts[0], index * 1);

           const SingleShiplent = {
            sender: shipment[0],
            receiver: shipment[1],
            pickupTime: shipment[2].toNumber(),
            deliveryTime: shipment[3].toNumber(),
            distance: shipment[4].toNumber(),
            price: ethers.utils.formatEther(shipment[5].toString()),
            status: shipment[6],
            isPaid: shipment[7],
           };

           return SingleShiplent;
        }
        catch(error){
            console.log("Sorry no chipment");
        }
    };

    const startShipment = async (getProduct) => {
        const {receiver, index} = getProduct;
        
        try{
            if (!window.ethereum) return "Install MetaMask";
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            const signer = provider.getSigner();
            const contract = fetchContract(signer);

            const transaction = await contract.completeShipment(
                accounts[0],
                receiver,
                index*1
            );

            shipment.wait();
            console.log(shipment);
        }
        catch(error){
            console.log("Sorry no shipment",error);
        }
    };

    //---CHECK WALLET CONNECTED 
    const checkIfWalletConnected = async () => {
        try{
            if (!window.ethereum) return "Install MetaMask";

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            if (accounts.length){
                setCurrentUser(accounts[0]);
            }
            else{
                return "No account";
            }
        }
        catch(error){
            return "not connected";
        }
    };

    //---CONNECT WALLET FUNCTION
    const connectWallet = async () => {
        try{
            if (!window.ethereum) return "Install MetaMask";

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            setCurrentUser(accounts[0]);

        }
        catch(error){
            return "Something went wrong";
        }
    };

    useEffect(()=> {
        checkIfWalletConnected();
    },[]);

    return(
        <TrackingContext.Provider
        value={{
            connectWallet,
            createShipment,
            getAllShipment,
            completeShipment,
            getShipment,
            startShipment,
            getAllShipmentsCount,
            DappName,
            currentUser,
        }}
        >
            {children}
        </TrackingContext.Provider>
    );
    
};