import { useState, useMemo } from "react";

const STATUS_FILTERS = {
  ALL: "all",
  FAVORITES: "favorites",
  PINNED: "pinned",
  ARCHIVED: "archived",
};

const SORT_OPTIONS = {
  NEWEST: "newest",
  OLDEST: "oldest",
  ALPHABETICAL: "alphabetical",
  RECENTLY_UPDATED: "recently_updated",
};

export const usePromptFilters = (prompts) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(STATUS_FILTERS.ALL);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.NEWEST);

  const visiblePrompts = useMemo(() => {
    let result = prompts;

    if (statusFilter === STATUS_FILTERS.FAVORITES) {
      result = result.filter((prompt) => prompt.isFavorite);
    } else if (statusFilter === STATUS_FILTERS.PINNED) {
      result = result.filter((prompt) => prompt.isPinned);
    } else if (statusFilter === STATUS_FILTERS.ARCHIVED) {
      result = result.filter((prompt) => prompt.isArchived);
    } else {
      result = result.filter((prompt) => !prompt.isArchived);
    }

    if (categoryFilter !== "all") {
      result = result.filter((prompt) => prompt.category === categoryFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter((prompt) => {
        const matchesTitle = prompt.title.toLowerCase().includes(query);
        const matchesContent = prompt.prompt.toLowerCase().includes(query);
        const matchesCategory = prompt.category.toLowerCase().includes(query);
        const matchesTags = prompt.tags.some((tag) =>
          tag.toLowerCase().includes(query)
        );
        return matchesTitle || matchesContent || matchesCategory || matchesTags;
      });
    }

    const sorted = [...result].sort((a, b) => {
      switch (sortBy) {
        case SORT_OPTIONS.OLDEST:
          return new Date(a.createdAt) - new Date(b.createdAt);
        case SORT_OPTIONS.ALPHABETICAL:
          return a.title.localeCompare(b.title);
        case SORT_OPTIONS.RECENTLY_UPDATED:
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        case SORT_OPTIONS.NEWEST:
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return sorted;
  }, [prompts, searchQuery, statusFilter, categoryFilter, sortBy]);

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    sortBy,
    setSortBy,
    visiblePrompts,
    STATUS_FILTERS,
    SORT_OPTIONS,
  };
};