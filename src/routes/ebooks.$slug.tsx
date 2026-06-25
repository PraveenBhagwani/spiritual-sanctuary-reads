import { createFileRoute } from "@tanstack/react-router";
import { Route as BookRoute } from "./books.$slug";

// eBook detail reuses the book detail UI — same content surface.
export const Route = createFileRoute("/ebooks/$slug")({
  loader: BookRoute.options.loader,
  head: BookRoute.options.head,
  notFoundComponent: BookRoute.options.notFoundComponent,
  component: BookRoute.options.component,
});
