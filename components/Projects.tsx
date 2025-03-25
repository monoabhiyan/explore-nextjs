'use client';

import {useInView} from "react-intersection-observer";
import {useInfiniteQuery} from "@tanstack/react-query";
import React from "react";

const Projects = () => {
  const {ref, inView} = useInView()

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: async ({pageParam}): Promise<{
      data: Array<{ name: string; id: number }>
      previousId: number
      nextId: number
    }> => {
      const response = await fetch(`http://localhost:3000/api/projects?cursor=${pageParam}`)
      return await response.json()
    },
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) => firstPage.previousId,
    getNextPageParam: (lastPage) => lastPage.nextId,
  })

  React.useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView])

  let ui = null;

  if (status === "pending") {
    ui = <div>Loading...</div>
  } else if (status === 'error') {
    ui = <div>Error: {error.message}</div>
  } else {
    ui = (
      <>
        <div>
          <button
            onClick={() => fetchPreviousPage()}
            disabled={!hasPreviousPage || isFetchingPreviousPage}
          >
            {isFetchingPreviousPage
              ? 'Loading more...'
              : hasPreviousPage
                ? 'Load Older'
                : 'Nothing more to load'}
          </button>
        </div>
        {data.pages.map((page) => (
          <React.Fragment key={page.nextId}>
            {page.data.map((project) => (
              <p
                style={{
                  border: '1px solid gray',
                  borderRadius: '5px',
                  padding: '10rem 1rem',
                  background: `hsla(${project.id * 30}, 60%, 80%, 1)`,
                }}
                key={project.id}
              >
                {project.name}
              </p>
            ))}
          </React.Fragment>
        ))}
        <div>
          <button
            ref={ref}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? 'Loading more...'
              : hasNextPage
                ? 'Load Newer'
                : 'Nothing more to load'}
          </button>
        </div>
        <div>
          {isFetching && !isFetchingNextPage
            ? 'Background Updating...'
            : null}
        </div>
      </>
    )
  }

  return (
    <div>
      <h1>Our Projects</h1>
      {ui}
    </div>
  );
};

export default Projects;
