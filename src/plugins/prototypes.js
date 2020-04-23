import Vue from 'vue';
import moment from 'moment';
import * as types from '../utils/status.js';

Vue.prototype.$isEmployee = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    return user.role.id == 4;
  }
  return false;
};

Vue.prototype.$getRole = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    return user.role.id;
  } return -1;
};

Vue.prototype.$reportStatus = (status) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    switch (user.role.id) {
      case '1':
        switch (status.id) {
          case '1': return types.NEW;
          case '4': return types.CLOSED;
          default: return types.PENDING;
        }
      case '2':
        switch (status.id) {
          case '1': return types.NEW;
          case '4': return types.CLOSED;
          default: return types.PENDING;
        }
      case '3':
        switch (status.id) {
          case '2': return types.NEW;
          case '4': return types.CLOSED;
          default: return types.PENDING;
        }
      case '4':
        switch (status.id) {
          case '3': return types.NEW;
          case '4': return types.CLOSED;
          default: return types.PENDING;
        }
      default: return null;
    }
  }
  return null;
};

Vue.prototype.$format = (time) => (format) => moment(time).format(format);
