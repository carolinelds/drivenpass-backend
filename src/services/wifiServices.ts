import Cryptr from "cryptr";
import "./../setup.js";
import { WifiNetworks } from "@prisma/client";
import errorResponses from "./../responses/errorResponses.js";
import wifiRepository from "../repositories/wifiRepository.js";

export type CreateWifiData = Omit<WifiNetworks, "id">;

async function createWifi(idUser: number, name: string, title: string, password: string){

    const cryptr = new Cryptr(process.env.CRYPTR_SECRET);
    const encryptedPassword = cryptr.encrypt(password);

    const newWifi: CreateWifiData = {
        idUser,
        name,
        title,
        password: encryptedPassword
    };

    await wifiRepository.addNewWifi(newWifi);
};

async function getWifiByUserId(idUser: number){
    const result = await wifiRepository.findByUserId(idUser);

    if (result.length === 0){
        return errorResponses.notFound("Wifi networks for this user");
    };

    const cryptr = new Cryptr(process.env.CRYPTR_SECRET);
    for (let r in result){
        result[r].password = cryptr.decrypt(result[r].password);
    };

    return result;
};

async function getWifiByIdAndUserId(id: number, idUser: number){
    const result = await wifiRepository.findByIdAndUserId(id, idUser);
    if (!result){
        return errorResponses.notFound("This wifi network for this user was");
    };

    const cryptr = new Cryptr(process.env.CRYPTR_SECRET);
    result.password = cryptr.decrypt(result.password);

    return result;
};

async function deleteWifi(id: number, idUser: number){
    const checkExists = await wifiRepository.findByIdAndUserId(id, idUser);
    if (!checkExists){
        return errorResponses.notFound("This wifi network for this user was");
    }

    await wifiRepository.deleteById(id);
};


const wifiServices = {
    createWifi,
    getWifiByUserId,
    getWifiByIdAndUserId,
    deleteWifi
};

export default wifiServices;