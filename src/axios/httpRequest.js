import request from "./requestConfig.js";

export const getRequest = async (url) => {
    try {
      const res = await request.get(url);
      return res.data;
    } catch (error) {
      throw error;
    }
  };
  export const deleteRequest = async (url, chosenId) => {
    try {
      const res = await request.delete(url, {
        data:chosenId
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  };
  export const putRequest = async (url, data) => {
    try {
      const res = await request.put(url, data);
      return res.data;
    } catch (error) {
      throw error;
    }
  };
  export const postRequest = async (url, data) => {
    try {
      const res = await request.post(url, data);
      return res.data;
    } catch (error) {
      throw error;
    }
  };