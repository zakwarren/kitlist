import React from "react";
import { shallow } from "enzyme";
import { Divider, Drawer, Typography, IconButton } from "@material-ui/core";

import { AppShell } from ".";

describe("<AppShell />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <AppShell sideBarContent={<span>Test Side</span>}>
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

  it("should render a <main /> element", () => {
    const element = wrapper.find("main");

    expect(element).toHaveLength(1);
  });

  it("should render a <header /> element", () => {
    const element = wrapper.find("header");

    expect(element).toHaveLength(1);
  });

  it("should render the side bar content element", () => {
    const element = wrapper.find("span");

    expect(element).toHaveLength(1);
    expect(element.text()).toEqual("Test Side");
  });

  it("should render the child element", () => {
    const element = wrapper.find("p");

    expect(element).toHaveLength(1);
    expect(element.text()).toEqual("Test");
  });
});
