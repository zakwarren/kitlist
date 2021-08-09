import React from "react";
import { shallow } from "enzyme";
import {
  Divider,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@material-ui/core";

import { AppShell } from ".";

describe("<AppShell />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <AppShell>
        <p>Test</p>
      </AppShell>
    );
  });

  it("should render an <IconButton /> component", () => {
    const element = wrapper.find(IconButton);

    expect(element).toHaveLength(1);
  });

  it("should render a <nav /> element", () => {
    const element = wrapper.find("nav");

    expect(element).toHaveLength(1);
  });

  it("should render a <Drawer /> component", () => {
    const element = wrapper.find(Drawer);

    expect(element).toHaveLength(1);
  });

  it("should render multiple <Typography /> components", () => {
    const element = wrapper.find(Typography);

    expect(element).toHaveLength(2);
  });

  it("should render a <Divider /> component", () => {
    const element = wrapper.find(Divider);

    expect(element).toHaveLength(1);
  });

  it("should render a <List /> component", () => {
    const element = wrapper.find(List);

    expect(element).toHaveLength(1);
  });

  it("should render one or more <ListItem /> components", () => {
    const element = wrapper.find(ListItem);
    const element2 = wrapper.find(ListItemText);

    expect(element.length).toBeGreaterThanOrEqual(1);
    expect(element2.length).toBeGreaterThanOrEqual(1);
  });

  it("should render a <main /> element", () => {
    const element = wrapper.find("main");

    expect(element).toHaveLength(1);
  });

  it("should render a <header /> element", () => {
    const element = wrapper.find("header");

    expect(element).toHaveLength(1);
  });

  it("should render the child element element", () => {
    const element = wrapper.find("p");

    expect(element).toHaveLength(1);
    expect(element.text()).toEqual("Test");
  });
});
