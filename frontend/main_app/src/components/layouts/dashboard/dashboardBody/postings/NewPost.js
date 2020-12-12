import React, { useCallback, useState, useEffect, useContext } from "react";
import { Prompt, useHistory } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import AsyncCreatableSelect from "react-select/async-creatable";
import Axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import enIN from "date-fns/locale/en-IN";
import { useDropzone } from "react-dropzone";

import States from "../../../../../constants/States";

import {
  pri_col,
  pri_very_light,
  sec_col,
  text_8a,
} from "../../../../../constants/Colors";
import createJob from "../../../../../contexts/actions/jobs/createJob";
import { GlobalContext } from "../../../../../contexts/Provider";
import clearCreateJob from "../../../../../contexts/actions/jobs/clearCreateJob";

const API_KEY = "AIzaSyDEoiDfpQW73648IFxcQUNIupKCOJKf6IQ";

const NewPost = () => {
  // local state management
  const [isJobPermanent, setIsJobPermanent] = useState(false);
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [detectedLocation, setDetectedLocation] = useState("");
  const [form, setForm] = useState({
    date_of_expiry: new Date(),
    country: "India",
    logo_image: null,
  });
  const [images, setImages] = useState([]);

  const history = useHistory();

  // registering locale
  registerLocale("en-IN", enIN);

  const {
    myJobsDispatch,
    myJobsState: {
      addJob: { loading, error, data },
    },
  } = useContext(GlobalContext);

  // checking if user  trys to change route midway of editing form
  // .length > 3 is used, since 3 values are alrady present in initial form state
  const isFormHalfFilled = false;
  // const isFormHalfFilled =
  //   Object.values(form).filter((item) => item && item !== "")?.length > 3 &&
  //   !data;

  // redirect on successful posting i.e. when we hve data
  useEffect(() => {
    if (data) {
      history.goBack();
    }
    return () => {
      clearCreateJob()(myJobsDispatch);
    };
  }, [data]);

  // onChange
  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // set isJobPermanent's value on each toggles
  useEffect(() => {
    setForm({
      ...form,
      is_permanent: isJobPermanent,
    });
  }, [isJobPermanent]);

  // cancelPost
  const cancelPost = () => {
    history.goBack();
  };

  // ------- handleDetectLocation --------
  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      setDetectedLocation(() => "locating...");
      navigator.geolocation.getCurrentPosition(showPosition, handleError, {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      });
    } else {
      alert(
        "This feature isn't supported. Try manually searching the address..."
      );
    }
  };

  const showPosition = (position) => {
    let posX = position.coords.latitude;
    let posY = position.coords.longitude;

    let currentLocation = "";

    let locAPI =
      "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
      posX +
      "," +
      posY +
      "&key=" +
      API_KEY;

    Axios.get(locAPI)
      .then((response) => {
        currentLocation = response.data.results[0].formatted_address;
        setForm({
          ...form,
          lat: posX,
          long: posY,
        });
        setDetectedLocation(() => currentLocation);
      })
      .catch((error) => {
        console.log(error);
        setDetectedLocation(
          () => "Couldn't detect location. Some error occured."
        );
      })
      .finally();
  };

  const handleError = (error) => {
    let errMsg = "";
    switch (error.code) {
      case error.PERMISSION_DENIED:
        errMsg =
          "PERMISSION_DENIED. Allow website to use location in site settings...";
        break;
      case error.POSITION_UNAVAILABLE:
        errMsg =
          "POSITION_UNAVAILABLE. Sorry, your current position is unavailable...";
        break;
      case error.TIMEOUT:
        errMsg = "Server timed out. Make sure Location service is turned on...";
        break;
      case error.UNKNOWN_ERROR:
        errMsg = "UNKNOWN_ERROR. Error code: 0";
        break;

      default:
        errMsg =
          "Something unexpected happened. We couldn't process your request...";
        break;
    }
    setDetectedLocation(() => errMsg);
  };
  // ----------------------------------

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();

    // todo: validate form
    if (form.title && form.description && form.payment) {
      // proceed submitting
      createJob(form)(myJobsDispatch);
    } else {
      // throw error
      alert("All fields with * are mendatory");
    }
  };

  // --------------image picker---------------
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: false,
    maxSize: 2097200,
    onDrop: (acceptedFiles) => {
      setImages(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = images.map((file) => (
    <div className="vis-flex" key={file.name}>
      <div className="fcc pos_rel">
        <img
          src={file.preview}
          className="mar_t-8 mar_r-8 h-80p w-80p round-4 of-hid shadow_1-1-4-light"
        />
        <button
          type="button"
          onClick={() => setImages(() => [])}
          style={{ top: "10px", right: "10px" }}
          className="btn cur round-4 fsl fcc h-32p w-32p fc_err bg_gray-light pos_abs"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  ));

  // set first image as image logo on change of every image selection
  useEffect(() => {
    if (images) {
      setForm({
        ...form,
        logo_image: images[0],
      });
    }
  }, [images]);

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      images.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [form.logo_image]
  );
  // -----------------------------------------

  // defining custom theme for select component
  const customTheme = (theme) => {
    return {
      ...theme,
      border: "1px solid",
      background: pri_col,
      colors: {
        ...theme.colors,
        primary25: pri_very_light,
        primary: pri_col,
      },
    };
  };

  const arrowStyleWrapper = {
    dropdownIndicator: (defaultStyles) => ({
      ...defaultStyles,
      color: sec_col,
    }),
    control: (base, state) => ({
      ...base,
      // background: pri_very_light,
      borderColor: state.isFocused ? pri_col : text_8a,
      "&:hover": {
        borderColor: state.isFocused ? pri_col : text_8a,
      },
    }),
  };

  // list of productCat
  const timeFrameList = [
    {
      value: "Minute",
      label: "Minute",
    },
    {
      value: "Hour",
      label: "Hour",
    },
    {
      value: "Day",
      label: "Day",
    },
    {
      value: "Month",
      label: "Month",
    },
    {
      value: "Year",
      label: "Year",
    },
    {
      value: "TASK",
      label: "TASK",
    },
  ];

  // list of productCat
  const job_categories = [
    {
      value: "Manual labour",
      label: "Manual labour",
    },
    {
      value: "Agriculture",
      label: "Agriculture",
    },
    {
      value: "Construction",
      label: "Construction",
    },
    {
      value: "Other",
      label: "Other",
    },
  ];

  // addressData
  // needs to be implemented using async call and stored in local state
  const addressData = [
    {
      label: "Chittoor",
      value: "Chittoor",
    },
    {
      label: "Chennai",
      value: "Chennai",
    },
    {
      label: "Bhagalpur",
      value: "Bhagalpur",
    },
  ];

  // ----async creatable handlers----
  const filterData = useCallback(
    (inputValue) => {
      return addressData.filter((i) =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
      );
    },
    [addressData]
  );

  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterData(inputValue));
      }, 1000);
    });

  const filterCatData = useCallback(
    (inputValue) => {
      return job_categories.filter((i) =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
      );
    },
    [job_categories]
  );

  const promiseCatOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterCatData(inputValue));
      }, 1000);
    });

  // --------------------------------

  // renderCheckbox
  const renderCheckbox = (boolVal) => {
    if (boolVal) {
      return (
        <i
          name="job_permanent"
          id="job_permanent"
          onClick={() => setIsJobPermanent(() => !isJobPermanent)}
          className="far fsl cur fc_sec fa-check-square"
        ></i>
      );
    } else {
      return (
        <i
          name="job_permanent"
          id="job_permanent"
          onClick={() => setIsJobPermanent(() => !isJobPermanent)}
          className="far fsl cur fc_sec fa-square"
        ></i>
      );
    }
  };

  // renderMoreDetails
  const renderMoreDetails = () => {
    if (showMoreDetails) {
      return (
        <>
          <div className="fsxs mar_t-16 fc_5c">Extra information:</div>
          <div className="w-100 fc_bw height_sized mar_t-4 round-4 bor_8a-1 bb pad_0-12">
            <div className="fss">Pay Negotiable:</div>
            <div
              onChange={(e) =>
                setForm({
                  ...form,
                  is_negotiable: e.target.value === "Yes" ? true : false,
                })
              }
              className="fc_ar mar_l-32"
            >
              <div className="fc fss">
                <input
                  className="w-16p h-16p mar-0"
                  type="radio"
                  name="negotiable"
                  id="negotiable_yes"
                  value="Yes"
                />
                <label className="mar_l-4" htmlFor="negotiable_yes">
                  Yes
                </label>
              </div>
              <div className="fc fss mar_l-16">
                <input
                  className="w-16p h-16p mar-0"
                  type="radio"
                  name="negotiable"
                  id="negotiable_no"
                  value="No"
                />
                <label className="mar_l-4" htmlFor="negotiable_no">
                  No
                </label>
              </div>
            </div>
          </div>
          <div className="w-100 fc_bw height_sized mar_t-16 round-4 bor_8a-1 bb pad_0-12">
            <div className="fss">Accomodation available:</div>
            <div
              onChange={(e) =>
                setForm({
                  ...form,
                  accomodation_available:
                    e.target.value === "Yes" ? true : false,
                })
              }
              className="fc_ar mar_l-32"
            >
              <div className="fc fss">
                <input
                  className="w-16p h-16p mar-0"
                  type="radio"
                  name="accomodation"
                  id="accomodation_yes"
                  value="Yes"
                />
                <label className="mar_l-4" htmlFor="accomodation_yes">
                  Yes
                </label>
              </div>
              <div className="fc fss mar_l-16">
                <input
                  className="w-16p h-16p mar-0"
                  type="radio"
                  name="accomodation"
                  id="accomodation_no"
                  value="No"
                />
                <label className="mar_l-4" htmlFor="accomodation_no">
                  No
                </label>
              </div>
            </div>
          </div>
          <div className="fc fsm mar_t-16">
            <div className="fss fc_sec w-100p">Skills required:</div>
            <input
              className="mar_l-8 fsm fwb f1 height_sized inp_pri pad_0-12 bb focus-normal"
              placeholder="Eg: Laborious, etc."
              type="text"
              name="skills_required"
              onChange={onChange}
            />
          </div>
          <div className="fc fsm mar_t-16">
            <div className="fss fc_sec w-100p">Other details:</div>
            <input
              className="mar_l-8 fsm fwb f1 height_sized inp_pri pad_0-12 bb focus-normal"
              placeholder="Eg: Work experience, etc."
              type="text"
              name="other_details"
              onChange={onChange}
            />
          </div>
          <button
            onClick={() => setShowMoreDetails(() => false)}
            type="button"
            style={{ alignSelf: "flex-end" }}
            className="btn cur mar_t-16 h-32p round-4 bg_err fc_white fwb w-120p"
          >
            Close extra info
          </button>
        </>
      );
    } else {
      return (
        <button
          onClick={() => setShowMoreDetails(() => true)}
          type="button"
          className="btn w-100 mar_t-32 height_sized fsm pos_rel round-4 bg_warn-light fwb fc bor_warn-1 bb cur"
        >
          <div className="h-60p w-60p pos_abs round-complete fcc bg_warn fc_white fsxl shadow_0-0-8-dark">
            <i className="fas fa-plus"></i>
          </div>
          <div className="mar_l-80">Add more job details</div>
        </button>
      );
    }
  };

  // renderSubmitBtn
  const renderSubmitBtn = () => {
    if (loading) {
      return (
        <button
          className="btn round-4 fc_5c fsm fwb  bg_gray-light height_sized mar_t-32 cur btn_pri"
          type="button"
        >
          <i className="fas fa-spinner fa-spin"></i>
        </button>
      );
    } else {
      return (
        <button
          className="btn round-4 fc_white fsm fwb  bg_pri height_sized mar_t-32 cur btn_pri"
          type="submit"
        >
          Submit
        </button>
      );
    }
  };

  return (
    <div className="fcol w-100 of-scr">
      <Prompt when={isFormHalfFilled} message="Discared changes in form ?" />
      <div className="dash_body_box bg_white round-8 pad_pc-32_mob-16">
        <div className="f_lrtb pc_space_bw">
          <div className="fcol">
            <div className="fsxl fwb">New job posting</div>
            <div className="fsxs fc_5c mar_t-8">
              Fill the details below to post a new job ad.
            </div>
          </div>

          <Popup
            trigger={
              <button className="dash_opt_btn-1 btn cur fsm fcc mob_mar_t-32 pad_8-16 round-4 bg_err fc_white fwb">
                <i className="fas fa-times mar_r-8"></i>
                Cancel
              </button>
            }
            modal
            className="cnf_popup"
          >
            {(close) => (
              <div className="fcol round-8 pad-16">
                <div className="fsm fwb w-100 align-c">Are you sure ??</div>
                <div className="w-100 mar_t-16 pad-16 bb fc_pri fss round-8 bg_pri-light vis-flex">
                  <i className="fas fa-info-circle mar_r-8 mar_t-2"></i>
                  <span>
                    All changes will be lost permanently. Click "Cancel" to stay
                    on this page and continue filling up the form.
                  </span>
                </div>
                <div className="fcc mar_t-32">
                  <button
                    className="btn bg_pri h-32p w-80p fc_white round-4 fwb cur"
                    onClick={cancelPost}
                  >
                    Exit now
                  </button>
                  <button
                    className="btn mar_l-32 bg_err h-32p w-80p fc_white round-4 fwb cur"
                    onClick={close}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </div>
        {/* form details div */}
        <div className="mar_t-32 fcol">
          <div className="fsm fc_sec fwb">Enter the job details below:</div>
          <form
            onSubmit={handleSubmit}
            className="fcol mar_t-32"
            style={{ maxWidth: "720px" }}
          >
            <div className="bg_pri-light round-8 pad-16 fc_pri bor_pri-1 fss bb">
              <i className="fas fa-info-circle mar_t-2 mar_r-4"></i>
              If you need any help regarding filling up the form below, please{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.youtube.com/?watch=bybut6tf6bB"
                className="fwb link mar_0-4 fc_sec"
              >
                click this link
              </a>{" "}
              for a guided tour. For any additional assistance please go to
              help/FAQs section and contact us.
            </div>
            <div className="fsxs mar_t-16 fc_sec">
              Enter job name
              <span className="fc_err">*</span>
            </div>
            <input
              required
              className="mar_t-4 fsm fwb w-100 height_sized inp_pri pad_0-12 bb focus-normal"
              placeholder="Eg: Daily wage worker"
              type="text"
              name="title"
              onChange={onChange}
            />
            <div className="fsxs mar_t-16 fc_sec">
              Selct/enter job category
              <span className="fc_err">*</span>
            </div>
            <AsyncSelect
              styles={arrowStyleWrapper}
              required
              theme={customTheme}
              loadOptions={promiseCatOptions}
              cacheOptions
              defaultOptions
              className="fsm fwb mar_t-4 w-100"
              placeholder="Eg: Manual labour"
              isSearchable
              onChange={(job_sector) =>
                setForm({
                  ...form,
                  job_sector: job_sector.value,
                })
              }
            />
            <div className="fsxs mar_t-16 fc_sec">Job description:</div>
            <textarea
              style={{
                maxWidth: "100%",
                maxHeight: "100px",
              }}
              name="description"
              onChange={onChange}
              className="mar_t-4 w-100 h-80p inp_pri pad_4-12 bb focus-normal"
              placeholder="Write a short description about the job."
            ></textarea>
            <div className="fsxs mar_t-16 fc_sec">
              Job duration (how long will this job last)
              <span className="fc_err">*</span>
            </div>
            <div className="f_lrtb mar_t-4 w-100">
              <div className="fc f1">
                <input
                  className="height_sized fsm fwb inp_pri inp_dis pad_0-12 bb focus-normal w-50"
                  placeholder="Eg: 8"
                  type="text"
                  name="duration"
                  onChange={onChange}
                  disabled={isJobPermanent}
                />
                <Select
                  styles={arrowStyleWrapper}
                  required
                  theme={customTheme}
                  options={timeFrameList}
                  className="fsm fwb mar_l-4 w-50"
                  placeholder="Hours"
                  isSearchable
                  isDisabled={isJobPermanent}
                  onChange={(jobDurationUnit) =>
                    setForm({
                      ...form,
                      duration_unit: jobDurationUnit.value,
                    })
                  }
                />
              </div>
              <div className="fc mar_pc-l_mob-t-8 f1 bg_pri-light height_sized min_height_sized pad_0-12 bb round-4">
                {renderCheckbox(isJobPermanent)}
                <label className="mar_l-8 fsm" htmlFor="job_permanent">
                  This is a permanent job.
                </label>
              </div>
            </div>
            <div className="f_lrtb mar_t-16 w-100">
              <div className="f1 fcol">
                <div className="fsxs fc_sec">
                  Qunatity required
                  <span className="fc_err">*</span>
                </div>
                <div className="fc mar_t-4 w-100">
                  <input
                    required
                    className="height_sized fsm fwb inp_pri inp_dis pad_0-12 bb focus-normal w-50"
                    placeholder="Eg: 10"
                    type="text"
                    name="vacancy_count"
                    onChange={onChange}
                  />
                  <Select
                    styles={arrowStyleWrapper}
                    required
                    theme={customTheme}
                    options={[
                      { value: "People", label: "People" },
                      { value: "Man", label: "Man" },
                      { value: "Woman", label: "Woman" },
                    ]}
                    className="fsm fwb mar_l-4 w-50"
                    placeholder="People"
                    isSearchable={false}
                    onChange={(empType) =>
                      setForm({
                        ...form,
                        emp_type: empType.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="f1 fcol mar_pc-l_mob-t-8">
                <div className="fsxs fc_sec">
                  Pay scale (in ₹)
                  <span className="fc_err">*</span>
                </div>
                <div className="fc mar_t-4 w-100">
                  <input
                    required
                    className="height_sized fsm fwb mar_r-4 inp_pri inp_dis pad_0-12 bb focus-normal w-50"
                    placeholder="Eg: 500"
                    type="number"
                    name="payment"
                    onChange={onChange}
                  />
                  <span className="mar_t--4 fs2x fwb fc_sec">/</span>
                  <Select
                    styles={arrowStyleWrapper}
                    required
                    theme={customTheme}
                    options={timeFrameList}
                    cacheOptions
                    defaultOptions
                    className="fsm fwb mar_l-4 w-50"
                    placeholder="Day"
                    onChange={(paymentUnit) =>
                      setForm({
                        ...form,
                        payment_unit: paymentUnit.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="fsxs mar_t-16 fc_sec">
              Select application deadline
              <span className="fc_err">*</span>
            </div>
            <DatePicker
              locale="en-IN"
              showTimeSelect
              dateFormat="Pp"
              className="w-100 mar_t-4 height_sized bb round-4 btn bg_warn-light fwb fsm pad_0-12 bor_8a-1"
              selected={form.date_of_expiry ? form.date_of_expiry : new Date()}
              onChange={(date) =>
                setForm({
                  ...form,
                  date_of_expiry: date,
                })
              }
            />
            {renderMoreDetails()}
            <div className="fsm fwb mar_t-24 fc_sec">Enter job address:</div>
            <div className="fc mar_t-16 w-100">
              <div className="f1 fcol">
                <div className="fsxs fc_sec">
                  Select country
                  <span className="fc_err">*</span>
                </div>
                <Select
                  styles={arrowStyleWrapper}
                  required
                  theme={customTheme}
                  options={[{ value: "India", label: "India" }]}
                  cacheOptions
                  className="fsm fwb mar_t-4  w-100"
                  placeholder="India"
                  onChange={(country) =>
                    setForm({
                      ...form,
                      country: country.value,
                    })
                  }
                />
              </div>
              <div className="f1 fcol mar_l-8">
                <div className="fsxs fc_sec">
                  Select state/UT
                  <span className="fc_err">*</span>
                </div>
                <Select
                  styles={arrowStyleWrapper}
                  required
                  theme={customTheme}
                  options={States}
                  cacheOptions
                  defaultOptions
                  className="fsm fwb mar_t-4 w-100"
                  placeholder="State/UT"
                  onChange={(state) =>
                    setForm({
                      ...form,
                      state: state.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="fc mar_t-16 w-100">
              <div className="f1 fcol">
                <div className="fsxs fc_sec">
                  Enter District
                  <span className="fc_err">*</span>
                </div>
                <AsyncSelect
                  styles={arrowStyleWrapper}
                  required
                  theme={customTheme}
                  loadOptions={promiseOptions}
                  cacheOptions
                  defaultOptions
                  className="fsm fwb mar_t-4  w-100"
                  placeholder="Select dist."
                  isSearchable
                  onChange={(district) =>
                    setForm({
                      ...form,
                      dist: district.value,
                    })
                  }
                />
              </div>
              <div className="f1 fcol mar_l-8">
                <div className="fsxs fc_sec">
                  Enter Sub-district
                  <span className="fc_err">*</span>
                </div>
                <AsyncSelect
                  styles={arrowStyleWrapper}
                  required
                  theme={customTheme}
                  loadOptions={promiseOptions}
                  cacheOptions
                  defaultOptions
                  className="fsm fwb mar_t-4  w-100"
                  placeholder="Select dist."
                  isSearchable
                  onChange={(subDist) =>
                    setForm({
                      ...form,
                      subDist: subDist.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="fc mar_t-16 w-100">
              <div className="f1 fcol">
                <div className="fsxs fc_sec">
                  Enter Village/Colony
                  <span className="fc_err">*</span>
                </div>
                <AsyncCreatableSelect
                  styles={arrowStyleWrapper}
                  required
                  theme={customTheme}
                  loadOptions={promiseOptions}
                  cacheOptions
                  defaultOptions
                  className="fsm fwb mar_t-4  w-100"
                  placeholder="Village/Colony"
                  isSearchable
                  onChange={(villageCity) =>
                    setForm({
                      ...form,
                      villageCity: villageCity.value,
                    })
                  }
                />
              </div>
              <div className="f1 fcol mar_l-8">
                <div className="fsxs fc_sec">
                  Enter PIN Code
                  <span className="fc_err">*</span>
                </div>
                <input
                  required
                  type="text"
                  name="pin"
                  className="height_sized fsm fwb mar_t-4 inp_pri pad_0-12 bb focus-normal w-100"
                  placeholder="Enter pincode"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="fc mar_t-16 w-100">
              <div className="f1 fcol">
                <div className="fsxs fc_sec">
                  Address line
                  <span className="fc_err">*</span>
                </div>
                <input
                  required
                  type="text"
                  name="address"
                  className="height_sized fsm fwb mar_t-4 inp_pri pad_0-12 bb focus-normal w-100"
                  placeholder="Enter address"
                  onChange={onChange}
                />
              </div>
              <div className="f1 fcol mar_l-8">
                <div className="fsxs fc_sec">
                  Contact no:
                  <span className="fc_err">*</span>
                </div>
                <input
                  required
                  type="text"
                  name="contact"
                  className="height_sized fsm fwb mar_t-4 inp_pri pad_0-12 bb focus-normal w-100"
                  placeholder="+91XXXXXXXXXX"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="fsxs mar_t-16 fc_sec">
              Automatically detect location (for wider reach):
            </div>
            <div className="mar_t-4 round-4 w-100 bor_pri-1 bg_pri-light fcol pad-2 bb">
              <button
                type="button"
                className="mar-8 btn fsm height_sized cur round-4 bg_warn-light bor_warn-1 bb fwb"
                onClick={handleDetectLocation}
              >
                Detect location automatically
              </button>
              {detectedLocation && (
                <>
                  <div className="mar-8 fss round-4 bg_err-light pad-16">
                    <strong>Detected location: </strong>
                    {detectedLocation}
                  </div>
                  <button
                    onClick={() => {
                      setForm({
                        ...form,
                        lat: null,
                        long: null,
                      });
                      setDetectedLocation("");
                    }}
                    type="button"
                    className="mar-8 btn cur round-4 bg_err height_sized fc_white fwb"
                  >
                    Clear detected location info
                  </button>
                </>
              )}
            </div>
            <div className="fsxs mar_t-16 fc_sec">
              Select a job image<span className="fc_err">*</span>
            </div>
            <div className="mar_t-4 w-100 fcol bor_pri-1 pad-16 round-4 bb">
              <div
                {...getRootProps({
                  className: "w-100",
                })}
              >
                <input {...getInputProps()} />
                <div className=" pad-8 bg_pri-light round-4 fss">
                  Drag and drop image here, or click to select the image file
                </div>
              </div>
              <div className="w-100">{thumbs}</div>
            </div>
            {renderSubmitBtn()}
          </form>
        </div>
      </div>
      <div className="dash_body_box bg_white round-8 pad-16">
        <div></div>
      </div>
    </div>
  );
};

export default NewPost;
