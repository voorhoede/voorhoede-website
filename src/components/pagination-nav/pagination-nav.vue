<template>
  <nav
    :aria-label="$t('pagination_navigation')"
  >
    <ul class="pagination-nav__list body">
      <li class="pagination-nav__item">
        <app-link
          v-if="props.currentPage > 1"
          :to="getPaginatedRoute(previousPage)"
          :aria-label="$t('previous_page')"
        >
          &lt; {{ $t('previous') }}
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
          :to="getPaginatedRoute(page)"
          :aria-label="$t('current_page', { page })"
          aria-current="true"
        >
          {{ page }}
        </app-link>
        <app-link
          v-else-if="page !== DOTS"
          :to="getPaginatedRoute(page)"
          :aria-label="$t('go_to_page', { page })"
        >
          {{ page }}
        </app-link>
        <span
          v-else
          class="pagination-nav__item"
          aria-hidden="true"
        >
          {{ DOTS }}
        </span>
      </li>
      <li class="pagination-nav__item">
        <app-link
          v-if="props.currentPage < totalPages"
          :to="getPaginatedRoute(nextPage)"
          :aria-label="$t('next_page')"
        >
          {{ $t('next') }} >
        </app-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
  import { type RouteLocation } from "vue-router";


  const DOTS = '...'

  const props = defineProps<{
    totalItems: number
    currentPage: number
    perPage: number
    // eslint-disable-next-line no-unused-vars
    getPaginatedRoute: (page: number) => RouteLocation
  }>()

  const totalPages = computed(() => Math.ceil(props.totalItems / props.perPage))
  const previousPage = computed(() => props.currentPage - 1)
  const nextPage = computed(() => props.currentPage + 1)

  const paginationRange = computed(() => {
    const siblingCount = 1
    const firstPage = 1
    const lastPage = totalPages.value
    // totalPageNumbers = 2 * siblingCount + firstPage + lastPage + currentPage + 2 * DOTS
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
      We do not show DOTS just when there is just one page number to be inserted
      between the extremes of sibling and the page limits i.e 1 and totalPages.
      Hence we are using leftSibling > 1 and rightSibling < totalPages.value - 1
    */
    const showLeftDOTS = leftSibling > 1
    const showRightDOTS = rightSibling <= totalPages.value - 1

    /*
      Case 2: No left DOTS to show, but rights DOTS to be shown
    */
    if (!showLeftDOTS && showRightDOTS) {
      let leftItemCount = totalPageNumbers - 2
      let leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, lastPage]
    }

    /*
      Case 3: No right DOTS to show, but left DOTS to be shown
    */
    if (showLeftDOTS && !showRightDOTS) {
      let rightItemCount = totalPageNumbers - 2
      let rightRange = range(
        lastPage - rightItemCount + 1,
        lastPage
      )
      return [firstPage, DOTS, ...rightRange]
    }

    /*
      Case 4: Both left and right DOTS to be shown
    */
    if (showLeftDOTS && showRightDOTS) {
      let middleRange = range(leftSibling, rightSibling)
      return [firstPage, DOTS, ...middleRange, DOTS, lastPage]
    }
  })

  function range(start: number, end: number) {
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
