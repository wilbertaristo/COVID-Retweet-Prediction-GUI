import React, { Component } from "react";
import PropTypes from "prop-types";
import avatar from "../../../assets/img/avatar.png";

const DivStyle = (width, height) => {
  return {
    width,
    height,
    borderRadius: "12px",
  };
};

export default class Tweet extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { tweetObject, isSelected, onImageClick } = this.props;
    const tweetTime = tweetObject.timestamp.split(" ").slice(1, 4);
    let finalEntities = [];

    if (tweetObject.entities !== "null;") {
      finalEntities = tweetObject.entities.split(";");
      finalEntities = finalEntities
        .slice(0, finalEntities.length - 1)
        .map((entity) => unescape(entity.split(":")[1]));
      finalEntities = [...new Set(finalEntities)];
    } else {
      finalEntities.push("");
    }

    return (
      <div
        className={`responsive${isSelected ? " selected" : ""}`}
        onClick={onImageClick}
        style={{ marginBottom: "2%" }}
      >
        <div
          className={`thumbnail${isSelected ? " selected" : ""}`}
          style={DivStyle("100%", "100%")}
        >
          <div className="tweetContainer">
            <div className="tweetInnerContainer" id="tweetInnerContainer">
              <div className="headerContainer css-1dbjc4n">
                <div className="pfpContainer css-1dbjc4n">
                  <img
                    className="pfp editable-border"
                    src={avatar}
                    id="pfp"
                    width="48"
                    height="48"
                  />
                </div>
                <div className="headerRight css-1dbjc4n">
                  <div className="userinfo css-1dbjc4n">
                    <div className="nameContainer css-1dbjc4n">
                      <span className="name editable editable-border" id="name">
                        {`Tweet ${tweetObject.tweet_id}`}
                      </span>
                    </div>

                    <div className="username css-1dbjc4n">
                      <span className="editable editable-border" id="username">
                        {`@${tweetObject.username}`}
                      </span>
                    </div>
                  </div>
                  <div className="dropup">
                    <div className="tweetDropdown editable-border">
                      <svg viewBox="0 0 24 24">
                        <g>
                          <circle cx="5" cy="12" r="2"></circle>
                          <circle cx="12" cy="12" r="2"></circle>
                          <circle cx="19" cy="12" r="2"></circle>
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="css-1dbjc4n" dir="auto">
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    flexWrap: "wrap",
                    marginTop: "10px",
                  }}
                >
                  <span
                    className="tweetText tweetTextTitle"
                    id="tweetText"
                    style={{ marginRight: "5px" }}
                  >
                    Followers:
                  </span>
                  <span
                    className="tweetText"
                    id="tweetText"
                    style={{ marginRight: "5px" }}
                  >
                    {tweetObject.followers}
                  </span>
                </div>
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    className="tweetText tweetTextTitle"
                    id="tweetText"
                    style={{ marginRight: "5px" }}
                  >
                    Friends:
                  </span>
                  <span
                    className="tweetText"
                    id="tweetText"
                    style={{ marginRight: "5px" }}
                  >
                    {tweetObject.friends}
                  </span>
                </div>
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    className="tweetText tweetTextTitle"
                    id="tweetText"
                    style={{ marginRight: "5px" }}
                  >
                    Favourites:
                  </span>
                  <span
                    className="tweetText"
                    id="tweetText"
                    style={{ marginRight: "5px" }}
                  >
                    {tweetObject.favourites}
                  </span>
                </div>
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    className="tweetText tweetTextTitle"
                    id="tweetText"
                    style={{ marginRight: "5px" }}
                  >
                    Sentiment:
                  </span>
                  <span
                    className="tweetText"
                    id="tweetText"
                    style={{ marginRight: "5px" }}
                  >
                    {`Positive (${
                      tweetObject.sentiments.split(" ")[0]
                    }), Negative (${tweetObject.sentiments.split(" ")[1]})`}
                  </span>
                </div>
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    className="tweetText tweetTextTitle"
                    id="tweetText"
                    style={{ marginRight: "5px" }}
                  >
                    Entities:
                  </span>
                  <span
                    className="tweetText"
                    id="tweetText"
                    style={{ marginRight: "5px" }}
                  >
                    {finalEntities.map((entity, index) =>
                      entity === ""
                        ? "-"
                        : index === finalEntities.length - 1
                        ? entity
                        : `${entity}, `
                    )}
                  </span>
                </div>
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    className="tweetText tweetTextTitle"
                    id="tweetText"
                    style={{ marginRight: "5px" }}
                  >
                    Mentions:
                  </span>
                  <span
                    className={`tweetText ${
                      tweetObject.mentions === "null;" ? "" : "simulatedLink"
                    }`}
                    id="tweetText"
                    style={{ marginRight: "5px" }}
                  >
                    {tweetObject.mentions
                      .split(" ")
                      .map((mention) =>
                        mention === "null;" ? "-" : `@${mention} `
                      )}
                  </span>
                </div>
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    className="tweetText tweetTextTitle"
                    id="tweetText"
                    style={{ marginRight: "5px" }}
                  >
                    Hashtags:
                  </span>
                  <span
                    className={`tweetText ${
                      tweetObject.hashtags === "null;" ? "" : "simulatedLink"
                    }`}
                    id="tweetText"
                    style={{ marginRight: "5px" }}
                  >
                    {tweetObject.hashtags
                      .split(" ")
                      .map((hashtag) =>
                        hashtag === "null;" ? "-" : `#${hashtag} `
                      )}
                  </span>
                </div>
                <div
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    className="tweetText tweetTextTitle"
                    id="tweetText"
                    style={{ marginRight: "5px" }}
                  >
                    URL:
                  </span>
                  <span
                    className={`tweetText ${
                      tweetObject.url === "null;" ? "" : "simulatedLink"
                    }`}
                    id="tweetText"
                    style={{ marginRight: "5px" }}
                  >
                    {tweetObject.url
                      .split(":-:")
                      .map((link) => (link === "null;" ? "-" : `${link} `))}
                  </span>
                </div>
              </div>

              <div className="tweetDetails">
                <span className="editable-border">
                  <span id="timeOutput">{tweetTime[2].slice(0, 5)}</span> ·{" "}
                  <span id="monthOutput">{tweetTime[0]}</span>{" "}
                  <span id="dayOutput">{tweetTime[1]}</span>,{" "}
                  <span id="yearOutput">2020</span>
                </span>
              </div>

              <div className="buttonsContainer">
                <div className="tweetButton">
                  <svg viewBox="0 0 24 24">
                    <g>
                      <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
                    </g>
                  </svg>
                </div>
                <div className="tweetButton">
                  <svg viewBox="0 0 24 24">
                    <g>
                      <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path>
                    </g>
                  </svg>
                </div>
                <div className="tweetButton">
                  <svg viewBox="0 0 24 24">
                    <g>
                      <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
                    </g>
                  </svg>
                </div>
                <div className="tweetButton">
                  <svg viewBox="0 0 24 24">
                    <g>
                      <path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"></path>
                      <path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"></path>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="checked">
          <div className="icon" />
        </div>
      </div>
    );
  }
}

Tweet.propTypes = {
  src: PropTypes.string,
  isSelected: PropTypes.bool,
};
