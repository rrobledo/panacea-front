import React from "react";
import axios from "axios";

class DataResource {
  static endpoint = "http://localhost:8000";

  public constructor(endpoint: string) {
    DataResource.endpoint = endpoint;
  }

  public getList(resource: string = "/", filters: any = null) {
    return axios.get(`${DataResource.endpoint}/${resource}`, {
      params: filters,
    });
  }

  public get(resource: string = "/", id: any) {
    return axios.get(`${DataResource.endpoint}/${resource}/${id}`);
  }

  public patch(resource: string = "/", id: any, data: any) {
    return axios.patch(`${DataResource.endpoint}/${resource}/${id}`, data);
  }

  public post(resource: string = "/", data: any) {
    return axios.post(`${DataResource.endpoint}/${resource}`, data);
  }

  public delete(resource: string = "/", id: any, data: any) {
    return axios.delete(`${DataResource.endpoint}/${resource}/${id}`, data);
  }
}

export default DataResource;
