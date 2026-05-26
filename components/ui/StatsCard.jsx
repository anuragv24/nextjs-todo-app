

export default function StatsCard ({title, value}){
 return (
    <div className="
        bg-[#171717]
        border border-zinc-800
        rounded-2xl
        p-6
        hover:border-zinc-700
        transition
      ">
        <p className="text-zinc-400 text-sm" >{title}</p>
        <h2 className="text-4xl font-bold mt-3" >{value}</h2>
    </div>
 )
}