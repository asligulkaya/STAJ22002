/* eslint-disable react/prop-types */
import classes from "./MessagesCard.module.css";
import { formatDate } from "../../helpers/format";
import messagesSVG from "../../assets/svg/messages.svg";

export default function MessagesCard({ msg }) {
  return (
    <div className={`${classes.section_our_solution}`}>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className={`${classes.our_solution_category}`}>
            <div className={`${classes.solution_cards_box}`}>
              <div className={`${classes.solution_card}`}>
                <div className={`${classes.hover_color_bubble}`}></div>
                <div className={`${classes.so_top_icon}`}>
                  <img src={messagesSVG} />
                </div>
                <div className={`${classes.solu_title}`}>
                  <div className="d-flex justify-content-between">
                    <p className="text-end" style={{ fontSize: "12px" }}>
                      {msg.country}
                    </p>
                    <p className="text-end" style={{ fontSize: "15px" }}>
                      {formatDate(msg.creationDate)}
                    </p>
                  </div>

                  <div>
                    <strong>{msg.name}</strong>
                    <small className="text-muted"> ({msg.gender})</small>
                  </div>
                </div>
                <div className={`${classes.solu_description}`}>
                  <p>{msg.message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
