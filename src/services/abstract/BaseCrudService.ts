import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { IBaseItem } from "../../models/BaseItem.interface";

export interface IBaseCrudService<I extends IBaseItem> {
  endpoint: string;
  getById(id: number): Promise<AxiosResponse<I>>;
  create(item: I): Promise<AxiosResponse<I>>;
  update(item: I): Promise<AxiosResponse<I>>;
  delete(id: number): Promise<AxiosResponse<I>>;
}

export abstract class BaseCrudService<I extends IBaseItem>
  implements IBaseCrudService<I> {
  abstract endpoint: string;
  baseUrl = process.env.REACT_APP_API;
  private token: string;
  config: AxiosRequestConfig;

  constructor(token: string) {
    this.token = token;
    this.config = {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
  }
  // Default page = 1 and size = 100
  // Can be overwritten.
  get(page: number = 0, size: number = 100): Promise<AxiosResponse<I[]>> {
    const pageParam: string = page >= 0 ? `?page=${page}` : "?page";
    const sizeParam: string = size > 0 ? `&size=${size}` : "";
    return axios.get(
      `${this.baseUrl}${this.endpoint}${pageParam}${sizeParam}`,
      this.config
    );
  }
  getById(id: number): Promise<AxiosResponse<I>> {
    return axios.get(`${this.baseUrl}${this.endpoint}${id}`, this.config);
  }

  create(item: I): Promise<AxiosResponse<I>> {
    return axios.post(`${this.baseUrl}${this.endpoint}`, item, this.config);
  }

  update(item: I): Promise<AxiosResponse<I>> {
    return axios.put(
      `${this.baseUrl}${this.endpoint}${item.id}`,
      item,
      this.config
    );
  }
  delete(id: number): Promise<AxiosResponse<I>> {
    return axios.delete(`${this.baseUrl}${this.endpoint}${id}`, this.config);
  }
}
