import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

const RESISTANCE = 2.6;

export default class NativeScroll extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pullDistance: 0
    }
  }

  componentDidMount() {
    this._enablePullToRefresh = false;
    this._startY = 0;
  }

  componentWillUnmount() {
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

    const touchObj = e.changedTouches[0];
    this._startY = parseInt(touchObj.clientY, 10);

  }

  handleTouchMove(e) {
    console.log("handleTouchMove");
    const scroll = document.getElementById('gt-scroll-content');

    let panDirection = null;

    const touchObj = e.changedTouches[0];
    const distance = parseInt(touchObj.clientY, 10) - this._startY;

    if (distance > 0) {
      panDirection = "down";
    } else {
      panDirection = "up";
    }

    console.log("[NativeScroll] document.body.scrollTop: " + document.body.scrollTop);

    if (panDirection === "down") {
      //debugger;
    }

    if (document.body.scrollTop <= 0) {
      //debugger;
    }

    if ((panDirection === "down") && (document.body.scrollTop === 0)) {

      e.preventDefault();

      this._enablePullToRefresh = true;
      this.setState({pullDistance: distance / RESISTANCE });
      console.log("[NativeScroll] pullDistance: " + this.state.pullDistance);
    }

    if (window.scrollY >= (scroll.scrollHeight - window.innerHeight - 200)) {
      console.log("[NativeScroll] this.props.dispatch(this.props.scrollFunc())");
      this.props.dispatch(this.props.scrollFunc());
    }
  }

  handleTouchEnd(e) {
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
      <div ref="scroll" className="scroll-background">

        <div id="ptr">
          <div className="loading">
            <span id="l1"></span>
            <span id="l2"></span>
            <span id="l3"></span>
          </div>
        </div>

        <div id="gt-scroll-content"
             className="scroll-content"
             style={scrollStyle}
             onTouchStart={this.handleTouchStart.bind(this)}
             onTouchMove={this.handleTouchMove.bind(this)}
             onTouchEnd={this.handleTouchEnd.bind(this)}
        >
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

