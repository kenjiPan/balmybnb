import * as APIUtil from '../util/spot_api_util';

export const RECEIVE_ALL_SPOTS = 'RECEIVE_ALL_SPOTS';
export const RECEIVE_SPOT = 'RECEIVE_SPOT';

export const receiveAllSpots = spots => ({
  type: RECEIVE_ALL_SPOTS,
  spots
});

export const receiveSpot = spot => ({
  type: RECEIVE_SPOT,
  spot
});

export const fetchSpots = () => dispatch => (
  APIUtil.fetchSpots().then(spots => (
    dispatch(receiveAllSpots(spots))
  ))
);

export const fetchSpot = id => dispatch => (
  APIUtil.fetchSpot(id).then(payload => (
    dispatch(receiveSpot(payload))
  ))
);

export const createSpot = spot => dispatch => (
  APIUtil.createSpot(spot).then(spot => (
    dispatch(receiveSpot(spot))
  ))
);