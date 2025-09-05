import clsx from 'clsx';

type Props = {
  id?: string;
  className?: string;
  children: React.ReactNode;
  container?: boolean;
  as?: keyof JSX.IntrinsicElements;
  max?: 'default' | 'narrow' | 'wide';
};

export function Section({ id, className, children, container = true, as = 'section', max = 'default' }: Props) {
  const Comp = as as keyof JSX.IntrinsicElements;
  const Element = Comp as unknown as (props: React.HTMLAttributes<HTMLElement>) => JSX.Element;
  const sizeClass = max === 'narrow' ? 'wrapper-narrow' : max === 'wide' ? 'wrapper-wide' : '';
  return (
    <Element id={id} className={clsx('py-12 sm:py-16', className)}>
      {container ? <div className={clsx('wrapper', sizeClass)}>{children}</div> : children}
    </Element>
  );
}
