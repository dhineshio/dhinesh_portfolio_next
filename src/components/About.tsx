import Lanyard from "./lanyard/Lanyard";

export default function About() {
  return (
    <section id="about" className="px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl font-bold text-[#1a1a1a] mb-10">About Me</h2>

        <div className="flex flex-col lg:flex-row items-start gap-16">

          {/* Left — Lanyard ID Card */}
          <div className="w-full lg:w-[700px] h-[560px] shrink-0 rounded-2xl border border-black/10 overflow-hidden">
            <Lanyard
              position={[0, 0, 13]}
              gravity={[0, -40, 0]}
              lanyardWidth={1.2}
              frontImage="/lanyard/id_card.png"
              imageFit="contain"
            />
          </div>

          {/* Right — content placeholder */}
          <div className="flex-1" />

        </div>
      </div>
    </section>
  );
}
