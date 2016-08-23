import React, { PropTypes } from 'react';
import T from 'i18n-react';
import { getUrl } from '../../router/router.js';

const setPreviousPage = current => current - 1;
const setNextPage = (current, max, total) => {
  if (max >= total) return current;
  return current + 1;
};

export default function Pager({ current, onPaginationChange, perPage, storeLocatorId, total, target }) {
  let min = total ? 1 : 0;
  let max = current * perPage || 0;
  const previousPage = setPreviousPage(current);
  const nextPage = setNextPage(current, max, total);
  const previousPageUrl = previousPage < 1 ? '#' : getUrl({ storeLocatorId, storeLocatorPage: previousPage });
  const nextPageUrl = nextPage === current ? '#' : getUrl({ storeLocatorId, storeLocatorPage: nextPage });

  const goToNextPage = function goToNextPage(e) {
    e.preventDefault();
    if (e.currentTarget.hasAttribute('disabled')) return;
    if (max < total) onPaginationChange(current + 1, target);
  };

  const goToPreviousPage = function goToPreviousPage(e) {
    e.preventDefault();
    if (e.currentTarget.hasAttribute('disabled')) return;
    if (current > 1) onPaginationChange(current - 1, target);
  };

  if (nextPage === current) max = total;
  if (current > 1) min = (current - 1) * perPage + 1;

  return (
    <div id="store-locator-pager">
      <span>{min}-{max} <T text="shared.of" /> {total}</span>
      <a href={previousPageUrl} type="button" onClick={goToPreviousPage} disabled={previousPage < 1}>
        {'<'}
      </a>
      <a href={nextPageUrl} type="button" onClick={goToNextPage} disabled={nextPage === current}>
        {'>'}
      </a>
    </div>
  );
}

Pager.propTypes = {
  current: PropTypes.number,
  onPaginationChange: PropTypes.func,
  perPage: PropTypes.number,
  storeLocatorId: PropTypes.string,
  target: PropTypes.string,
  total: PropTypes.number
};
