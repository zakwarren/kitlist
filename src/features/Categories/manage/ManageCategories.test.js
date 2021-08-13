import React from "react";
import { shallow } from "enzyme";
import * as redux from "react-redux";
import {
  Typography,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

import { ManageCategories } from "./ManageCategories";
import { AddEditCategory } from "./AddEdit";

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

  it("should render a <Button /> component", () => {
    const element = wrapper.find(Button);

    expect(element).toHaveLength(1);
    expect(element.text()).toEqual("Add New Category");
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
