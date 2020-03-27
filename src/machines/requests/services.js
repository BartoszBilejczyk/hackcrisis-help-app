import requests from '../../mock-data/requests';

export const getRequestsData = () => {
  return new Promise(r => r(requests));
};
