import axios, { AxiosError } from "axios";

type ErrorResponse = { detail?: string };

const hasDetail = (data: unknown): data is ErrorResponse => {
  return typeof data === "object" && data !== null && "detail" in data;
};

export const getErrorMessage = (error: unknown, fallback: string): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ErrorResponse>;
    const responseData = axiosError.response?.data;

    if (responseData && hasDetail(responseData)) {
      const detail = responseData.detail;
      if (typeof detail === "string" && detail.trim().length > 0) {
        return detail;
      }
    }

    if (axiosError.message) {
      return axiosError.message;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};
