export function TopSummaryText({ title, text }: {
  title: string,
  text: string
}) {
  return (
    <li className="flex flex-col text-xs">
      <p>{title}</p>
      <p><strong>{text}</strong></p>
    </li>
  );
}
