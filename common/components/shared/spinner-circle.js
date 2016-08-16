import React, {
  Component,
  PropTypes
} from 'react';
import style from './spinner-circle.css';

export default class SpinnerCircle extends React.Component {

  render() {

    let width = this.props.width;

    return (
      <div className={style.spinerContainer} >
        <div className={style.spinnerDiv}>
          <svg className={style.spinner} width={`${width}px`} height={`${width}px`} viewBox="0 0 66 66">
            <circle className={style.path}
                    fill="none"
                    strokeWidth="6"
                    strokeLinecap="round"
                    cx="33" cy="33" r="30"
                    style={{stroke: this.props.color ? this.props.color : 'white'}}
            />
          </svg>
        </div>
      </div>
    );
  }
}

SpinnerCircle.propTypes = {
  width: PropTypes.number.isRequired,
  color: PropTypes.string
};