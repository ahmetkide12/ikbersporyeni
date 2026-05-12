import { Link } from "react-router";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <ol
          className="flex items-center flex-wrap gap-1 text-sm"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          <li
            className="flex items-center"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <Link
              to="/"
              className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1"
              itemProp="item"
            >
              <Home className="w-3.5 h-3.5" />
              <span itemProp="name">Ana Sayfa</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const position = index + 2;

            return (
              <li
                key={item.url}
                className="flex items-center"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <ChevronRight className="w-3.5 h-3.5 text-gray-400 mx-1" />
                {isLast ? (
                  <span
                    className="text-gray-800 font-semibold"
                    itemProp="name"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    to={item.url}
                    className="text-green-600 hover:text-green-700 font-medium"
                    itemProp="item"
                  >
                    <span itemProp="name">{item.name}</span>
                  </Link>
                )}
                <meta itemProp="position" content={position.toString()} />
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
