import { Breadcrumb } from "@amsterdam/design-system-react";
import React, { ReactNode } from "react";

import { navigate } from "../../lib/navigate";

interface BreadcrumbItem {
  href: string;
  label: ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbProps) => {
  return (
    <Breadcrumb>
      {items.map(({ href, label }) => (
        <Breadcrumb.Item href={href} key={href} onClick={navigate()}>
          {label}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
