import React, { useEffect } from "react";
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
} from "@vkontakte/vkui";
import { useSelector } from "react-redux";
import actions from "../store/actions";
import { Icon24Back, Icon28ChevronBack } from "@vkontakte/icons";

const Dashboard = ({ id }) => {
  const osName = platform();
  const { photos } = useSelector((state) => state.friends);

  return (
    <Panel id={id}>
      <PanelHeader
        left={
          <PanelHeaderButton onClick={() => actions.activePanel.change("home")}>
            {osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
          </PanelHeaderButton>
        }
      >
        Friend Info
      </PanelHeader>

      <Group header={<Header>Найденные фото</Header>}>
        <CardScroll size="s">
          {photos.map((photo) => {
            const url = photo[photo.length - 1].url;
            return (
              <Card key={url}>
                <img src={url} alt="" style={{ maxWidth: "100%" }} />
              </Card>
            );
          })}
        </CardScroll>
      </Group>

      <Group header={<Header>Последняя активность</Header>}>
        <CardGrid size="l">
          <ContentCard
            image="https://images.unsplash.com/photo-1603988492906-4fb0fb251cf8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80"
            subtitle="unsplash"
            header="brown and gray mountains under blue sky during daytime photo"
            text="Mountain changji"
            caption="Photo by Siyuan on Unsplash"
            maxHeight={150}
          />
          <ContentCard
            image="https://images.unsplash.com/photo-1603928726698-a015a1015d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80"
            subtitle="unsplash"
            header="persons left hand with pink paint"
            text="Five hours of makeup and paint to achieve the human anatomy photoshoot. Thank you Steph and Shay. See more and official credit on @jawfox.photography."
            caption="Photo by Alexander Jawfox on Unsplash"
            maxHeight={500}
          />
        </CardGrid>
      </Group>
    </Panel>
  );
};

export default Dashboard;
