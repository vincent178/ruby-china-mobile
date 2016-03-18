import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

export default class NativeScroll extends Component {

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll.bind(this), false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll.bind(this), false);
  }

  onScroll() {
    console.log("OnScroll");
    if (window.scrollY >= (scroll.scrollHeight - window.innerHeight - 200)) {
      console.log("[NativeScroll] this.props.dispatch(this.props.scrollFunc())");
      this.props.dispatch(this.props.scrollFunc());
    }
  }

  handleTouchMove(e) {
    this.onScroll(e);
  }

  render() {
    return (
      <div className="scroll-content"
           onTouchMove={this.handleTouchMove.bind(this)}
      >
        {this.props.children}
      </div>
    );
  }
}

NativeScroll.PropTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired
};

