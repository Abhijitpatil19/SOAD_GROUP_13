import React from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Slide from "./Slide";
import Dots from "./Dots";

const CarouselSlider = ({ carouselItems }) => {
  return (
    <div className="pad_b-16 pos_rel w-100">
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className="pad_16-0"
        containerClass="container-with-dots bg_white"
        customDot={<Dots />}
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={50}
        partialVisible={true}
        removeArrowOnDeviceType={["mobile", "tablet"]}
        renderButtonGroupOutside={false}
        renderDotsOutside={true}
        responsive={{
          extra_large_screen: {
            breakpoint: {
              max: 9999,
              min: 1500,
            },
            items: 4,
            partialVisibilityGutter: 10,
          },
          desktop: {
            breakpoint: {
              max: 1499,
              min: 820,
            },
            items: 3,
            partialVisibilityGutter: 15,
          },
          tablet: {
            breakpoint: {
              max: 819,
              min: 512,
            },
            items: 2,
            partialVisibilityGutter: 20,
          },
          mobile: {
            breakpoint: {
              max: 511,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 40,
          },
        }}
        showDots={true}
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        <Slide
          description="React Carousel with Server Side Rendering Support – Part 1"
          headline="w3js.com - web front-end studio"
          image="https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
        />
        <Slide
          description="React Carousel with Server Side Rendering Support – Part 1"
          headline="w3js.com - web front-end studio"
          image="https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
        />
        <Slide
          description="Fixing CSS load order/style.chunk.css incorrect in Nextjs"
          headline="w3js.com - web front-end studio"
          image="https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
        />
        <Slide
          description="Fixing CSS load order/style.chunk.css incorrect in Nextjs"
          headline="w3js.com - web front-end studio"
          image="https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
        />
        <Slide
          description="Appending currency sign to a purchase form in your e-commerce site using plain JavaScript."
          headline="w3js.com - web front-end studio"
          image="https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
        />
        <Slide
          description="Appending currency sign to a purchase form in your e-commerce site using plain JavaScript."
          headline="w3js.com - web front-end studio"
          image="https://images.unsplash.com/photo-1550223640-23097fc71cb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
        />
        <Slide
          description="React Carousel with Server Side Rendering Support – Part 1"
          headline="w3js.com - web front-end studio"
          image="https://images.unsplash.com/photo-1550353175-a3611868086b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
        />
        <Slide
          description="React Carousel with Server Side Rendering Support – Part 2"
          headline="w3js.com - web front-end studio"
          image="https://images.unsplash.com/photo-1550330039-a54e15ed9d33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
        />
        <Slide
          description="React Carousel with Server Side Rendering Support – Part 2"
          headline="w3js.com - web front-end studio"
          image="https://images.unsplash.com/photo-1549737328-8b9f3252b927?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
        />
        <Slide
          description="React Carousel with Server Side Rendering Support – Part 1"
          headline="w3js.com - web front-end studio"
          image="https://images.unsplash.com/photo-1549833284-6a7df91c1f65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
        />
        <Slide
          description="React Carousel with Server Side Rendering Support – Part 2"
          headline="w3js.com - web front-end studio"
          image="https://images.unsplash.com/photo-1549985908-597a09ef0a7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
        />
        <Slide
          description="Fixing CSS load order/style.chunk.css incorrect in Nextjs"
          headline="w3js.com - web front-end studio"
          image="https://images.unsplash.com/photo-1550064824-8f993041ffd3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
        />
      </Carousel>
    </div>
  );
};

export default CarouselSlider;
