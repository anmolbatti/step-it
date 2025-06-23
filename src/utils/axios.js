import axios from "axios"; 
import config from "./config";
import { getItem, setItem } from "./storage";

const refreshAccessToken = async () => {
  // const authContext = useAuth();
  const token = await getItem('accessToken');
  const refreshToken = await getItem('refreshToken');

  if(token){
    try{
      await axios.post(`${config.API_BASE_URL}token/verify/`, {"token": JSON.parse(token)});
      return token;
      
    } catch (err) {

      try {
        const refreshTokenData = await axios.post(`${config.API_BASE_URL}token/refresh/`, {"refresh": JSON.parse(refreshToken)});
        
        if(refreshTokenData?.data?.access){
          setItem("accessToken", refreshTokenData?.data?.access);
          return refreshTokenData?.data?.access;
        }

      } catch (error) {
        console.log("getting error while refreshing the access token === ", error);
        // authContext.handleTokenExpired();
        throw error;
      } 

    }
  }else{
    // authContext.handleTokenExpired();
    // throw err;
  }
}

const protectedInstance = async ( contentType="application/json" ) => {
  const accessToken = await getItem("accessToken");

  const instance = axios.create({
    baseURL: config.API_BASE_URL,
    headers: {
      Authorization: `Bearer ${JSON.parse(accessToken)}`,
      "Content-Type": contentType,
    }
  });

  instance.interceptors.request.use(function (config) {
    console.log("Request URL: ", config.baseURL + config.url);
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  instance.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          const newAccessToken = await refreshAccessToken();
          instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          
          return instance(originalRequest);
        } catch (refreshError) {
          
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

const publicInstance = axios.create({
    baseURL : config.API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    }
});


const get = async ( url ) => {
    try {
        const instance = await protectedInstance();
        const response = await instance({
            url: url,
            method: "GET",
        });

        return response.data;

    } catch (error) {
        console.error(`Response error url: ${url}, error: `, error?.response?.data);
        console.error(`Response error url: ${url}, Status Code: `, error.response.status);
        

        throw error;
    }
}

const put = async ( url, data ) => {
  try {
      const instance = await protectedInstance();
      const response = await instance({
          url: url,
          method: "PUT",
          data: data
      });

      return response.data;

  } catch (error) {
      console.error("Response error:", error?.response?.data);

      throw error;
  }
}

const post = async (url, data) => {
  try {
      const instance = await protectedInstance();
      const response = await instance({
          url: url,
          method: "POST",
          data: data
      });

      return response.data;
  } catch (error) {
      if (error.response) {
          console.error("Response error:", error.response.data);
      } else if (error.request) {
          console.error("Request error:", error.request);
      } else {
          console.error("Error:", error.message);
      }
      throw error;
  }
}


const patch = async (url, data) => {
  try {
      const instance = await protectedInstance("multipart/form-data");
      const response = await instance({
          url: url,
          method: "PATCH",
          data: data
      });

      return response.data;
  } catch (error) {
      if (error.response) {
          console.error("Response error:", error.response.data);
      } else if (error.request) {
          console.error("Request error:", error.request);
      } else {
          console.error("Error:", error.message);
      }
      throw error;
  }
}



const publicPost = async ( url, data ) => {
  try {
    const response = await publicInstance({
        url: url,
        method: "POST",
        data: data
    });

    return response?.data;

} catch (error) {
    console.error(`Response error url ${url} : `, error?.response?.data);
    throw error;
}

}

const postLogin = async ( url, data ) => {
    try {
        const response = await publicInstance({
            url: url,
            method: "POST",
            data: data
        });

        return response.data;

    } catch (error) {
        if (error.response) {
          console.error(`Response error url ${url} : `, error?.response?.data);
        }
        throw error;
    }

}

export { get, post, postLogin, publicPost, put, patch }