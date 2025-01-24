import { execSync } from "node:child_process";
import { Item, GildedRose } from "@/gilded-rose";
import { runTest } from "test/golden-master-string-test";

describe("Gilded Rose Approval", () => {
  it("should run thirtyDays ", () => {
    const logs = runTest(30);

    expect(logs).toMatchSnapshot();
  });
});
