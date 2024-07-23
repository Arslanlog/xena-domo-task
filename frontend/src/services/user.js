import APIParser from "./api_parser"
import http from "./axios"

export const validateToken = async (token)=>{
    return await APIParser(http.post(`/api/transaction/validate/${token}`));
}
export const generateToken = async ()=>{
    return await APIParser(http.get("/api/transaction/"));
}

export const processTransaction = async (uuid, data)=>{
    return await APIParser(http.post(`/api/transaction/process/${uuid}`, data));
}