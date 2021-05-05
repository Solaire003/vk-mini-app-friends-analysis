import React from "react";
import { platform, IOS, List, Cell } from "@vkontakte/vkui";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import PanelHeaderButton from "@vkontakte/vkui/dist/components/PanelHeaderButton/PanelHeaderButton";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import "./Persik.css";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Div from "@vkontakte/vkui/dist/components/Div/Div";

const osName = platform();

const FriendList = ({ id, go, friends }) => (
  <Panel id={id}>
    <PanelHeader
      left={
        <PanelHeaderButton onClick={go} data-to="home">
          {osName === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
        </PanelHeaderButton>
      }
    >
      Friend List
    </PanelHeader>
    <Group>
      <List>
        {!friends && <Div>Упс, что-то пошло не так</Div>}
        {friends.map((el) => {
          return (
            <Cell expandable key={el.id} before={<Avatar src={el.photo_100} />}>
              {`${el.first_name} ${el.last_name}`}
            </Cell>
          );
        })}
      </List>
    </Group>
  </Panel>
);

export default FriendList;
