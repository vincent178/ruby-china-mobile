import React, {
  Component,
  PropTypes
} from 'react';

import TopicItem from './topic-item';

export default class TopicList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        Topic List
      </div>
    )
  }
}

TopicList.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number
  })).isRequired
};