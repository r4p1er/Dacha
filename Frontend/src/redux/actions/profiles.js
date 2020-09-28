import axios from "axios";
import { setProfiles } from "../reducers/profiles";

export const getProfiles = () => {
  return async (dispatch) => {
    const profiles = await axios.get("http://localhost:5000/api/profiles")
    dispatch(setProfiles(profiles.data))
  }
}