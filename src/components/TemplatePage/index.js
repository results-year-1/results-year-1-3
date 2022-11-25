import React, { useState, useEffect } from "react";
import bridge from "@vkontakte/vk-bridge";
import { navigate } from "@reach/router";
import { Button } from "@vkontakte/vkui";
import "./TemplatePage.scss";

import { nativeAds } from "../../ads";
import {
  subscribeAppNotifications,
  returnMethod,
  getUserToken,
  returnAsyncMethod,
  publishPhotoInAlbum,
} from "../../bridge-method";

import { getActionByBirthday } from "../../helpers";

import { NAME_PROJECT } from "../../constants";

const TemplatePage = ({
  icon,
  header,
  title,
  description,
  buttonName,
  setTemplatePage,
  name,
  next,
  fn,
  appID,
  getGroupId,
  openAlert,
  fetchedUser,
  getRandomImg,
  getPlatform,
  setUserToken,
}) => {
  const [editTitle, setEditTitle] = useState(title);

  function addGroup(group_id, type, setTemplatePage, next) {
    bridge
      .send("VKWebAppJoinGroup", { group_id: group_id })
      .then(({ result }) => {
        // incrementCountButton(`stats.buttonPage_${type}`);
        if (type === "search") {
          setTemplatePage(next);
        }
      })
      .catch((err) => {
        bridge
          .send("VKWebAppJoinGroup", { group_id: group_id })
          .then(({ result }) => {
            // incrementCountButton(`stats.buttonPage_${type}`);
            if (type === "search") {
              setTemplatePage(next);
            }
          })
          .catch((err) => {
            if (type === "search") {
              setTemplatePage(next);
            }
          });
      });
  }

  const getAccess = async () =>
    setTimeout(async () => {
      const hasToken = await getUserToken(setUserToken, appID);
      returnMethod(2, subscribeAppNotifications);
      if (hasToken) {
        await publishPhotoInAlbum(hasToken);
      }
    }, 0);

  useEffect(() => {
    switch (name) {
      case "setting":
        break;
      case "like":
        // nativeAds(getPlatform);

        break;
      case "search":
        setTimeout(() => {
          setEditTitle("Узнаём пол.");
        }, 1000);
        setTimeout(() => {
          setEditTitle("Узнаём пол..");
        }, 2000);
        setTimeout(() => {
          setEditTitle("Узнаём пол...");
        }, 3000);
        setTimeout(() => {
          setEditTitle("Смотрим в звезды.");
        }, 4000);
        setTimeout(() => {
          setEditTitle("Смотрим в звезды..");
        }, 5000);
        setTimeout(() => {
          setEditTitle("Смотрим в звезды...");
        }, 6000);
        setTimeout(() => {
          setEditTitle("Подбираем алгоритмы.");
        }, 7000);
        setTimeout(() => {
          setEditTitle("Подбираем алгоритмы..");
        }, 8000);
        setTimeout(() => {
          setEditTitle("Подбираем алгоритмы...");
        }, 9000);
        setTimeout(() => {
          setEditTitle("Почти готово.");
        }, 10000);
        setTimeout(() => {
          setEditTitle("Почти готово..");
        }, 11000);
        setTimeout(() => {
          setEditTitle("Почти готово...");
        }, 12000);

        setTimeout(() => {
          getActionByBirthday(
            fetchedUser,
            getGroupId,
            name,
            next,
            setTemplatePage
          );
        }, 14000);

        break;
      case "result":
        if (fetchedUser?.sex === 2) {
          getRandomImg(0, 6);
        } else {
          getRandomImg(6, 8);
        }

        break;
      default:
        break;
    }
  }, []);

  const onChangeActiveButton = async (index) => {
    if (name === "result") {
      navigate("/result-panel");
    } else {
      if (name === "setting" && index === 0) {
        await getAccess();
        setTemplatePage(next);
      } else if (name === "setting" && index === 1) {
        returnMethod(2, subscribeAppNotifications);
        setTemplatePage(next);
      } else {
        setTemplatePage(next);
      }
    }
  };

  return (
    <div className="container">
      <div className="container__icon">{icon}</div>
      <div className="container__main">
        <div className="header">{header}</div>
        <div className="title">{editTitle}</div>
        <div className="description">{description}</div>
      </div>

      <div className={`buttons ${buttonName.length > 1 ? "two-item" : ""}`}>
        {buttonName.length &&
          buttonName.map((item, index) => {
            return (
              <Button
                onClick={() => onChangeActiveButton(index)}
                className={`button-action ${
                  buttonName.length > 1 ? "two-button" : ""
                }`}
              >
                <span>{item}</span>
              </Button>
            );
          })}
      </div>
    </div>
  );
};

export { TemplatePage };
