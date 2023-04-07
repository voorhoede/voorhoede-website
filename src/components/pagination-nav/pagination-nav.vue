<template>
  <nav
    role="navigation"
    aria-label="Pagination Navigation"
  >
    <ul class="pagination-nav__list body">
      <li class="pagination-nav__item">
        <app-link
          v-if="props.currentPage > 1"
          :to="toLink(previousPage)"
          aria-label="Previous Page"
        >
          &lt; Previous
        </app-link>
      </li>
      <li
        v-for="page in paginationRange"
        :key="page"
        class="pagination-nav__item"
        :class="{
          'pagination-nav__item--active': page === props.currentPage,
        }"
      >
        <app-link
          v-if="page === props.currentPage"
          :to="toLink(page)"
          aria-label="Current Page, Page 3"
          aria-current="true"
        >
          {{ page }}
        </app-link>
        <app-link
          v-else
          :to="toLink(page)"
          :aria-label="`Goto Page ${page}`"
        >
          {{ page }}
        </app-link>
      </li>
      <li class="pagination-nav__item">
        <app-link
          v-if="props.currentPage < totalPages"
          :to="toLink(nextPage)"
          aria-label="Next Page"
        >
          Next >
        </app-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
  const props = defineProps({
    totalItems: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    basePath: {
      type: String,
      required: true,
    },
  })

  const totalPages = computed(() => Math.ceil(props.totalItems / props.perPage))
  const previousPage = computed(() => props.currentPage - 1)
  const nextPage = computed(() => props.currentPage + 1)

  function toLink(page) {
    return {
      path: props.basePath,
      query: {
        page,
      },
    }
  }

  const paginationRange = computed(() => {
    const siblingCount = 1
    const dots = '...'
    const firstPage = 1
    const lastPage = totalPages.value
    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*dots
    const totalPageNumbers = 2 * siblingCount + 5

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPages]
    */
    if (totalPageNumbers >= totalPages.value) {
      return range(1, totalPages.value)
    }

    /*
      Calculate left and right sibling index and make sure they are within range 1 and totalPages
    */
    const leftSibling = Math.max(props.currentPage - siblingCount, 0)
    const rightSibling = Math.min(
      props.currentPage + siblingCount,
      totalPages.value
    )

    /*
      We do not show dots just when there is just one page number to be inserted
      between the extremes of sibling and the page limits i.e 1 and totalPages.
      Hence we are using leftSibling > 1 and rightSibling < totalPages.value - 1
    */
    const showLeftdots = leftSibling > 1
    const showRightdots = rightSibling <= totalPages.value - 1

    /*
      Case 2: No left dots to show, but rights dots to be shown
    */
    if (!showLeftdots && showRightdots) {
      let leftItemCount = totalPageNumbers - 2
      let leftRange = range(1, leftItemCount)

      return [...leftRange, dots, lastPage]
    }

    /*
      Case 3: No right dots to show, but left dots to be shown
    */
    if (showLeftdots && !showRightdots) {
      let rightItemCount = totalPageNumbers - 2
      let rightRange = range(
        lastPage - rightItemCount + 1,
        lastPage
      )
      return [firstPage, dots, ...rightRange]
    }

    /*
      Case 4: Both left and right dots to be shown
    */
    if (showLeftdots && showRightdots) {
      let middleRange = range(leftSibling, rightSibling)
      return [firstPage, dots, ...middleRange, dots, lastPage]
    }
  })

  function range(start, end) {
    const size = end - start + 1
    return [...Array(size).keys()].map(i => i + start)
  }
</script>

<style>
.pagination-nav__list {
  display: flex;
  color: var(--html-blue);
}

.pagination-nav__item + .pagination-nav__item {
  margin-left: var(--spacing-small);
}

.pagination-nav__item--active {
  font-weight: bold;
}
</style>