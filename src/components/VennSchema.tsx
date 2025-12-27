interface VennSchemaProps {
  id: string;
  d: string;
  className?: string;
  dotId: string;
}

const VennSchema = ({ id, d, className="fill-none stroke-gray-300 stroke-1 opacity-40", dotId }: VennSchemaProps) => {
  return (
    <g>
      <path 
        id={id}
        d={d}
        className={className}
      />

      <circle 
        id={dotId}
        r={5}
        fill="#d7b468"
        className="opacity-50"
      />
    </g>
  )
}

export default VennSchema