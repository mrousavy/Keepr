import {Collection} from './models/HomeModel';

export type RouteParams = {
  Home: undefined;
  CollectionDetail: {
    collection: Collection;
  };
  Swipe: {
    collection: Collection;
  };
};
