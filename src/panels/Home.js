import React, { useState } from "react";
import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import Div from "@vkontakte/vkui/dist/components/Div/Div";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import { Input, List } from "@vkontakte/vkui";

const Home = ({ id, fetchedUser, friends }) => {
  const [search, setSearch] = useState("");
  const filterValue = friends.filter(
    (friend) => friend.first_name === search || friend.last_name === search
  );

  return (
    <Panel id={id}>
      <PanelHeader>Friend Analyse</PanelHeader>
      {fetchedUser && (
        <Group>
          <Cell
            before={
              fetchedUser.photo_200 ? (
                <Avatar src={fetchedUser.photo_200}/>
              ) : null
            }
            description={
              fetchedUser.city && fetchedUser.city.title
                ? fetchedUser.city.title
                : ""
            }
          >
            {`${fetchedUser.first_name} ${fetchedUser.last_name}`}
          </Cell>
        </Group>
      )}

      <Group>
        <Cell>
          <Input
            type="text"
            defaultValue=""
            onChange={(e) => setSearch(e.target.value)}
          />
        </Cell>

        <List>
          {!friends && <Div>Упс, что-то пошло не так</Div>}
          {!filterValue.length
            ? friends.map((el) => {
              return (
                <Cell
                  expandable
                  key={el.id}
                  before={<Avatar src={el.photo_100}/>}
                >
                  {`${el.first_name} ${el.last_name}`}
                </Cell>
              );
            })
            : filterValue.map((el) => {
              return (
                <Cell
                  expandable
                  key={el.id}
                  before={<Avatar src={el.photo_100}/>}
                >
                  {`${el.first_name} ${el.last_name}`}
                </Cell>
              );
            })}
        </List>
      </Group>
    </Panel>
  );
};

export default Home;
