import React from "react";
import { shallow } from "enzyme";
import * as redux from "react-redux";
import {
  Typography,
  ButtonGroup,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

import { Items } from "./Items";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({ push: jest.fn }),
}));

describe("<Items />", () => {
  let wrapper;
  const state = {
    item: { items: [{ name: "Test", category: "test 1" }], tickedItems: [] },
  };

  beforeAll(() => {
    jest.spyOn(redux, "useDispatch").mockReturnValue(jest.fn);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.spyOn(redux, "useSelector").mockImplementation((cb) => cb(state));

    wrapper = shallow(<Items />);
  });

  it("should render a <Typography /> component", () => {
    const element = wrapper.find(Typography);

    expect(element).toHaveLength(1);
    expect(element.text()).toEqual("Manage Items");
  });

  it("should render a <ButtonGroup /> component", () => {
    const element = wrapper.find(ButtonGroup);

    expect(element).toHaveLength(1);
  });

  it("should render multiple <Button /> components", () => {
    const elements = wrapper.find(Button);

    expect(elements).toHaveLength(2);
    expect(elements.get(0).props.children).toEqual("Add New Item");
    expect(elements.get(1).props.children).toEqual("Manage Categories");
  });

  it("should render a <Divider /> component", () => {
    const element = wrapper.find(Divider);

    expect(element).toHaveLength(1);
  });

  it("should render a <List /> component", () => {
    const element = wrapper.find(List);

    expect(element).toHaveLength(1);
  });

  it("should render a <ListItem /> element", () => {
    const element = wrapper.find(ListItem);
    const itemTxt = wrapper.find(ListItemText);

    expect(element).toHaveLength(1);
    expect(itemTxt).toHaveLength(1);
  });
});
