import axios from 'axios';

export const useApi = () => {
  const request = async (endpoint, options={}) => {
    try{
       const res = await axios({
         method: options.method || 'GET',
         url: `http://localhost:1337/api/${endpoint}`,
         data: options.data ||{},
         params: options.params ||{},
     });
     return res;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    post: (endpoint, options) => request(endpoint, {...options, method: 'POST'}),
  }
};