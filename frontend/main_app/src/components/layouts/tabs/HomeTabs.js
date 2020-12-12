import React from "react";
import { Link } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const eventList = [
  {
    caption: "Catering",
    items: [
      {
        img:
          "https://pbs.twimg.com/profile_images/699898748932063232/JgCLMMmW_400x400.jpg",
        title: "Birthday Party",
      },
      {
        img:
          "https://i.pinimg.com/originals/32/9a/3f/329a3f9cfd94698ad7763ab957944a59.jpg",
        title: "House Party",
      },
      {
        img:
          "https://i.pinimg.com/474x/f7/d4/d7/f7d4d797680d76a021abe31308040c77.jpg",
        title: "Marriage",
      },
    ],
  },
  {
    caption: "Cooking",
    items: [
      {
        img:
          "https://i.pinimg.com/originals/26/6a/33/266a335f93c1d6b7f0c8ff901ac2bc26.jpg",
        title: "Marriage",
      },
    ],
  },
  {
    caption: "Other",
    items: [
      {
        img:
          "https://i.pinimg.com/originals/26/6a/33/266a335f93c1d6b7f0c8ff901ac2bc26.jpg",
        title: "Concert",
      },
      {
        img:
          "https://nationaleventpros.com/wp-content/uploads/2019/11/xNWEventShow_Block41_MSP_111319-8-256x256.jpg.pagespeed.ic.GDtWlJC5It.jpg",
        title: "Seminar",
      },
    ],
  },
];

const HomeTabs = () => {
  return (
    <div className="fcol mar_t-32">
      <div className="fc_bw pad_0-8">
        <div className="fwb fc-5c fsn">Events management</div>
        <Link className="link fwb fsm" to="/categories">
          Show all
        </Link>
      </div>
      <Tabs
        className="w-100 mar_t-32 pad-16 bb bg_gray-light round-8"
        selectedTabClassName="bg_pri fc_white fwb round_lrt-8"
      >
        <TabList className="fc no_list fsm fc-5c bor_b_pri-1 mar_b-16">
          {eventList.map((list) => (
            <Tab key={list.caption} className="pad_8-16 cur">
              {list.caption}
            </Tab>
          ))}
        </TabList>

        {eventList.map((list) => (
          <TabPanel
            key={list.caption}
            className="tabs_grid-2 w-100 of-scr pad_b-4"
          >
            {list.items.map((item, i) => (
              <Link
                className="link fcol round-4 hov_shad shadow_1-1-4-light of-hid mar_r-16"
                key={i}
              >
                <img src={item.img} className="h-120p w-80p" alt="" />
                <div
                  style={{ maxWidth: "60px" }}
                  className="pad_4-8 bb fwb fss fc_5c"
                >
                  {item.title}
                </div>
              </Link>
            ))}
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default HomeTabs;
