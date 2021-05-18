import React from "react";
import {
  Panel,
  Group,
  CardScroll,
  Card,
  PanelHeader,
  PanelHeaderButton,
  platform,
  IOS,
  CardGrid,
  ContentCard,
  Header,
  Avatar,
  PanelHeaderContent,
  SimpleCell,
  InfoRow,
  HorizontalScroll,
  HorizontalCell,
  ScreenSpinner,
} from "@vkontakte/vkui";
import { useSelector } from "react-redux";
import actions from "../store/actions";
import { Icon24Back, Icon28ChevronBack } from "@vkontakte/icons";
import "./Dasboard.css";

const Dashboard = ({ id, setPopout }) => {
  const osName = platform();
  const photos = useSelector((state) => state.friends).photos.slice(0, 4);
  const { currentFriend } = useSelector((state) => state.friends);
  const { mutualFriends } = useSelector((state) => state.friends);
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
  } = currentFriend;

  return (
    <Panel id={id}>
      <PanelHeader
        left={
          <PanelHeaderButton
            onClick={() => {
              setPopout(<ScreenSpinner size="large" />);
              actions.activePanel.change("home");
              setTimeout(() => document.location.reload(), 500);
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
              {mutualFriends.map(({ photo_100, first_name }) => {
                return (
                  <HorizontalCell size="s" header={first_name} key={photo_100}>
                    <Avatar size={osName === "ios" ? 64 : 56} src={photo_100} />
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
              const url = photo[photo.length - 1].url;
              return (
                <Card
                  className="card"
                  key={i}
                  style={{
                    textAlign: "center",
                    backgroundImage: `url(${url})`,
                    paddingBottom: "44%",
                  }}
                />
              );
            })}
          </CardScroll>
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

export default Dashboard;
