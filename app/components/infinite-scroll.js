import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

export default class InfiniteScroll extends Component {
  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
  }

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this.refs.scroll);
    el.addEventListener('scroll', this.onScroll, false);
    el.addEventListener('touchstart', this.handleTouchStart, false);
    el.addEventListener('touchmove', this.handleTouchMove, false);
    el.addEventListener('touchend', this.handleTouchEnd, false);
  }

  componentWillUnmount() {
    const el = ReactDOM.findDOMNode(this.refs.scroll);
    el.removeEventListener('scroll', this.onScroll, false);
    el.removeEventListener('touchstart', this.handleTouchStart, false);
    el.removeEventListener('touchmove', this.handleTouchMove, false);
    el.removeEventListener('touchend', this.handleTouchEnd, false);
  }

  onScroll() {
    const el = ReactDOM.findDOMNode(this.refs.scroll);
    if (el.scrollTop >= (el.scrollHeight - el.offsetHeight - 200)) {
      this.props.dispatch(this.props.scrollFunc());
    }
  }

  handleTouchStart(evt) {
    console.log("handleTouchStart");
  }

  handleTouchMove(evt) {
    console.log("handleTouchMove");
    const el = ReactDOM.findDOMNode(this.refs.scroll);
    if (window.scrollY >= (el.scrollHeight - window.innerHeight - 200)) {
      this.props.dispatch(this.props.scrollFunc());
    }
  }

  handleTouchEnd(evt) {
    console.log("handleTouchEnd");
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

