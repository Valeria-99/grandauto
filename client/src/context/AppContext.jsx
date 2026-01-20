import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

// Створюємо інстанс axios з baseURL
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Інтерсептор: додає токен у кожен запит
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [cars, setCars] = useState([]);

  // Перевірка користувача
  const fetchUser = async () => {
    try {
      const { data } = await axiosInstance.get("/api/user/data");
      if (data.success) {
        setUser(data.user);
        setIsOwner(data.user.role === "owner");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // Отримання машин
  const fetchCars = async () => {
    try {
      const { data } = await axiosInstance.get("/api/user/cars");
      if (data.success) {
        setCars(data.cars);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsOwner(false);
    toast.success("You have been logged out");
    navigate("/");
  };

  // При старті дістаємо токен з localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      fetchUser();
    }
    fetchCars();
  }, []);

  // Якщо токен змінюється → оновлюємо дані користувача
  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  const value = {
    navigate,
    currency,
    axios: axiosInstance, // використовуємо інстанс з інтерсептором
    user,
    setUser,
    token,
    setToken,
    isOwner,
    setIsOwner,
    fetchUser,
    showLogin,
    setShowLogin,
    logout,
    fetchCars,
    cars,
    setCars,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);