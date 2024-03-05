import { jwtDecode } from "jwt-decode";
import { NavigateFunction } from "react-router-dom";

const isAuthorized = (
  navigate: NavigateFunction,
  loggedIn: boolean
): boolean => {
  const token = localStorage.getItem("jwt");
  if (loggedIn) {
    if (!token) {
      navigate("/");
      return false;
    }
    const payload = jwtDecode(token) as Payload;
    if (payload.id > 0) {
      if (isExpired(payload)) {
        clearStorageAndNavigate(navigate, "/");
        return false;
      } else return true;
    } else {
      clearStorageAndNavigate(navigate, "/");
      return false;
    }
  } else {
    if (token) {
      const payload = jwtDecode(token) as Payload;
      if (payload.id > 0) {
        if (isExpired(payload)) {
          clearStorageAndNavigate(navigate, "/");
          return true;
        } else {
          navigate("/home");
          return false;
        }
      }
    }
    return true;
  }
};

const isExpired = (payload: Payload) => {
  const expiresAt = payload.exp * 1000;
  const currentTime = Date.now();
  return currentTime > expiresAt;
};

const clearStorageAndNavigate = (
  navigate: NavigateFunction,
  whereTo: string
) => {
  localStorage.clear();
  navigate(whereTo);
};

export default isAuthorized;
