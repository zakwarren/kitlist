import React from "react";
import { shallow } from "enzyme";
import * as redux from "react-redux";
import { Formik } from "formik";
import { Dialog, DialogTitle, IconButton } from "@material-ui/core";

import { AddCategory } from "./Add";

describe("<AddCategory />", () => {
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

    wrapper = shallow(<AddCategory isOpen={true} onClose={jest.fn} />);
  });

  it("should render a <Dialog /> component", () => {
    const element = wrapper.find(Dialog);

    expect(element).toHaveLength(1);
  });

  it("should render a <IconButton /> component", () => {
    const element = wrapper.find(IconButton);

    expect(element).toHaveLength(1);
  });

  it("should render a <DialogTitle /> component", () => {
    const element = wrapper.find(DialogTitle);

    expect(element).toHaveLength(1);
    expect(element.text()).toEqual("Add New Category");
  });

  it("should render a <Formik /> component", () => {
    const element = wrapper.find(Formik);

    expect(element).toHaveLength(1);
  });
});
