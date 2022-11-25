import React, { useState, useRef, useEffect } from "react";
import { Tabs, Input, Button } from "antd";
import { NAME_PROJECT } from "../../constants";
import "./NotifyPage.scss";

const NotifyPage = ({ notifyLinks, notyPage, getPlatform }) => {
  return (
    <div
      className="notify-page"
      style={{
        height: "100%",
      }}
    >
      <div className="notify-page__img">
        <img
          className="img"
          src={
            notifyLinks[
              `${NAME_PROJECT}${notyPage ? `_${notyPage}` : ""}_linkImg`
            ]
          }
          alt="img"
        />
      </div>
      <div className="notify-page__title">
        {notifyLinks[`${NAME_PROJECT}${notyPage ? `_${notyPage}` : ""}_title`]}
      </div>
      <div className="notify-page__button">
        <Button
          type="primary"
          block
          href={
            notifyLinks[
              `${NAME_PROJECT}${notyPage ? `_${notyPage}` : ""}_linkButton`
            ]
          }
          target="_blank"
        >
          {notifyLinks[
            `${NAME_PROJECT}${notyPage ? `_${notyPage}` : ""}_textButtonNotify`
          ] || "Открыть"}
        </Button>
      </div>
    </div>
  );
};

export { NotifyPage };
