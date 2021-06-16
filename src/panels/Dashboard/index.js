import React, { useState } from "react";
import {
  Panel,
  Group,
  CardScroll,
  Card,
  PanelHeader,
  PanelHeaderButton,
  platform,
  IOS,
  Header,
  Avatar,
  PanelHeaderContent,
  SimpleCell,
  InfoRow,
  HorizontalScroll,
  HorizontalCell,
} from "@vkontakte/vkui";
import Slider from "react-slick";
import actions from "../../store/actions";
import { Icon24Back, Icon28ChevronBack } from "@vkontakte/icons";
import "./Dasboard.css";
import apiRequest from "../../utils/ApiServiceVK";
import { detectImage, getResult } from "../../utils/FaceApi";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Dashboard = ({ id, setPopout, currentFriend, setFriend }) => {
  const [data, setData] = useState();
  const osName = platform();

  const friendInfo = currentFriend[0].response[0];
  const friendPhotos = currentFriend[1].response.items;
  const mutualFriends = currentFriend[2].response;

  const photos = friendPhotos.slice(0, 4);
  const {
    city,
    country,
    first_name,
    last_name,
    followers_count,
    photo_100,
    about,
    bdate,
    education_form,
    education_status,
    faculty_name,
    university_name,
  } = friendInfo;

  if (!data) {
    detectImage(friendPhotos).then((res) => {
      setData(getResult(res));
    });
  }

  console.log(`photos`, data);

  const getFriendInfo = async (id) => {
    setData(null);
    setPopout(true);
    await Promise.all([
      //res[0]
      apiRequest.getFriendInfo(id),
      //res[1]
      apiRequest.getAllPhotos(id),
      //res[2]
      apiRequest.getMutualFriends(id),
    ]).then((res) => {
      setFriend(res);
      setPopout();
      actions.activePanel.change("dashboard");
    });
  };

  return (
    <Panel id={id}>
      <PanelHeader
        left={
          <PanelHeaderButton
            onClick={() => {
              actions.activePanel.change("home");
            }}
          >
            {osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
          </PanelHeaderButton>
        }
      >
        <PanelHeaderContent
          status={``}
          before={<Avatar size={45} src={photo_100} />}
        >
          {`${first_name} ${last_name}`}
        </PanelHeaderContent>
      </PanelHeader>
      <Group>
        <Header mode="secondary">Информация о пользователе</Header>
        {bdate && (
          <SimpleCell>
            <InfoRow header="Дата рождения">{bdate}</InfoRow>
          </SimpleCell>
        )}
        {country && country.title && (
          <SimpleCell>
            <InfoRow header="Страна">{country.title}</InfoRow>
          </SimpleCell>
        )}
        {city && city.title && (
          <SimpleCell>
            <InfoRow header="Город">{city.title}</InfoRow>
          </SimpleCell>
        )}
        {followers_count && (
          <SimpleCell>
            <InfoRow header="Количество подписчиков">{followers_count}</InfoRow>
          </SimpleCell>
        )}
        {about && (
          <SimpleCell>
            <InfoRow header="О себе">{about}</InfoRow>
          </SimpleCell>
        )}
        {university_name && (
          <SimpleCell>
            <InfoRow header="Институт">{university_name}</InfoRow>
          </SimpleCell>
        )}
        {faculty_name && (
          <SimpleCell>
            <InfoRow header="Факультет">{faculty_name}</InfoRow>
          </SimpleCell>
        )}
        {education_status && (
          <SimpleCell>
            <InfoRow header="Статус обучения">{education_status}</InfoRow>
          </SimpleCell>
        )}
        {education_form && (
          <SimpleCell>
            <InfoRow header="Форма обучения">{education_form}</InfoRow>
          </SimpleCell>
        )}
      </Group>

      {!!mutualFriends.length && (
        <Group header={<Header>Общие друзья</Header>}>
          <HorizontalScroll
            getScrollToLeft={(i) => i - 120}
            getScrollToRight={(i) => i + 120}
          >
            <div style={{ display: "flex" }}>
              {mutualFriends.map(({ photo_100, first_name, id }) => {
                return (
                  <HorizontalCell size="s" header={first_name} key={photo_100}>
                    <Avatar
                      size={osName === "ios" ? 64 : 56}
                      src={photo_100}
                      onClick={() => getFriendInfo(id)}
                    />
                  </HorizontalCell>
                );
              })}
            </div>
          </HorizontalScroll>
        </Group>
      )}

      {!!photos.length && (
        <Group header={<Header>Последние фото</Header>}>
          <CardScroll size="s">
            {photos.map((photo, i) => {
              const url = photo.sizes.pop().url;
              return (
                <Card className="card" key={i}>
                  <img
                    src={url}
                    style={{
                      maxWidth: "100%",
                    }}
                  />
                </Card>
              );
            })}
          </CardScroll>

          {data &&
            data.map((el) => {
              const settings = {
                dots: true,
                infinite: false,
                speed: 500,
                slidesToShow: el.length <= 3 ? el.length : 4,
                slidesToScroll: el.length <= 3 ? 1 : 3,
              };

              return (
                <Group header={<Header>{el[0].expresion}</Header>}>
                  <Slider {...settings}>
                    {el.map((photo) => {
                      return (
                        <Card className="card" key={photo.url}>
                          <img
                            src={photo.url}
                            style={{
                              maxWidth: "100%",
                            }}
                          />
                        </Card>
                      );
                    })}
                  </Slider>
                </Group>
              );
            })}
        </Group>
      )}

      {/*<Group header={<Header>Последняя активность</Header>}>*/}
      {/*  <CardGrid size="l">*/}
      {/*    <ContentCard*/}
      {/*      image="https://images.unsplash.com/photo-1603988492906-4fb0fb251cf8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80"*/}
      {/*      subtitle="unsplash"*/}
      {/*      header="brown and gray mountains under blue sky during daytime photo"*/}
      {/*      text="Mountain changji"*/}
      {/*      caption="Photo by Siyuan on Unsplash"*/}
      {/*      maxHeight={150}*/}
      {/*    />*/}
      {/*    <ContentCard*/}
      {/*      image="https://images.unsplash.com/photo-1603928726698-a015a1015d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"*/}
      {/*      subtitle="unsplash"*/}
      {/*      header="persons left hand with pink paint"*/}
      {/*      text="Five hours of makeup and paint to achieve the human anatomy photoshoot. Thank you Steph and Shay. See more and official credit on @jawfox.photography."*/}
      {/*      caption="Photo by Alexander Jawfox on Unsplash"*/}
      {/*      maxHeight={500}*/}
      {/*    />*/}
      {/*  </CardGrid>*/}
      {/*</Group>*/}
    </Panel>
  );
};
