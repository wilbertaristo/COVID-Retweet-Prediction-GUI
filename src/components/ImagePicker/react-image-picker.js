import React, { Component } from "react";
import PropTypes from "prop-types";
import { Map } from "immutable";

import "./index.scss";
import Tweet from "./components/tweet";

class ImagePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      picked: Map(),
    };
    this.handleImageClick = this.handleImageClick.bind(this);
    this.renderImage = this.renderImage.bind(this);
  }

  handleImageClick(image) {
    const { multiple, onPick, maxPicks, onMaxPicks } = this.props;
    const pickedImage = multiple ? this.state.picked : Map();
    let newerPickedImage;

    if (pickedImage.has(image.value)) {
      newerPickedImage = pickedImage.delete(image.value);
    } else {
      if (typeof maxPicks === "undefined") {
        newerPickedImage = pickedImage.set(image.value, image.src);
      } else {
        if (pickedImage.size < maxPicks) {
          newerPickedImage = pickedImage.set(image.value, image.src);
        } else {
          onMaxPicks(image);
        }
      }
    }

    if (newerPickedImage) {
      this.setState({ picked: newerPickedImage });

      const pickedImageToArray = [];
      newerPickedImage.map((image, i) =>
        pickedImageToArray.push({ src: image, value: i })
      );

      onPick(multiple ? pickedImageToArray : pickedImageToArray[0]);
    }
  }

  renderImage(tweetObject, i) {
    return (
      <Tweet
        tweetObject={tweetObject.src}
        isSelected={this.state.picked.has(tweetObject.value)}
        onImageClick={() => this.handleImageClick(tweetObject)}
        key={i}
      />
    );
  }

  render() {
    const { tweetObjects } = this.props;
    return (
      <div className="image_picker">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {tweetObjects.map(this.renderImage)}
          <div className="clear" />
        </div>
      </div>
    );
  }
}

ImagePicker.propTypes = {
  images: PropTypes.array,
  multiple: PropTypes.bool,
  onPick: PropTypes.func,
  maxPicks: PropTypes.number,
  onMaxPicks: PropTypes.func,
};

export default ImagePicker;
