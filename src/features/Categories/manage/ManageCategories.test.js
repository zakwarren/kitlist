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

import { ManageCategories } from "./ManageCategories";
import { AddEditCategory } from "./AddEdit";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({ push: jest.fn }),
}));

describe("<ManageCategories />", () => {
  let wrapper;
  const state = {
    category: { categories: [{ name: "Test" }], tickedCategories: [] },
  };

  beforeAll(() => {
    jest.spyOn(redux, "useDispatch").mockReturnValue(jest.fn);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.spyOn(redux, "useSelector").mockImplementation((cb) => cb(state));

    wrapper = shallow(<ManageCategories />);
  });

  it("should render a <Typography /> component", () => {
    const element = wrapper.find(Typography);

    expect(element).toHaveLength(1);
    expect(element.text()).toEqual("Manage Categories");
  });

  it("should render a <ButtonGroup /> component", () => {
    const element = wrapper.find(ButtonGroup);

    expect(element).toHaveLength(1);
  });

  it("should render multiple <Button /> components", () => {
    const elements = wrapper.find(Button);

    expect(elements).toHaveLength(2);
    expect(elements.get(0).props.children).toEqual("Add New Category");
    expect(elements.get(1).props.children).toEqual("Manage Items");
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

  it("should render a <AddEditCategory /> component", () => {
    const element = wrapper.find(AddEditCategory);

    expect(element).toHaveLength(1);
  });
});
