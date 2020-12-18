// External dependencies
import Cookies from "js-cookie";


// Define fetch function
export const fetch = async (url, options={}) => {
  // Set default as "GET" method
  options.method = options.method || 'GET';
  options.headers = options.headers || {};

  // Other than "GET", set headers as below
  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
    options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
  }

  const res = await window.fetch(url, options);

  // Parse JSON body, if it is
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const data = await res.json();
    res.data = data;
  }

  // If error, throw it as response
  if (res.status >= 400) throw res;

  return res;
}

// call this to get the "XSRF-TOKEN" cookie, should only be used in development
export const restoreCSRF = () => {
  return fetch("/api/csrf/restore");
}