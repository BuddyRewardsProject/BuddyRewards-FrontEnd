import React, { Component } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import NavTopMyCard from "../../layouts/NavTopMyCard";
import "../../assets/css/CustomerSide/Customer.css";
import Navigation from "../../layouts/Navigation";
import MerchantLOGO from "../../assets/img/icon/profileD.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faParking, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

class CustomerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      merchantId: null,
      merchantName: null,
    };
  }
  componentDidMount() {
    axios
      .get("/home")
      .then((response) => {
        // handle success
        this.setState({
          merchantId: response.data.results.merchantId,
          merchantName: response.data.results.merchantName,
        });
        console.log(response.data[0]);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  }
  render() {
    return (
      <>
        <Helmet>
          <title>บัตรของคุณ</title>
        </Helmet>
        <NavTopMyCard></NavTopMyCard>
        <Navigation history={this.props.history}></Navigation>
        <div className="container ">
          <div className="margintopforcard">
          <div className="cardBG ">
              <div
                class="list-group-item d-flex align-items-center shadow-none border-0 cardBG d-flex gap-3 py-3"
                aria-current="true"
              >
                <img
                  src="https://img.wongnai.com/p/1920x0/2017/11/14/4be595bbfca149c189fbacbe7d93f020.jpg"
                  alt="twbs"
                  width="60"
                  height="60"
                  class="rounded-circle flex-shrink-0"
                ></img>
                <div class=" w-100 justify-content-between d-flex align-items-center">
                  <div class="d-flex align-items-center">
                    <div class="fontSizeMycardTitle">รสนิยม</div>
                  </div>
                  <div class=" justify-content-between d-flex align-items-center fontSizeMycardEnd d-flex gap-1 ">
                    10
                  <FontAwesomeIcon className=" IconmyCard " icon={faParking} />
                   
                  </div>
                  
                </div>
              </div>
            </div>


            <div className="cardBG ">
              <div
                class="list-group-item d-flex align-items-center shadow-none border-0 cardBG d-flex gap-3 py-3"
                aria-current="true"
              >
                <img
                  src="https://d1sag4ddilekf6.azureedge.net/compressed/items/THITE2020042209433453728/photo/menueditor_item_9c09d144c04a488181da5fcfbe9e9d71_1608029094219114863.jpg"
                  alt="twbs"
                  width="60"
                  height="60"
                  class="rounded-circle flex-shrink-0"
                ></img>
                <div class=" w-100 justify-content-between d-flex align-items-center">
                  <div class="d-flex align-items-center">
                    <div class="fontSizeMycardTitle">ต้นตำรับ ชาพะยอม</div>
                  </div>
                  <div class=" justify-content-between d-flex align-items-center fontSizeMycardEnd d-flex gap-1">
                    5/10
                  <FontAwesomeIcon className=" IconmyCard " icon={faStar} />
                   
                  </div>
                </div>
              </div>
            </div>

            <div className="cardBG ">
              <div
                class="list-group-item d-flex align-items-center shadow-none border-0 cardBG d-flex gap-3 py-3"
                aria-current="true"
              >
                <img
                  src="https://d1sag4ddilekf6.azureedge.net/compressed/items/THITE2020042209433453728/photo/menueditor_item_9c09d144c04a488181da5fcfbe9e9d71_1608029094219114863.jpg"
                  alt="twbs"
                  width="60"
                  height="60"
                  class="rounded-circle flex-shrink-0"
                ></img>
                <div class=" w-100 justify-content-between d-flex align-items-center">
                  <div class="d-flex align-items-center">
                    <div class="fontSizeMycardTitle">ต้นตำรับ ชาพะยอม</div>
                  </div>
                  <div class=" justify-content-between d-flex align-items-center fontSizeMycardEnd d-flex gap-1">
                    5/10
                  <FontAwesomeIcon className=" IconmyCard " icon={faStar} />
                   
                  </div>
                </div>
              </div>
            </div>
            <Link  to="/customer/MyQR">
            <div className="cardBG ">
              <div
                class="list-group-item d-flex align-items-center shadow-none border-0 cardBG d-flex gap-3 py-3"
                aria-current="true"
              >
                <img
                  src="https://d1sag4ddilekf6.azureedge.net/compressed/items/THITE2020042209433453728/photo/menueditor_item_9c09d144c04a488181da5fcfbe9e9d71_1608029094219114863.jpg"
                  alt="twbs"
                  width="60"
                  height="60"
                  class="rounded-circle flex-shrink-0"
                ></img>
                <div class=" w-100 justify-content-between d-flex align-items-center">
                  <div class="d-flex align-items-center">
                    <div class="fontSizeMycardTitle">ต้นตำรับfff ชาพะยอม</div>
                  </div>
                  <div class=" justify-content-between d-flex align-items-center fontSizeMycardEnd d-flex gap-1">
                    5/10
                  <FontAwesomeIcon className=" IconmyCard " icon={faStar} />
                   
                  </div>
                </div>
              </div>
            </div>
            </Link>




            <div className="cardBG ">
              <div
                class="list-group-item d-flex align-items-center shadow-none border-0 cardBG d-flex gap-3 py-3"
                aria-current="true"
              >
                <img
                  src="https://d1sag4ddilekf6.azureedge.net/compressed/items/THITE2020042209433453728/photo/menueditor_item_9c09d144c04a488181da5fcfbe9e9d71_1608029094219114863.jpg"
                  alt="twbs"
                  width="60"
                  height="60"
                  class="rounded-circle flex-shrink-0"
                ></img>
                <div class=" w-100 justify-content-between d-flex align-items-center">
                  <div class="d-flex align-items-center">
                    <div class="fontSizeMycardTitle">ต้นตำรับ ชาพะยอม</div>
                  </div>
                  <div class=" justify-content-between d-flex align-items-center fontSizeMycardEnd d-flex gap-1">
                    5/10
                  <FontAwesomeIcon className=" IconmyCard " icon={faStar} />
                   
                  </div>
                </div>
              </div>
            </div>
            <div className="cardBG ">
              <div
                class="list-group-item d-flex align-items-center shadow-none border-0 cardBG d-flex gap-3 py-3"
                aria-current="true"
              >
                <img
                  src="https://d1sag4ddilekf6.azureedge.net/compressed/items/THITE2020042209433453728/photo/menueditor_item_9c09d144c04a488181da5fcfbe9e9d71_1608029094219114863.jpg"
                  alt="twbs"
                  width="60"
                  height="60"
                  class="rounded-circle flex-shrink-0"
                ></img>
                <div class=" w-100 justify-content-between d-flex align-items-center">
                  <div class="d-flex align-items-center">
                    <div class="fontSizeMycardTitle">ต้นตำรับ ชาพะยอม</div>
                  </div>
                  <div class=" justify-content-between d-flex align-items-center fontSizeMycardEnd d-flex gap-1">
                    5/10
                  <FontAwesomeIcon className=" IconmyCard " icon={faStar} />
                   
                  </div>
                </div>
              </div>
            </div>


            <div className="cardBG ">
              <div
                class="list-group-item d-flex align-items-center shadow-none border-0 cardBG d-flex gap-3 py-3"
                aria-current="true"
              >
                <img
                  src="https://d1sag4ddilekf6.azureedge.net/compressed/items/THITE2020042209433453728/photo/menueditor_item_9c09d144c04a488181da5fcfbe9e9d71_1608029094219114863.jpg"
                  alt="twbs"
                  width="60"
                  height="60"
                  class="rounded-circle flex-shrink-0"
                ></img>
                <div class=" w-100 justify-content-between d-flex align-items-center">
                  <div class="d-flex align-items-center">
                    <div class="fontSizeMycardTitle">ต้นตำรับ ชาพะยอม</div>
                  </div>
                  <div class=" justify-content-between d-flex align-items-center fontSizeMycardEnd d-flex gap-1">
                    5/10
                  <FontAwesomeIcon className=" IconmyCard " icon={faStar} />
                   
                  </div>
                </div>
              </div>
            </div>


            <div className="cardBG ">
              <div
                class="list-group-item d-flex align-items-center shadow-none border-0 cardBG d-flex gap-3 py-3"
                aria-current="true"
              >
                <img
                  src="https://d1sag4ddilekf6.azureedge.net/compressed/items/THITE2020042209433453728/photo/menueditor_item_9c09d144c04a488181da5fcfbe9e9d71_1608029094219114863.jpg"
                  alt="twbs"
                  width="60"
                  height="60"
                  class="rounded-circle flex-shrink-0"
                ></img>
                <div class=" w-100 justify-content-between d-flex align-items-center">
                  <div class="d-flex align-items-center">
                    <div class="fontSizeMycardTitle">ต้นตำรับ ชาพะยอม</div>
                  </div>
                  <div class=" justify-content-between d-flex align-items-center fontSizeMycardEnd d-flex gap-1">
                    5/10
                  <FontAwesomeIcon className=" IconmyCard " icon={faStar} />
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CustomerCard;
