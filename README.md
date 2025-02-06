# TestCases Repository

This repository contains test cases for verifying the functionality of a website using WebDriverIO.

## Project Structure

- **`tests/`** — Folder containing the test files:
  - **`pageobjects/`** — Contains page objects, implementing the Page Object Model.
  - **`specs/`** — Contains test specs that utilize the page objects.
- **`wdio.conf.js`** — WebDriverIO configuration file to set up the test environment.

## Prerequisites

Before you begin, ensure that you have the following installed:

- Node.js (>= 14.x)
- npm (>= 6.x)
- Git (for cloning the repository)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pikuso/TestCases.git
2. Install the necessary dependencies:
   npm install

## Running the Tests
1. To run all the tests defined in the specs/ folder, use the following command:
   npx wdio run wdio.conf.js
2. To run a specific test file, specify the path to the test file:
   npx wdio run wdio.conf.js --spec path/to/test-file.js
