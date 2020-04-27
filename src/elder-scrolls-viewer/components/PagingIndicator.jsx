import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import LoadingIcon from '../../icons/LoadingIcon';
import './PagingIndicator.scss';

/**
 * This is always shown unless the last page of cards for the current search has been fetched.  There's no need
 * to micromanage state in between fetches because whenever the user can see the bottom of the page a new set of cards
 * should be loading (unless the last set has already loaded)
 *
 * The loading indicator also doubles as an element for an intersection observer to dispatch actions when
 * the user has scrolled to the bottom of the page.
 *
 * It's very important to make sure that this component never gets re-rendered unnecessarily.  If it does,
 * the intersection observer will dispatch extra actions that are unwanted. The logic governing when to
 * actually fetch new cards should be able to handle extra dispatches, but why test it?
 *
 * In particular it's important to note that
 *   ** useContext(GlobalContext) can not be used here.  It will force re-renders even though the component is memoized. **
 * @type {React.NamedExoticComponent}
 */
const PagingIndicator = memo(({ dispatch, reachedPagedEndThunk }) => {
  const ref = useRef();
  const intersectionObserverRef = useRef();

  useEffect(() => {
    if (intersectionObserverRef.current) {
      intersectionObserverRef.current.disconnect();
    }

    intersectionObserverRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        dispatch(reachedPagedEndThunk);
      }
    });

    const intersectionObserver = intersectionObserverRef.current;
    if (ref.current) {
      intersectionObserver.observe(ref.current);
    }
    return () => intersectionObserver.disconnect();
  }, [dispatch, reachedPagedEndThunk, intersectionObserverRef, ref]);

  return <div ref={ref} className="PagingIndicator"><LoadingIcon /></div>;
});

PagingIndicator.propTypes = {
  dispatch: PropTypes.func.isRequired,
  reachedPagedEndThunk: PropTypes.func.isRequired,
};

export default PagingIndicator;
