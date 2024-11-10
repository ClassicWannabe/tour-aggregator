import React from "react";

const variants = {
  headline1: "text-2xl leading-[120%] font-semibold",
  headline2: "text-2xl leading-[120%] font-medium",
  headline3: "text-xl leading-[120%] font-semibold",
  headline4: "text-base leading-[140%] font-semibold tracking-[-.02em]",
  headline5: "text-sm leading-[130%] font-medium tracking-[-.02em]",

  caption1: "text-base leading-[140%] font-medium tracking-[-.02em]",
  caption2: "text-xs leading-[120%] font-medium",
  caption3: "text-xs leading-[130%] font-normal",
  caption4: "text-4xl leading-9 font-semibold",
  caption5: "text-base leading-[140%] font-semibold tracking-[-.02em]",

  body1: "text-base leading-[140%] font-normal",
  body2: "text-sm leading-[130%] font-normal",
  body3: "text-[10px] leading-[120%] font-normal",
};

export interface TypographyProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: keyof JSX.IntrinsicElements;
  variant?: keyof typeof variants;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = "body1",
  as,
  children,
  className,
}) => {
  const Component = as || "div";

  const cn = [variants[variant]];
  if (className) cn.push(className);

  return (
    <Component as={as} className={cn.join(" ")}>
      {children}
    </Component>
  );
};
