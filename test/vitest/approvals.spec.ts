import { execSync } from "node:child_process";
import { Item, GildedRose } from "@/gilded-rose";
import { runTest } from "test/golden-master-string-test";

/**
 * This test uses Vitest Snapshot, similar to [Jest Snapshot](https://goo.gl/fbAQLP).
 *
 * There are two test cases here with different styles:
 * <li>"foo" is more similar to the unit test from the 'Java' version
 * <li>"thirtyDays" is more similar to the TextTest from the 'Java' version
 *
 * I suggest choosing one style to develop and deleting the other.
 */

describe("Gilded Rose Approval", () => {
  it.skip("should thirtyDays text", () => {
    const consoleOutput = execSync(
      "ts-node test/golden-master-text-test.ts 30",
      { encoding: "utf-8" },
    );

    expect(consoleOutput).toMatchSnapshot();
  });

  it("should thirtyDays ", () => {
    const logs = runTest(30);

    expect(logs).toMatchSnapshot();
  });
});
