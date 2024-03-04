const Hero = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      {/* Background SVG */}
      {/* <div className="absolute top-0 left-0 h-full w-full z-0">
        <Image
          src="/hero.svg"
          layout="fill"
          objectFit="cover"
          alt="Background"
        />
      </div> */}

      {/* Foreground Text */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl mb-4 font-bold z-10 text-white text-center px-4 text-pretty">
        Host all of your links in one place
      </h1>
      <h3>
        {/* <span className="text-white">Create a </span>
        <span className="text-white font-bold">Link Tree</span>
        <span className="text-white"> for free!</span> */}
      </h3>
    </div>
  );
};

export default Hero;
