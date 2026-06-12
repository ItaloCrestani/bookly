import { createBrowserRouter } from "react-router"

import { Public } from "./routes/Public";
import { Private } from "./routes/Private";

import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Home } from "./pages/home";
import { Bookshelf } from "./pages/bookshelf";
import { BookDetails } from "./pages/book";
import { ShelfDetails } from "./pages/shelfDetails";
import { MainLayout } from "./compoments/layouts/mainLayout";
import { DetailsLayout } from "./compoments/layouts/detailsLayout";

const router = createBrowserRouter([
  {
    element: <MainLayout/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/shelf',
        element: <Private><Bookshelf/></Private>
      },
    ]
  },
  {
    element: <DetailsLayout/>,
    children: [
      {
        path: '/book/:id',
        element: <BookDetails/>
      },
      {
        path: '/shelf/:id',
        element: <ShelfDetails/>
      }
    ],
  },
  {
    path: '/login',
    element: <Public><Login/></Public>
  },
  {
    path: '/register',
    element: <Public><Register/></Public>
  }
])

export { router };