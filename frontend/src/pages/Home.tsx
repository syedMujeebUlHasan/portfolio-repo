import Navbar from "../components/Navbar";
import Scene from "../scenes/Scene";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="w-full min-h-screen">
      <Navbar />

      {/* Hero Section (3D Scene) */}
      <section className="h-screen pt-16">
        <Scene />
      </section>

      {/* Footer section */}
      <section id="footer">
        <Footer />
      </section>
    </div>
  );
}

export default Home;
