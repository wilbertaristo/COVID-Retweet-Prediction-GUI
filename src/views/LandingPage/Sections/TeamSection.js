import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";

import styles from "assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";

import dingxuan from "assets/img/faces/dingxuan.jpg";
import lichang from "assets/img/faces/lichang.jpg";
import jeremy from "assets/img/faces/jeremy.jpg";
import wilb from "assets/img/faces/wilb.jpg";

const useStyles = makeStyles(styles);

export default function TeamSection(props) {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const { teamRef } = props;
  return (
    <div className={classes.section} style={{ paddingTop: "45px" }}>
      <h2 className={classes.title}>Our team</h2>
      <div ref={teamRef}>
        <GridContainer style={{ justifyContent: "center" }}>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={dingxuan} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Ding Xuan
                <br />
                <small className={classes.smallTitle}>1003455</small>
              </h4>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={lichang} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Ong Li-Chang
                <br />
                <small className={classes.smallTitle}>1003328</small>
              </h4>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer style={{ justifyContent: "center" }}>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={wilb} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Wilbert Aristo
                <br />
                <small className={classes.smallTitle}>1003742</small>
              </h4>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img src={jeremy} alt="..." className={imageClasses} />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Jeremy Ng
                <br />
                <small className={classes.smallTitle}>1003565</small>
              </h4>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
