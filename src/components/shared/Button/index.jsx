import cls from 'classnames';
import IconLoading from '../IconLoading';
import './button.css';

function Button(props) {
  const {
    children,
    type = 'default',
    size,
    as = 'button',
    htmlType,
    className,
    loading,
    loadingPos = 'left',
    ...restProps
  } = props;

  const classes = cls(
    'btn',
    {
      'btn-default': type === 'default',
      'btn-category': type === 'category',
      'btn-primary': type === 'primary',
      'btn-size-large': size === 'large',
    },
    className
  );

  // if (type === 'default') classes += 'btn-default ';
  // if (type === 'category') classes += 'btn-category ';
  // if (type === 'primary') classes += 'btn-primary ';
  // if (size === 'large') classes += 'btn-size-large ';

  const content = (
    <>
      {loading && loadingPos === 'left' && <IconLoading />}
      {children}
      {loading && loadingPos === 'right' && <IconLoading />}
    </>
  );

  const injectedProps = {
    ...restProps,
    className: classes,
    type: htmlType,
  };

  if (as === 'a') return <a {...injectedProps}>{content}</a>;
  
  return <button {...injectedProps}>{content}</button>;
}

export default Button;
