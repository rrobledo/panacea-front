import React from "react";
import axios, { AxiosError } from "axios";
import { showApiError, getErrorMessage } from "../utils/notification";

// Custom error class for API errors
export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// Response type for API calls
export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  error?: string;
}

class DataResource {
  static endpoint = "http://localhost:8000";
  private showNotifications: boolean;

  public constructor(endpoint: string, showNotifications: boolean = true) {
    DataResource.endpoint = endpoint;
    this.showNotifications = showNotifications;
  }

  private handleError(error: AxiosError, showNotification: boolean = true): never {
    const errorMessage = getErrorMessage(error);

    if (showNotification && this.showNotifications) {
      showApiError(error);
    }

    // Log error in development
    if (process.env.NODE_ENV === "development") {
      console.error("API Error:", {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        message: errorMessage,
        data: error.response?.data,
      });
    }

    throw new ApiError(
      errorMessage,
      error.response?.status || 0,
      error.response?.data
    );
  }

  public getList(resource: string = "/", filters: any = null, showNotification: boolean = true) {
    return axios
      .get(`${DataResource.endpoint}/${resource}`, {
        params: filters,
      })
      .catch((error: AxiosError) => this.handleError(error, showNotification));
  }

  public get(resource: string = "/", id: any, showNotification: boolean = true) {
    return axios
      .get(`${DataResource.endpoint}/${resource}/${id}`)
      .catch((error: AxiosError) => this.handleError(error, showNotification));
  }

  public patch(resource: string = "/", id: any, data: any, showNotification: boolean = true) {
    return axios
      .patch(`${DataResource.endpoint}/${resource}/${id}`, data)
      .catch((error: AxiosError) => this.handleError(error, showNotification));
  }

  public post(resource: string = "/", data: any, showNotification: boolean = true) {
    return axios
      .post(`${DataResource.endpoint}/${resource}`, data)
      .catch((error: AxiosError) => this.handleError(error, showNotification));
  }

  public delete(resource: string = "/", id: any, data: any, showNotification: boolean = true) {
    return axios
      .delete(`${DataResource.endpoint}/${resource}/${id}`, data)
      .catch((error: AxiosError) => this.handleError(error, showNotification));
  }

  public getUrl(url: string = "/", showNotification: boolean = true) {
    return axios
      .get(url)
      .catch((error: AxiosError) => this.handleError(error, showNotification));
  }
}

export default DataResource;
