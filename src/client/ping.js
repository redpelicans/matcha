import React from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

export const PONG = 'PONG';
export const PING = 'EVTX:SERVER:ADMIN:PING';
export const doPing = () => ({ type: PING, replyTo: PONG });

const NONE = 'none';
const ING = 'ping waiting for pong';
const DONE = 'pong';

const initialState = { status: NONE };

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case PING: return { ...state, status: ING };
    case PONG: return { ...state, status: DONE };
    default: return state;
  }
};

export const getState = (state) => state.ping;
export const getPingStatus = () => createSelector([getState], (state) => state.status);

export const PingView = ({ status, doPing }) => (
  <div className="ping">
    <button onClick={() => doPing()}>do ping</button>
    <span>PING::{status}</span>
  </div>
);

const mapStateToProps = createStructuredSelector({ status: getPingStatus() });
const mapDispatchToProps = { doPing };

export default connect(mapStateToProps, mapDispatchToProps)(PingView);
