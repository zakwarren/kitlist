import { selectCategories } from "./selectors";

describe("category selectors", () => {
  const posState = { category: ["test 1", "test 2"] };
  const negState = { category: [] };

  it("should return the categories", () => {
    const is = selectCategories(posState);
    const not = selectCategories(negState);

    expect(is).toEqual(posState.category);
    expect(not).toEqual(negState.category);
  });
});
