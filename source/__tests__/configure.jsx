import React from "react";
import { IntlProvider } from "react-intl";
import { mount as $ } from "enzyme";
import configure from "../configure";

describe("configure", () => {
  it("throws an error if apiSelector is not a function", () => {
    expect(() => configure("")).toThrow();
    expect(() => configure([])).toThrow();
    expect(() => configure(() => {})).not.toThrow();
  });

  it("creates a new <Format /> component", () => {
    expect(configure(() => {})).toBeInstanceOf(Function);
  });

  it("has a displayName", () => {
    expect(configure(() => {})).toHaveProperty("displayName", "Format");
    expect(configure(() => {}, { displayName: "taco" })).toHaveProperty(
      "displayName",
      "taco"
    );
  });

  it("injects intl and props into apiSelector on render", () => {
    const selector = jest.fn();
    const Format = configure(selector);
    const props = { taco: "spicy", cat: "butters", children: () => <div /> };
    const $element = $(
      <IntlProvider locale="en">
        <Format {...props} />
      </IntlProvider>
    );

    expect(selector).toHaveBeenCalledWith(
      $element.find(Format).getNode().context.intl,
      props
    );
  });

  it("injects apiSelector result into children", () => {
    const Format = configure(() => ({ message: "hello" }));
    const children = jest.fn(() => <div />);

    $(
      <IntlProvider locale="en">
        <Format>{children}</Format>
      </IntlProvider>
    );

    expect(children).toHaveBeenCalledWith({ message: "hello" });
  });

  it("renders children result", () => {
    const Format = configure(() => ({ message: "hello" }));
    const $element = $(
      <IntlProvider locale="en">
        <Format>{_ => <div>{_.message}</div>}</Format>
      </IntlProvider>
    );

    expect($element.html()).toEqual("<div>hello</div>");
  });
});
