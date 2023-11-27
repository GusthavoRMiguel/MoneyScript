import React from "react";

import { Container, Heading, Content, Text, List } from "./styles";

interface ListItems {
  title: string;
  text: string;
}

interface Props {
  label: string;
  description: string;
  text: string;
  listItems: ListItems[];
  listTitle: string;
}

const DefaultOverlayContent: React.FC<Props> = ({
  label,
  description,
  text,
  listItems,
  listTitle,
}) => {
  return (
    <Container>
      <Heading>
        <h1>{label}</h1>
        <h2>{description}</h2>
      </Heading>

      <Content>
        {text !== "" && (
          <Text>
            <p>{text}</p>
          </Text>
        )}

        {listItems && listItems.length > 0 && (
          <List>
            <h2>{listTitle}</h2>
            <ul>
              {listItems.map((item, index) => (
                <li key={index}>
                  <span>{item.title}</span>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
          </List>
        )}
      </Content>
    </Container>
  );
};

export default DefaultOverlayContent;
