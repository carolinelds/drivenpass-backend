import prisma from "./../config/database.js";
import { CreateWifiData } from "../services/wifiServices.js";

async function addNewWifi(newWifi: CreateWifiData){
    await prisma.wifiNetworks.create({
        data: newWifi
    });
};

async function findByUserId(idUser: number){
    const result = await prisma.wifiNetworks.findMany({
        where: {
            idUser
        }
    });
    return result;
};

async function findByIdAndUserId(id: number, idUser: number){
    const result = await prisma.wifiNetworks.findFirst({
        where: {
            id,
            idUser
        }
    });
    return result;
};

async function deleteById(id: number){
    await prisma.wifiNetworks.delete({
        where: {
            id
        }
    });
};

const wifiRepository = {
    addNewWifi,
    findByUserId,
    findByIdAndUserId,
    deleteById
};

export default wifiRepository;