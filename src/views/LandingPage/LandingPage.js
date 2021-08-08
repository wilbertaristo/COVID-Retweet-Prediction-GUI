import React, { useRef, useState, useReducer, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import {
  Divider,
  Modal,
  Backdrop,
  Fade,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import { trainLoss, valLoss } from "../../model_losses.js";

// Load sample images for live demo
import ImagePicker from "components/ImagePicker/react-image-picker.js";
import "components/ImagePicker/index.scss";

import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

const chartData = trainLoss.map((trainloss, index) => ({
  name: index + 1,
  trainLoss: trainloss.toFixed(3),
  valLoss: valLoss[index].toFixed(3),
}));

const inputAttributes = [
  { "Tweet ID": "Long" },
  { "#Followers": "Integer" },
  { "#Friends": "Integer" },
  { "#Favorites": "Integer" },
  { "#Retweets (TARGET)": "Integer" },
  { "Encrypted Username": "String" },
  { Entities: "String" },
  { "Sentiment (in SentiStrength)": "String" },
  { Mentions: "String" },
  { Hashtags: "String" },
  { URLs: "String" },
  { Timestamp: 'Format ( "EEE MMM dd HH:mm:ss Z yyyy" )' },
];

const initialState = {
  fetched: false,
  refreshing: false,
  tweetObjects: undefined,
};
const ROOT_URL = "http://127.0.0.1:5000";

function reducer(state, action) {
  switch (action.type) {
    case "fetched":
      return { ...state, fetched: true };
    case "reset":
      return { ...state, fetched: false };
    case "refresh":
      return { ...state, refreshing: true };
    case "stopRefresh":
      return { ...state, refreshing: false, tweetObjects: action.payload };
    case "refreshError":
      return { ...state, refreshing: false };
    default:
      throw new Error();
  }
}

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const [openModal, setOpenModal] = useState(false);
  const [selectedSamples, setSelectedSamples] = useState(undefined);
  const [selectedGroundTruth, setSelectedGroundTruth] = useState(undefined);

  const [modelProcessing, setModelProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fetchedPrediction, setFetchedPrediction] = useState();

  const [state, dispatch] = useReducer(reducer, initialState);

  const teamRef = useRef(null);
  const teamScroller = () =>
    teamRef.current.scrollIntoView({ behaviour: "smooth" });

  const handleOpenModal = () => {
    setErrorMessage("");
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setErrorMessage("");
    setSelectedSamples(undefined);
    setOpenModal(false);
  };

  const handlePickSample = (image) => {
    setErrorMessage("");
    setSelectedSamples(state.tweetObjects[image.value]);
    setSelectedGroundTruth(state.tweetObjects[image.value]["retweets"]);
  };

  const handlePredictRetweets = async () => {
    console.log(selectedSamples);
    setModelProcessing(true);
    await axios
      .post(`${ROOT_URL}/tweets`, selectedSamples, {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((uploadResponse) => {
        setFetchedPrediction(uploadResponse.data);
        setModelProcessing(false);
        dispatch({
          type: "fetched",
        });
      })
      .catch((uploadError) => {
        setErrorMessage(uploadError.message);
        setModelProcessing(false);
        dispatch({
          type: "reset",
        });
      });
  };

  const handleRefresh = async () => {
    dispatch({
      type: "refresh",
    });
    await axios
      .get(`${ROOT_URL}/tweets`, {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((tweetResponse) => {
        dispatch({
          type: "stopRefresh",
          payload: tweetResponse.data,
        });
      })
      .catch((uploadError) => {
        setErrorMessage(uploadError.message);
        dispatch({
          type: "refreshError",
        });
      });
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleUploadAnother = () => {
    dispatch({
      type: "reset",
    });
    setErrorMessage("");
  };

  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Deep Learning Group 4"
        rightLinks={<HeaderLinks teamScroller={teamScroller} />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        teamScroller={teamScroller}
        {...rest}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div
            className={classes.paper}
            style={
              !modelProcessing &&
              !state.refreshing &&
              !state.fetched && { height: "95%" }
            }
          >
            <div
              style={{
                height: "100%",
                overflowX: "hidden",
                scrollbarWidth: "thin",
                overflowY: "scroll",
                padding: "2vw 4vw",
              }}
            >
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2 id="transition-modal-title" style={{ marginTop: "0px" }}>
                  Live Demo
                </h2>
                <div
                  style={{
                    padding: "10px 0",
                    flexDirection: "row",
                    display: "flex",
                  }}
                >
                  <Button
                    color="twitter"
                    size="lg"
                    onClick={handleRefresh}
                    target="_blank"
                    rel="noopener noreferrer"
                    disabled={modelProcessing || state.refreshing}
                    style={{
                      display: state.fetched ? "none" : "flex",
                      marginRight: "25px",
                    }}
                  >
                    Refresh Tweets
                  </Button>
                  <Button
                    disabled={modelProcessing || !selectedSamples}
                    color="twitter"
                    size="lg"
                    onClick={handlePredictRetweets}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: state.fetched ? "none" : "flex" }}
                  >
                    {modelProcessing ? "Processing The Tweet" : "Run Model"}
                  </Button>
                </div>
              </div>
              <Divider />
              {state.fetched ? (
                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: "20px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <h5>Our Model's Prediction</h5>
                        <h1>{fetchedPrediction}</h1>
                      </div>
                      <Divider
                        orientation="vertical"
                        style={{ margin: "0 10px" }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <h5>Ground Truth</h5>
                        <h1>{selectedGroundTruth}</h1>
                      </div>
                    </div>
                    <Button
                      color="info"
                      size="lg"
                      onClick={handleUploadAnother}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ marginTop: "20px" }}
                    >
                      Predict Another Tweet
                    </Button>
                  </div>
                </div>
              ) : (
                <div style={{ flex: 1 }}>
                  {modelProcessing || state.refreshing ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "100px 0",
                        width: "40vw",
                      }}
                    >
                      <CircularProgress size={100} />
                    </div>
                  ) : (
                    <div style={{ flex: 1 }}>
                      <h4
                        id="transition-modal-description"
                        style={{ marginBottom: "15px", color: "#999" }}
                      >
                        Please select the tweet of which you want to predict the
                        number of retweets:
                      </h4>
                      {errorMessage.length > 0 ? (
                        <Alert
                          severity="error"
                          style={{ marginBottom: "20px" }}
                        >
                          {errorMessage}
                        </Alert>
                      ) : null}
                      {state.tweetObjects ? (
                        <ImagePicker
                          tweetObjects={state.tweetObjects.map(
                            (tweetObject, i) => ({
                              src: tweetObject,
                              value: i,
                            })
                          )}
                          onPick={handlePickSample}
                        />
                      ) : null}
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button
                          color="twitter"
                          size="lg"
                          onClick={handleRefresh}
                          target="_blank"
                          rel="noopener noreferrer"
                          disabled={modelProcessing || state.refreshing}
                          style={{ marginRight: "25px", marginTop: "25px" }}
                        >
                          Refresh Tweets
                        </Button>
                        <Button
                          disabled={modelProcessing || !selectedSamples}
                          color="twitter"
                          size="lg"
                          onClick={handlePredictRetweets}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ marginTop: "25px" }}
                        >
                          {modelProcessing
                            ? "Processing The Tweet"
                            : "Run Model"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Fade>
      </Modal>
      <Parallax filter image={require("assets/img/landing-bg.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6} style={{ maxWidth: "50%" }}>
              <h1 className={classes.title}>COVID-19 Retweet Prediction</h1>
              <h4>
                A deep learning model capable of predicting the number of
                retweets for a COVID-related tweet.
              </h4>
              <br />
              <Button
                color="twitter"
                size="lg"
                onClick={handleOpenModal}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" style={{ marginRight: "10px" }} />
                Live Demo
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <Divider />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "1rem",
              paddingTop: "15px",
            }}
          >
            <h2
              className={classes.dataFormatTitle}
              style={{ marginBottom: "35px" }}
            >
              Loss Graph
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <LineChart
                width={1000}
                height={500}
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" type="number" />
                <YAxis
                  domain={[
                    (dataMin) => Math.round(dataMin - 0.5),
                    (dataMax) => Math.round(dataMax + 0.5),
                  ]}
                />
                <Tooltip
                  labelFormatter={(label) => `Epoch ${label}`}
                  labelStyle={{ color: "black" }}
                />
                <Legend wrapperStyle={{ bottom: "15px" }} />
                <Line type="monotone" dataKey="trainLoss" stroke="#8884d8" />
                <Line type="monotone" dataKey="valLoss" stroke="#82ca9d" />
              </LineChart>
            </div>
          </div>
          <Divider />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "1rem",
              paddingTop: "15px",
            }}
          >
            <h2 className={classes.dataFormatTitle}>Model Input Schema</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              {inputAttributes.map((attribute) => {
                const [key, value] = Object.entries(attribute)[0];
                return (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <h5
                      className={classes.attributeTitle}
                      style={{ marginRight: "7px" }}
                    >
                      {`${key}:`}
                    </h5>
                    <h5
                      style={{
                        color:
                          value === "String"
                            ? "green"
                            : value === "Integer"
                            ? "orange"
                            : value === "Long"
                            ? "red"
                            : "blue",
                        fontWeight: "200",
                        fontFamily: `"Roboto Slab", "Times New Roman", serif`,
                      }}
                    >
                      {value}
                    </h5>
                  </div>
                );
              })}
            </div>
          </div>
          <Divider />
          <TeamSection teamRef={teamRef} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
