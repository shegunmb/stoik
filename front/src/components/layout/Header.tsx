import stoikLogo from "../../assets/stoikLogo.svg";

export function Header() {
  return (
    <header className="header">
      <img src={stoikLogo} className="logo" alt="logo" loading="lazy" />
    </header>
  );
}
