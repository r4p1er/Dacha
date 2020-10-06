import axios from "axios";
import { showAlert } from "./AlertMessages";
import {
  ADD_ADVERT,
  ADD_ADVERT_LOADING,
  DELETE_ADVERT,
  EDIT_ADVERT,
  FETCH_ADVERTS,
  FETCH_ADVERTS_LOADING,
} from "./actionTypes";

const baseUrl = "http://localhost:5000/api/adverts";

export const createAdvert = (advert) => {
  if (advert.id) {
    const data = {
      title: advert.title,
      body: advert.body,
      contact: advert.contact,
    };

    return (dispatch) => {
      updateAdvert(dispatch, data);
    };
  } else {
    const data = {
      title: advert.title,
      body: advert.body,
      contact: advert.contact,
    };
    let isLoading = true;

    return (dispatch) => {
      if (isLoading) {
        dispatch(createAdvertLoading(isLoading));
      }

      return axios
        .post(baseUrl, data)
        .then((response) => {
          return axios
            .get(`${baseUrl}/${id}`)
            .then((response) => {
              isLoading = false;
              dispatch(createAdvertLoading(isLoading));
              dispatch(createAdvertSuccess(response.data));
            })
            .catch((error) => {
              isLoading = false;
              dispatch(createAdvertLoading(isLoading));
              dispatch(showAlert("Упс, что-то пошло не так"));
            });
        })
        .catch((error) => {
          dispatch(showAlert("Упс, что-то пошло не так"));
        });
    };
  }
};

export const createAdvertSuccess = (advert) => {
  return {
    type: ADD_ADVERT,
    payload: {
      title: advert.title,
      body: advert.body,
      contact: advert.contact,
    },
  };
};

export const createAdvertLoading = (isLoading) => {
  return {
    type: ADD_ADVERT_LOADING,
    payload: isLoading,
  };
};

export const updateAdvertSuccess = (advert) => {
  return {
    type: EDIT_ADVERT,
    payload: {
      title: advert.title,
      body: advert.body,
      contact: advert.contact,
    },
  };
};

export const updateAdvert = (dispatch, data) => {
  const id = data.id;

  return axios
    .put(baseUrl, data)
    .then((response) => {
      return axios
        .get(`${baseUrl}/${id}`)
        .then((response) => {
          dispatch(updateAdvertSuccess(response.data));
        })
        .catch((error) => {
          dispatch(showAlert("Упс, что-то пошло не так"));
        });
    })
    .catch((error) => {
      dispatch(showAlert("Упс, что-то пошло не так"));
    });
};

export const deleteAdvert = (id) => {
  return (dispatch) => {
    return axios
      .delete(`${baseUrl}/${id}`)
      .then(() => {
        dispatch(deleteAdvertSuccess(id));
      })
      .catch((error) => {
        dispatch(showAlert("Упс, что-то пошло не так"));
      });
  };
};

export const deleteAdvertSuccess = (id) => {
  return {
    type: DELETE_ADVERT,
    payload: {
      id: id,
    },
  };
};

export const fetchAdvertsSuccess = (adverts) => {
  return {
    type: FETCH_ADVERTS,
    payload: adverts,
  };
};

const fetchAllAdvertsLoading = (isLoading) => {
  return {
    type: FETCH_ADVERTS_LOADING,
    payload: isLoading,
  };
};

export const fetchAllAdverts = () => {
  let isLoading = true;

  return async (dispatch) => {
    if (isLoading) {
      dispatch(fetchAllAdvertsLoading(isLoading));
    }

    return await axios
      .get(baseUrl)
      .then((response) => {
        isLoading = false;
        dispatch(fetchAllAdvertsLoading(isLoading));
        const data = response.data;
        dispatch(fetchAdvertsSuccess(data));
      })
      .catch((error) => {
        isLoading = false;
        dispatch(fetchAllAdvertsLoading(isLoading));
        dispatch(showAlert("Упс, что-то пошло не так"));
      });
  };
};
