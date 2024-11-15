### Useful Links

- [Assignment Description](https://github.com/user-attachments/files/17775168/assignment_description.pdf)
- [Deployed App Url](https://spyrosbek.github.io/auto-suggest-app/)
- [Hacker News Api](https://hn.algolia.com/api/v1/search?query=javascript)

### Tech Stack

- Framework: React (v18)
- Languages: TypeScript (v5), Sass (v1.80)
- Bundler: Vite (v5)
- Dev libraries: Axios (v1.7), React Redux (v9)
- UI libraries: Bootstrap (v5), React Icons (v5.3)
- Testing tools: React Testing Library (v16), Jest (v29), Cypress (v13)

### How It Looks Like

<details>
<summary>Screenshots</summary>
<img width="1447" alt="image" src="https://github.com/user-attachments/assets/52eea321-f5a4-41df-a1ed-e5d5547921fb">
<img width="1447" alt="image" src="https://github.com/user-attachments/assets/c758fe70-2a8a-4568-80b8-40c2aeb917de">
<img width="600" alt="image" src="https://github.com/user-attachments/assets/f8500416-f047-4dbe-8348-4881004f6ada">
</details>

### How to Test It

- `npm run dev`
Then visit `http://localhost:3000` to interact with the app.
- `npm run unit`
To run the unit tests.

### How and Why

In this assignment, we created a SPA application providing search & favorite functionalities on stories retrieved from the Hacker News API.
The application consists of 2 main section components:
- `SearchStories`: containing a search bar with autocomplete functionality triggered after 3+ typed characters, returning search suggestions on a dropdown list, with the option to toggle (add/remove) each suggested story to the user's favorites.
- `FavoriteStories`: containing a list of the user's favorite stories, with the option to remove stories from the favorites.

The main artefact component of the application is the `StoryListItem`. It is used in both sections of the app, passing different component props for each case.

We also created 2 molecule components `FavoriteButton` and `DeleteButton` used inside the StoryListItem component, along with a `Spinner` component used in the SearchStories component.

The main user stories provided by the app are:
- Search stories: the user types in the search bar, then a list of suggested stories gets rendered. If the user clicks on a story title, the story source opens in a new tab. If the user clicks on the heart icon, the story gets added to the user's favorite list (if the heart is outlined, meaning the story doesn't currently exist in the favorite list) or it gets removed from the list (if the heart is filled, meaning the story already was in the list).
- Manage favorites: the user is offered a list of their current favorite stories. By clicking on a story, the story source opens in a new tab. By clicking on the bin icon, the story gets removed from the favorite list.

**Additional work**

- We created a util function `highlightText` which takes 2 arguments (text, query) and returns the text with the subtext query highlighted in it.

- We created a `favoriteStories` store with the state `favorites` used by out components. It contains 2 store actions/reducers `toggleFavorite` (triggered on the favorite and delete button clicks) and `loadFavorites` (triggered on page load).

- We made the user favorites persistent (available after page reload) by triggering the update of the values of localStorage's key `favoriteStories` on each story favorite toggle. Helper functions are included in the `favoriteStories` store.

- We created a class `Story`, an interface `StoryData`, and a type `StoryItemScope`.
`StoryData` outlines the structure of the response data from the HackerNewsApi.
`Story` provides the structure of our model for the stories used in the app, along with a constructor useful to ensure the correct parsing of the stories from the API responses.
`StoryItemScope` is an enum with 2 values (`SEARCH`, `FAVORITES`) to help us distinguish cleanly between the 2 uses of the `StoryListItem` component.

- We created a `hackerNewsApi` service, including the relevant implementations of the used API calls (at this state of the app, only the search API call). This service contains the `searchStories` method which triggers the search API call using a query param, parses and returns the response to the caller function.
