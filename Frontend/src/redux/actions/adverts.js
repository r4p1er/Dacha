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

const baseUrl = "http://localhost:5000/api/posts";

export const createAdvert = (advert) => {
  if (advert.id) {
    const data = {
      id: advert.id,
      title: advert.title,
      body: advert.body,
      contact: advert.contact,
      expDate: advert.expDate,
      profileId: advert.profileId,
    };

    return (dispatch) => {
      updateAdvert(dispatch, data);
    };
  } else {
    const data = {
      title: advert.title,
      body: advert.body,
      contact: advert.contact,
      expDate: advert.expDate,
    };
    let isLoading = true;

    return async (dispatch) => {
      if (isLoading) {
        dispatch(createAdvertLoading(isLoading));
      }

      return await axios
        .post(baseUrl, data)
        .then((response) => {
          const id = response.data.id;
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
      id: advert.id,
      title: advert.title,
      body: advert.body,
      contact: advert.contact,
      expDate: advert.expDate,
      place: advert.place,
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
      id: advert.id,
      title: advert.title,
      body: advert.body,
      contact: advert.contact,
      expDate: advert.expDate,
      place: advert.place,
    },
  };
};

export const updateAdvert = async (dispatch, data) => {
  const id = data.id;

  return await axios
    .put(`${baseUrl}/${id}`, data)
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
      console.log(error);
    });
};

export const deleteAdvert = (id) => {
  return async (dispatch) => {
    return await axios
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

export const fetchCurrentAdverts = () => {
  let isLoading = true;

  return async (dispatch) => {
    if (isLoading) {
      dispatch(fetchAllAdvertsLoading(isLoading));
    }

    return await axios
      .get(`${baseUrl}/current`)
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
