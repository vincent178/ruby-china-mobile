import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Hammer from 'hammerjs';

var resistance = 2.5;

export default class NativeScroll extends Component {
  constructor(props) {
    super(props);

    this._panStart = this._panStart.bind(this);
    this._panUp = this._panUp.bind(this);
    this._panDown = this._panDown.bind(this);
    this._panEnd = this._panEnd.bind(this);


    this.onScroll = this.onScroll.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
  }

  componentDidMount() {
    var content = document.getElementById('content');
    this.hm = new Hammer.Manager(content, {
      recognizers: [
        [Hammer.Pan, {direction: Hammer.DIRECTION_HORIZONTAL}]
      ]
    });

    this.hm.on('panstart', this._panStart);
    this.hm.on('panup', this._panUp);
    this.hm.on('pandown', this._panDown);
    this.hm.on('panend', this._panEnd);

    this.pan = {
      enabled: false,
      distance: 0,
      startingPositionY: 0
    };

    //el.addEventListener('scroll', this.onScroll, false);
    //el.addEventListener('touchstart', this.handleTouchStart, false);
    //el.addEventListener('touchmove', this.handleTouchMove, false);
    //el.addEventListener('touchend', this.handleTouchEnd, false);
  }

  componentWillUnmount() {
    const el = ReactDOM.findDOMNode(this.refs.scroll);
    this.hm.destroy();

    el.removeEventListener('scroll', this.onScroll, false);
    el.removeEventListener('touchstart', this.handleTouchStart, false);
    el.removeEventListener('touchmove', this.handleTouchMove, false);
    el.removeEventListener('touchend', this.handleTouchEnd, false);
  }

  onScroll() {
    const el = ReactDOM.findDOMNode(this.refs.scroll);
    if (el.scrollTop >= (el.scrollHeight - el.offsetHeight - 300)) {
      this.props.dispatch(this.props.scrollFunc());
    }
  }

  _panStart() {
    console.log("[NativeScroll] _panStart()");
    this.pan.startingPositionY = document.body.scrollTop;

    if (this.pan.startingPositionY === 0) {
      this.pan.enabled = true;
    }
  }

  _panUp(e) {
    console.log("[NativeScroll] _panUp() ");

    if (!this.pan.enabled || this.pan.distance === 0) {
      return;
    }

    e.preventDefault();
    this.pan.distance = e.distance / resistance;

  }

  _panDown(e) {
    console.log("[NativeScroll] _panDown() ");

    if (!this.pan.enabled) {
      return;
    }

    var content = document.getElementById('content');
    var ptr = document.getElementById('ptr');

    e.preventDefault();
    this.pan.distance = e.distance / resistance;

    ptr.style.transform = ptr.style.webkitTransform = `translate(${this.pan.distance}px)`;
    content.style.transform = content.style.webkitTransform = `translate(${1}px)`;

  }

  _panEnd() {
    console.log("[NativeScroll] _panEnd() ");

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
    if (window.scrollY < 0) {
      debugger;
      var ptr = document.getElementById('ptr');
      ptr.style.transform = `translateY(0, 50px)`;
    }
  }

  handleTouchEnd(evt) {
    console.log("handleTouchEnd");

  }

  render() {
    return (
      <div ref="scroll">

        <div id="ptr">
          <div className="loading">
            <span id="l1"></span>
            <span id="l2"></span>
            <span id="l3"></span>
          </div>
        </div>

        <div id="content" className="scroll-container">
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

