import { CHECK_USER_ROUTE } from "@/utils/apiRoutes";
import axios, { AxiosError } from "axios";
export const chechForNewUser = async (email: string) => {
  try {
    if (email) {
      const { data } = await axios.post(`${CHECK_USER_ROUTE}`, {
        email: email,
      });
      if (data.status) return "/";
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error!.response!.status === 404) {
        return "/onboarding";
      }
    }
  }
};
