export const SET_IS_LOADING = 'progress/SET_IS_LOADING';

const defaultState = {
  isLoading: false // general linear progress bar on top of the site
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case SET_IS_LOADING: return Object.assign({}, state, { isLoading: action.data });
    default: return state;
  }
}

export function setIsLoading(isLoading) {
  return {
    data: isLoading,
    type: SET_IS_LOADING
  };
}

