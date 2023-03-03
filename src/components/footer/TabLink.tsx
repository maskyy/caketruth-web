import { Link } from "react-router-dom";

function TabLink({ to, children, title }: {
  to: string,
  children?: React.ReactNode,
  title: string
}) {
  return (
    <Link to={to} className="flex flex-col items-center">
      {children}
      <p className="text-xs">{title}</p>
    </Link>
  );
}

export default TabLink;
