import axios from "axios";
import { deleteSession, getSession } from "../helper/auth";
import { API_END_POINT } from "../config/config";
import dayjs from "dayjs";

export const apiRequest = async (apiName, apiSetting = {}) => {

    const loginInfo = getSession();
    try {
        const targetUrl = API_END_POINT + apiName;
        // "Access-Control-Allow-Origin": "*",
        axios.defaults.baseURL = API_END_POINT;

        if (apiSetting?.exportType === "download") {
            axios.defaults.responseType = "blob";
        } else {
            delete axios.defaults?.responseType;

            axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;multipart/form-data";
            axios.defaults.headers.get["Content-Type"] = "application/json;charset=UTF-8";
        }

        axios.defaults.timeout = 1000 * 60; // Wait for 60 seconds
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        const method = apiSetting.method ? apiSetting.method : "GET";
        const apiParams = apiSetting.apiParams ? apiSetting.apiParams : {};
        const fileInput = apiSetting.fileInput ? apiSetting.fileInput : null;

        const headerObj = {};
        const axiosConfig = {
            cancelToken: source.token,
        };

        const authToken = loginInfo ? loginInfo : null;

        if (authToken) {
            headerObj["Authorization"] = "Bearer " + authToken.token;
        }

        if (apiSetting.headers && apiSetting.headers.length > 0) {
            for (const [hk, hv] of Object.entries(apiSetting.headers)) {
                headerObj[hk] = hv;
            }
        }
        if (Object.keys(headerObj).length > 0) {
            axiosConfig["headers"] = headerObj;
        }

        if (method === "POST") {
            let formData = new FormData();
            for (const [key, value] of Object.entries(apiParams)) {
                if (typeof value === "object")
                    formData.append(key, value && JSON.stringify(value));
                else formData.append(key, value && value);
            }

            //loop on file input keys
            if (fileInput) {
                for (const [key, fileObjects] of Object.entries(fileInput)) {
                    if (fileObjects.length > 0) {
                        for (const [fKey, fileObj] of Object.entries(fileObjects)) {
                            formData.append(`${key}[${fKey}]`, fileObj);
                        }
                    } else {
                        formData.append(`${key}`, fileObjects);
                    }
                }
            }

            //loop on file input key's array
            const apiRes = await axios.post(targetUrl, formData, axiosConfig);

            if (apiSetting?.exportType === "download") {

                if (apiRes?.data?.size > 0) {
                    generateAndDownloadFile(apiRes.data, apiSetting?.exportFileName);
                } else {
                    errorMsg("No records found");
                }
            }

            return apiRes["data"];
        } else {
            axiosConfig["params"] = apiParams;
            const apiRes = await axios.get(targetUrl, axiosConfig);

            return apiRes["data"];
        }
    } catch (error) {

        if (error?.response?.status === 401) {
            deleteSession();
            window.location.reload();
        }

        return error?.response?.data;
    }
};

export const generateAndDownloadFile = (response, fileName = "export") => {
    const url = window.URL.createObjectURL(response);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${fileName}.xlsx`);
    document.body.appendChild(link);
    link.click();
}

export function ucFirst(str = "") {
    if (str !== "") {
        return str[0].toUpperCase() + str.slice(1);
    }
    return str;
}

export const findObject = (options, key, value) => {
    return options.find((item) => item[key] === value);
}

export const formattedNumber = (number = 0, prefix = '', suffix = '') => {
    const formatted = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        maximumFractionDigits: 2, // Set the maximum number of decimal places
        minimumFractionDigits: 2,
    }).format(number);

    return prefix + formatted + suffix;
}

export const formattedDate = (date = null, format = 'DD-MM-YYYY') => {
    if(date != undefined || date !== null){
        return dayjs(date).format(format);
    }
}

export const systemDate = (date = null, format = 'YYYY-MM-DD') => {
    if(date != undefined || date !== null){
        return dayjs(date).format(format);
    }
}
