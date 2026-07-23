import data from '@/pages/cv/template2/data'

export default function ProjectExperience() {

  return <div className="grid gap-4 md:grid-cols-2 ">
    {
      data.work.map((item) => {
        return item.projects.map((item, index) => {
          return <div key={index} className="rounded-xl border border-border/80 bg-card text-card-foreground shadow-sm  md:p-6">
            <div className="flex flex-col p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold tracking-tight text-xl">{item.name}</h3>
                <span className="text-sm text-muted-foreground">{item.start} – {item.end}</span>
              </div>
            </div>
            <div className="p-6 pt-0">
              <ul className="space-y-2.5">
                {item.highlights.map((r, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" aria-hidden="true"></span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        })
      })
    }
  </div>
}