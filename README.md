## Getting Started

```bash
npm install
```

```bash
npm run dev
```

Open [http://localhost:7001](http://localhost:7001) on your browser.

## Prerequisite: OMDb Api key

To make API calls, an OMDb API key is required. This key is not provided with the project but can be obtained for free by visiting [https://www.omdbapi.com/](https://www.omdbapi.com/).

Once you have your key, duplicate the `.env.example` file and rename it to `.env` at the root level of the project. Then, replace `your-api-key` with the key you generated.

## Tech Stack

-   Vite (Bundling)
-   Vitest (Testing)
-   React
-   Zustand (State management)
-   TypeScript
-   Tailwind (Styling)

## Other 3rd Party libraries

-   Axios
-   overlayscrollbars-react
-   react-loading-skeleton
-   wouter (Routing)

## Testing (Unit tests)

`npm run test`

A few tests have been included for reference, but this is not full test coverage. The tests cover a component and some aspects of the Zustand store.

## Scalability

1. Use of a state management library (Zustand in this case) to centralize all data manipulation.
2. Consistent use of TypeScript for type safety throughout the app.
3. Separation of components based on their responsibility, including UI (dumb) components, business logic components, and page-specific components.
4. Layered architecture with clear separation of concerns, such as API handling, state management, and components.

## Improvements

-   Efforts were made to reduce repetitive Tailwind utility classes, such as extending theme variables in the Tailwind config. However, further improvements could be made for use cases like spacing and typography.
-   UI responsiveness, particularly adding proper mobile support.
-   Wouter was initially chosen as a simple router for the watchlist page. However, with the addition of more features, such as mobile support, sub-routing became necessary—something Wouter doesn’t support out of the box. Switching to a more robust router like React Router would be a suggested improvement.

## Missing parts

-   The initial mockup included a filter to sort movies by a range of years, but this presented challenges because the OMDb API doesn’t support filtering by a year range. Implementing this functionality solely on the front-end could introduce complications and instability. Key reasons include:
    -   Filtering on the client side would only work with a small subset of the available data.
    -   Front-end filtering would complicate pagination logic, as managing subsets of data requires handling data differently.
    -   Multiple API calls would need to be made to gather all relevant data, which could burden the API and result in performance issues.
    -   Implementing this feature by lazy loading all search results would not be ideal, as it could result in fetching hundreds or even thousands of entries.
-   The filter component was included for demonstration purposes only and will display a warning message to the user when used.
