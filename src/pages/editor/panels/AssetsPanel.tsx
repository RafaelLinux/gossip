import React, { useState } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import { TextNode, NodeType } from "../../../models/node";
import Icon from "../../../components/Icon";
import List from "../../../components/List";

const { ListItem } = List;

const Container = styled.div``;

const Search = styled.div`
  display: flex;
  align-items: center;

  & > input:focus,
  & > input {
    border-width: 0;
    outline: none;
  }
`;

function createAsset(text: string): TextNode {
  const id = nanoid();
  return {
    id,
    type: NodeType.Text,
    text,
  };
}

const AssetsPanel: React.FC<AssetsPanelProps> = (props) => {
  const sampleData: TextNode[] = [
    createAsset("component1"),
    createAsset("component2"),
    createAsset("component3"),
  ];
  const [components, setCmponents] = useState(sampleData);

  function onMove(dragIndex: number, hoverIndex: number) {
    const dragComponent = components[dragIndex];
    components.splice(dragIndex, 1);
    components.splice(hoverIndex, 0, dragComponent);
    setCmponents([...components]);
  }

  return (
    <Container className="w-full">
      <Search className="p-2">
        <Icon icon="search" />
        <input
          className="bg-transparent ml-2 placeholder-gray-400 w-full"
          placeholder="Search"
        ></input>
        <Icon icon="filter" className="m-1" />
      </Search>
      <List draggable={true} onMove={onMove}>
        {components.map((d) => (
          <ListItem key={d.id} className="p-2">
            {d.text}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export interface AssetsPanelProps {}

export default AssetsPanel;