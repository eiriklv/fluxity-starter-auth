'use strict';

const React = require('react');
const Router = require('react-router');
const Link = Router.Link;

const qs = require('qs');
const apiUrl = process.env.API_URL;
const successRedirect = 'http://localhost:3000/login';

const Navigation = React.createClass({
  contextTypes: {
    Flux: React.PropTypes.object.isRequired,
    RouterState: React.PropTypes.object.isRequired
  },

  propTypes: {
    State: React.PropTypes.shape({
      Places: React.PropTypes.any.isRequired,
      App: React.PropTypes.any.isRequired
    })
  },

  attemptLogout: function(e) {
    e.preventDefault();

    this.context.Flux.Actions.AttemptLogout();
  },

  mapLinks: function(places) {
    return places.map(function(place) {
      return (
        <li key={'place-' + place._id}>
          <Link to='place-details' params={{ id: place._id }}>
            {place.name}
          </Link>
        </li>
      );
    }.bind(this));
  },

  getServerRedirect: function() {
    return qs.stringify({
      redirect: successRedirect
    });
  },

  render: function() {
    let State = this.props.State;
    let links = this.mapLinks(State.Places.data);

    return (
      <div className='navigation'>
        <h1>{State.App.title}</h1>
        <ul className='master'>
          {links}
          <Link to='index'>
            <small>(back to index)</small>
          </Link>
          <br />
          <Link to='landing'>
            <small>(landing)</small>
          </Link>
          <br />

          <form method='POST' action={apiUrl + '/session?_method=DELETE&' + this.getServerRedirect()}>
            <input
              onClick={this.attemptLogout}
              type='submit'
              name='commit'
              value='Log out'
            />
          </form>
        </ul>
      </div>
    );
  }
});

module.exports = Navigation;
