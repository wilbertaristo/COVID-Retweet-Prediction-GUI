import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import SwapHoriz from "@material-ui/icons/SwapHoriz";
import PhotoLibrary from "@material-ui/icons/PhotoLibrary";
import Settings from "@material-ui/icons/Settings";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/productStyle.js";

const useStyles = makeStyles(styles);

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Project Specifications</h2>
          <h5 className={classes.description}></h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Input & Output"
              description="Input: A tweet object which includes multiple attributes shown below in the model input schema."
              description2="Output: Predicted number of retweets"
              icon={SwapHoriz}
              iconColor="primary"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Dataset"
              description="We used a subset of the TweetsCOV19 dataset to train our model due to insufficient processing power available. The sub-dataset contains more than 1 million COVID-19 related tweets in May 2020."
              icon={PhotoLibrary}
              iconColor="danger"
              vertical
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <InfoArea
              title="Architecture"
              description="We preprocessed the dataset and grouped them into numerical, embedded categorical, and embedded multi-categorical features."
              description2="The features are then flattened and concatenated before they are passed into our model which employs 5 Fully Connected (FC) Layers, Batch Normalization, ReLU activation function, and Dropout as a regularizer"
              icon={Settings}
              iconColor="info"
              vertical
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
