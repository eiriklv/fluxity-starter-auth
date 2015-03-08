'use strict';

const React = require('react');
const { Link } = require('react-router');

const NavigationView = React.createClass({
  propTypes: {
    data: React.PropTypes.shape({
      places: React.PropTypes.array.isRequired,
      apiUrl: React.PropTypes.string.isRequired,
      serverRedirect: React.PropTypes.string.isRequired
    }),
    actions: React.PropTypes.shape({
      attemptLogout: React.PropTypes.func.isRequired
    })
  },

  attemptLogout(e) {
    e.preventDefault();
    this.props.actions.attemptLogout();
  },

  mapLinks(places) {
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

  render() {
    let links = this.mapLinks(this.props.data.places);

    return (
      <div className='navigation'>
        <h1>{this.props.data.title}</h1>
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

          <form method='POST' action={this.props.apiUrl + '/session?_method=DELETE&' + this.props.serverRedirect}>
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

module.exports = NavigationView;
