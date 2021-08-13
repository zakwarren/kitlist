import { selectCategories, selectTickedCategories } from "./selectors";

describe("category selectors", () => {
  const posState = {
    category: {
      categories: ["test 1", "test 2"],
      tickedCategories: ["test 1"],
    },
  };
  const negState = { category: { categories: [], tickedCategories: [] } };

  it("should return the categories", () => {
    const is = selectCategories(posState);
    const not = selectCategories(negState);

    expect(is).toEqual(posState.category.categories);
    expect(not).toEqual(negState.category.categories);
  });

  it("should return the ticked categories", () => {
    const is = selectTickedCategories(posState);
    const not = selectTickedCategories(negState);

    expect(is).toEqual(posState.category.tickedCategories);
    expect(not).toEqual(negState.category.tickedCategories);
  });
});
