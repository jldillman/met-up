import React from "react";
import axios from "axios";
import Amplify, { API, graphqlOperation, Auth } from "aws-amplify";
import * as queries from "./../graphql/queries";

export const useMeetupEvents = (
  meetupGroupName: string
): { fetching: boolean; events: object[] } => {
  const [fetching, setFetching] = React.useState(false);
  const [events, setEvents] = React.useState([]);

  const handleNewGroupName = async (group: string) => {
    setFetching(true);
    // const result = await axios.get(`https://api.meetup.com/${group}/events`);
    // setEvents(result.data);
    // await Auth.signIn();
    const allItems = await API.graphql(graphqlOperation(queries.listTodos));
    console.log("allitems", allItems);
    setEvents(allItems.data.listTodos.items);
    setFetching(false);
  };

  React.useEffect(() => {
    meetupGroupName &&
      meetupGroupName.length > 0 &&
      handleNewGroupName(meetupGroupName);
  }, [meetupGroupName]);

  return { fetching: fetching, events: events };
};
