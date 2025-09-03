import clsx from 'clsx';

type Props = {
  id?: string;
  className?: string;
  children: React.ReactNode;
  container?: boolean;
  as?: keyof JSX.IntrinsicElements;
};

export function Section({ id, className, children, container = true, as = 'section' }: Props) {
  const Comp = as as keyof JSX.IntrinsicElements;
  const Element = Comp as unknown as (props: React.HTMLAttributes<HTMLElement>) => JSX.Element;
  return (
    <Element id={id} className={clsx('py-12 sm:py-16', className)}>
      {container ? <div className="container mx-auto px-4">{children}</div> : children}
    </Element>
  );
}
