import axios from 'axios';

export class AxiosClient {
  protected BaseURL: string;

  constructor(BaseURL: string) {
    this.BaseURL = BaseURL;
  }

  init = () => {
    console.log('BASE_URL', this.BaseURL);
    const axiosClient = axios.create({
      baseURL: this.BaseURL,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    axiosClient.interceptors.response.use(
      function (response) {
        // console.log('response', response);
        return response;
      },
      function (error) {
        const res = error.response;
        console.error(error);
        console.error(
          'Looks like there was a problem. Status Code: ' + res.status,
        );
        return Promise.reject(error);
      },
    );

    axiosClient.interceptors.request.use(
      async (config) => {
        // console.log('config', config);
        return config;
      },
      (error) => {
        Promise.reject(error);
      },
    );

    return axiosClient;
  };
}
