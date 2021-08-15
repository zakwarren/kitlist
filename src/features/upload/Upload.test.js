import React from "react";
import { shallow } from "enzyme";
import * as redux from "react-redux";
import { Typography } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";

import { Upload } from "./Upload";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({ push: jest.fn }),
}));
jest.mock("notistack", () => ({
  ...jest.requireActual("notistack"),
  useSnackbar: () => ({ enqueueSnackbar: jest.fn }),
}));

describe("<Upload />", () => {
  let wrapper;
  const state = {
    category: { categories: [], tickedCategories: [] },
    item: { items: [], tickedItems: [], removedItems: [] },
  };

  beforeAll(() => {
    jest.spyOn(redux, "useDispatch").mockReturnValue(jest.fn);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.spyOn(redux, "useSelector").mockImplementation((cb) => cb(state));

    wrapper = shallow(<Upload />);
  });

  it("should render a <Typography /> component", () => {
    const element = wrapper.find(Typography);

    expect(element).toHaveLength(1);
    expect(element.text()).toEqual("Upload List");
  });

  it("should render a <DropzoneArea /> component", () => {
    const element = wrapper.find(DropzoneArea);

    expect(element).toHaveLength(1);
  });
});
