import { runTest } from "./snapshot-test";

describe("Gilded Rose Approval", () => {
  it("should run thirtyDays ", () => {
    const logs = runTest(30);

    expect(logs).toMatchSnapshot();
  });
});
