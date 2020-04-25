import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import LoadingIcon from '../../icons/LoadingIcon';
import './LoadingIndicator.scss';

/**
 * The loading indicator also doubles as an element for an intersection observer to dispatch actions when
 * the user has scrolled to the bottom of the page.
 *
 * It's very important to make sure that this component never gets re-rendered unnecessarily.  If it does,
 * the intersection observer will dispatch extra actions that are unwanted.  This is actually kind of cumbersome in a
 * function component and might be better as a PureComponent.
 *
 * In particular it's important to note that
 *   ** useContext can not be used here.  It will force re-renders even though the component is memoized. **
 * @type {React.NamedExoticComponent}
 */
const PagingIndicator = memo(({ dispatch, handleReachedPageEnd, isDonePaging }) => {
  const ref = useRef();
  const intersectionObserverRef = useRef();

  useEffect(() => {
    if (intersectionObserverRef.current) {
      intersectionObserverRef.current.disconnect();
    }

    intersectionObserverRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        dispatch(handleReachedPageEnd);
      }
    });

    const intersectionObserver = intersectionObserverRef.current;
    if (ref.current) {
      intersectionObserver.observe(ref.current);
    }
    return () => intersectionObserver.disconnect();
  }, [dispatch, handleReachedPageEnd, intersectionObserverRef, ref]);

  return <div ref={ref} className="LoadingIndicator"><LoadingIcon /></div>;
});

PagingIndicator.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleReachedPageEnd: PropTypes.func.isRequired,
  isDonePaging: PropTypes.bool.isRequired,
};

export default PagingIndicator;
