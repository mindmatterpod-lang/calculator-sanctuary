const symbols = ["+", "−", "×", "÷", "π", "√", "%", "Σ", "∞", "≈", "7", "42", "3.14", "∫", "Δ", "9"];

export function FloatingSymbols() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {symbols.map((s, i) => (
        <span
          key={`${s}-${i}`}
          className="float-symbol absolute font-display text-muted-foreground/40 select-none"
          style={{
            left: `${(i * 6.4 + 3) % 96}%`,
            bottom: "-10%",
            fontSize: `${1 + ((i * 7) % 5) * 0.45}rem`,
            animationDuration: `${16 + ((i * 5) % 14)}s`,
            animationDelay: `${(i * 1.3) % 12}s`,
          }}
        >
          {s}
        </span>
      ))}
    </div>
  );
}
