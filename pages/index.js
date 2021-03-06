import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Container, IconButton, Button } from "@material-ui/core";
import { Carousel } from "react-responsive-carousel";
import clsx from "clsx";

import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import { attributes, react as HomeContent } from "../content/home.md";
import homeSlideshow from "../content/slideshow/home_slideshow.md";

const useStyles = makeStyles((theme) => ({
  overlay: {
    color: "#FFF",
    position: "absolute",
    left: "50%",
    top: "55%",
    transform: "translate(-50%,-50%)",
    zIndex: "10",
    // width:'80%',
  },
  slideTitle: {
    fontWeight: "600",
    textAlign: "left",
    marginBottom: theme.spacing(2),
    textShadow: "0 0 8px rgba(0, 0, 0, 0.7)",
    lineHeight: 1,
  },
  slide: {
    height: `100vh`,
    marginTop: -56,
    paddingTop: 56,
    // [`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
    // TODO landscape layout
    // },
    [theme.breakpoints.up("sm")]: {
      marginTop: -64,
      paddingTop: 64,
    },
  },
  slideImage: {
    objectFit: "cover",
    height: "100%",
    filter: "brightness(85%)",
  },
  navArrow: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "unset",
      position: "absolute",
      top: "50%",
      transform: "translate(0,-50%)",
      zIndex: 2,
      color: "white",
    },
  },
  right: {
    right: theme.spacing(1),
  },
  left: {
    left: theme.spacing(1),
  },
  about: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      padding: theme.spacing(2),
    },
  },
  content: {
    flex: 1,
  },
  buttonSpan: {
    width: "100%",
    textAlign: "left",
  },
  button: {
    margin: `${theme.spacing(1)}px`,
    // marginLeft: theme.spacing(2),
  },
  image: {
    width: "100%",
    height: "auto",
    maxWidth: "500px",
    [theme.breakpoints.up("md")]: {
      marginLeft: theme.spacing(3),
    },
  },
}));

export default function Index() {
  //Redirect to CMS from signup confirm link
  useEffect(() => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on(
        "login",
        () => (document.location.href = "/admin/"),
        []
      );
    }
  });
  // const [autoPlay, setAutoPlay] = useState(false);

  const classes = useStyles();

  const createSlides = () =>
    homeSlideshow.attributes.slides.map((slide) => (
      <div className={classes.slide} key={slide.text}>
        <Container maxWidth="md" className={classes.overlay}>
          <Typography
            variant="h1"
            component="div"
            className={classes.slideTitle}
          >
            {slide.text}
          </Typography>
          <div className={classes.buttonSpan}>
            {slide.buttons.map((button, index) => (
              <Button
                variant="contained"
                // TODO update when color scheme decided
                color={index % 2 == 0 ? "secondary" : "primary"}
                disableElevation
                href={button.buttonLink}
                target="_blank"
                className={classes.button}
              >
                {button.buttonText}
              </Button>
            ))}
          </div>
        </Container>

        <img
          src={slide.image.split("../../public")[1]}
          className={classes.slideImage}
        ></img>
      </div>
    ));

  return (
    <>
      {/* 
        This removes the unexplainable padding on slideshow control dots.
        It doesn't come from anywhere, it just exists. Children of the
        Carousel are rendered as slides so a global jsx was needed.
      */}
      <style jsx global>
        {`
          ul {
            padding-left: 0;
          }
        `}
      </style>
      <Head>
        <title>Home | KGG</title>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </Head>

      <Carousel
        autoPlay={true}
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay={true}
        interval={3000}
        className={classes.car}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <IconButton
              onClick={onClickHandler}
              title={label}
              className={clsx(classes.navArrow, classes.left)}
            >
              <NavigateBeforeIcon fontSize="large" />
            </IconButton>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <IconButton
              onClick={onClickHandler}
              title={label}
              className={clsx(classes.navArrow, classes.right)}
            >
              <NavigateNextIcon fontSize="large" />
            </IconButton>
          )
        }
      >
        {createSlides()}
      </Carousel>
      <Container maxWidth="md" className={classes.root}>
        <div className={classes.about}>
          <Typography
            variant="body1"
            component="div"
            className={classes.content}
          >
            <HomeContent />
          </Typography>
          <div className={classes.content}>
            <img src="/img/kgg_group.jpg" className={classes.image}></img>
          </div>
        </div>
      </Container>
    </>
  );
}
