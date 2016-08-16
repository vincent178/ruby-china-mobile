import React, { Component, PropTypes } from 'react';

export default class NativeScroll extends Component {

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll.bind(this), false);
    document.addEventListener('touchMove', this.handleTouchMove.bind(this), false);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll.bind(this));
    document.removeEventListener('touchMove', this.handleTouchMove.bind(this));
  }

  getScrollXY() {
    var scrOfX = 0, scrOfY = 0;
    if( typeof( window.pageYOffset ) == 'number' ) {
      //Netscape compliant
      scrOfY = window.pageYOffset;
      scrOfX = window.pageXOffset;
    } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
      //DOM compliant
      scrOfY = document.body.scrollTop;
      scrOfX = document.body.scrollLeft;
    } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
      //IE6 standards compliant mode
      scrOfY = document.documentElement.scrollTop;
      scrOfX = document.documentElement.scrollLeft;
    }
    return [ scrOfX, scrOfY ];
  }

  getDocHeight() {
    var D = document;
    return Math.max(
      D.body.scrollHeight, D.documentElement.scrollHeight,
      D.body.offsetHeight, D.documentElement.offsetHeight,
      D.body.clientHeight, D.documentElement.clientHeight
    );
  }

  handleScroll() {

    if (this.getScrollXY()[1] >=  this.getDocHeight() - window.innerHeight - 100 + 46) {

      console.log("[NativeScroll] this.props.dispatch(this.props.scrollFunc())");
      this.props.scrollFunc();

    }
  }

  handleTouchMove(e) {
    this.handleScroll(e);
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

NativeScroll.propTypes = {
  scrollFunc: PropTypes.func.isRequired,
  stop: PropTypes.boolean
};

