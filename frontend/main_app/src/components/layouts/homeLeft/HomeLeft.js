import React from "react";
import { Link } from "react-router-dom";

const jobList = [
  {
    caption: "A",
    items: [
      "Agarbatti making",
      "Agriculture",
      "Agriculture machinery",
      "Anganwadi workers",
      "Animal husbandary",
      "Arrack/Liquor prod. & vending",
      "Asha worker",
      "Audio & Visual worker",
      "Automobile work",
    ],
  },
  {
    caption: "B",
    items: [
      "Bakery works",
      "Band playing",
      "Bangle manufacturing",
      "Beads making/ piercing",
      "Beautician",
      "Beedi manufacture",
      "Bicycle repair",
      "Bindi work",
      "Blacksmithy",
      "Boat/Ferry occupation",
      "Book binding",
      "Brick Kiln work",
      "Brush making",
      "Breweries Distilleries",
      "Building and Road maintenance",
      "Bulb manufacture",
      "Bullock/Camel-cart operation",
      "Butchery",
    ],
  },
  {
    caption: "C",
    items: [
      "Cable TV operation",
      "Cane/Reed work",
      "Carpentary",
      "Carpet weaving",
      "Cashew processing",
      "Catering",
      "Chikan work",
      "Cine Service",
      "Cloth printing",
      "Clubs and canteen service",
      "Coaching service",
      "Coir processing/manufacture",
      "Confectionery",
      "Construction work",
      "Construction of tents (decoration)",
      "Courier service",
    ],
  },
  {
    caption: "D",
    items: [
      "Dairying and allied activities",
      "Data entry operation",
      "Distribution of petroleum products",
      "Domestic work/helper",
      "Dyeing",
    ],
  },
  {
    caption: "E",
    items: [
      "Electronic electrical goods repairs",
      "Electroplating",
      "Embroidery work",
      "Envelop making",
    ],
  },
  {
    caption: "F",
    items: [
      "Fire work cracker production",
      "Fishery production",
      "Fish processing",
      "Flora work and garland making",
      "Flour mills operations",
      "Footwear production",
      "Foresty operation",
      "Foundry",
    ],
  },
  {
    caption: "G",
    items: [
      "Gardening and parks maintenance",
      "Garment manufacture",
      "Gem cutting",
      "Ginning",
      "Glassware manufacturing",
      "Goldsmithy",
    ],
  },
  {
    caption: "H",
    items: [
      "Hair dressing",
      "Handloom weaving",
      "Hawking and vending",
      "Headload work",
      "Health service",
      "Honey gathering",
      "Horticulture and Floriculture",
      "Hotel and Restaurant service",
    ],
  },
  {
    caption: "L",
    items: ["Lock making", "Laundry work"],
  },
  {
    caption: "M",
    items: [
      "Manual operation on unspecified jobs",
      "Masala making",
      "Matches manufacture",
      "Mid-Day Meal Worker",
      "Minor forest produce gathering",
      "Minor mineral and mines work",
    ],
  },
  {
    caption: "N",
    items: ["Newspaper vending", "NGO service"],
  },
  {
    caption: "O",
    items: ["Oil extraction"],
  },
  {
    caption: "P",
    items: [
      "Packing and Packaging",
      "Panwalla service",
      "Pappad making",
      "Petrol bunk/pump and allied service",
      "Pickle making",
      "Plantation",
      "Plastic manufacture",
      "Pottery",
      "Powerloom weaving",
      "Printing press work",
    ],
  },
  {
    caption: "Q",
    items: ["Quary work"],
  },
  {
    caption: "R",
    items: ["Rag picking", "Rice milling", "Rickshaw pulling"],
  },
  {
    caption: "S",
    items: [
      "Salt pan work",
      "Sand mining",
      "Sawmill work",
      "Scavenging",
      "Security service",
      "Sericulture (Silk rearing)",
      "Service station work",
      "Shepherding",
      "Shoe shining work",
      "Shop and establishment service",
      "Small scale industries",
      "Soap manufacture",
      "Sports good manufacture",
      "Steel vessels and utensils manufacture",
      "Stone crushing",
      "Sweeping",
    ],
  },
  {
    caption: "T",
    items: [
      "Tanning leather goods manufacture",
      "Telephone booth service",
      "Temple leaves collection",
      "Tendu leaves collection",
      "Timber Industry (Furniture)",
      "Tobacco processing",
      "Toddy tapping",
      "Toy making",
      "Transport service",
    ],
  },
  {
    caption: "W",
    items: ["Wayside Mechanics and service", "Welding"],
  },
];

const HomeLeft = () => {
  return (
    <div
      style={{ maxHeight: "1140px" }}
      className="w-100 fcol bb mob_mar_t-32 mob_mar_l-16 of-scr"
    >
      <div className="fwb fc_sec fss">All categories</div>
      {jobList.map((group) => (
        <div key={group.caption} className="mar_t-32 fcol">
          <div className="fsxl fwb fc_pri mar_b-8">{group.caption}</div>
          {group.items.map((jobName, i) => (
            <Link
              to={`/categories/${jobName}`}
              key={i}
              className="fss fc_5c link mar_t-4 hov_t_pri"
            >
              {jobName}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default HomeLeft;
