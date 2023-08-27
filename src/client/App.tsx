import HomePage from "./pages/HomePage/index"
import FavoritePage from "./pages/FavoritePage/index"
import DetailPage from "./pages/DetailPage/index"
import { match } from "ts-pattern"
import { AppProvider, Route } from "./context"

const App = () => (
  <AppProvider>
    {/* {(ctx) => {
      const { url } = ctx
      return (
        <div>
          {
            match(url.path)
              .with("/home", () => <HomePage />)
              .with("/favorite", () => <FavoritePage />)
              .with("/detail", () => <DetailPage />)
              .otherwise(() => <HomePage />)
          }
        </div>
      )
    }} */}
    <Route path="/">
      <HomePage />
    </Route>
    <Route path="/home">
      <HomePage />
    </Route>
    <Route path="/favorite">
      <FavoritePage />
    </Route>
    <Route path="/detail">
      <DetailPage />
    </Route>
  </AppProvider>
)


export default App
