import cls from 'classnames';
import Button from '../Button';
import './main-title.css';

function MainTitle(props) {
  const { children, btnLabel, btnProps, isSearchPage } = props;

  const classes = cls('main-title spacing', {
    'd-flex tcl-jc-between tcl-ais-center': btnLabel,
    'main-title__search': isSearchPage
  });

  return (
    <div className={classes}>
      <h2>{children}</h2>
      {btnLabel && <Button {...btnProps}>{btnLabel}</Button>}
    </div>
  );
}

export default MainTitle;
