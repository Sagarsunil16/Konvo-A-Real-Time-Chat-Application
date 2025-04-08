const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-100 dark:bg-base-100 border-l border-base-300 dark:border-base-200 p-12">

      <div className="max-w-md text-center">
        {/* Decorative Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-lg ${
                i % 2 === 0 ? 'bg-primary' : 'bg-primary/60'
              }`}
            />
          ))}
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-base-content mb-4">{title}</h2>

        {/* Subtitle */}
        <p className="text-base-content/70">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;