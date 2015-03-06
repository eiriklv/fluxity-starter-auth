'use strict';

import uuid from 'node-uuid';

export default {
  getInitialState() {
    return [];
  },
  handlers: {
    DISMISS_ALL_ALERTS(context) {
      this.replaceState([]);
    },
    ADD_ALERT(context, alert) {
      if (!alert) return;

      alert.id = uuid.v4();
      let newState = this.state.concat([alert]);
      this.replaceState(newState);
    }
  }
};
