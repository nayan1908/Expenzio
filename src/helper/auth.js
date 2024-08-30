import CryptoJS from "crypto-js";
import { USER_SESSION_KEY, ENC_KEY } from "../config/config";

export const setSession = (data) => {
    let cipherText = CryptoJS.AES.encrypt(JSON.stringify(data), ENC_KEY).toString();
    localStorage.setItem(USER_SESSION_KEY, cipherText);
}

export const getSession = () => {
    let userData = localStorage.getItem(USER_SESSION_KEY);
    if (userData) {
        let cipherText = CryptoJS.AES.decrypt(userData, ENC_KEY);
        return JSON.parse(cipherText.toString(CryptoJS.enc.Utf8));
    } else {
        return null;
    }
}

export const deleteSession = () => {
    localStorage.removeItem(USER_SESSION_KEY);
}

const cookieName = 'ck_'+USER_SESSION_KEY;

export const setCookie = (value, daysToExpire = 400) => {
    const expirationDate = new Date();

    expirationDate.setDate(expirationDate.getDate() + daysToExpire);
    value = CryptoJS.AES.encrypt(JSON.stringify(value), ENC_KEY).toString()

    const cookieValue = value + '; expires=' + expirationDate.toUTCString();
    document.cookie = cookieName + '=' + cookieValue;
}

export const getCookie = () => {
    const cookieString = document.cookie;
    const cookies = cookieString.split(";")

    for (let i = 0; i <= cookieString.length; i++) {
        const cookie = cookies[i]?.trim();
        
        if (cookie && cookie.startsWith(cookieName + '=')) {
            let cookieData = cookie.substring(cookieName.length + 1);
            if (cookieData) {

                return cookieData = JSON.parse(CryptoJS.AES.decrypt(cookieData, ENC_KEY).toString(CryptoJS.enc.Utf8));
            }
        }
    }
}

export const deleteCookie = () => {
    document.cookie = cookieName + '=;';
}