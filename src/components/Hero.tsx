import {
  HiArrowRight,
  HiOutlineCheckCircle,
  HiTrendingUp,
  HiUsers,
} from "react-icons/hi";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-green-800 flex items-center justify-center overflow-hidden pt-20 md:pt-28 lg:pt-32 pb-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Transform Your
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Strength Journey
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
            Professional strength training programs designed to unlock your
            potential. Track your progress, plan your meals, and achieve
            extraordinary results.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full font-semibold text-lg hover:from-yellow-300 hover:to-orange-400 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
            >
              Get Started Today
              <HiArrowRight className="h-5 w-5" />
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300"
            >
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-full">
                  <HiOutlineCheckCircle className="h-8 w-8 text-black" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">500+</h3>
              <p className="text-blue-100">Clients Transformed</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-full">
                  <HiTrendingUp className="h-8 w-8 text-black" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">95%</h3>
              <p className="text-blue-100">Success Rate</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-full">
                  <HiUsers className="h-8 w-8 text-black" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">5+</h3>
              <p className="text-blue-100">Years Experience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
