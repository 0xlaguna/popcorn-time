import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../ui/utils/ColorSchemeToggle';

export default function HomePage() {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
    </>
  );
}
