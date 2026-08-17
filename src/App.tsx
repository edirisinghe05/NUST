import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Tape from "./components/Tape";
import PortalStrip from "./components/PortalStrip";
import QuickLinks from "./components/QuickLinks";
import Timetable from "./components/Timetable";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-ink font-sans text-paper antialiased">
      <Navbar />
      <main>
        <Hero />
        <Tape />
        <PortalStrip />
        <QuickLinks />
        <Timetable />
        <Tape />
      </main>
      <Footer />
    </div>
  );
}
