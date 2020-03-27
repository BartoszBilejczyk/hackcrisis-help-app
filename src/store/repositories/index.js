import PeopleRepository from './people.repository';
import RankingRepository from './ranking.repository';
import RequestsRepository from './requests.repository';
import UserRepository from './user.repository';

export const REPOSITORIES = {
  PEOPLE: 'people',
  RANKING: 'ranking',
  REQUESTS: 'requests',
  USER: 'user'
};

const repositoriesMap = {
  [REPOSITORIES.PEOPLE]: PeopleRepository,
  [REPOSITORIES.RANKING]: RankingRepository,
  [REPOSITORIES.REQUESTS]: RequestsRepository,
  [REPOSITORIES.USER]: UserRepository
};

export default name => {
  const repository = repositoriesMap[name];
  return fn => {
    const promise = fn(repository);
    return promise.catch(() => {throw new Error});
  }
}
