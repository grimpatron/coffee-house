interface Options {
  [key: string]: string;
}

type Callback = (data: Options) => void;

class Loader {
  baseLink: string;
  options: {};

  constructor(baseLink: string | undefined, options: {}) {
    if (baseLink !== undefined) {
      this.baseLink = baseLink;
    } else {
      this.baseLink = 'default';
    }

    this.options = options;
  }

  // Method for sending a GET request
  getResp(
    { endpoint, options = {} }: { endpoint: string; options: Record<string, string> },
    callback = (data: Record<string, string>) => {
      console.error('No callback for GET response');
    }
  ) {
    this.load('GET', endpoint, callback, options);
  }

  // Request Error Handler
  errorHandler(res: Response) {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  // Creating a URL for the request
  makeUrl(options: Options, endpoint: string): string {
    const urlOptions: Options = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  // Sending a request
  load(method: string, endpoint: string, callback: Callback, options: Options = {}): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default Loader;
