export function PageWrapper(props) {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-cyan-200 to-white to-[60vh]">
      {props.children}
    </div>
  );
}
