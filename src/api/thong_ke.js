import axiosService from "./axiosService";
import axios from "axios";

const token = JSON.parse(localStorage.getItem("token"));
var url_upload = "api/upload";
var URL = "http://localhost:8080";
var url_them_loai_giay = "api/thong_ke";
// var url_get_loia_giay = ''

const authAxios = axios.create({
    baseURL: URL,
    headers: {
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
});

export const getAllGiay = () => {
    return authAxios.get(`/api/thong_ke/getAllGiay`);
};

export const getAllLoaiGiay = () => {
    return authAxios.get(`/api/thong_ke/getAllLoaiGiay`);
};

export const getAllGiayHot = () => {
    return authAxios.get(`/api/thong_ke/getAllGiayHot`);
};

export const getGiayHotByMonth = (data) => {
    return authAxios.post(`/api/thong_ke/getGiayHotByMonth`, data);
};

export const getLoaiGiayHotByMonth = (data) => {
    return authAxios.post(`/api/thong_ke/getLoaiGiayHotByMonth`, data);
};