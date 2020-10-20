import axios from "axios";
import { showAlert } from "./AlertMessages";
import {
  ADD_NEWS,
  ADD_NEWS_LOADING,
  DELETE_NEWS,
  EDIT_NEWS,
  FETCH_NEWS,
  FETCH_NEWS_LOADING,
} from "./actionTypes";

const baseUrl = `http://${window.location.hostname}:5000/api/news`;

export const createNews = (news) => {
  if (news.id) {
    const data = {
      id: news.id,
      title: news.title,
      body: news.body,
      date: news.date,
    };

    return (dispatch) => {
      updateNews(dispatch, data);
    };
  } else {
    const data = {
      title: news.title,
      body: news.body,
      date: news.date,
    };
    let isLoading = true;

    return async (dispatch) => {
      if (isLoading) {
        dispatch(createNewsLoading(isLoading));
      }

      return await axios
        .post(baseUrl, data)
        .then((response) => {
          const id = response.data.id;

          return axios
            .get(`${baseUrl}/${id}`)
            .then((response) => {
              isLoading = false;
              dispatch(createNewsLoading(isLoading));
              dispatch(createNewsSuccess(response.data));
            })
            .catch((error) => {
              isLoading = false;
              dispatch(createNewsLoading(isLoading));
              dispatch(showAlert("Упс, что-то пошло не так"));
            });
        })
        .catch((error) => {
          dispatch(showAlert("Упс, что-то пошло не так"));
        });
    };
  }
};

export const createNewsSuccess = (news) => {
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

export const createNewsLoading = (isLoading) => {
  return {
    type: ADD_NEWS_LOADING,
    payload: isLoading,
  };
};

export const updateNewsSuccess = (news) => {
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

export const updateNews = async (dispatch, data) => {
  const id = data.id;
  const putData = {
    id: data.id,
    title: data.title,
    body: data.body,
    date: data.date,
  };
  return await axios
    .put(`${baseUrl}/${id}`, putData)
    .then((response) => {
      return axios
        .get(`${baseUrl}/${id}`)
        .then((response) => {
          dispatch(updateNewsSuccess(response.data));
        })
        .catch((error) => {
          dispatch(showAlert("Упс, что-то пошло не так"));
        });
    })
    .catch((error) => {
      dispatch(showAlert("Упс, что-то пошло не так"));
    });
};

export const deleteNews = (id) => {
  return async (dispatch) => {
    return await axios
      .delete(`${baseUrl}/${id}`)
      .then(() => {
        dispatch(deleteNewsSuccess(id));
      })
      .catch((error) => {
        dispatch(showAlert("Упс, что-то пошло не так"));
      });
  };
};

export const deleteNewsSuccess = (id) => {
  return {
    type: DELETE_NEWS,
    payload: {
      id: id,
    },
  };
};

export const fetchNewsSuccess = (news) => {
  return {
    type: FETCH_NEWS,
    payload: news,
  };
};

const fetchAllNewsLoading = (isLoading) => {
  return {
    type: FETCH_NEWS_LOADING,
    payload: isLoading,
  };
};

export const fetchAllNews = () => {
  let isLoading = true;

  return async (dispatch) => {
    if (isLoading) {
      dispatch(fetchAllNewsLoading(isLoading));
    }

    return await axios
      .get(baseUrl)
      .then((response) => {
        isLoading = false;
        dispatch(fetchAllNewsLoading(isLoading));
        const data = response.data;
        dispatch(fetchNewsSuccess(data));
      })
      .catch((error) => {
        isLoading = false;
        dispatch(fetchAllNewsLoading(isLoading));
        dispatch(showAlert("Упс, что-то пошло не так"));
      });
  };
};
