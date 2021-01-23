import axios from "axios";
import { showAlert } from "./alertMessages";
import {logout} from "./authActions";
import { apiUrl } from "../../utils/api";
import {
  ADD_NEWS,
  DELETE_NEWS,
  EDIT_NEWS,
  FETCH_NEWS,
  NEWS_LOADING,
} from "./actionTypes";

const baseUrl = `${apiUrl}/news`;

const newsLoading = (isLoading) => {
  return {
    type: NEWS_LOADING,
    payload: isLoading,
  };
};

const createNewsSuccess = (news) => {
  return {
    type: ADD_NEWS,
    payload: {
      id: news.id,
      title: news.title,
      body: news.body,
      date: news.date,
    },
  };
};

const updateNewsSuccess = (news) => {
  return {
    type: EDIT_NEWS,
    payload: {
      id: news.id,
      title: news.title,
      body: news.body,
      date: news.date,
    },
  };
};

const deleteNewsSuccess = (id) => {
  return {
    type: DELETE_NEWS,
    payload: {
      id: id,
    },
  };
};

const fetchNewsSuccess = (news) => {
  return {
    type: FETCH_NEWS,
    payload: news,
  };
};

export const createNews = (news) => {
  if (news.id) {
    const data = {
      id: news.id,
      title: news.title,
      body: news.body,
    };
    return (dispatch) => {
      updateNews(dispatch, data);
    };
  } else {
    const data = {
      title: news.title,
      body: news.body,
    };
    let isLoading = true;
    return async (dispatch) => {
      if (isLoading) {
        dispatch(newsLoading(isLoading));
      }
      return await axios
      .post(baseUrl, data)
      .then((response) => {
        const id = response.data.id;
        return axios
        .get(`${baseUrl}/${id}`)
        .then((response) => {
          isLoading = false;
          dispatch(newsLoading(isLoading));
          dispatch(createNewsSuccess(response.data));
        });
      });
    };
  }
};

export const updateNews = async (dispatch, data) => {
  const id = data.id;
  const putData = {
    id: data.id,
    title: data.title,
    body: data.body,
  };
  return await axios
  .put(`${baseUrl}/${id}`, putData)
  .then((response) => {
    return axios
    .get(`${baseUrl}/${id}`)
    .then((response) => {
      dispatch(updateNewsSuccess(response.data));
    });
  });
};

export const deleteNews = (id) => {
  return async (dispatch) => {
    return await axios
    .delete(`${baseUrl}/${id}`)
    .then(() => {
      dispatch(deleteNewsSuccess(id));
    });
  };
};

export const fetchAllNews = () => {
  let isLoading = true;
  return async (dispatch) => {
    if (isLoading) {
      dispatch(newsLoading(isLoading));
    }
    return await axios
      .get(baseUrl)
      .then((response) => {
        isLoading = false;
        dispatch(newsLoading(isLoading));
        const data = response.data;
        dispatch(fetchNewsSuccess(data));
      })
      .catch((error) => {
        isLoading = false;
        dispatch(newsLoading(isLoading));
        if (error.response.status === 401) {
          dispatch(logout());
          window.location.pathname = "/signin"
        } else {
          dispatch(showAlert("Упс, что-то пошло не так"));
        }
      });
  };
};
