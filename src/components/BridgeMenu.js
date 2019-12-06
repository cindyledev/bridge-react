import React from 'react';

import MenuItem from './MenuItem.js'
import getBridgeData from '../bridges.js';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errored: false,
      bridges: []
    };
  }

  componentDidMount() {
    // We're about to start loading our data, set this in our state.
    this.setState({ loading: true });

    // Use our bridge.js function to talk to the REST API.
    getBridgeData()
      .then(bridges => this.setState({ loading: false, bridges }))
      .catch(err => {
        console.error('Unable to load bridge data', err.message);
        this.setState({ errored: true });
      });
  }

  render() {
    // Are we in an error state? If so show an error message.
    if (this.state.errored) {
      return (
        <div>
          <p>Error: unable to load bridge data</p>
        </div>
      );
    }

    // If we aren't in error state, are we in a loading state?
    if (this.state.loading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    // Show our bridges in a menu, with 1 MenuItem per bridge
    return this.state.bridges.map(bridge =>
      <MenuItem
        key={bridge.id}
        bridge={bridge}
        onClick={e => this.props.onChange(bridge)}
      />
    );
  }
}