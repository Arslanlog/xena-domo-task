import APIParser from "./api_parser"
import http from "./axios"

export const validateToken = async (token)=>{
    return await APIParser(http.post(`/api/transaction/validate/${token}`));
}
export const generateToken = async (data)=>{
    return await APIParser(http.post("/api/transaction/", data));
}

export const processTransaction = async (uuid, data)=>{
    return await APIParser(http.post(`/api/transaction/process/${uuid}`, data));
}