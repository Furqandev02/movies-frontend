import * as React from "react";
import usePagination from "@mui/material/usePagination";
import { styled } from "@mui/material/styles";

// Styled component for the pagination list
const List = styled("ul")({
  listStyle: "none", // Removes default list styling
  padding: 0, // Removes default padding
  margin: 0, // Removes default margin
  display: "flex", // Aligns pagination items horizontally
});

// Pagination component using Material-UI's usePagination hook
export default function UsePagination({ count, page, onChange }) {
  // Use the usePagination hook to generate pagination items
  const { items } = usePagination({
    count, // Total number of pages
    page,  // Current active page
    onChange, // Callback to handle page changes
  });

  return (
    <nav>
      {/* Render the pagination list */}
      <List>
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          // Handle ellipses (start and end)
          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = "…";
          } 
          // Handle page numbers
          else if (type === "page") {
            children = (
              <button
                type="button"
                className={selected ? "selectedPage" : ""} // Apply selected style if page is active
                style={{
                  fontWeight: selected ? "bold" : undefined, // Bold font weight for the selected page
                }}
                {...item} // Spread additional properties for pagination control
              >
                {page} {/* Display the page number */}
              </button>
            );
          } 
          // Handle other pagination types (e.g., previous, next)
          else {
            children = (
              <button type="button" className="options" {...item}>
                {type} {/* Display the type (e.g., "Previous", "Next") */}
              </button>
            );
          }

          return <li key={index}>{children}</li>; // Render each pagination item inside a list item
        })}
      </List>
    </nav>
  );
}
