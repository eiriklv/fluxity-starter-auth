'use strict';

const React = require('react');

const AlertBox = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      alerts: React.PropTypes.array.isRequired
    }),
    actions: React.PropTypes.shape({
      dismissAlerts: React.PropTypes.func.isRequired
    })
  },

  dismissAlerts(e) {
    e.preventDefault();
    this.props.actions.dismissAlerts();
  },

  renderAlerts() {
    if (!this.props.data.alerts.length)
      return <p key={'dummy'}>{'Everything is OK!'}</p>

    return this.props.data.alerts.map(function(alert) {
      return (
        <p key={alert.id}>{alert.message}</p>
      );
    }).reverse()[0];
  },

  render() {
    return (
      <div onClick={this.dismissAlerts}>
        {this.renderAlerts()}
      </div>
    );
  }
});

module.exports = AlertBox;
