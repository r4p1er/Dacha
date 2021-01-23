import axios from "axios";
import { apiUrl } from "../../utils/api";
import {
  ADD_ADVERT,
  DELETE_ADVERT,
  EDIT_ADVERT,
  FETCH_ADVERTS,
  ADVERTS_LOADING,
} from "./actionTypes";

const baseUrl = `${apiUrl}/posts`;

const advertsLoading = (isLoading) => {
  return {
    type: ADVERTS_LOADING,
    payload: isLoading,
  };
};

const deleteAdvertSuccess = (id) => {
  return {
    type: DELETE_ADVERT,
    payload: {
      id: id,
    },
  };
};

const fetchAdvertsSuccess = (adverts) => {
  return {
    type: FETCH_ADVERTS,
    payload: adverts,
  };
};

const createAdvertSuccess = (advert) => {
  return {
    type: ADD_ADVERT,
    payload: {
      id: advert.id,
      title: advert.title,
      body: advert.body,
      contact: advert.contact,
      date: advert.date,
      place: advert.place,
    },
  };
};

const updateAdvertSuccess = (advert) => {
  return {
    type: EDIT_ADVERT,
    payload: {
      id: advert.id,
      title: advert.title,
      body: advert.body,
      contact: advert.contact,
      date: advert.date,
      place: advert.place,
    },
  };
};

export const createAdvert = (advert) => {
  if (advert.id) {
    const data = {
      id: advert.id,
      title: advert.title,
      body: advert.body,
      contact: advert.contact,
      accountId: advert.accountId,
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

    return async (dispatch) => {
      if (isLoading) {
        dispatch(advertsLoading(isLoading));
      }

      return await axios
      .post(baseUrl, data)
      .then((response) => {
        const id = response.data.id;
        return axios.get(`${baseUrl}/${id}`)
        .then((response) => {
          isLoading = false;
          dispatch(advertsLoading(isLoading));
          dispatch(createAdvertSuccess(response.data));
        });
      });
    };
  }
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
    });
  });
};

export const deleteAdvert = (id) => {
  return async (dispatch) => {
    return await axios
    .delete(`${baseUrl}/${id}`)
    .then(() => {
      dispatch(deleteAdvertSuccess(id));
    });
  };
};



export const fetchAllAdverts = () => {
  let isLoading = true;

  return async (dispatch) => {
    if (isLoading) {
      dispatch(advertsLoading(isLoading));
    }

    return await axios
    .get(baseUrl)
    .then((response) => {
      isLoading = false;
      dispatch(advertsLoading(isLoading));
      const data = response.data;
      dispatch(fetchAdvertsSuccess(data));
    });
  };
};

export const fetchCurrentAdverts = () => {
  let isLoading = true;

  return async (dispatch) => {
    if (isLoading) {
      dispatch(advertsLoading(isLoading));
    }

    return await axios
    .get(`${baseUrl}/current`)
    .then((response) => {
      isLoading = false;
      dispatch(advertsLoading(isLoading));
      const data = response.data;
      dispatch(fetchAdvertsSuccess(data));
    });
  };
};
