import type { ReactNode } from "react";

export default function FormBox({
  children,
  title,
  hideTitle = false,
}: {
  children: ReactNode;
  title: string;
  hideTitle?: boolean;
}): ReactNode {
  return (
    <div className="w-full h-fit flex flex-col gap-8 p-8 bg-secondary-bg border-2 border-primary max-sm:border-l-0 max-sm:border-r-0 max-sm:rounded-none max-sm:p-[5vw] rounded-lg">
      {!hideTitle && (
        <h2 className="text-3xl max-sm:text-2xl text-primary font-medium pb-3 border-b border-primary">
          {title}
        </h2>
      )}
      <div>{children}</div>
    </div>
  );
}
