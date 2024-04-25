# Automated Visual Regression (AVR) Runner

This repository intends to facilitate the design of user flows using [Playwright](https://playwright.dev/) for purposes of automation and visual regression.

Visual regression is one of the ways to assert expecations using visual snapshots (screenshots) in a user flow using browser automation. More details under "What is this about?".

## How do I use this?

### Setup

1. Clone this repository.
2. Run all tests using `npx playwright test`.
3. Open test report using `npx playwright--report`.
4. use debuggin option `npx playwright test --debug`

## What is this about?

In contrast to coding assertions manually to verify individual/specific expections like label text and availability of certain elements or sections, snapshots/screenshots allow us to validate those same expectations with pixel-to-pixel comparison. This technique has certain advantages to it:

1. No need to assert individual aspects like text and values using code since snapshots capture them in the form of pixels.

   ```js
   // traditional assertion
   expect(labelElement.innerText).toEqual("My friends");
   ```

2. Snapshots capture more detail than just text and values. They capture visual aspects such as font (ex: family, size, color), text alignment and positioning.

In essence, visual regression takes us closer to the goal of quality assurance where we can truly test "what the users see".

## Why Playwright?

[Playwright](https://playwright.dev/) is yet another browser automation tool that brings a few unique features to help with the tasks of automation and regression.

### User focused selectors

Traditionally, we are forced to use selectors that are:

1. Based on CSS classes and ID/data/role attribute values. These selectors are tightly coupled to the implementation like the CSS framework or the UI library. They are brittle and break the tests easily.
   ```js
   page.findElementBySelector("#first-name");
   page.findElementBySelector(".bootstrap-input:nth-child(3)");
   page.findElementBySelector("[role='fullname']");
   ```
2. Based on structural layout via XPath. This also leads to brittle tests since any amount of UI refactoring would render the XPath selectors obsolete.
   ```js
   page.findElementBySelector("button >> nth=-1");
   ```

Besides supporting these traditional selector types, Playwright introduces an efficient class of selectors based on [text](https://playwright.dev/docs/selectors#text-selector) and [layout](https://playwright.dev/docs/selectors#selecting-elements-based-on-layout) that are more focused on user's perspective and hence improve the robustness and longevity of the tests.

```js
// fill the input below the text "First name" with "John"
await page.fill('input:below(:text("First name"))', "John");
```

As seen in the example above, it translates very close to "what the user sees" on the browser and does not tie in to any implementation details, choices or changes.

### Playwright Inspector

The [Inspector](https://playwright.dev/docs/inspector) tool has the ability to generate the code while we define a user flow using a browser. This eliminates the overhead on an engineer's end to write code and figure out the appropriate selectors. Moreover, Playwright Inspector tries its best to use "user focused selectors" (see section titled "User focused selectors") as much as possible.

### Network interception

Playwright comes with the [ability to intercept network traffic](https://playwright.dev/docs/test-configuration#network-mocking) that opens up opportunities to control the fixture data that is fed into the application at hand. This brings another key dimension to the accuracy of tests where visual checks are at the front and center.

## Development

### Prerequisites

1. POSIX shell (Windows users should use a Bash terminal).
2. Node v12 or higher (check using `node -v`).
3. Install Prettier extension for your IDE.


### Recommended actions

1. As one is defining or modifying a user flow, it is encouraged to use the "pause" ability offered by Playwright anywhere along the flow script. Playwright inspector would pause on those lines of interest allowing one to verify the page state and optionally step through the code, one action at a time.

   ```js
   await page.pause();
   ```

   2.3. Element selectors

   Playwright tries its best to choose text based selectors as much as possible. But sometimes, it might fall back to CSS, ID or attribute based traditional selectors. If this is the case, it is **HIGHLY RECOMMENDED** to upgrade such instances to [layout based selectors](https://playwright.dev/docs/selectors#selecting-elements-based-on-layout). See the section "User focused selectors" for reasons.

   ```js
   // fill the input below the text "First name" with "John"
   await page.fill('input:below(:text("First name"))', "John");
   ```

   Playwright team is constantly bringing new features into the tool that would help gradually relieve the code from such time-based wait's.

   - Pixel blur
   - Section blur

   **NOTE**: This is very different from waiting on a page and/or data to load. It is absolutely fine and highly encouraged to use the `waitUntil` options provided by Playwright. Plain time-based wait's are a code smell.

 
