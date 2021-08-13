import React from "react";
import { shallow } from "enzyme";
import * as redux from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@material-ui/core";

import { DeleteItem } from "./Delete";

describe("<DeleteItem />", () => {
  let wrapper;
  const props = {
    isOpen: true,
    onClose: jest.fn,
    item: { name: "Test" },
  };

  beforeAll(() => {
    jest.spyOn(redux, "useDispatch").mockReturnValue(jest.fn);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    wrapper = shallow(<DeleteItem {...props} />);
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
    expect(element.text()).toEqual("Delete Item");
  });

  it("should render a <DialogContent /> component", () => {
    const element = wrapper.find(DialogContent);

    expect(element).toHaveLength(1);
  });

  it("should render a <DialogActions /> component", () => {
    const element = wrapper.find(DialogActions);

    expect(element).toHaveLength(1);
  });

  it("should render multiple <Button /> components", () => {
    const elements = wrapper.find(Button);

    expect(elements).toHaveLength(2);
    expect(elements.get(0).props.children).toEqual("Delete");
    expect(elements.get(1).props.children).toEqual("Cancel");
  });
});
