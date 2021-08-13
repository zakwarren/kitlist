import React from "react";
import { shallow } from "enzyme";
import * as redux from "react-redux";
import { Formik } from "formik";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@material-ui/core";

import { AddEditItem } from "./AddEdit";

describe("<AddEditItem />", () => {
  let wrapper;
  const state = {
    category: { categories: [{ name: "test 1" }], tickedCategories: [] },
    item: { items: [{ name: "Test", category: "test 1" }], tickedItems: [] },
  };
  const props = {
    isOpen: true,
    onClose: jest.fn,
    item: { name: "Test", category: "test cat" },
  };

  beforeAll(() => {
    jest.spyOn(redux, "useDispatch").mockReturnValue(jest.fn);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.spyOn(redux, "useSelector").mockImplementation((cb) => cb(state));

    wrapper = shallow(<AddEditItem {...props} />);
  });

  it("should render a <Dialog /> component", () => {
    const element = wrapper.find(Dialog);

    expect(element).toHaveLength(1);
  });

  it("should render a <IconButton /> component", () => {
    const element = wrapper.find(IconButton);

    expect(element).toHaveLength(1);
  });

  it("should render a <DialogTitle /> component with add title", () => {
    const element = wrapper.find(DialogTitle);

    expect(element).toHaveLength(1);
    expect(element.text()).toEqual("Add New Item");
  });

  it("should render a <DialogTitle /> component with edit title", () => {
    wrapper.setProps({ isEdit: true });
    const element = wrapper.find(DialogTitle);

    expect(element).toHaveLength(1);
    expect(element.text()).toEqual("Edit Test Item");
  });

  it("should render a <DialogContent /> component", () => {
    const element = wrapper.find(DialogContent);

    expect(element).toHaveLength(1);
  });

  it("should render a <Formik /> component", () => {
    const element = wrapper.find(Formik);

    expect(element).toHaveLength(1);
  });
});
