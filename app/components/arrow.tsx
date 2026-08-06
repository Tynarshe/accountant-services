type UpRightArrowProps = {
  className?: string;
};

export function UpRightArrow({ className = "" }: UpRightArrowProps) {
  return <span className={`line-arrow ${className}`.trim()} aria-hidden="true" />;
}
