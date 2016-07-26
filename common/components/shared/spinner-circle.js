import React, {
  Component,
  PropTypes
} from 'react';
import styles from './spinner-circle.css';

export default class SpinnerCircle extends React.Component {

  render() {

    let width = this.props.width;

    return (
      <svg className={styles.spinner} width={`${width}px`} height={`${width}px`} viewBox="0 0 66 66">
        <circle className={styles.path} fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30" />
      </svg>
    );
  }
}

SpinnerCircle.propTypes = {
  width: PropTypes.number.isRequired
};