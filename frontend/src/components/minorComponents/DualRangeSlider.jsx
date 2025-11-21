const DualRangeSlider = ({ min, max, onChange }) => {
  const minLimit = 0;
  const maxLimit = 20;

  const getPercent = (value) => Math.round(((value - minLimit) / (maxLimit - minLimit)) * 100);

  return (
    <div className="flex flex-col w-full gap-2 pt-1">
      <div className="relative w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
        <div 
          className="absolute h-full bg-violet-500 rounded-full z-10"
          style={{ left: `${getPercent(min)}%`, width: `${getPercent(max) - getPercent(min)}%` }}
        />
        
        <input 
          type="range" min={minLimit} max={maxLimit} value={min}
          onChange={(e) => {
            const value = Math.min(Number(e.target.value), max - 1);
            onChange(value, max);
          }}
          className="absolute w-full h-full appearance-none pointer-events-none bg-transparent z-20 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-violet-500 [&::-webkit-slider-thumb]:shadow-md cursor-pointer"
        />

        <input 
          type="range" min={minLimit} max={maxLimit} value={max}
          onChange={(e) => {
            const value = Math.max(Number(e.target.value), min + 1);
            onChange(min, value);
          }}
          className="absolute w-full h-full appearance-none pointer-events-none bg-transparent z-20 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-violet-500 [&::-webkit-slider-thumb]:shadow-md cursor-pointer"
        />
      </div>
      
      <div className="flex justify-between text-xs font-bold text-slate-400 font-mono">
        <span>{min} Years</span>
        <span>{max === 20 ? '20+' : max} Years</span>
      </div>
    </div>
  );
};

export default DualRangeSlider;
