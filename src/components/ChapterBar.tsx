export default function ChapterBar({
  label,
  n,
  dark = false,
}: {
  label: string;
  n: string;
  dark?: boolean;
}) {
  return (
    <div className={`chapterbar${dark ? " chapterbar--dark" : ""}`}>
      <span>About {label}</span>
      <span>Chapter {n}</span>
    </div>
  );
}
