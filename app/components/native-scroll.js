import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

var resistance = 2;

export default class NativeScroll extends Component {
  constructor(props) {
    super(props);


    // make bindings
    //this.onScroll = this.onScroll.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);

    this.state = {
      pullDistance: 0
    }
  }

  componentDidMount() {
    const scroll = document.getElementById('gt-scroll-content');

    //el.addEventListener('scroll', this.onScroll, false);
    scroll.addEventListener('touchstart', this.handleTouchStart, false);
    scroll.addEventListener('touchmove', this.handleTouchMove, false);
    scroll.addEventListener('touchend', this.handleTouchEnd, false);

    this._startingPositionY = 0;
    this._enablePullToRefresh = false;
    this._startY = 0;
  }

  componentWillUnmount() {
    const scroll = document.getElementById('gt-scroll-content');

    scroll.removeEventListener('scroll', this.onScroll, false);
    scroll.removeEventListener('touchstart', this.handleTouchStart, false);
    scroll.removeEventListener('touchmove', this.handleTouchMove, false);
    scroll.removeEventListener('touchend', this.handleTouchEnd, false);

    // destroy instance data
    this._startingPositionY = null;
    this._enablePullToRefresh = null;
    this._startY = null;
  }

  onScroll() {
    const el = ReactDOM.findDOMNode(this.refs.scroll);
    if (el.scrollTop >= (el.scrollHeight - el.offsetHeight - 300)) {
      this.props.dispatch(this.props.scrollFunc());
    }
  }


  handleTouchStart(e) {
    console.log("[NativeScroll] handleTouchStart");

    this._startingPositionY = document.body.scrollTop;
    if (this._startingPositionY === 0) {
      this._enablePullToRefresh = true;
    }

    const touchObj = e.changedTouches[0];
    this._startY = parseInt(touchObj.clientY, 10);

    e.preventDefault();
  }

  handleTouchMove(e) {
    console.log("handleTouchMove");

    if (this._enablePullToRefresh) {
      const touchObj = e.changedTouches[0];
      const distance = parseInt(touchObj.clientY, 10) - this._startY;
      if (distance > 0) {
        this.setState({pullDistance: distance / resistance});
        console.log("[NativeScroll] pullDistance: " + this.state.pullDistance);
      }
    }

    //const el = ReactDOM.findDOMNode(this.refs.scroll);
    //if (window.scrollY >= (el.scrollHeight - window.innerHeight - 200)) {
    //  this.props.dispatch(this.props.scrollFunc());
    //}
    //
    //if (window.scrollY < 0) {
    //  var ptr = document.getElementById('ptr');
    //  ptr.style.transform = `translateY(0, 50px)`;
    //}
  }

  handleTouchEnd(evt) {
    console.log("handleTouchEnd");

    if (this._enablePullToRefresh) {
      this.setState({pullDistance: 0});
      this._enablePullToRefresh = false;
    }
  }

  render() {
    let scrollStyle = {
      transform: `translateY(${this.state.pullDistance}px)`,
      WebkitTransform: `translateY(${this.state.pullDistance}px)`
    };

    return (
      <div ref="scroll">

        <div id="ptr">
          <div className="loading">
            <span id="l1"></span>
            <span id="l2"></span>
            <span id="l3"></span>
          </div>
        </div>

        <div id="gt-scroll-content" style={scrollStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

NativeScroll.PropTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired
};

