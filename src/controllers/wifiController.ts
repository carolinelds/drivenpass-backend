import { WifiNetworks } from "@prisma/client";
import { Request, Response } from "express";
import wifiServices from "./../services/wifiServices";

export async function createWifi(req: Request, res: Response){
    const idUser: number = parseInt(res.locals.idUser);
    const { name, title, password } : { name : string, title: string, password: string } = res.locals.body;

    await wifiServices.createWifi(idUser, name, title, password);

    res.status(201).send("Wifi network added.");
};

export async function getWifi(req: Request, res: Response){
    const { id } = req.query;
    const idUser = res.locals.idUser;
    
    let result : WifiNetworks | WifiNetworks[] | { type: string, message: string};

    if (typeof id === "string"){
        result = await wifiServices.getWifiByIdAndUserId(parseInt(id), idUser);
    } else {
        result = await wifiServices.getWifiByUserId(idUser);
    }
    
    res.status(200).send(result);
};

export async function deleteWifi(req: Request, res: Response){
    const { id } = req.params;
    const idUser = res.locals.idUser;

    await wifiServices.deleteWifi(parseInt(id), idUser);

    res.status(200).send("Wifi network deleted.");
}