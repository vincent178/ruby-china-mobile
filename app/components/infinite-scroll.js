import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

export default class InfiniteScroll extends Component {
  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this.refs.scroll);
    debugger;
    el.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    const el = ReactDOM.findDOMNode(this.refs.scroll);
    el.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll() {
    const el = ReactDOM.findDOMNode(this.refs.scroll);
    if (el.scrollTop >= (el.scrollHeight - el.offsetHeight - 200)) {
      this.props.dispatch(this.props.scrollFunc());
    }
  }

  render() {
    return (
      <div ref="scroll">
        {this.props.children}
      </div>
    );
  }
}

InfiniteScroll.PropTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired
};

